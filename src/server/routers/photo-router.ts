import { photos } from '@/server/db/schema';
import { desc, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { j, publicProcedure } from '../jstack';

export const photoRouter = j.router({
  getPhotos: publicProcedure
    .input(z.object({ albumIds: z.array(z.number()) }))
    .query(async ({ c, ctx, input }) => {
      const { db } = ctx;

      const { albumIds } = input;

      if (albumIds.length === 0) {
        return c.superjson([]);
      }

      const result = await db
        .select({
          id: photos.id,
          url: photos.url,
          albumId: photos.albumId,
        })
        .from(photos)
        .where(inArray(photos.albumId, albumIds))
        .orderBy(desc(photos.createdAt));

      return c.superjson(result);
    }),
});
