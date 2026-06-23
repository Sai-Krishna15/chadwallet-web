import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inputMint = searchParams.get("inputMint");
  const outputMint = searchParams.get("outputMint");
  const amount = searchParams.get("amount");
  const slippageBps = searchParams.get("slippageBps") || "50";

  if (!inputMint || !outputMint || !amount) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    const JUPITER_API_KEY = process.env.JUPITER_API_KEY || "jup_79abe35d44a13007e6390730663a111f4dfdce4369be0b84c94aa1954f6090f1";

    // Using swap/v2/order as per Jupiter's Enterprise API docs
    const response = await fetch(
      `https://api.jup.ag/swap/v2/order?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`,
      {
        headers: {
          "x-api-key": JUPITER_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Jupiter API Error:", errorText);
      return NextResponse.json({ error: "Failed to fetch quote from Jupiter" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Jupiter Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
