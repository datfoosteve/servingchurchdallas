import React from "react";
import Link from "next/link";
import CrossIcon  from '@/images/icons/CrossIcon';

export function WelcomeSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-32 lg:py-40">
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
        Welcome to Our Church
      </h1>
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-12 h-1 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full" />
        <CrossIcon className="w-6 h-6 text-[#6D28D9]" />
        <div className="w-12 h-1 bg-gradient-to-l from-[#6D28D9] to-[#EC4899] rounded-full" />
      </div>
      <p className="text-lg md:text-xl text-gray-600 mx-auto leading-relaxed max-w-3xl">
        Discover the joy and community of our vibrant church. Join us as we worship, grow, and serve together.
      </p>
      <Link href="/about">
        <div className="mt-8 inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-colors hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
          Explore Our Church
        </div>
      </Link>
    </div>
  </section>
);
}
