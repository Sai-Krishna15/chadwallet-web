import { BirdeyeResponse, BirdeyeTokenListResponse, BirdeyeToken } from './types';

const BIRDEYE_API_URL = 'https://public-api.birdeye.so';

// Server-side fetcher
async function fetchBirdeye<T>(endpoint: string, revalidate: number = 60): Promise<BirdeyeResponse<T>> {
  const apiKey = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || process.env.BIRDEYE_API_KEY;
  if (!apiKey) {
    throw new Error('Birdeye API key not configured');
  }

  const url = `${BIRDEYE_API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'X-API-KEY': apiKey,
      'x-chain': 'solana',
      'Accept': 'application/json'
    },
    next: { revalidate }
  });

  if (!response.ok) {
    throw new Error(`Birdeye API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Client-side API wrappers that hit our Next.js Route Handlers
export const birdeyeClient = {
  async getTrending(): Promise<BirdeyeToken[]> {
    const res = await fetch('/api/birdeye/trending');
    if (!res.ok) throw new Error('Failed to fetch trending tokens');
    const data = await res.json();
    return data.tokens || [];
  },
  async getGainers(): Promise<BirdeyeToken[]> {
    const res = await fetch('/api/birdeye/gainers');
    if (!res.ok) throw new Error('Failed to fetch gainers');
    const data = await res.json();
    return data.tokens || [];
  },
  async getLosers(): Promise<BirdeyeToken[]> {
    const res = await fetch('/api/birdeye/losers');
    if (!res.ok) throw new Error('Failed to fetch losers');
    const data = await res.json();
    return data.tokens || [];
  }
};

// Server-side actual implementations
export const birdeyeServer = {
  async getTrending() {
    return fetchBirdeye<BirdeyeTokenListResponse>('/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=20', 60);
  },
  async getGainers() {
    return fetchBirdeye<BirdeyeTokenListResponse>('/defi/tokenlist?sort_by=v24hChangePercent&sort_type=desc&offset=0&limit=20', 60);
  },
  async getLosers() {
    return fetchBirdeye<BirdeyeTokenListResponse>('/defi/tokenlist?sort_by=v24hChangePercent&sort_type=asc&offset=0&limit=20', 60);
  }
};
