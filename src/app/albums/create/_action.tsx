'use server';

import { client } from '@/lib/client';

export const createAlbum = async (
  name: string,
  description: string,
  urls: string[],
) => {
  const result = await client.album.create.$post({
    name,
    description,
    urls,
  });

  return result.json();
};
