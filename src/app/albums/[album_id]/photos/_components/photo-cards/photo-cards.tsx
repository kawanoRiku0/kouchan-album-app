import { PhotoCard } from '@/app/model/photo/components/photo-card';
import { Box, Button } from '@mui/material';

type Props = {
  photos: {
    id: number;
    url: string;
  }[];
  onSelectPhoto?: (photo: { id: number; url: string }) => void;
};

export const PhotoCards = ({ photos, onSelectPhoto = () => {} }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
    >
      {photos.map((photo) => (
        <Button key={photo.id} onClick={() => onSelectPhoto(photo)}>
          <PhotoCard photo={photo} />
        </Button>
      ))}
    </Box>
  );
};
