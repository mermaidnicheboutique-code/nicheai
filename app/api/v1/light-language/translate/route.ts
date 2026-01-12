/**
 * Light Language Translation API
 * POST /api/v1/light-language/translate
 * Translates text into photonic light sequences
 *
 * This endpoint calls the Python FastAPI server or uses direct Python bridge
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAPIKey } from '@/lib/apiKeyMiddleware';
import { translateToLight, photonicToBinary, photonicToHex } from '@/lib/lightLanguage';

export async function POST(request: NextRequest) {
  return withAPIKey(request, 'light-language:read', async (req, apiKey) => {
    try {
      const body = await req.json();
      const { text, category, format = 'full', enable_quantum = true } = body;

      if (!text || typeof text !== 'string') {
        return NextResponse.json(
          { error: 'Text is required and must be a string' },
          { status: 400 }
        );
      }

      // Translate to light using local library
      const photonicSequence = translateToLight(text, category);

      // Prepare response based on format
      let response: any = {
        success: true,
        text,
        category: category || 'general',
        quantum_mode: enable_quantum,
        photonicSequence
      };

      if (format === 'binary' || format === 'full') {
        response.binary = photonicToBinary(photonicSequence);
      }

      if (format === 'hex' || format === 'full') {
        response.hex = photonicToHex(photonicSequence);
      }

      // Add metadata
      response.metadata = {
        apiKeyId: apiKey.id,
        timestamp: Date.now(),
        usage: {
          totalRequests: apiKey.usage.totalRequests,
          requestsThisMonth: apiKey.usage.requestsThisMonth
        },
        optimized_for: enable_quantum ? 'Diamond NV Center Quantum Computers' : 'Classical Computers',
        wavelength_range: '400-700nm (visible spectrum)'
      };

      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Translation error:', error);
      return NextResponse.json(
        { error: 'Translation failed', details: error.message },
        { status: 500 }
      );
    }
  });
}
