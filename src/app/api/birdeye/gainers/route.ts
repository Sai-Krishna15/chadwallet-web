import { NextResponse } from 'next/server';
import { birdeyeServer } from '@/lib/birdeye/client';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const response = await birdeyeServer.getGainers();
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch gainers from Birdeye');
    }
    return NextResponse.json({ tokens: response.data.tokens });
  } catch (error) {
    console.log('API /birdeye/gainers error:', error);
    return NextResponse.json({ error: 'Failed to fetch gainers data' }, { status: 500 });
  }
}
