const ALCHEMY_RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL!;

export interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  uiAmount: number;
}

export const rpcClient = {
  async getSolBalance(address: string): Promise<number> {
    try {
      const response = await fetch(ALCHEMY_RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [address]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      // Return SOL (lamports / 10^9)
      return (data.result?.value || 0) / 1_000_000_000;
    } catch (error) {
      console.log("Failed to fetch SOL balance:", error);
      return 0;
    }
  },

  async getTokenBalances(address: string): Promise<TokenBalance[]> {
    try {
      const response = await fetch(ALCHEMY_RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            address,
            { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" }, // SPL Token Program
            { encoding: "jsonParsed" }
          ]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const balances: TokenBalance[] = [];
      const accounts = data.result?.value || [];

      for (const acc of accounts) {
        const parsedInfo = acc.account.data.parsed.info;
        balances.push({
          mint: parsedInfo.mint,
          amount: Number(parsedInfo.tokenAmount.amount),
          decimals: parsedInfo.tokenAmount.decimals,
          uiAmount: parsedInfo.tokenAmount.uiAmount,
        });
      }

      return balances;
    } catch (error) {
      console.log("Failed to fetch token balances:", error);
      return [];
    }
  }
};
