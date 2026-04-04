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
  const cards = [
    {
      title: 'Visit Us',
      icon: MapPin,
      body: (
        <>
          <p className="text-[#5f584f]">222 Collins Rd</p>
          <p className="text-[#5f584f]">Sunnyvale, TX 75182</p>
          <a href="https://maps.google.com/?q=222+Collins+Rd+Sunnyvale+TX+75182" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-[#6e5b33] hover:underline">
            Get Directions →
          </a>
        </>
      ),
    },
    {
      title: 'Call Us',
      icon: Phone,
      body: (
        <>
          <a href="tel:+121****6371" className="text-lg font-medium text-[#1f1f1f] transition-colors hover:text-[#6e5b33]">
            (214) 738-6371
          </a>
          <p className="mt-2 text-sm text-[#7a746c]">Mon-Fri: 9AM - 5PM</p>
        </>
      ),
    },
    {
      title: 'Email Us',
      icon: Mail,
      body: (
        <a href="mailto:theservingchurchdallas@gmail.com" className="break-words text-sm text-[#5f584f] transition-colors hover:text-[#6e5b33]">
          theservingchurchdallas@gmail.com
        </a>
      ),
    },
    {
      title: 'Service Times',
      icon: Clock,
      body: (
        <>
          <p className="font-semibold text-[#1f1f1f]">Sunday Worship</p>
          <p className="text-[#5f584f]">10:30 AM - 12:00 PM</p>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Contact</p>
          <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl">
            Get In Touch
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-stone">
            We&apos;d love to hear from you. Whether you have questions, need prayer,
            or want to visit us, we&apos;re here for you.
          </p>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="text-center rounded-[24px] border border-brand-border bg-white/88 shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)]">
                      <Icon className="h-6 w-6 text-brand-gold" />
                    </div>
                    <CardTitle className="text-lg text-[#1f1f1f]">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{card.body}</CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-semibold text-[#1f1f1f]">
            Find Us on the Map
          </h2>
          <div className="overflow-hidden rounded-[28px] border border-brand-border shadow-lg">
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

      <section className="bg-[#181818] py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-brand-ivory">
              How Can We Help You?
            </h2>
            <p className="text-brand-stone">Choose an option below to get started</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="rounded-[24px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-brand-stone">
                  Have a question or want to learn more about our church? We&apos;d love to hear from you.
                </p>
                <Button asChild className="w-full bg-brand-button-gold text-[#1f1f1f] hover:brightness-105">
                  <Link href="/contact-us/contact-church">Contact Church</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory">
              <CardHeader>
                <CardTitle>Submit a Prayer Request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-brand-stone">
                  Need prayer? Our church family is here to lift you up in prayer.
                </p>
                <Button asChild className="w-full bg-brand-button text-brand-ivory hover:brightness-110">
                  <Link href="/contact-us/prayer-request">Prayer Request</Link>
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
