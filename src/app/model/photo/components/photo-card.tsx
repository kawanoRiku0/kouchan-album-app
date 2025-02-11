import { Box } from '@mui/material';
import Image from 'next/image';

type Props = {
  photo: {
    id: number;
    url: string;
  };
};

export const PhotoCard = ({ photo }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '1/1',
        width: '100%',
      }}
    >
      <Image src={photo.url} alt={'投稿画像'} objectFit="cover" fill />
    </Box>
  );
};
