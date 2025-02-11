import { NextResponse } from 'next/server';
import { ImageData } from '@/app/types';
import { fetchImages } from '@/service/gallery';

export async function GET(req: Request) {
  const page = req.url ? new URL(req.url).searchParams.get('page') : '1';
  const limit = req.url ? new URL(req.url).searchParams.get('limit') : '30';
  const images: ImageData[] = await fetchImages(
    {
      page: Number(page),
      limit: Number(limit)
    });
  return NextResponse.json(images);
}