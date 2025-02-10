import ArrowBack from '@mui/icons-material/ArrowBack';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
type Props = {
  title: string;
  backUrl?: string;
};

export const Header = ({ title, backUrl }: Props) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          {backUrl && (
            <Link href={backUrl} style={{ marginRight: 16 }}>
              <Button
                variant="text"
                sx={{ color: 'white' }}
                startIcon={<ArrowBack />}
              >
                戻る
              </Button>
            </Link>
          )}
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
