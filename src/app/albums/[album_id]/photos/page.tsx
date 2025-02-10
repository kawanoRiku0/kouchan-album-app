import { getPhotos } from '@/app/model/photo';
import { Header } from '@/common/components/header';
import InfoIcon from '@mui/icons-material/Info';
import { Alert, Stack } from '@mui/material';
import { PhotoCardsWithViewer } from './_components';

type Props = {
  params: Promise<{
    album_id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { album_id } = await params;

  const photos = await getPhotos([Number.parseInt(album_id)]);

  return (
    <>
      <Header title="写真一覧" backUrl={'/albums'} />
      <Stack spacing={2}>
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          写真をタップすると拡大して見れます
        </Alert>
        <PhotoCardsWithViewer photos={photos} />
      </Stack>
    </>
  );
}
