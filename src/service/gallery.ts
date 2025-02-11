import { ImageData } from '@/app/types';
export async function fetchImages({ page = 1, limit = 15 }: { page?: number, limit?: number }) {
  let images: ImageData[] = [];
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );
    images = await response.json();
    // mock喜欢、评论数
    images.forEach((image: ImageData) => {
      image.comments = Math.floor(Math.random() * 100);
      image.likes = Math.floor(Math.random() * 1000);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
  return images;
}