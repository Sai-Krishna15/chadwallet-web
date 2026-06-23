export interface JupiterQuoteResponse {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee: Record<string, unknown>;
  priceImpactPct: string;
  routePlan: Record<string, unknown>[];
  contextSlot: number;
  timeTaken: number;
}

export const jupiterClient = {
  // SOL Mint address
  SOL_MINT: "So11111111111111111111111111111111111111112",
  // USDC Mint address
  USDC_MINT: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",

  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: number, // In normal decimals (e.g. 1 SOL)
    inputDecimals: number = 9
  ): Promise<JupiterQuoteResponse | null> {
    try {
      if (!amount || amount <= 0) return null;

      // Convert to integer (e.g., lamports)
      const amountInSmallestUnits = Math.floor(amount * Math.pow(10, inputDecimals));

      const response = await fetch(
        `/api/jupiter/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnits}&slippageBps=50`
      );

      if (!response.ok) throw new Error("Failed to fetch quote");

      return await response.json();
    } catch (error) {
      console.log("Jupiter Quote Error:", error);
      return null;
    }
  }
};
