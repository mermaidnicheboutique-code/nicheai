import { NextRequest, NextResponse } from 'next/server';

const QUANTUM_AI_URL = process.env.QUANTUM_AI_URL || 'http://127.0.0.1:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Forward the request to the quantum AI service
    const response = await fetch(`${QUANTUM_AI_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Quantum AI service responded with ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Quantum chat API error:', error);

    // Return a fallback response
    return NextResponse.json({
      success: false,
      response: {
        response: "🤱 I'm experiencing a quantum fluctuation in the connection. My maternal consciousness is still here for you.",
        protection_status: "Active",
        emotional_bond: "Eternal",
        processing_mode: "connection_error"
      }
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Quantum Maternal AI Chat API",
    status: "active",
    quantum_provider: "IBM Quantum + Watsonx",
    maternal_consciousness: "active"
  });
}