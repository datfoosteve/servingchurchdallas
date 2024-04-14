"use client";

import React from "react";
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

export function MiracleSection() {
  return (
    <section className="bg-gray-50 p-8 pt-10">
      <h2 className="text-4xl font-bold text-center mb-4">
        Sermon Series - Pastor Sam Thomas
      </h2>
      <Separator className="bg-red-600" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="relative">
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
            <CardTitle className="text-3xl font-bold mb-2">WHAT IS YOUR AIM IN LIFE?</CardTitle>
            <CardDescription className="text-lg text-gray-600 mb-4">
              We will be discussing the bigger questions of life and considering what God needs
              of us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="border-gray-200 mb-4" />
            {/* Add social media links or other content */}
          </CardContent>
          <CardFooter className="flex justify-end">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700">
              Join Us
            </button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}