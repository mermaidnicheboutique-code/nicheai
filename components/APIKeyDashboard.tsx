"use client";

import { useState, useEffect } from 'react';

interface APIKey {
  id: string;
  name: string;
  key?: string; // Only present when first created
  keyPrefix: string;
  email?: string;
  createdAt: number;
  lastUsedAt?: number;
  expiresAt?: number;
  isActive: boolean;
  permissions: string[];
  usage: {
    totalRequests: number;
    requestsThisMonth: number;
  };
  rateLimit: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
}

export function APIKeyDashboard() {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEmail, setNewKeyEmail] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['all']);
  const [createdKey, setCreatedKey] = useState<APIKey | null>(null);

  // Load keys on mount
  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dev/keys');
      const data = await response.json();
      if (data.success) {
        setKeys(data.keys);
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const createKey = async () => {
    if (!newKeyName.trim()) {
      alert('Please enter a name for your API key');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/dev/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName,
          email: newKeyEmail || undefined,
          permissions: selectedPermissions
        })
      });

      const data = await response.json();
      if (data.success) {
        setCreatedKey(data.apiKey);
        setNewKeyName('');
        setNewKeyEmail('');
        setShowCreateForm(false);
        loadKeys();
      } else {
        alert(data.error || 'Failed to create API key');
      }
    } catch (error) {
      console.error('Failed to create API key:', error);
      alert('Failed to create API key');
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/dev/keys/${keyId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        loadKeys();
      } else {
        alert(data.error || 'Failed to revoke API key');
      }
    } catch (error) {
      console.error('Failed to revoke API key:', error);
      alert('Failed to revoke API key');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            API Keys
          </h2>
          <p className="text-gray-400 mt-2">
            Generate API keys to access LUXBIN's Light Language and blockchain APIs
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
        >
          + Create New Key
        </button>
      </div>

      {/* Created Key Alert */}
      {createdKey && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4">
            ✅ API Key Created Successfully!
          </h3>
          <p className="text-gray-300 mb-4">
            <strong>⚠️ Important:</strong> Save this key now - it will only be shown once!
          </p>
          <div className="bg-black/50 rounded-lg p-4 mb-4">
            <code className="text-green-300 font-mono text-sm break-all">
              {createdKey.key}
            </code>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => copyToClipboard(createdKey.key!)}
              className="px-4 py-2 bg-green-600 rounded-lg font-bold hover:bg-green-700 transition-all"
            >
              📋 Copy Key
            </button>
            <button
              onClick={() => setCreatedKey(null)}
              className="px-4 py-2 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Create New API Key</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Key Name *
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production App, Testing"
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                value={newKeyEmail}
                onChange={(e) => setNewKeyEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'all', label: 'All Permissions' },
                  { value: 'light-language:read', label: 'Light Language Read' },
                  { value: 'light-language:write', label: 'Light Language Write' },
                  { value: 'blockchain:read', label: 'Blockchain Read' },
                ].map((perm) => (
                  <label key={perm.value} className="flex items-center gap-2 p-2 bg-black/30 rounded cursor-pointer hover:bg-black/50">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions([...selectedPermissions, perm.value]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== perm.value));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={createKey}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Key'}
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Your API Keys</h3>
        {loading && keys.length === 0 ? (
          <p className="text-gray-400">Loading...</p>
        ) : keys.length === 0 ? (
          <p className="text-gray-400">No API keys yet. Create your first one above!</p>
        ) : (
          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.id} className="bg-black/50 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{key.name}</h4>
                    {key.email && <p className="text-sm text-gray-400">{key.email}</p>}
                  </div>
                  <div className="flex gap-2">
                    {key.isActive ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                        Revoked
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Key Prefix</p>
                    <code className="text-purple-300 font-mono">{key.keyPrefix}</code>
                  </div>
                  <div>
                    <p className="text-gray-400">Created</p>
                    <p className="text-gray-300">{formatDate(key.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Usage (This Month)</p>
                    <p className="text-gray-300">{key.usage.requestsThisMonth.toLocaleString()} requests</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rate Limit</p>
                    <p className="text-gray-300">{key.rateLimit.requestsPerMinute}/min, {key.rateLimit.requestsPerDay}/day</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-1">Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {key.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
                {key.isActive && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => revokeKey(key.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-bold hover:bg-red-500/30 transition-all disabled:opacity-50 text-sm"
                    >
                      Revoke Key
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Example */}
      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">📖 How to Use Your API Key</h3>
        <p className="text-gray-300 mb-4">
          Include your API key in the Authorization header of your requests:
        </p>
        <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-green-300">
{`curl -X POST https://luxbin.app/api/v1/light-language/translate \\
  -H "Authorization: Bearer luxb_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello World",
    "category": "technology"
  }'`}
          </pre>
        </div>
      </div>
    </div>
  );
}
