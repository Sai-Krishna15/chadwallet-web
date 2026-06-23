import { NextResponse } from "next/server";

const BIRDEYE_API_URL = "https://public-api.birdeye.so";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const limit = searchParams.get("limit") || "10";

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(`${BIRDEYE_API_URL}/defi/v3/token/holder?address=${address}&limit=${limit}`, {
      headers: {
        "X-API-KEY": process.env.BIRDEYE_API_KEY || process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || "",
        "x-chain": "solana",
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Holders API error:", error);
    return NextResponse.json({ error: "Failed to fetch holders" }, { status: 500 });
  }
}
