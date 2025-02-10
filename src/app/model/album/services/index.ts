import { client } from '@/lib/client';

export const getAlbums = async (
  {
    ids,
    limit,
    offset,
  }: {
    ids?: number[];
    limit?: number;
    offset?: number;
  } = { ids: [] },
) => {
  const getResult = await client.album.getAll.$get({
    ids,
    limit,
    offset,
  });
  const albums = await getResult.json();
  return albums;
};
