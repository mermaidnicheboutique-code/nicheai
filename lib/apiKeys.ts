/**
 * API Key Management System
 * Handles generation, validation, and storage of developer API keys
 */

import { randomBytes, createHash } from 'crypto';

export interface APIKey {
  id: string;
  key: string; // The actual API key (hashed in storage)
  keyPrefix: string; // First 8 chars for display (e.g., "luxb_abc...")
  name: string; // Developer-provided name
  userId?: string; // Optional user identification
  email?: string; // Developer email
  createdAt: number;
  lastUsedAt?: number;
  expiresAt?: number;
  isActive: boolean;
  permissions: APIPermission[];
  usage: {
    totalRequests: number;
    requestsThisMonth: number;
    lastResetAt: number;
  };
  rateLimit: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
}

export type APIPermission =
  | 'light-language:read'
  | 'light-language:write'
  | 'blockchain:read'
  | 'blockchain:write'
  | 'ai:chat'
  | 'ai:learn'
  | 'memory:read'
  | 'memory:write'
  | 'all';

export interface CreateAPIKeyRequest {
  name: string;
  email?: string;
  permissions?: APIPermission[];
  expiresInDays?: number;
  rateLimit?: {
    requestsPerMinute?: number;
    requestsPerDay?: number;
  };
}

export interface APIKeyValidation {
  isValid: boolean;
  apiKey?: APIKey;
  error?: string;
}

/**
 * Generate a new API key
 * Format: luxb_<32-char-hex>
 */
export function generateAPIKey(): string {
  const randomHex = randomBytes(32).toString('hex');
  return `luxb_${randomHex}`;
}

/**
 * Hash API key for secure storage
 */
export function hashAPIKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

/**
 * Get key prefix for display (first 12 chars)
 */
export function getKeyPrefix(key: string): string {
  return key.substring(0, 12) + '...';
}

/**
 * Create a new API key record
 */
export function createAPIKeyRecord(request: CreateAPIKeyRequest): { apiKey: APIKey; plainKey: string } {
  const plainKey = generateAPIKey();
  const hashedKey = hashAPIKey(plainKey);
  const now = Date.now();

  const apiKey: APIKey = {
    id: `key_${Date.now()}_${randomBytes(8).toString('hex')}`,
    key: hashedKey,
    keyPrefix: getKeyPrefix(plainKey),
    name: request.name,
    email: request.email,
    createdAt: now,
    isActive: true,
    permissions: request.permissions || ['all'],
    expiresAt: request.expiresInDays
      ? now + (request.expiresInDays * 24 * 60 * 60 * 1000)
      : undefined,
    usage: {
      totalRequests: 0,
      requestsThisMonth: 0,
      lastResetAt: now
    },
    rateLimit: {
      requestsPerMinute: request.rateLimit?.requestsPerMinute || 60,
      requestsPerDay: request.rateLimit?.requestsPerDay || 10000
    }
  };

  return { apiKey, plainKey };
}

/**
 * Validate API key format
 */
export function isValidKeyFormat(key: string): boolean {
  // Allow demo keys for development/testing
  if (key === 'demo_key_for_testing' || key.startsWith('demo_')) {
    return true;
  }
  return /^luxb_[a-f0-9]{64}$/.test(key);
}

/**
 * Check if API key has required permission
 */
export function hasPermission(apiKey: APIKey, permission: APIPermission): boolean {
  if (apiKey.permissions.includes('all')) return true;
  return apiKey.permissions.includes(permission);
}

/**
 * Check if API key is expired
 */
export function isExpired(apiKey: APIKey): boolean {
  if (!apiKey.expiresAt) return false;
  return Date.now() > apiKey.expiresAt;
}

/**
 * Check rate limit
 */
export function checkRateLimit(apiKey: APIKey, requestTimestamps: number[]): { allowed: boolean; error?: string } {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  const oneDayAgo = now - 86400000;

  const requestsLastMinute = requestTimestamps.filter(t => t > oneMinuteAgo).length;
  const requestsLastDay = requestTimestamps.filter(t => t > oneDayAgo).length;

  if (requestsLastMinute >= apiKey.rateLimit.requestsPerMinute) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${apiKey.rateLimit.requestsPerMinute} requests per minute`
    };
  }

  if (requestsLastDay >= apiKey.rateLimit.requestsPerDay) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${apiKey.rateLimit.requestsPerDay} requests per day`
    };
  }

  return { allowed: true };
}

/**
 * Update API key usage statistics
 */
export function updateUsageStats(apiKey: APIKey): APIKey {
  const now = Date.now();
  const monthStart = new Date(new Date().setDate(1)).getTime();

  // Reset monthly counter if needed
  if (apiKey.usage.lastResetAt < monthStart) {
    apiKey.usage.requestsThisMonth = 0;
    apiKey.usage.lastResetAt = monthStart;
  }

  apiKey.usage.totalRequests++;
  apiKey.usage.requestsThisMonth++;
  apiKey.lastUsedAt = now;

  return apiKey;
}
