// src/pages/sermons.tsx
import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Sermons',
  description: 'Listen to inspiring sermons from The Serving Church. Access our latest messages on Spotify and Acast, featuring biblical teachings and worship messages from Pastor Sam Thomas.',
  keywords: [
    'church sermons',
    'Christian sermons',
    'biblical teaching',
    'worship messages',
    'Spotify sermons',
    'podcast',
    'The Serving Church sermons',
    'Pastor Sam Thomas',
  ],
  path: '/sermons',
});

const SermonsPage = () => {
  return (
    <div className="container mx-auto px-2 py-8 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Sermons</h1>


      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4 text-center">Spotify Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/show/0aVutKJz6U5UX0rVpAolTK?utm_source=generator"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Sermons"
              className="w-full max-w-4xl shadow-md"
            ></iframe>
          </div>
        </CardContent>
      </Card>



      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4 text-center">ACast Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <iframe
              src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins&feed=true"
              title="Acast Sermons"
              className="w-full h-screen max-w-4xl shadow-md mb-8"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default SermonsPage;
