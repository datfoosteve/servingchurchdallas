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
      {/* Hero */}
      <div className="w-full bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900">
                <ChurchIcon className="mr-2 h-4 w-4" />
                <span>About Us</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl">
                Embracing Faith, Serving the Community
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                At our church, we are dedicated to fostering a welcoming and
                inclusive community that celebrates the transformative power of
                faith.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/events" passHref>
                  <div className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500">
                    View Events
                  </div>
                </Link>
                <Link href="/contact-us/contact-church" passHref>
                  <div className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                    Contact Us
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={SUPABASE_IMAGES.church}
                alt="Church Illustration"
                className="max-w-full rounded-lg object-contain"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center mb-4">
            <ChurchIcon className="mr-2 h-6 w-6 text-gray-900" />
            <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl">
              Our Mission
            </h2>
          </div>
          <p className="mt-2 text-base md:text-lg text-gray-600 max-w-3xl">
            Our church is committed to bringing the kingdom of God here in the
            city of Sunnyvale, Texas. We have a strong calling to the high
            school and to the district, so if you are interested in serving God
            by impacting the next generation at the schools, we would love to
            work alongside you.
          </p>
        </div>
      </div>

      {/* Pastor Section */}
      <div className="w-full bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <HeartIcon className="mr-2 h-6 w-6 text-gray-900" />
                <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl">
                  Meet Our Pastor
                </h2>
              </div>
              <p className="mt-4 text-gray-600 md:text-lg">
                <strong>Sam Thomas</strong> is the lead pastor at The Serving
                Church. He felt called to plant this church six years ago and
                wants to see the move of God more evident than ever in this
                generation. He has a Master’s in Divinity from Perkins School of
                Theology at SMU.
              </p>
              <p className="mt-4 text-gray-600 md:text-lg">
                Sam has been married to his wife, <strong>Hepzhi</strong>, for
                seven years. They have two lovely children, <strong>Zion</strong>{" "}
                and <strong>Mikah</strong>.
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
