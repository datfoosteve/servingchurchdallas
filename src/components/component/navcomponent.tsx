"use client";

import React from 'react';
import Image from "next/image";
import yourImagePath from "/src/images/logowordhome.svg";
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

import ChevronRightIcon from "@/images/icons/ChevronRightIcon";
import MenuIcon from "@/images/icons/MenuIcon";

export function NavComponent() {
  return (
    <React.Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
      <header className="flex h-20 w-full items-center px-4 md:px-6 sticky top-0 z-50 backdrop-blur-md bg-white bg-opacity-90 justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" passHref>
            <div className="flex gap-2 text-lg font-semibold md:text-base">
              <Image
                src={yourImagePath}
                width={140}
                height={35}
                alt="Logo"
                layout="intrinsic"
              />
              <span className="sr-only">Serving Church</span>
            </div>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="self-center lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-8 w-8" />
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
                    src={yourImagePath}
                    width={140}
                    height={35}
                    alt="Logo"
                    layout="intrinsic"
                  />
                  <span className="sr-only">Serving Church</span>
                </Link>
              </div>
              <div className="grid gap-2 py-6">
                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center text-lg font-semibold"
                    href="/"
                  >
                    Home
                  </Link>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    href="/about-us"
                  >
                    About Us
                  </Link>
                </SheetTrigger>

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                    Contact Us
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid gap-6 bg-gray-100 p-6">
                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/contact-us/contact-church"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
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
                          <div className="text-sm font-medium leading-none group-hover:underline">
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

                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    href="/events"
                  >
                    Events
                  </Link>
                </SheetTrigger>

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
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
                          <>
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              Gallery
                            </div>
                            <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                              View our photo gallery.
                            </div>
                          </>
                        </Link>
                      </SheetTrigger>

                      <SheetTrigger asChild>
                        <Link
                          className="group grid h-auto w-full justify-start gap-1"
                          href="/more/who-we-are"
                        >
                          <>
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              Who We Are
                            </div>
                            <div className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Learn more about our church.
                            </div>
                          </>
                        </Link>
                      </SheetTrigger>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <SheetTrigger asChild>
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    href="/sermons"
                  >
                    Sermons
                  </Link>
                </SheetTrigger>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex w-full justify-center">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                  href="/about-us"
                >
                  About Us
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                  href="/sermons"
                >
                  Sermons
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                  href="/events"
                >
                  Events
                </Link>
              </NavigationMenuLink>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Contact Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/contact-us/contact-church"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
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
                        <div className="text-sm font-medium leading-none group-hover:underline">
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
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                        href="/more/gallery"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
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
                        <div className="text-sm font-medium leading-none group-hover:underline">
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
        <div className="flex justify-end">
          <Button
            asChild
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          >
            <Link href="/donate">Donate</Link>
          </Button>
        </div>
      </header>
    </React.Suspense>
  );
}
