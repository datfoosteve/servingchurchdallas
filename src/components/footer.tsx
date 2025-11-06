

"use client";

import React from 'react';
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import ChurchIcon from '@/images/icons/ChurchIcon';
import FacebookIcon from '@/images/icons/FacebookIcon';
import TwitterIcon from '@/images/icons/TwitterIcon';
import InstagramIcon from '@/images/icons/InstagramIcon';
import MapPinIcon from '@/images/icons/MapPinIcon';
import PhoneIcon from '@/images/icons/PhoneIcon';
import MailIcon from '@/images/icons/MailIcon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200" aria-label="Site footer">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link className="flex items-center mb-6" href="/">
              <ChurchIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-semibold ml-2">The Serving Church</span>
            </Link>
            <p className="text-gray-400 mb-4">Living to Reflect the Image of Christ</p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <Link
                className="text-gray-400 hover:text-white transition-colors"
                href="https://www.facebook.com/theservingchurch"
                aria-label="Visit our Facebook page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                className="text-gray-400 hover:text-white transition-colors"
                href="https://twitter.com/theservingchurch"
                aria-label="Visit our Twitter profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                className="text-gray-400 hover:text-white transition-colors"
                href="https://www.instagram.com/theservingchurch"
                aria-label="Visit our Instagram profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2" role="list">
              <li><Link className="hover:text-white transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/about-us">About Us</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/events">Events</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/sermons">Sermons</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/donate">Donate</Link></li>
            </ul>
          </nav>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2">
                <MapPinIcon className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>222 Collins Rd, Sunnyvale, TX 75182</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+12147386371" className="hover:text-white transition-colors">(214) 738-6371</a>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:theservingchurchdallas@gmail.com" className="hover:text-white transition-colors break-words">
                  theservingchurchdallas@gmail.com
                </a>
              </div>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and events.</p>
            <form className="flex" aria-label="Newsletter subscription">
              <Input
                className="bg-gray-800 text-gray-200 py-2 px-4 rounded-l-md"
                placeholder="Enter your email"
                type="email"
                aria-label="Email address"
                required
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md transition-colors"
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} The Serving Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}