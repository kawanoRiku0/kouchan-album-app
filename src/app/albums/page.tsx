import { Header } from '@/common/components/header';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { Alert, Button, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAlbums } from '../model/album';
import { AlbumCard } from '../model/album/components';
import { PhotoCard, getPhotos } from '../model/photo';

export const metadata: Metadata = {
  title: 'アルバム一覧',
};

export default async function Page() {
  const albums = await getAlbums();
  const photos = await getPhotos(albums.map((album) => album.id));

  const albumIdToPhotos = photos.reduce(
    (acc, photo) => {
      if (!acc[photo.albumId]) {
        acc[photo.albumId] = [];
      }
      acc[photo.albumId] = [...(acc[photo.albumId] ?? []), photo];
      return acc;
    },
    {} as Record<number, typeof photos>,
  );

  return (
    <>
      <Header title="アルバム一覧" />
      <Stack spacing={4} p={4}>
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          アルバムをタップすると、写真一覧を見れます
        </Alert>
        <Stack direction="row" justifyContent="flex-end">
          <Link href="/albums/create" style={{ width: 'fit-content' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 'fit-content' }}
            >
              アルバムの作成
            </Button>
          </Link>
        </Stack>
        {albums.map((album) => {
          const photos = albumIdToPhotos[album.id];
          return (
            <AlbumCard key={album.id} album={album}>
              <Stack direction="row">
                {photos?.slice(0, 3).map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} />
                ))}
              </Stack>
              {(photos?.length ?? 0) > 3 && (
                <Stack direction="row" alignItems="center">
                  <AddIcon />
                  <Typography component="span" color="text.secondary">
                    {(photos?.length ?? 3) - 3}件の写真
                  </Typography>
                </Stack>
              )}
            </AlbumCard>
          );
        })}
      </Stack>
    </>
  );
}
