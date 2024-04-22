// src/pages/more.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card'; // Assuming these are correctly exported

const MorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4">Explore More About Us</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/more/gallery">
                <a className="w-full h-full inline-flex justify-center items-center">Gallery</a>
              </Link>
            </Button>
            <Button asChild>
              <Link href="/more/who-we-are">
                <a className="w-full h-full inline-flex justify-center items-center">Who We Are</a>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MorePage;
