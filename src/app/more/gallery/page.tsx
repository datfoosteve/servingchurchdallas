// src/pages/more/gallery.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const GalleryPage = () => {
  const images = ["/src/images/image1.jpg", "/src/images/image2.jpg", "/src/images/image3.jpg"]; // Replace with your image paths

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <Card key={index} className="relative h-48 w-full">
            <CardContent className="p-0">
              <Image src={src} layout="fill" objectFit="cover" alt={`Gallery image ${index + 1}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
