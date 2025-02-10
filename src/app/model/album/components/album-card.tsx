import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

type Props = {
  album: {
    id: number;
    name: string;
    description: string;
  };
  children: React.ReactNode;
};

export const AlbumCard = ({ album, children }: Props) => {
  return (
    <Link
      href={`/albums/${album.id}/photos`}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Stack
        spacing={2}
        key={album.id}
        p={3}
        bgcolor="background.paper"
        borderRadius={2}
      >
        <Stack>
          <Typography variant="h6">{album.name}</Typography>
          <Typography variant="body1">{album.description}</Typography>
        </Stack>
        {children}
      </Stack>
    </Link>
  );
};
