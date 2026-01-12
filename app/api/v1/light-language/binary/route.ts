/**
 * Binary to Light Language API
 * POST /api/v1/light-language/binary
 * Converts binary code to light sequences
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAPIKey } from '@/lib/apiKeyMiddleware';

const BINARY_TO_COLOR: Record<string, string> = {
  '000': 'Red',
  '001': 'Orange',
  '010': 'Yellow',
  '011': 'Green',
  '100': 'Blue',
  '101': 'Indigo',
  '110': 'Violet',
  '111': 'Violet' // Default to Violet for 111
};

const COLOR_WAVELENGTHS: Record<string, number> = {
  'Red': 700,
  'Orange': 620,
  'Yellow': 580,
  'Green': 530,
  'Blue': 470,
  'Indigo': 450,
  'Violet': 400
};

export async function POST(request: NextRequest) {
  return withAPIKey(request, 'light-language:read', async (req, apiKey) => {
    try {
      const body = await req.json();
      const { binary } = body;

      if (!binary || typeof binary !== 'string') {
        return NextResponse.json(
          { error: 'Binary string is required' },
          { status: 400 }
        );
      }

      // Validate binary format
      if (!/^[01]+$/.test(binary)) {
        return NextResponse.json(
          { error: 'Invalid binary format. Only 0 and 1 are allowed' },
          { status: 400 }
        );
      }

      // Pad binary to multiple of 3
      const paddedBinary = binary.padEnd(Math.ceil(binary.length / 3) * 3, '0');

      // Convert to colors
      const colors: string[] = [];
      const wavelengths: number[] = [];

      for (let i = 0; i < paddedBinary.length; i += 3) {
        const triplet = paddedBinary.substring(i, i + 3);
        const color = BINARY_TO_COLOR[triplet] || 'Violet';
        colors.push(color);
        wavelengths.push(COLOR_WAVELENGTHS[color]);
      }

      return NextResponse.json({
        success: true,
        input: {
          binary,
          length: binary.length,
          paddedBinary
        },
        output: {
          colors,
          wavelengths,
          colorCount: colors.length
        },
        visualization: colors.map(c => {
          const symbols: Record<string, string> = {
            'Red': '🔴',
            'Orange': '🟠',
            'Yellow': '🟡',
            'Green': '🟢',
            'Blue': '🔵',
            'Indigo': '🟣',
            'Violet': '🟪'
          };
          return symbols[c];
        }).join(''),
        metadata: {
          apiKeyId: apiKey.id,
          timestamp: Date.now()
        }
      });
    } catch (error: any) {
      console.error('Error converting binary to light:', error);
      return NextResponse.json(
        { error: 'Failed to convert binary to light', details: error.message },
        { status: 500 }
      );
    }
  });
}
