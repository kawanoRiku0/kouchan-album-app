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
        backgroundColor: 'gray',
        width: '200px',
        border: '1px solid white',
      }}
    >
      <Image src={photo.url} alt={'投稿画像'} fill objectFit="contain" />
    </Box>
  );
};
