/**
 * API Key Management Routes
 * POST /api/dev/keys - Create new API key
 * GET /api/dev/keys - List API keys
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAPIKeyRecord, CreateAPIKeyRequest } from '@/lib/apiKeys';
import { storeAPIKey, listAPIKeys } from '@/lib/apiKeyStorage';

/**
 * Create a new API key
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateAPIKeyRequest = await request.json();

    // Validate request
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      );
    }

    // Create API key
    const { apiKey, plainKey } = createAPIKeyRecord(body);

    // Store in database
    await storeAPIKey(apiKey);

    // Return the plain key (only time it's shown)
    return NextResponse.json({
      success: true,
      message: 'API key created successfully. Save this key - it will only be shown once!',
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        key: plainKey, // Full key - shown only once
        keyPrefix: apiKey.keyPrefix,
        createdAt: apiKey.createdAt,
        permissions: apiKey.permissions,
        expiresAt: apiKey.expiresAt,
        rateLimit: apiKey.rateLimit
      }
    });
  } catch (error: any) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * List all API keys
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || undefined;

    const keys = await listAPIKeys(email);

    // Remove sensitive data
    const sanitizedKeys = keys.map(k => ({
      id: k.id,
      name: k.name,
      keyPrefix: k.keyPrefix,
      email: k.email,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
      expiresAt: k.expiresAt,
      isActive: k.isActive,
      permissions: k.permissions,
      usage: k.usage,
      rateLimit: k.rateLimit
    }));

    return NextResponse.json({
      success: true,
      keys: sanitizedKeys,
      count: sanitizedKeys.length
    });
  } catch (error: any) {
    console.error('Error listing API keys:', error);
    return NextResponse.json(
      { error: 'Failed to list API keys', details: error.message },
      { status: 500 }
    );
  }
}
