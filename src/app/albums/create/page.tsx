import { Header } from '@/common/components/header';
import { Box } from '@mui/material';
import { AlbumCreateForm } from './_components';

export default function Page() {
  return (
    <Box minHeight="100vh">
      <Header title="アルバムの作成" backUrl="/albums" />
      <Box p={2}>
        <AlbumCreateForm />
      </Box>
    </Box>
  );
}
