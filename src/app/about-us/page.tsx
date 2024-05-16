// // app/about-us/page.tsx

// import { Button } from "@/components/ui/button";


// const AboutUsPage: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//         About Us
//       </h1>
//       <p className="text-lg leading-relaxed mb-4">
//         Here you can add details about the churchs mission, the values it upholds, and the various community activities it engages in.
//       </p>
//       <Button variant="default">Join Us</Button>
//     </div>
//   );
// };

// export default AboutUsPage;
"use client";
// app/about-us/page.tsx
import React from "react";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import Image from "next/image";
import yourImagePath from "/src/images/church.png"; // Adjust the image path as needed
import ChurchIcon from '../../images/icons/ChurchIcon';
import ArrowRightIcon from '../../images/icons/ArrowRightIcon';
import CheckIcon from '../../images/icons/CheckIcon';
import GiftIcon from '../../images/icons/GiftIcon';
import UserIcon from '../../images/icons/UserIcon';
import HelpingHandIcon from '../../images/icons/HelpingHandIcon';

const AboutUsPage: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-50">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900">
                <ChurchIcon className="mr-2 h-4 w-4" />
                About Us
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl">
                Embracing Faith, Serving the Community
              </h1>
              <p className="text-gray-600 md:text-xl">
                At our church, we are dedicated to fostering a welcoming and inclusive community that celebrates the transformative power of faith.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/learn-more" passHref>
                  <div className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500">
                    Learn More
                  </div>
                </Link>
                <Link href="/join-us" passHref>
                  <div className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                    Join Us
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={yourImagePath}
                alt="Church Illustration"
                className="max-w-full rounded-lg object-contain"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600 md:text-xl">
                Our church is committed to spreading the message of God&apos;s love and grace, and to fostering a community that embraces diversity, promotes spiritual growth, and serves those in need.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl">
                Our Values
              </h2>
              <ul className="mt-4 space-y-2 text-gray-600 md:text-xl">
                <li>
                  <CheckIcon className="mr-2 inline-block h-5 w-5 text-gray-900" />
                  Compassion and Kindness
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-5 w-5 text-gray-900" />
                  Inclusivity and Diversity
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-5 w-5 text-gray-900" />
                  Spiritual Growth and Renewal
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-5 w-5 text-gray-900" />
                  Community Outreach and Service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl">
            Our Community Engagement
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <HelpingHandIcon className="mb-4 h-8 w-8 text-gray-900" />
              <h3 className="text-xl font-bold text-gray-900">Volunteer Opportunities</h3>
              <p className="mt-2 text-gray-600">
                Join our team of dedicated volunteers and make a difference in our community through various outreach programs.
              </p>
              <Link href="/volunteer" passHref>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
                  Learn More
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <GiftIcon className="mb-4 h-8 w-8 text-gray-900" />
              <h3 className="text-xl font-bold text-gray-900">Charitable Initiatives</h3>
              <p className="mt-2 text-gray-600">
                Discover our various charitable initiatives and how you can contribute to making a positive impact in our community.
              </p>
              <Link href="/charity" passHref>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
                  Learn More
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <UserIcon className="mb-4 h-8 w-8 text-gray-900" />
              <h3 className="text-xl font-bold text-gray-900">Community Events</h3>
              <p className="mt-2 text-gray-600">
                Join us for our upcoming community events and connect with like-minded individuals who share our values.
              </p>
              <Link href="/events" passHref>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
                  Learn More
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
