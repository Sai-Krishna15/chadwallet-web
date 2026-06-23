export interface BirdeyeToken {
  address: string;
  decimals: number;
  liquidity: number;
  logoURI: string | null;
  name: string;
  symbol: string;
  price: number;
  v24hChangePercent?: number; // from tokenlist
  price24hChangePercent?: number; // from trending
  v24hUSD?: number; // from tokenlist
  volume24hUSD?: number; // from trending
  mc?: number; // from tokenlist
  marketcap?: number; // from trending
  rank?: number; // from trending
}

export interface BirdeyeResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface BirdeyeTokenListResponse {
  updateUnixTime: number;
  updateTime: string;
  tokens: BirdeyeToken[];
  total?: number;
}
