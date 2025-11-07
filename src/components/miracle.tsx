"use client";

import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";
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
import React from "react";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

export function MiracleSection() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sermon Series - Pastor Sam Thomas
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-blue-600 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Last Week's Sermon Card */}
        <Card className="shadow-xl border-2 border-gray-200 mb-8 md:mb-12 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900">
              Last Week&apos;s Sermon
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex justify-center">
              <iframe
                src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins"
                frameBorder="0"
                width="100%"
                height="80px"
                title="Last Week's Sermon"
                className="max-w-2xl rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Current Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Series Image */}
          <div className="relative rounded-2xl w-full aspect-[4/3] bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg border-2 border-purple-200 overflow-hidden">
            <Image
              src={SUPABASE_IMAGES.aiminlife}
              alt="What is your aim in life - Sermon series illustration"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Series Description Card */}
          <Card className="shadow-xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Current Series
              </CardTitle>
              <CardDescription className="text-base md:text-lg text-gray-700 leading-relaxed">
                We all face moments when life feels still — when faith, hope, or direction falter. Through Christ, we learn to rise, release the past, and move into the freedom of His light.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-1 bg-gradient-to-r from-purple-400 to-blue-600 rounded-full mb-6"></div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/sermons">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ChurchIcon className="h-5 w-5 fill-white" />
                    <span className="font-semibold">Learn More</span>
                  </div>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
