'use client';
import { PhotoViewer } from '@/app/model/photo/components/photo-viewer';
import { useState } from 'react';
import { PhotoCards } from './photo-cards';

type Props = {
  photos: {
    id: number;
    url: string;
  }[];
};
export const PhotoCardsWithViewer = ({ photos }: Props) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    url: string;
  } | null>(null);

  return (
    <>
      <PhotoCards photos={photos} onSelectPhoto={setSelectedPhoto} />
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
