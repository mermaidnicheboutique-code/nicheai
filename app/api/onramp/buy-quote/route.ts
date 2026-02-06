import { NextRequest, NextResponse } from "next/server";
import { generateCDPJWT, getCDPCredentials, ONRAMP_API_BASE_URL } from "@/lib/cdp-auth";
import { convertSnakeToCamelCase } from "@/lib/to-camel-case";

export async function POST(request: NextRequest) {
  try {
    try {
      getCDPCredentials();
    } catch {
      return NextResponse.json({ error: "CDP API credentials not configured" }, { status: 500 });
    }

    const body = await request.json();

    if (
      !body.purchaseCurrency ||
      !body.paymentAmount ||
      !body.paymentCurrency ||
      !body.paymentMethod ||
      !body.country
    ) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    if (body.country === "US" && !body.subdivision) {
      return NextResponse.json({ error: "State/subdivision is required for US" }, { status: 400 });
    }

    const jwt = await generateCDPJWT({
      requestMethod: "POST",
      requestHost: new URL(ONRAMP_API_BASE_URL).hostname,
      requestPath: "/v1/buy/quote",
    });

    const requestBody = {
      purchaseCurrency: body.purchaseCurrency,
      purchaseNetwork: body.purchaseNetwork,
      paymentAmount: body.paymentAmount,
      paymentCurrency: body.paymentCurrency,
      paymentMethod: body.paymentMethod,
      country: body.country,
      subdivision: body.subdivision,
      destinationAddress: body.destinationAddress,
    };

    const response = await fetch(`${ONRAMP_API_BASE_URL}/v1/buy/quote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CDP Onramp API error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to create buy quote" }, { status: response.status });
    }

    const data = await response.json();
    const camelData = convertSnakeToCamelCase(data);
    return NextResponse.json(camelData);
  } catch (error) {
    console.error("Error creating buy quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
