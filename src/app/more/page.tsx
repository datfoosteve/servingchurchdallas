// src/pages/more.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Image as ImageIcon, Users } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'More',
  description: 'Explore more about The Serving Church. Browse our photo gallery and meet our team including Pastor Sam Thomas, worship leaders, and ministry staff.',
  keywords: [
    'church gallery',
    'church team',
    'church staff',
    'worship leaders',
    'church photos',
    'about our church',
  ],
  path: '/more',
});

const MorePage = () => {
  const links = [
    {
      href: '/more/gallery',
      label: 'Gallery',
      description: 'Browse photos from church life and special gatherings.',
      icon: ImageIcon,
    },
    {
      href: '/more/who-we-are',
      label: 'Who We Are',
      description: 'Learn more about our church family and leadership.',
      icon: Users,
    },
  ];

  return (
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">More</p>
          <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl">Explore More About Us</h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-stone">
            Browse our gallery and learn more about the people and heart behind The Serving Church.
          </p>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.href} className="rounded-[28px] border border-brand-border bg-white/88 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)]">
                      <Icon className="h-6 w-6 text-brand-gold" />
                    </div>
                    <CardTitle className="mb-3 text-2xl font-semibold text-[#1f1f1f]">{item.label}</CardTitle>
                    <CardDescription className="mx-auto mb-6 max-w-sm text-base leading-7 text-[#625c53]">
                      {item.description}
                    </CardDescription>
                    <Button asChild className="bg-brand-button text-brand-ivory hover:brightness-110">
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MorePage;
