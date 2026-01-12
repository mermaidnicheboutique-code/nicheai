import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint to generate quantum random numbers
 * Proxies requests to the quantum-internet service
 */
export async function POST(request: NextRequest) {
  try {
    const serviceUrl = process.env.QUANTUM_INTERNET_URL || 'http://localhost:8765';
    const body = await request.json();

    try {
      // Forward request to quantum internet service
      const response = await fetch(`${serviceUrl}/api/operations/random`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Quantum random generation submitted to service');

        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
      } else {
        throw new Error(`Service returned status ${response.status}`);
      }
    } catch (serviceError) {
      console.log('⚠️  Quantum service not available, returning mock response:', serviceError);

      // Generate mock quantum random number
      const numBits = body.numBits || 8;
      const maxValue = Math.pow(2, numBits) - 1;
      const randomValue = Math.floor(Math.random() * (maxValue + 1));

      return NextResponse.json({
        id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'random_generation',
        backend: body.backend || 'ibm_fez',
        status: 'completed',
        result: {
          value: randomValue,
          binary: randomValue.toString(2).padStart(numBits, '0'),
          numBits: numBits,
          trueQuantumRandom: false,
        },
        jobId: `mock_job_${Date.now()}`,
        timestamp: new Date().toISOString(),
        _mock: true,
      }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }
  } catch (error) {
    console.error('Error generating quantum random number:', error);
    return NextResponse.json(
      { error: 'Failed to generate quantum random number' },
      { status: 500 }
    );
  }
}
