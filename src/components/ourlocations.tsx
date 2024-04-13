"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

const OurLocation: React.FC = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">OUR LOCATION</h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.9804983189554!2d-96.56547248481534!3d32.80821678096323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864ea0b9f3e5fded%3A0x8de8a05e8e5c8e5d!2sSunnyvale%20ISD!5e0!3m2!1sen!2sus!4v1621887204247!5m2!1sen!2sus"
              width="100%"
              height="650"
              style={{ border: 2 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-bold mb-4 text-white">The Serving Church</h3>
            <p className="text-white mb-4">
              Sunnyvale ISD<br />
              417 E. Tripp Road<br />
              Sunnyvale, TX 75182
            </p>
            <p className="text-white mb-8">
             Service is Located inside the Choir Room of the School.
            </p>
            <Button variant="outline" className="bg-red-600 hover:bg-red-700 text-white">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;