"use client";

import React from "react";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChurchIcon from "@/images/icons/ChurchIcon";
import FacebookIcon from "@/images/icons/FacebookIcon";
import InstagramIcon from "@/images/icons/InstagramIcon";
import MapPinIcon from "@/images/icons/MapPinIcon";
import PhoneIcon from "@/images/icons/PhoneIcon";
import MailIcon from "@/images/icons/MailIcon";
import { Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gold/20 bg-[#141414] text-gray-200" aria-label="Site footer">
      <div className="container mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link className="mb-6 flex items-center" href="/">
              <div className="flex items-center gap-3 rounded-full border border-brand-gold/20 bg-white/5 px-4 py-3">
                <ChurchIcon className="h-8 w-8 text-brand-gold" />
                <span className="text-2xl font-semibold text-brand-ivory">The Serving Church</span>
              </div>
            </Link>
            <p className="mb-5 max-w-sm text-sm leading-7 text-brand-stone">
              A church family seeking to reflect the image of Christ through worship, prayer, service, and community.
            </p>
            <ul className="flex list-none space-x-4" aria-label="Social media links">
              <li>
                <Link
                  className="rounded-full border border-brand-gold/20 bg-white/5 p-3 text-brand-stone transition-colors hover:text-brand-ivory"
                  href="https://www.facebook.com/share/17ms3sqkVQ/?mibextid=wwXIfr"
                  aria-label="Visit our Facebook page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-full border border-brand-gold/20 bg-white/5 p-3 text-brand-stone transition-colors hover:text-brand-ivory"
                  href="https://www.youtube.com/@theservingchurchdallas"
                  aria-label="Visit our YouTube channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-full border border-brand-gold/20 bg-white/5 p-3 text-brand-stone transition-colors hover:text-brand-ivory"
                  href="https://www.instagram.com/theservingchurchdallas?igsh=MWdiZ2ZyY2JyeWoydw=="
                  aria-label="Visit our Instagram profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Quick Links</p>
            <ul className="space-y-3" role="list">
              <li><Link className="text-brand-stone transition-colors hover:text-brand-ivory" href="/">Home</Link></li>
              <li><Link className="text-brand-stone transition-colors hover:text-brand-ivory" href="/about-us">About Us</Link></li>
              <li><Link className="text-brand-stone transition-colors hover:text-brand-ivory" href="/events">Events</Link></li>
              <li><Link className="text-brand-stone transition-colors hover:text-brand-ivory" href="/sermons">Sermons</Link></li>
              <li><Link className="text-brand-stone transition-colors hover:text-brand-ivory" href="/donate">Donate</Link></li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Contact</p>
            <address className="not-italic space-y-4 text-brand-stone">
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-gold" aria-hidden="true" />
                <span>222 Collins Rd, Sunnyvale, TX 75182</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 flex-shrink-0 text-brand-gold" aria-hidden="true" />
                <a href="tel:+121****6371" className="transition-colors hover:text-brand-ivory">(214) 738-6371</a>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 flex-shrink-0 text-brand-gold" aria-hidden="true" />
                <a href="mailto:theservingchurchdallas@gmail.com" className="break-words transition-colors hover:text-brand-ivory">
                  theservingchurchdallas@gmail.com
                </a>
              </div>
            </address>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Stay Connected</p>
            <p className="mb-4 text-sm leading-7 text-brand-stone">
              Stay updated with church news, events, and important announcements.
            </p>
            <form className="flex" aria-label="Newsletter subscription">
              <Input
                className="rounded-l-full border-brand-border bg-white/5 px-4 py-2 text-brand-ivory placeholder:text-brand-stone"
                placeholder="Enter your email"
                type="email"
                aria-label="Email address"
                required
              />
              <Button
                className="rounded-r-full bg-brand-button-gold px-5 py-2 text-[#1f1f1f] transition hover:brightness-105"
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-border pt-8 text-center">
          <p className="text-sm text-brand-stone">
            © {new Date().getFullYear()} The Serving Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
