/**
 * Light Language Color Dictionary API
 * GET /api/v1/light-language/colors
 * Returns the complete color-to-meaning mappings
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAPIKey } from '@/lib/apiKeyMiddleware';

const COLOR_DICTIONARY = {
  colors: [
    {
      name: 'Red',
      wavelength: 700,
      frequency: 428_000_000_000_000,
      meaning: 'Foundation/Security/Survival',
      energyLevel: 'Base',
      keywords: ['foundation', 'security', 'survival', 'ground', 'protect', 'bitcoin', 'crypto'],
      hexCode: '#FF0000',
      usage: 'Represents foundational concepts, security, and survival mechanisms in both spiritual and technological contexts'
    },
    {
      name: 'Orange',
      wavelength: 620,
      frequency: 484_000_000_000_000,
      meaning: 'Creativity/Emotion/Flow',
      energyLevel: 'Creative',
      keywords: ['create', 'emotion', 'feel', 'flow', 'passion', 'energy'],
      hexCode: '#FF7F00',
      usage: 'Represents creative processes, emotional states, and energy flow'
    },
    {
      name: 'Yellow',
      wavelength: 580,
      frequency: 517_000_000_000_000,
      meaning: 'Power/Intelligence/Will',
      energyLevel: 'Mental',
      keywords: ['power', 'will', 'think', 'mind', 'intelligence', 'compute', 'algorithm'],
      hexCode: '#FFFF00',
      usage: 'Represents computational power, intelligence, and willful execution'
    },
    {
      name: 'Green',
      wavelength: 530,
      frequency: 566_000_000_000_000,
      meaning: 'Love/Healing/Growth',
      energyLevel: 'Heart',
      keywords: ['love', 'heal', 'heart', 'grow', 'blockchain', 'connect'],
      hexCode: '#00FF00',
      usage: 'Represents connection, growth, and blockchain linking concepts'
    },
    {
      name: 'Blue',
      wavelength: 470,
      frequency: 638_000_000_000_000,
      meaning: 'Truth/Communication/Expression',
      energyLevel: 'Communication',
      keywords: ['truth', 'speak', 'communicate', 'data', 'information', 'knowledge'],
      hexCode: '#0000FF',
      usage: 'Represents data transmission, communication protocols, and knowledge expression'
    },
    {
      name: 'Indigo',
      wavelength: 450,
      frequency: 667_000_000_000_000,
      meaning: 'Intuition/Vision/Insight',
      energyLevel: 'Vision',
      keywords: ['wisdom', 'insight', 'vision', 'neural', 'ai', 'intelligence'],
      hexCode: '#4B0082',
      usage: 'Represents artificial intelligence, neural networks, and deep learning'
    },
    {
      name: 'Violet',
      wavelength: 400,
      frequency: 750_000_000_000_000,
      meaning: 'Consciousness/Transcendence/Unity',
      energyLevel: 'Cosmic',
      keywords: ['sacred', 'divine', 'quantum', 'superposition', 'entangle', 'transcend'],
      hexCode: '#9400D3',
      usage: 'Represents quantum computing, consciousness, and universal connection'
    }
  ],
  binaryEncoding: {
    'Red': '000',
    'Orange': '001',
    'Yellow': '010',
    'Green': '011',
    'Blue': '100',
    'Indigo': '101',
    'Violet': '110'
  },
  description: 'LUXBIN Light Language translates knowledge into photonic sequences using the visible light spectrum. Each color represents specific concepts in both spiritual and technological domains.'
};

export async function GET(request: NextRequest) {
  return withAPIKey(request, 'light-language:read', async (req, apiKey) => {
    return NextResponse.json({
      success: true,
      dictionary: COLOR_DICTIONARY,
      metadata: {
        apiKeyId: apiKey.id,
        timestamp: Date.now(),
        version: '1.0.0'
      }
    });
  });
}
