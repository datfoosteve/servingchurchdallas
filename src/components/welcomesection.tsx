//component/welcomesection.tsx
import React from "react";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import CrossIcon  from '@/images/icons/CrossIcon';
import { Button } from "@/components/ui/button"
import ChurchIcon from "@/images/icons/ChurchIcon";

export function WelcomeSection() {
  return (
    <section className="bg-white py-20 w-screen md:py-32 lg:py-40">
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
      <div className="pt-4">
      <Link href="/contact-us/contact-church">
      <Button
      className="relative overflow-hidden rounded-full px-6 py-3 font-semibold shadow-lg transition-all hover:shadow-none active:scale-95"
      variant="ghost"
    >
      <div className="absolute -inset-px rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-lg transition duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-tilt" />
      <div className="relative flex items-center justify-center gap-2">
        <ChurchIcon className="h-5 w-5 fill-white" />
        <span>Join Us</span>
      </div>
    </Button>
      </Link>
      </div>
    </div>
  </section>
);
}
