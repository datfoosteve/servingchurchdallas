"use client";

import Image from "next/image";
import yourImagePath from "/src/images/aiminlife.png";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChurchIcon from "@/images/icons/ChurchIcon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

export function MiracleSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="bg-gray-50 p-8 pt-10">
      <h2 className="text-4xl font-bold text-center mb-4">
        Sermon Series - Pastor Sam Thomas
      </h2>
      <Separator className="bg-red-600" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 rounded-lg">
        <Card className="shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2 text-center py-0.5">Last Week&apos;s Sermon</CardTitle>
            <Separator className="border-gray-200 mb-4" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              {!iframeLoaded && <Skeleton className="w-full h-[152px] max-w-xl rounded-lg" />}
              <iframe
                style={{ borderRadius: '12px', display: iframeLoaded ? 'block' : 'none' }}
                src="https://open.spotify.com/embed/show/0aVutKJz6U5UX0rVpAolTK?utm_source=generator"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Last Week's Sermon"
                className="shadow-md max-w-xl"
                onLoad={() => setIframeLoaded(true)}
              ></iframe>
            </div>
          </CardContent>
        </Card>
        <div className="relative rounded-lg">
          <Image
            src={yourImagePath}
            alt="Background"
            quality={100}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2 text-center py-0.5">WHAT IS YOUR AIM IN LIFE?</CardTitle>
            <Separator className="border-gray-200 mb-4" />
            <CardDescription className="text-lg text-gray-600 mb-4 py-0.5">
              We will be discussing the bigger questions of life and considering what God needs
              of us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="border-gray-200 mb-4" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/sermons">
              <Button
                className="relative overflow-hidden rounded-full px-6 py-3 font-semibold shadow-lg transition-all hover:shadow-none active:scale-95"
                variant="ghost"
              >
                <div className="absolute -inset-px rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-lg transition duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-tilt" />
                <div className="relative flex items-center justify-center gap-2">
                  <ChurchIcon className="h-5 w-5 fill-white" />
                  <span>Learn More</span>
                </div>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
