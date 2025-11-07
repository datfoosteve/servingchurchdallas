// src/pages/more/gallery.tsx
// src/pages/more/gallery.tsx

"use client";

import React from 'react';
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Pagination, PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { SUPABASE_IMAGES } from '@/lib/supabase-image';
import Image from 'next/image';

export default function GalleryPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <Carousel className="w-full max-w-md lg:max-w-none">
            <CarouselContent>
              {/* Carousel Items */}
              <CarouselItem>
                <Image
                  alt="The Serving Church community photos - Sunnyvale TX church events and worship"
                  className="aspect-video object-cover rounded-xl"
                  src={SUPABASE_IMAGES.miracle}
                  style={{ height: '675px', width: '1200px' }}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  alt="The Serving Church community photos - Sunnyvale TX church events and worship"
                  className="aspect-video object-cover rounded-xl"
                  src={SUPABASE_IMAGES.miracle}
                  style={{ height: '675px', width: '1200px' }}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  alt="The Serving Church community photos - Sunnyvale TX church events and worship"
                  className="aspect-video object-cover rounded-xl"
                  src={SUPABASE_IMAGES.miracle}
                  style={{ height: '675px', width: '1200px' }}
                />
              </CarouselItem>
              </CarouselContent>
              {/* Navigation for Carousel */}
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl">The Serving Church</h1>
              <p className="text-gray-500 md:text-xl lg:text-base xl:text-xl">
                Experience the timeless beauty and spiritual serenity of The Serving Church through our captivating photo gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Explore the Gallery</h2>
          <p className="max-w-md mx-auto text-gray-500 md:text-xl">
            Immerse yourself in the artistic and architectural splendor of The Serving Church through our curated collection of photographs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6">
            {/* Image placeholders */}
            <Image className="object-cover w-full h-60 rounded-lg" src={SUPABASE_IMAGES.miracle} alt="The Serving Church community gallery - Sunnyvale TX worship and fellowship moments" />
            <Image className="object-cover w-full h-60 rounded-lg" src={SUPABASE_IMAGES.miracle} alt="The Serving Church community gallery - Sunnyvale TX worship and fellowship moments" />
            <Image className="object-cover w-full h-60 rounded-lg" src={SUPABASE_IMAGES.miracle} alt="The Serving Church community gallery - Sunnyvale TX worship and fellowship moments" />
          </div>
          {/* Pagination */}
          <Pagination>
            <PaginationPrevious />
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationEllipsis />
            <PaginationNext />
          </Pagination>
        </div>
      </section>
    </>
  );
}
