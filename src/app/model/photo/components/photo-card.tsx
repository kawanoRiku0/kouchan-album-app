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
        backgroundColor: 'gray',
        border: '1px solid white',
      }}
    >
      <Image src={photo.url} alt={'投稿画像'} fill objectFit="contain" />
    </Box>
  );
};
