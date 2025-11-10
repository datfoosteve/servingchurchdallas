// src/app/more/gallery/page.tsx
"use client";

import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Pagination, PaginationContent, PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { SUPABASE_IMAGES } from '@/lib/supabase-image';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

// Placeholder images - replace with your actual Supabase images
const GALLERY_IMAGES = [
  { id: 1, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Worship service" },
  { id: 2, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Fellowship event" },
  { id: 3, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Church gathering" },
  { id: 4, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Prayer meeting" },
  { id: 5, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Youth service" },
  { id: 6, url: SUPABASE_IMAGES.miracle, alt: "The Serving Church community - Community outreach" },
  // Add more images here as you upload them to Supabase
];

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(GALLERY_IMAGES.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = GALLERY_IMAGES.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of gallery section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Carousel */}
      <section className="w-full py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-12 xl:grid-cols-[1fr_550px]">
            {/* Carousel - Full width on mobile, larger on desktop */}
            <div className="w-full order-2 lg:order-1">
              <Carousel className="w-full">
                <CarouselContent>
                  {GALLERY_IMAGES.slice(0, 5).map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <Image
                          alt={image.alt}
                          className="object-cover w-full h-full"
                          src={image.url}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          priority={image.id === 1}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Navigation for Carousel - Hidden on mobile, shown on tablet+ */}
                <div className="hidden md:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The Serving Church
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-base xl:text-xl">
                Experience the timeless beauty and spiritual serenity of The Serving Church through our captivating photo gallery. See our community come together in worship, fellowship, and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="w-full py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Explore the Gallery
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base lg:text-lg px-4">
              Immerse yourself in the artistic and architectural splendor of The Serving Church through our curated collection of photographs.
            </p>
          </div>

          {/* Image Grid - Mobile First: 1 column on xs, 2 on sm, 3 on md, 4 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12">
            {currentImages.map((image) => (
              <Card
                key={image.id}
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300"
              >
                <div className="relative w-full aspect-square md:aspect-video lg:aspect-square overflow-hidden">
                  <Image
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination - Mobile Optimized */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 md:mt-12">
              <Pagination>
                <PaginationContent className="gap-1 md:gap-2">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                      className={`cursor-pointer ${
                        currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                      }`}
                    />
                  </PaginationItem>

                  {/* Page Numbers - Show fewer on mobile */}
                  {currentPage > 2 && (
                    <PaginationItem className="hidden sm:block">
                      <PaginationLink onClick={() => goToPage(1)} className="cursor-pointer">
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage > 3 && (
                    <PaginationItem className="hidden md:block">
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Show current page and adjacent pages */}
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => goToPage(currentPage - 1)}
                        className="cursor-pointer"
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink isActive className="cursor-pointer">
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => goToPage(currentPage + 1)}
                        className="cursor-pointer"
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage < totalPages - 2 && (
                    <PaginationItem className="hidden md:block">
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage < totalPages - 1 && (
                    <PaginationItem className="hidden sm:block">
                      <PaginationLink
                        onClick={() => goToPage(totalPages)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                      className={`cursor-pointer ${
                        currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Page Info - Mobile Friendly */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, GALLERY_IMAGES.length)} of {GALLERY_IMAGES.length} photos
          </p>
        </div>
      </section>
    </div>
  );
}
