import { client } from '@/lib/client';

export const getPhotos = async (albumIds: number[]) => {
  const getResult = await client.photo.getPhotos.$get({ albumIds });
  const photos = await getResult.json();
  return photos;
};
