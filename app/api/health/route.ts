import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'NicheAI with Quantum Maternal AI',
    quantum_integration: 'active',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}

export async function POST() {
  return GET();
}