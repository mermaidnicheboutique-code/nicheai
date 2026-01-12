/**
 * Light Language Memory API
 * POST /api/v1/light-language/memory
 * Creates a light memory from text knowledge
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAPIKey } from '@/lib/apiKeyMiddleware';
import { createLightMemory, visualizeLightMemory } from '@/lib/lightLanguage';

export async function POST(request: NextRequest) {
  return withAPIKey(request, 'light-language:write', async (req, apiKey) => {
    try {
      const body = await req.json();
      const { text, category, emotionalResonance, visualize = false } = body;

      if (!text || typeof text !== 'string') {
        return NextResponse.json(
          { error: 'Text is required and must be a string' },
          { status: 400 }
        );
      }

      if (!category || typeof category !== 'string') {
        return NextResponse.json(
          { error: 'Category is required and must be a string' },
          { status: 400 }
        );
      }

      // Create light memory
      const memory = createLightMemory(text, category, emotionalResonance);

      const response: any = {
        success: true,
        memory
      };

      if (visualize) {
        response.visualization = visualizeLightMemory(memory);
      }

      // Add metadata
      response.metadata = {
        apiKeyId: apiKey.id,
        timestamp: Date.now()
      };

      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Error creating light memory:', error);
      return NextResponse.json(
        { error: 'Failed to create light memory', details: error.message },
        { status: 500 }
      );
    }
  });
}
