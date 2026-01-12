/**
 * API Key Management - Individual Key Routes
 * DELETE /api/dev/keys/[id] - Revoke an API key
 */

import { NextRequest, NextResponse } from 'next/server';
import { revokeAPIKey } from '@/lib/apiKeyStorage';

/**
 * Revoke an API key
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    const success = await revokeAPIKey(id);

    if (!success) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'API key revoked successfully'
    });
  } catch (error: any) {
    console.error('Error revoking API key:', error);
    return NextResponse.json(
      { error: 'Failed to revoke API key', details: error.message },
      { status: 500 }
    );
  }
}
