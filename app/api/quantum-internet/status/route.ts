import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint to get real-time quantum internet status
 * Proxies requests to the quantum-internet service
 *
 * Service: https://github.com/mermaidnicheboutique-code/luxbin-quantum-internet
 * Default service URL: http://localhost:8765
 */
export async function GET(request: NextRequest) {
  try {
    const serviceUrl = process.env.QUANTUM_INTERNET_URL || 'http://localhost:8765';

    try {
      // Try to fetch from actual quantum internet service
      const response = await fetch(`${serviceUrl}/api/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Don't cache - we want real-time data
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Retrieved REAL quantum internet data from service');

        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
      } else {
        console.log('⚠️  Quantum service returned error, using mock data');
        return NextResponse.json(getMockData(), {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
      }
    } catch (serviceError) {
      console.log('⚠️  Quantum service not available, using mock data:', serviceError);
      return NextResponse.json(getMockData(), {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }
  } catch (error) {
    console.error('Error fetching quantum internet status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quantum internet status' },
      { status: 500 }
    );
  }
}

function getMockData() {
  return {
    computers: [
      {
        name: 'ibm_fez',
        qubits: 156,
        status: 'active',
        location: 'Yorktown Heights, NY',
        queue: 0,
        entangledWith: ['ibm_torino', 'ibm_marrakesh'],
        lastOperation: new Date().toISOString(),
      },
      {
        name: 'ibm_torino',
        qubits: 133,
        status: 'active',
        location: 'Yorktown Heights, NY',
        queue: 0,
        entangledWith: ['ibm_fez', 'ibm_marrakesh'],
        lastOperation: new Date().toISOString(),
      },
      {
        name: 'ibm_marrakesh',
        qubits: 156,
        status: 'active',
        location: 'Yorktown Heights, NY',
        queue: 0,
        entangledWith: ['ibm_fez', 'ibm_torino'],
        lastOperation: new Date().toISOString(),
      },
    ],
    totalQubits: 445,
    activeOperations: 0,
    networkStatus: 'online',
    entanglementPairs: 3,
    protocols: {
      bellState: 'available',
      teleportation: 'available',
      superdenseCoding: 'available',
    },
    timestamp: new Date().toISOString(),
    _mock: true,
  };
}
