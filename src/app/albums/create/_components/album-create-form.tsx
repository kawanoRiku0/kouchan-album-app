'use client';

import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
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

  return (
    <>
      <form action={formAction}>
        <Stack spacing={2}>
          <TextField
            label="タイトル"
            name="name"
            error={!!errors?.name}
            helperText={errors?.name?._errors?.[0]}
            slotProps={{ htmlInput: { maxLength: 30 } }}
            sx={{
              bgcolor: 'white',
            }}
          />
          <TextField
            label="説明"
            name="description"
            multiline
            rows={4}
            error={!!errors?.description}
            helperText={errors?.description?._errors?.[0]}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            sx={{
              bgcolor: 'white',
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickAddImage}
          >
            画像選択（10枚まで）
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleChangeFiles}
              hidden
            />
          </Button>
          <Stack spacing={2} direction="row" flexWrap="wrap">
            {files.map((file) => {
              const url = URL.createObjectURL(file);
              return (
                <Box
                  key={url}
                  sx={{
                    position: 'relative',
                    width: '200px',
                    aspectRatio: '1/1',
                    bgcolor: 'gray',
                  }}
                >
                  <Image src={url} alt="画像" fill objectFit="contain" />
                </Box>
              );
            })}
          </Stack>
          <Button type="submit" variant="contained" disabled={isPending}>
            作成
          </Button>
        </Stack>
      </form>
      {isPending && <CircularProgress />}
    </>
  );
};
