// app/about-us/page.tsx
"use client";

import React, { useState } from "react";
const Link = React.lazy(() =>
  import("next-view-transitions").then((m) => ({ default: m.Link }))
);
import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";

import ChurchIcon from "../../images/icons/ChurchIcon";
import HeartIcon from "../../images/icons/HeartIcon";

const AboutUsPage: React.FC = () => {
  return (
    <>
      {/* Page Header */}
      <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 mb-6">
              <ChurchIcon className="mr-2 h-4 w-4" />
              <span>About Us</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About The Serving Church
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about our mission and the heart behind The Serving Church
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-3 rounded-xl shadow-lg">
                <ChurchIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center">
              Our church is committed to bringing the kingdom of God here in the
              city of Sunnyvale, Texas. We have a strong calling to the high
              school and to the district, so if you are interested in serving God
              by impacting the next generation at the schools, we would love to
              work alongside you.
            </p>
          </div>
        </div>
      </div>

      {/* Pastor Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-rose-400 to-pink-600 p-3 rounded-xl shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Pastor
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="order-2 md:order-1 space-y-5">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Sam Thomas</strong> is the lead pastor at The Serving
                Church. He felt called to plant this church six years ago and
                wants to see the move of God more evident than ever in this
                generation. He has a Master&apos;s in Divinity from Perkins School of
                Theology at SMU.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Sam has been married to his wife, <strong className="text-gray-900">Hepzhi</strong>, for
                seven years. They have two lovely children, <strong className="text-gray-900">Zion</strong>{" "}
                and <strong className="text-gray-900">Mikah</strong>.
              </p>
            </div>

            {/* Image with skeleton + fallback */}
            <div className="order-1 md:order-2">
              <PastorImage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// inline component just for this page
const PastorImage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/2] sm:aspect-[4/3] md:aspect-square">
      {/* skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-200" />
      )}

      <Image
        // Using Supabase CDN for pastor family photo
        src={error ? SUPABASE_IMAGES.church : SUPABASE_IMAGES.pastorfamily}
        alt="Pastor Sam Thomas and family"
        fill
        className={`rounded-lg object-cover shadow transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center top" }}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setError(true)}
        sizes="(min-width: 1024px) 400px, 100vw"
      />
    </div>
  );
};

export default AboutUsPage;
