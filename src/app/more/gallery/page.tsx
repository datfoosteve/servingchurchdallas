// src/app/more/gallery/page.tsx
"use client";

import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Pagination, PaginationContent, PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const GALLERY_IMAGES = [
  { id: 1, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08206.jpg", alt: "The Serving Church Sunnyvale TX - Family Conference group photo at Sunnyvale High School Auditorium" },
  { id: 2, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07102.jpg", alt: "Pastor Sam Thomas preparing for Family Conference worship service in Sunnyvale TX" },
  { id: 3, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07104.jpg", alt: "The Serving Church worship team leading praise and worship at Family Conference Sunnyvale" },
  { id: 4, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07125-Enhanced-NR.jpg", alt: "Congregation worshipping at The Serving Church Family Conference in Sunnyvale TX" },
  { id: 5, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07134-Enhanced-NR.jpg", alt: "Community worship moment at The Serving Church Dallas Family Conference event" },
  { id: 6, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07140.jpg", alt: "Powerful worship experience at Sunnyvale church Family Conference 2024" },
  { id: 7, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07156.jpg", alt: "Guest speaker teaching about Christian marriage at The Serving Church Sunnyvale TX" },
  { id: 8, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07165.jpg", alt: "Marriage conference message at The Serving Church Dallas Family Conference" },
  { id: 9, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07169.jpg", alt: "Pastor Sam Thomas and wife Hepsy Thomas praying at Family Conference Sunnyvale" },
  { id: 10, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07175.jpg", alt: "Church volunteer Jessica preparing Chick-fil-A food for Family Conference attendees" },
  { id: 11, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07232.jpg", alt: "The Serving Church volunteers serving meals at Family Conference event Sunnyvale" },
  { id: 12, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07330.jpg", alt: "Fellowship and community connection at The Serving Church Dallas Family Conference" },
  { id: 13, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07400.jpg", alt: "Joyful church members at The Serving Church Sunnyvale TX Family Conference" },
  { id: 14, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07417.jpg", alt: "Pastor Sam Thomas connecting with congregation at Sunnyvale church event" },
  { id: 15, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07596.jpg", alt: "Altar worship and prayer at The Serving Church Family Conference Dallas TX" },
  { id: 16, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07640.jpg", alt: "Engaged congregation during Family Conference message at The Serving Church Sunnyvale" },
  { id: 17, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07692.jpg", alt: "Women and children of The Serving Church Dallas at Family Conference event" },
  { id: 18, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07756.jpg", alt: "Church members Arlie, Kaius, and Stephen at The Serving Church Sunnyvale TX" },
  { id: 19, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07816.jpg", alt: "Spiritual worship moment at The Serving Church Dallas Family Conference 2024" },
  { id: 20, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07821.jpg", alt: "Live worship music at The Serving Church Sunnyvale TX Family Conference" },
  { id: 21, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC07839.jpg", alt: "Guest speaker worshipping at The Serving Church Dallas Family Conference" },
  { id: 22, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08009.jpg", alt: "Guest speaker delivering message at The Serving Church Sunnyvale Family Conference" },
  { id: 23, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08083.jpg", alt: "Food service setup at The Serving Church Dallas Family Conference event" },
  { id: 24, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08117.jpg", alt: "The Serving Church family photo at Sunnyvale High School Auditorium event" },
  { id: 25, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08138.jpg", alt: "Church community group photo at The Serving Church Dallas Family Conference" },
  { id: 26, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08145.jpg", alt: "Congregation members at The Serving Church Sunnyvale TX Family Conference 2024" },
  { id: 27, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08167.jpg", alt: "Church photographer Marvin and wife Justina at The Serving Church Sunnyvale event" },
  { id: 28, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08183.jpg", alt: "Marvin with baby Kaius at The Serving Church Dallas Family Conference" },
  { id: 29, url: "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/DSC08219.jpg", alt: "Justina with Pastor's children at The Serving Church Sunnyvale TX Family Conference" },
];

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;

  const totalPages = Math.ceil(GALLERY_IMAGES.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = GALLERY_IMAGES.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-brand-section">
      <section className="bg-[#181818] py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-12 xl:grid-cols-[1fr_520px] items-center">
            <div className="w-full order-2 lg:order-1">
              <Carousel className="w-full">
                <CarouselContent>
                  {GALLERY_IMAGES.slice(0, 5).map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border border-brand-border shadow-lg">
                        <Image
                          alt={image.alt}
                          className="h-full w-full object-cover"
                          src={image.url}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          priority={image.id === 1}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>

            <div className="order-1 flex flex-col justify-center space-y-4 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Gallery</p>
              <h1 className="font-display text-4xl font-semibold text-brand-ivory sm:text-5xl lg:text-6xl">
                The Serving Church
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-[rgba(200,169,107,0.9)] to-transparent" />
              <p className="text-base leading-8 text-brand-stone md:text-lg xl:text-xl">
                Experience the life of our church through moments of worship, fellowship, family, and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="font-display text-3xl font-semibold text-[#1f1f1f] md:text-4xl mb-3 md:mb-4">
              Explore the Gallery
            </h2>
            <p className="mx-auto max-w-2xl px-4 text-sm text-[#625c53] md:text-base lg:text-lg leading-8">
              Browse a curated collection of moments from church gatherings, worship, and community life.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-6 md:mb-12">
            {currentImages.map((image) => (
              <Card
                key={image.id}
                className="group cursor-pointer overflow-hidden rounded-[24px] border border-brand-border bg-white/88 transition-all duration-300 hover:shadow-xl hover:border-brand-gold/30"
              >
                <div className="relative aspect-square w-full overflow-hidden md:aspect-video lg:aspect-square">
                  <Image
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center md:mt-12">
              <Pagination>
                <PaginationContent className="gap-1 md:gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                      className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>

                  {currentPage > 2 && (
                    <PaginationItem className="hidden sm:block">
                      <PaginationLink onClick={() => goToPage(1)} className="cursor-pointer">1</PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage > 3 && (
                    <PaginationItem className="hidden md:block">
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(currentPage - 1)} className="cursor-pointer">
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink isActive className="cursor-pointer">{currentPage}</PaginationLink>
                  </PaginationItem>

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(currentPage + 1)} className="cursor-pointer">
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
                      <PaginationLink onClick={() => goToPage(totalPages)} className="cursor-pointer">
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                      className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <p className="mt-4 text-center text-sm text-[#7a746c]">
            Showing {startIndex + 1}-{Math.min(endIndex, GALLERY_IMAGES.length)} of {GALLERY_IMAGES.length} photos
          </p>
        </div>
      </section>
    </main>
  );
}
