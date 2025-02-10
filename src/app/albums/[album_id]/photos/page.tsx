import { getAlbums } from '@/app/model/album';
import { getPhotos } from '@/app/model/photo';
import { Header } from '@/common/components/header';
import InfoIcon from '@mui/icons-material/Info';
import { Alert, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { PhotoCardsWithViewer } from './_components';

type Props = {
  params: Promise<{
    album_id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { album_id } = await params;

  const albums = await getAlbums({ ids: [Number.parseInt(album_id)] });

  const album = albums?.[0];
  if (!album) {
    return (
      <Stack>
        <Alert severity="error">アルバムが見つかりません</Alert>
        <Link href="/albums">
          <Button>アルバム一覧に戻る</Button>
        </Link>
      </Stack>
    );
  }

  const photos = await getPhotos([Number.parseInt(album_id)]);

  return (
    <>
      <Header title={`${album.name}の写真一覧`} backUrl={'/albums'} />
      <Stack spacing={2}>
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          写真をタップすると拡大して見れます
        </Alert>
        <PhotoCardsWithViewer photos={photos} />
      </Stack>
    </>
  );
}
