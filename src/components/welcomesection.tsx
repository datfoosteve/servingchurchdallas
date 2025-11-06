//component/welcomesection.tsx
import React from "react";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import CrossIcon  from '@/images/icons/CrossIcon';
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-16 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Welcome to Our Church
      </h2>
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-12 h-1 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full" />
        <CrossIcon className="w-6 h-6 text-[#6D28D9]" />
        <div className="w-12 h-1 bg-gradient-to-l from-[#6D28D9] to-[#EC4899] rounded-full" />
      </div>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto leading-relaxed max-w-3xl mb-10">
        Discover the joy and community of our vibrant church. Join us as we worship, grow, and serve together.
      </p>

      {/* Enhanced CTA Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/contact-us/contact-church">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2 text-base md:text-lg font-semibold">
              <span>Connect With Us</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </Link>

        <Link href="/events">
          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-2 text-base md:text-lg font-semibold">
              <span>View Events</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </Link>
      </div>

      {/* Service Times Quick Info */}
      <div className="mt-12 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
        <p className="text-sm text-gray-500 mb-3">Join us for worship</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-gray-700">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">⛪</span>
            <div className="text-left">
              <p className="font-semibold">Sunday Service</p>
              <p className="text-sm text-gray-600">10:30 AM - 12:00 PM</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">📖</span>
            <div className="text-left">
              <p className="font-semibold">Bible Study</p>
              <p className="text-sm text-gray-600">Thursday, 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
