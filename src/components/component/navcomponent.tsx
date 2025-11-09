"use client";

import React from 'react';
import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import {
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { Home, Info, Mic2, Calendar, Heart, MapPin, Mail, MessageSquare, Image as ImageIcon, Users, Menu, ChevronRight, DollarSign } from "lucide-react";

import ChevronRightIcon from "@/images/icons/ChevronRightIcon";
import MenuIcon from "@/images/icons/MenuIcon";
import { CommandMenu } from "@/components/command-menu";
import { PrayerBadge } from "@/components/prayer-badge";
import { UserDropdown } from "@/components/UserDropdown";

export function NavComponent() {
  return (
    <React.Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
      <header className="flex h-20 w-full items-center px-4 md:px-6 sticky top-0 z-50 backdrop-blur-md bg-white bg-opacity-90 justify-between max-w-[100vw] overflow-x-hidden">
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <Link href="/" passHref className="shrink-0">
            <div className="flex gap-2 text-lg font-semibold md:text-base">
              <Image
                src={SUPABASE_IMAGES.logowordhome}
                width={120}
                height={30}
                alt="The Serving Church Logo"
                priority
                className="w-[120px] h-auto md:w-[140px]"
              />
              <span className="sr-only">Serving Church</span>
            </div>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="self-center lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex items-center justify-between">
                <Link
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  href="/"
                >
                  <Image
                    src={SUPABASE_IMAGES.logowordhome}
                    width={140}
                    height={35}
                    alt="The Serving Church Logo"
                    className="w-[150px] h-auto"
                  />
                  <span className="sr-only">Serving Church</span>
                </Link>
              </div>
              <div className="grid gap-2 py-6">
                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 text-lg font-semibold"
                    href="/"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 py-2 text-lg font-semibold"
                    href="/about-us"
                  >
                    <Info className="h-5 w-5" />
                    About Us
                  </Link>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 py-2 text-lg font-semibold"
                    href="/sermons"
                  >
                    <Mic2 className="h-5 w-5" />
                    Sermons
                  </Link>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 py-2 text-lg font-semibold"
                    href="/events"
                  >
                    <Calendar className="h-5 w-5" />
                    Events
                  </Link>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 py-2 text-lg font-semibold"
                    href="/prayers"
                  >
                    <Heart className="h-5 w-5" />
                    Prayer Wall
                    <PrayerBadge />
                  </Link>
                </SheetTrigger>

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center gap-2 text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                    <Mail className="h-5 w-5" />
                    Contact Us
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid gap-6 bg-gray-100 p-6">
                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/location"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location & Directions
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Find us at Sunnyvale High School.
                          </div>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/contact-us/contact-church"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Contact Church
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Get in touch with our church.
                          </div>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/contact-us/prayer-request"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Prayer Request
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Submit a prayer request.
                          </div>
                        </Link>
                      </SheetTrigger>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center gap-2 text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                    <Users className="h-5 w-5" />
                    More
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid gap-6 bg-gray-100 p-6">
                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/more/gallery"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Gallery
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                            View our photo gallery.
                          </div>
                        </Link>
                      </SheetTrigger>

                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/more/who-we-are"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Who We Are
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Learn more about our church.
                          </div>
                        </Link>
                      </SheetTrigger>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center gap-2 py-2 text-lg font-semibold"
                    href="/donate"
                  >
                    <DollarSign className="h-5 w-5" />
                    Donate
                  </Link>
                </SheetTrigger>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    href="/about-us"
                  >
                    <Info className="h-4 w-4" />
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    href="/sermons"
                  >
                    <Mic2 className="h-4 w-4" />
                    Sermons
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    href="/events"
                  >
                    <Calendar className="h-4 w-4" />
                    Events
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    href="/prayers"
                  >
                    <Heart className="h-4 w-4" />
                    Prayer Wall
                    <PrayerBadge />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/location"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location & Directions
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Find us at Sunnyvale High School.
                        </div>
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/contact-us/contact-church"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Contact Church
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Get in touch with our church.
                        </div>
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/contact-us/prayer-request"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Prayer Request
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Submit a prayer request.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/more/gallery"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" />
                          Gallery
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                          View our photo gallery.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/more/who-we-are"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Who We Are
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Learn more about our church.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <UserDropdown />
          <Button
            asChild
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          >
            <Link href="/donate">
              Donate
            </Link>
          </Button>
        </div>
      </header>
    </React.Suspense>
  );
}
