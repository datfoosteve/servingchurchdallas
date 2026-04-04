// src/pages/sermons.tsx
import React from 'react';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
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
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Sermons</p>
          <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl">Listen and Grow</h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-brand-stone">
            Listen to recent messages from Pastor Sam Thomas and stay connected to the teaching life of The Serving Church.
          </p>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 space-y-8 md:px-6 lg:px-8">
          <Card className="rounded-[28px] border border-brand-border bg-white/88 shadow-lg">
            <CardHeader>
              <CardTitle className="mb-2 text-center text-2xl font-semibold text-[#1f1f1f]">Spotify Channel</CardTitle>
              <CardDescription className="text-center text-[#625c53]">Listen on Spotify.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <iframe
                  src="https://open.spotify.com/embed/show/0aVutKJz6U5UX0rVpAolTK?utm_source=generator"
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Sermons"
                  className="w-full max-w-4xl rounded-xl shadow-md"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] shadow-lg">
            <CardHeader>
              <CardTitle className="mb-2 text-center text-2xl font-semibold text-brand-ivory">ACast Channel</CardTitle>
              <CardDescription className="text-center text-brand-stone">Browse sermons through ACast.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <iframe
                  src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins&feed=true"
                  title="Acast Sermons"
                  className="mb-4 h-screen w-full max-w-4xl border-none shadow-md"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default SermonsPage;
