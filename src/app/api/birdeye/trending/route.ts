import { NextResponse } from 'next/server';
import { birdeyeServer } from '@/lib/birdeye/client';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const response = await birdeyeServer.getTrending();
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch trending from Birdeye');
    }
    return NextResponse.json({ tokens: response.data.tokens });
  } catch (error) {
    console.log('API /birdeye/trending error:', error);
    return NextResponse.json({ error: 'Failed to fetch trending data' }, { status: 500 });
  }
}
