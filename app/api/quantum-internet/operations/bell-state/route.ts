import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint to create Bell State entanglement
 * Proxies requests to the quantum-internet service
 */
export async function POST(request: NextRequest) {
  try {
    const serviceUrl = process.env.QUANTUM_INTERNET_URL || 'http://localhost:8765';
    const body = await request.json();

    try {
      // Forward request to quantum internet service
      const response = await fetch(`${serviceUrl}/api/operations/bell-state`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Bell state operation submitted to quantum service');

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

      // Return mock response
      return NextResponse.json({
        id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'bell_state',
        backend: body.backend || 'ibm_fez',
        status: 'completed',
        result: {
          counts: {
            '00': 512,
            '11': 488,
          },
          fidelity: 0.98,
          entanglementVerified: true,
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
    console.error('Error creating Bell state:', error);
    return NextResponse.json(
      { error: 'Failed to create Bell state' },
      { status: 500 }
    );
  }
}
