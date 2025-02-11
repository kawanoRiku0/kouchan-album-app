'use client';

import { PhotoViewer } from '@/app/model/photo/components/photo-viewer';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { upload } from '@vercel/blob/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { createAlbum } from '../_action';
const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  urls: z.array(z.string().url()),
});

export const AlbumCreateForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickAddImage = () => {
    fileInputRef.current?.click();
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (newFiles.length + files.length > 10) {
      toast.error('画像は10枚までしか選択できません');
      return;
    }
    setFiles(newFiles);
  };

  const [errors, formAction, isPending] = useActionState(
    async (errors: unknown, formData: FormData) => {
      if (isPending) return;
      if (files.length === 0) {
        toast.error('写真は1枚以上選択してください');
        return;
      }
      if (files.length > 10) {
        toast.error('写真は10枚までしか選択できません');
        return;
      }

      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const urls: string[] = [];

      for (const file of files) {
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload-image',
        });
        urls.push(newBlob.url);
      }

      const result = formSchema.safeParse({
        name,
        description,
        urls,
      });

      if (!result.success) {
        return result?.error?.format();
      }

      const createResult = await createAlbum(name, description, urls);
      if (createResult?.error) {
        toast.error(createResult.error);
        return;
      }

      toast.success('アルバムを作成しました');
      router.push('/albums');
    },
    null,
  );

  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    url: string;
  } | null>(null);

  return (
    <>
      <form action={formAction}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleClickAddImage}
              sx={{
                bgcolor: '#e6e6e6',
                aspectRatio: '1/1',
                width: 100,
              }}
            >
              <Stack alignItems="center" justifyContent="center">
                <CameraAltIcon />
                <Typography variant="caption">1~10枚まで</Typography>
              </Stack>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChangeFiles}
                accept="image/*"
                hidden
              />
            </Button>
          </Stack>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(60px, 1fr))"
            gap={1}
          >
            {files.map((file) => {
              const url = URL.createObjectURL(file);
              return (
                <Box
                  component="button"
                  key={url}
                  onClick={() =>
                    setSelectedPhoto({
                      id: 0,
                      url,
                    })
                  }
                  sx={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    width: '100%',
                    border: 'none',
                  }}
                >
                  <Image src={url} alt="画像" fill objectFit="cover" />
                </Box>
              );
            })}
          </Box>
          <TextField
            label="タイトル"
            name="name"
            error={!!errors?.name}
            helperText={errors?.name?._errors?.[0]}
            slotProps={{
              htmlInput: { maxLength: 30 },
              inputLabel: { shrink: true },
            }}
            required
            sx={{
              bgcolor: 'white',
            }}
          />
          <TextField
            label="説明（任意,100文字以内）"
            name="description"
            multiline
            rows={4}
            error={!!errors?.description}
            helperText={errors?.description?._errors?.[0]}
            slotProps={{
              htmlInput: { maxLength: 100 },
              inputLabel: { shrink: true },
            }}
            sx={{
              bgcolor: 'white',
            }}
          />
          <Button type="submit" variant="contained" disabled={isPending}>
            アルバムの作成
          </Button>
        </Stack>
      </form>
      {isPending && (
        <Backdrop
          open={true}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {selectedPhoto && (
        <PhotoViewer
          photo={selectedPhoto}
          open={true}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};
