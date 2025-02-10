import { PhotoCard } from '@/app/model/photo/components/photo-card';
import { Button, Stack } from '@mui/material';

type Props = {
  photos: {
    id: number;
    url: string;
  }[];
  onSelectPhoto?: (photo: { id: number; url: string }) => void;
};

export const PhotoCards = ({ photos, onSelectPhoto = () => {} }: Props) => {
  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        {photos.map((photo) => (
          <Button
            key={photo.id}
            onClick={() => onSelectPhoto(photo)}
            sx={{ minWidth: 200 }}
          >
            <PhotoCard photo={photo} />
          </Button>
        ))}
      </Stack>
    </>
  );
};
