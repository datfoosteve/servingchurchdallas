// src/pages/more.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card'; // Assuming these are correctly exported
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';

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
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4">Explore More About Us</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/more/gallery">
                <div className="w-full h-full inline-flex justify-center items-center">Gallery</div>
              </Link>
            </Button>
            <Button asChild>
              <Link href="/more/who-we-are">
                <div className="w-full h-full inline-flex justify-center items-center">Who We Are</div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MorePage;
