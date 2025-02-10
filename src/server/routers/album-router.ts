import { albums, photos } from '@/server/db/schema';
import { desc, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { j, publicProcedure } from '../jstack';

export const albumRouter = j.router({
  getAll: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()).optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .query(async ({ c, ctx, input }) => {
      const { db } = ctx;

      const allAlbums = await db
        .select()
        .from(albums)
        .where(
          (input.ids?.length ?? 0) > 0
            ? inArray(albums.id, input.ids ?? [])
            : undefined,
        )
        .orderBy(desc(albums.createdAt))
        .limit(input.limit ?? 10)
        .offset(input.offset ?? 0);

      return c.superjson(allAlbums ?? null);
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        urls: z.array(z.string().url()),
      }),
    )
    .mutation(async ({ c, ctx, input }) => {
      const { db } = ctx;

      try {
        await db.transaction(async (tx) => {
          const albumResult = await tx
            .insert(albums)
            .values({
              name: input.name,
              description: input.description,
            })
            .returning();

          const albumId = albumResult?.[0]?.id;
          if (!albumId) {
            throw new Error('アルバムの作成に失敗しました');
          }

          await tx.insert(photos).values(
            input.urls.map((url) => ({
              url,
              albumId,
            })),
          );
        });
      } catch (e) {
        console.error(e);
        return c.superjson({ error: 'アルバムの作成に失敗しました' });
      }

      return c.superjson(null);
    }),
});
