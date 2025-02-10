import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import Image from 'next/image';

type Props = {
  photo: {
    url: string;
  };
  open: boolean;
  onClose: () => void;
};

export const PhotoViewer = ({ photo, open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            position: 'relative',
            mt: 2,
            bgcolor: 'gray',
          }}
        >
          <Image src={photo.url} alt={'投稿画像'} fill objectFit="contain" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
