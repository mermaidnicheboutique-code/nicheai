/**
 * API Key Validation Middleware
 * Validates API keys and checks permissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { APIKey, APIPermission, hasPermission, isValidKeyFormat, checkRateLimit, updateUsageStats, hashAPIKey } from './apiKeys';
import { getAPIKey, updateAPIKey, logAPIRequest, getRequestTimestamps } from './apiKeyStorage';

export interface APIKeyValidationResult {
  isValid: boolean;
  apiKey?: APIKey;
  error?: string;
  errorCode?: string;
}

/**
 * Validate API key from request headers
 */
export async function validateAPIKey(request: NextRequest): Promise<APIKeyValidationResult> {
  // Try to get API key from X-API-Key header first (for demo/testing)
  let plainKey = request.headers.get('x-api-key');

  // If not found, try Authorization header
  if (!plainKey) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return {
        isValid: false,
        error: 'Missing Authorization or X-API-Key header',
        errorCode: 'MISSING_API_KEY'
      };
    }

    // Extract key from "Bearer <key>" format
    const match = authHeader.match(/^Bearer (.+)$/i);
    if (!match) {
      return {
        isValid: false,
        error: 'Invalid Authorization header format. Use: "Bearer luxb_..." or X-API-Key header',
        errorCode: 'INVALID_FORMAT'
      };
    }

    plainKey = match[1];
  }

  // Validate key format
  if (!isValidKeyFormat(plainKey)) {
    return {
      isValid: false,
      error: 'Invalid API key format',
      errorCode: 'INVALID_KEY_FORMAT'
    };
  }

  // Get API key from storage
  const apiKey = await getAPIKey(plainKey);

  if (!apiKey) {
    return {
      isValid: false,
      error: 'Invalid or expired API key',
      errorCode: 'INVALID_KEY'
    };
  }

  // Check rate limits
  const hashedKey = hashAPIKey(plainKey);
  const requestTimestamps = await getRequestTimestamps(hashedKey);
  const rateLimitCheck = checkRateLimit(apiKey, requestTimestamps);

  if (!rateLimitCheck.allowed) {
    return {
      isValid: false,
      error: rateLimitCheck.error,
      errorCode: 'RATE_LIMIT_EXCEEDED'
    };
  }

  // Log the request
  await logAPIRequest(hashedKey);

  // Update usage stats
  const updatedKey = updateUsageStats(apiKey);
  await updateAPIKey(updatedKey);

  return {
    isValid: true,
    apiKey: updatedKey
  };
}

/**
 * Check if API key has required permission
 */
export function checkPermission(apiKey: APIKey, permission: APIPermission): boolean {
  return hasPermission(apiKey, permission);
}

/**
 * Middleware wrapper for protected API routes
 */
export async function withAPIKey(
  request: NextRequest,
  requiredPermission: APIPermission,
  handler: (request: NextRequest, apiKey: APIKey) => Promise<NextResponse>
): Promise<NextResponse> {
  const validation = await validateAPIKey(request);

  if (!validation.isValid) {
    return NextResponse.json(
      {
        error: validation.error,
        code: validation.errorCode,
        documentation: 'https://luxbin.app/developers#api-keys'
      },
      { status: validation.errorCode === 'RATE_LIMIT_EXCEEDED' ? 429 : 401 }
    );
  }

  // Check permission
  if (!checkPermission(validation.apiKey!, requiredPermission)) {
    return NextResponse.json(
      {
        error: `Missing required permission: ${requiredPermission}`,
        code: 'INSUFFICIENT_PERMISSIONS',
        documentation: 'https://luxbin.app/developers#api-keys'
      },
      { status: 403 }
    );
  }

  // Call the actual handler
  return handler(request, validation.apiKey!);
}
