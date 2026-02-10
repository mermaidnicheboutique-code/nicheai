import { NextRequest, NextResponse } from "next/server";
import { generateCDPJWT, getCDPCredentials, ONRAMP_API_BASE_URL } from "@/lib/cdp-auth";
import { convertSnakeToCamelCase } from "@/lib/to-camel-case";

export async function GET(request: NextRequest) {
  try {
    try {
      getCDPCredentials();
    } catch {
      return NextResponse.json({ error: "CDP API credentials not configured" }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country");
    const subdivision = searchParams.get("subdivision");
    const networks = searchParams.get("networks");

    const queryParams = new URLSearchParams();
    if (country) queryParams.append("country", country);
    if (subdivision) queryParams.append("subdivision", subdivision);
    if (networks) queryParams.append("networks", networks);

    const queryString = queryParams.toString();
    const apiPath = "/onramp/v1/buy/options";
    const fullPath = apiPath + (queryString ? `?${queryString}` : "");

    const jwt = await generateCDPJWT({
      requestMethod: "GET",
      requestHost: new URL(ONRAMP_API_BASE_URL).hostname,
      requestPath: apiPath,
    });

    const response = await fetch(`${ONRAMP_API_BASE_URL}${fullPath}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CDP Onramp API error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to fetch buy options" }, { status: response.status });
    }

    const data = await response.json();
    const camelData = convertSnakeToCamelCase(data);
    return NextResponse.json(camelData);
  } catch (error) {
    console.error("Error fetching buy options:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
