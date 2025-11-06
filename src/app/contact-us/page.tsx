import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Contact Us',
  description: 'Get in touch with The Serving Church. Visit us at 222 Collins Rd, Sunnyvale, TX 75182, call (214) 738-6371, or email theservingchurchdallas@gmail.com. Submit a contact form or prayer request.',
  keywords: [
    'contact church',
    'church location',
    'Sunnyvale church address',
    'church phone number',
    'contact The Serving Church',
    'prayer request',
    'church email',
  ],
  path: '/contact-us',
});

const ContactUsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have questions, need prayer,
            or want to visit us, we&apos;re here for you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Address */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">222 Collins Rd</p>
                <p className="text-gray-600">Sunnyvale, TX 75182</p>
                <a
                  href="https://maps.google.com/?q=222+Collins+Rd+Sunnyvale+TX+75182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+12147386371"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium"
                >
                  (214) 738-6371
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM - 5PM</p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:theservingchurchdallas@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors break-words text-sm"
                >
                  theservingchurchdallas@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Service Times */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Service Times</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 font-semibold">Sunday Worship</p>
                <p className="text-gray-600">10:30 AM - 12:00 PM</p>
                <p className="text-gray-900 font-semibold mt-2">Bible Study</p>
                <p className="text-gray-600">Thursday, 5:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Find Us on the Map
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.7424773547885!2d-96.56154492381815!3d32.88503877362204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1f5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2s222%20Collins%20Rd%2C%20Sunnyvale%2C%20TX%2075182!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="450"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Serving Church Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-gray-600">
              Choose an option below to get started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Have a question or want to learn more about our church?
                  We&apos;d love to hear from you.
                </p>
                <Button asChild className="w-full">
                  <Link href="/contact-us/contact-church">
                    Contact Church
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Submit a Prayer Request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Need prayer? Our church family is here to lift you up in prayer.
                </p>
                <Button asChild className="w-full">
                  <Link href="/contact-us/prayer-request">
                    Prayer Request
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;