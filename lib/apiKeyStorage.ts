/**
 * API Key Storage
 * Simple file-based storage for API keys
 * Can be replaced with database later (Vercel KV, Supabase, etc.)
 */

import { APIKey, hashAPIKey, isExpired } from './apiKeys';
import fs from 'fs/promises';
import path from 'path';

const STORAGE_DIR = path.join(process.cwd(), '.luxbin-data');
const API_KEYS_FILE = path.join(STORAGE_DIR, 'api-keys.json');
const REQUEST_LOGS_FILE = path.join(STORAGE_DIR, 'request-logs.json');

// In-memory cache for performance
let keysCache: Map<string, APIKey> | null = null;
let requestLogsCache: Map<string, number[]> | null = null;

/**
 * Ensure storage directory exists
 */
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore
  }
}

/**
 * Load all API keys from storage
 */
export async function loadAPIKeys(): Promise<Map<string, APIKey>> {
  if (keysCache) return keysCache;

  await ensureStorageDir();

  try {
    const data = await fs.readFile(API_KEYS_FILE, 'utf-8');
    const keys: APIKey[] = JSON.parse(data);
    keysCache = new Map(keys.map(k => [k.key, k]));
    return keysCache;
  } catch (error) {
    // File doesn't exist yet, return empty map
    keysCache = new Map();
    return keysCache;
  }
}

/**
 * Save API keys to storage
 */
async function saveAPIKeys(keys: Map<string, APIKey>): Promise<void> {
  await ensureStorageDir();
  const keysArray = Array.from(keys.values());
  await fs.writeFile(API_KEYS_FILE, JSON.stringify(keysArray, null, 2));
  keysCache = keys;
}

/**
 * Load request logs for rate limiting
 */
async function loadRequestLogs(): Promise<Map<string, number[]>> {
  if (requestLogsCache) return requestLogsCache;

  await ensureStorageDir();

  try {
    const data = await fs.readFile(REQUEST_LOGS_FILE, 'utf-8');
    const logs: Record<string, number[]> = JSON.parse(data);
    requestLogsCache = new Map(Object.entries(logs));
    return requestLogsCache;
  } catch (error) {
    requestLogsCache = new Map();
    return requestLogsCache;
  }
}

/**
 * Save request logs
 */
async function saveRequestLogs(logs: Map<string, number[]>): Promise<void> {
  await ensureStorageDir();
  const logsObject = Object.fromEntries(logs);
  await fs.writeFile(REQUEST_LOGS_FILE, JSON.stringify(logsObject, null, 2));
  requestLogsCache = logs;
}

/**
 * Store a new API key
 */
export async function storeAPIKey(apiKey: APIKey): Promise<void> {
  const keys = await loadAPIKeys();
  keys.set(apiKey.key, apiKey);
  await saveAPIKeys(keys);
}

/**
 * Get API key by hashed key
 */
export async function getAPIKey(plainKey: string): Promise<APIKey | null> {
  const hashedKey = hashAPIKey(plainKey);
  const keys = await loadAPIKeys();
  const apiKey = keys.get(hashedKey);

  if (!apiKey) return null;
  if (!apiKey.isActive) return null;
  if (isExpired(apiKey)) return null;

  return apiKey;
}

/**
 * List all API keys (for admin/dashboard)
 */
export async function listAPIKeys(email?: string): Promise<APIKey[]> {
  const keys = await loadAPIKeys();
  let allKeys = Array.from(keys.values());

  if (email) {
    allKeys = allKeys.filter(k => k.email === email);
  }

  return allKeys.sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Revoke an API key
 */
export async function revokeAPIKey(keyId: string): Promise<boolean> {
  const keys = await loadAPIKeys();

  for (const [hash, apiKey] of keys.entries()) {
    if (apiKey.id === keyId) {
      apiKey.isActive = false;
      await saveAPIKeys(keys);
      return true;
    }
  }

  return false;
}

/**
 * Update API key
 */
export async function updateAPIKey(apiKey: APIKey): Promise<void> {
  const keys = await loadAPIKeys();
  keys.set(apiKey.key, apiKey);
  await saveAPIKeys(keys);
}

/**
 * Log API request for rate limiting
 */
export async function logAPIRequest(hashedKey: string): Promise<void> {
  const logs = await loadRequestLogs();
  const timestamps = logs.get(hashedKey) || [];
  const now = Date.now();

  // Keep only last 24 hours of logs
  const oneDayAgo = now - 86400000;
  const recentTimestamps = timestamps.filter(t => t > oneDayAgo);
  recentTimestamps.push(now);

  logs.set(hashedKey, recentTimestamps);
  await saveRequestLogs(logs);
}

/**
 * Get request timestamps for rate limiting
 */
export async function getRequestTimestamps(hashedKey: string): Promise<number[]> {
  const logs = await loadRequestLogs();
  return logs.get(hashedKey) || [];
}

/**
 * Clear cache (useful for testing)
 */
export function clearCache(): void {
  keysCache = null;
  requestLogsCache = null;
}
