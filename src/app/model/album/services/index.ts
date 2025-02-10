import { client } from '@/lib/client';

export const getAlbums = async () => {
  const getResult = await client.album.getAll.$get();
  const albums = await getResult.json();
  return albums;
};
