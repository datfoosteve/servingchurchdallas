"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation, Phone, AlertCircle, CheckCircle2, ParkingCircle } from "lucide-react";
import schoolImage from "@/images/sunnyvalehighschool.avif";

const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <MapPin className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Us at Sunnyvale High School
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              222 Collins Rd, Sunnyvale, TX 75182
            </p>
            <p className="text-lg text-blue-200 mb-8">
              We meet in the Choir Room every Sunday
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=222+Collins+Rd,Sunnyvale,TX+75182', '_blank')}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Get Directions in Google Maps
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 -mt-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-xl border-t-4 border-blue-500">
              <CardHeader className="text-center pb-2">
                <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Service Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold text-gray-900">10:30 AM</p>
                <p className="text-gray-600">Every Sunday</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-t-4 border-green-500">
              <CardHeader className="text-center pb-2">
                <MapPin className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-gray-900">Choir Room</p>
                <p className="text-gray-600">Sunnyvale High School</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-t-4 border-purple-500">
              <CardHeader className="text-center pb-2">
                <Phone className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact-us/contact-church">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Interactive Map
          </h2>
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.7424773547885!2d-96.56154492381815!3d32.88503877362204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1f5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2s222%20Collins%20Rd%2C%20Sunnyvale%2C%20TX%2075182!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="500"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunnyvale High School Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Sunnyvale High School
          </h2>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <Image
              src={schoolImage}
              alt="Sunnyvale High School - Where The Serving Church meets in the Choir Room every Sunday at 10:30 AM"
              className="w-full h-auto"
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            We meet in the Choir Room every Sunday at 10:30 AM
          </p>
        </div>
      </section>

      {/* Step-by-Step Directions */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <AlertCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Step-by-Step Directions
            </h2>
            <p className="text-lg text-gray-600">
              Follow these directions to find the Choir Room entrance
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Arrive at Sunnyvale High School",
                description: "Park in the main parking lot at 222 Collins Rd, Sunnyvale, TX 75182. Parking is free on Sundays.",
                icon: ParkingCircle,
                color: "blue"
              },
              {
                step: 2,
                title: "Locate the Choir Room Entrance",
                description: "Walk towards the building. Look for signs directing you to the Choir Room. It's accessible from the exterior of the building.",
                icon: Navigation,
                color: "green"
              },
              {
                step: 3,
                title: "Enter Through the Designated Door",
                description: "Use the entrance marked for the Choir Room. If doors are locked, call or text the number provided in your confirmation.",
                icon: MapPin,
                color: "purple"
              },
              {
                step: 4,
                title: "Welcome! You've Arrived",
                description: "Once inside the Choir Room, our greeters will welcome you and help you get settled. Service starts at 10:30 AM.",
                icon: CheckCircle2,
                color: "orange"
              }
            ].map((item) => (
              <Card key={item.step} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className={`md:w-24 bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center p-6`}>
                    <div className="text-white">
                      <item.icon className="w-12 h-12 md:hidden mb-2" />
                      <span className="text-4xl md:text-5xl font-bold">{item.step}</span>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <item.icon className="w-6 h-6 hidden md:block text-gray-600" />
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Card className="shadow-xl border-t-4 border-blue-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ParkingCircle className="w-10 h-10 text-blue-600" />
                <CardTitle className="text-2xl">Parking Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Free parking available in the main school parking lot</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Accessible parking spaces available near the entrance</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Please park in designated visitor areas only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* First Time Visitors */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 border-t-4 border-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
                First Time Visiting?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-lg text-gray-700">
                We&apos;d love to meet you! Here&apos;s what to expect:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Friendly greeters will welcome you at the entrance</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Casual dress - come as you are!</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Service lasts about 1.5 hours</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Coffee and refreshments after service</p>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/contact-us/contact-church">
                    Let Us Know You&apos;re Coming
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact for Help */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl text-center">
          <Phone className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Can&apos;t Find Us?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            No worries! Give us a call or send a message and we&apos;ll help guide you in.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact-us/contact-church">
              <Phone className="w-5 h-5 mr-2" />
              Contact Us for Help
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
