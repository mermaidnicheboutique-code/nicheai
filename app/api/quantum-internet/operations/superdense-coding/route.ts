import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint for superdense coding
 * Proxies requests to the quantum-internet service
 */
export async function POST(request: NextRequest) {
  try {
    const serviceUrl = process.env.QUANTUM_INTERNET_URL || 'http://localhost:8765';
    const body = await request.json();

    try {
      // Forward request to quantum internet service
      const response = await fetch(`${serviceUrl}/api/operations/superdense-coding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Superdense coding submitted to service');

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

      return NextResponse.json({
        id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'superdense_coding',
        backend: body.backend || 'ibm_fez',
        status: 'completed',
        result: {
          message: body.message || '00',
          encoded: true,
          decoded: body.message || '00',
          efficiency: 2.0, // 2 classical bits per 1 qubit
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
    console.error('Error executing superdense coding:', error);
    return NextResponse.json(
      { error: 'Failed to execute superdense coding' },
      { status: 500 }
    );
  }
}
