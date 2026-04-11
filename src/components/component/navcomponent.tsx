"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);
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
import {
  Home,
  Info,
  Mic2,
  Calendar,
  Heart,
  MapPin,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Users,
  DollarSign,
  Book,
} from "lucide-react";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon";
import { SiteLogo } from "@/components/site-logo";
import MenuIcon from "@/images/icons/MenuIcon";
import { CommandMenu } from "@/components/command-menu";
import { PrayerBadge } from "@/components/prayer-badge";
import { UserDropdown } from "@/components/UserDropdown";

const primaryLinks: Array<{
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
}> = [
  { href: "/about-us", label: "About Us", icon: Info },
  { href: "/sermons", label: "Sermons", icon: Mic2 },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/prayers", label: "Prayer Wall", icon: Heart, badge: true },
];

const contactLinks = [
  {
    href: "/location",
    label: "Location & Directions",
    description: "Find us at Sunnyvale High School.",
    icon: MapPin,
  },
  {
    href: "/contact-us/contact-church",
    label: "Contact Church",
    description: "Get in touch with our church.",
    icon: Mail,
  },
  {
    href: "/contact-us/prayer-request",
    label: "Prayer Request",
    description: "Submit a prayer request.",
    icon: MessageSquare,
  },
] as const;

const moreLinks = [
  {
    href: "/more/gallery",
    label: "Gallery",
    description: "View our photo gallery.",
    icon: ImageIcon,
  },
  {
    href: "/beliefs",
    label: "Our Beliefs",
    description: "Discover what we believe.",
    icon: Book,
  },
] as const;

const desktopLinkClass =
  "group inline-flex h-10 w-max items-center justify-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium text-brand-ivory/90 transition-colors hover:border-brand-gold/30 hover:bg-white/5 hover:text-brand-ivory focus:bg-white/5 focus:text-brand-ivory focus:outline-none disabled:pointer-events-none disabled:opacity-50";

const desktopPanelLinkClass =
  "group grid h-auto w-full items-center justify-start gap-1 rounded-2xl border border-transparent bg-transparent p-4 text-sm font-medium transition-colors hover:border-brand-gold/20 hover:bg-[rgba(200,169,107,0.08)] hover:text-brand-ivory focus:bg-[rgba(200,169,107,0.08)] focus:text-brand-ivory focus:outline-none disabled:pointer-events-none disabled:opacity-50";

export function NavComponent() {
  return (
    <React.Suspense fallback={<Skeleton className="h-[20px] w-[100px] rounded-full" />}>
      <header className="sticky top-0 z-50 flex h-24 w-full items-center justify-between border-b border-brand-gold/20 bg-[rgba(20,20,20,0.86)] px-4 backdrop-blur-xl md:h-28 md:px-6">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <Link href="/" passHref className="shrink-0" aria-label="The Serving Church home">
            <div className="flex items-center text-lg font-semibold md:text-base">
              <SiteLogo
                className="rounded-full border border-brand-gold/20 bg-white/5 px-3 py-2 shadow-sm md:px-4 md:py-3"
                imgClassName="h-14 md:h-16"
              />
              <span className="sr-only">The Serving Church</span>
            </div>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="self-center border-brand-gold/30 bg-white/5 text-brand-ivory hover:bg-white/10 lg:hidden"
                size="icon"
                variant="outline"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-brand-border bg-[#181818] text-brand-ivory">
              <div className="flex items-center justify-between">
                <Link className="flex items-center text-lg font-semibold md:text-base" href="/" aria-label="The Serving Church home">
                  <SiteLogo
                    className="rounded-full border border-brand-gold/20 bg-white/5 px-3 py-2 shadow-sm"
                    imgClassName="h-14"
                  />
                  <span className="sr-only">The Serving Church</span>
                </Link>
              </div>

              <div className="grid gap-2 py-6">
                <SheetTrigger asChild>
                  <Link className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-lg font-semibold text-brand-ivory" href="/">
                    <Home className="h-5 w-5 text-brand-gold" />
                    Home
                  </Link>
                </SheetTrigger>

                {primaryLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SheetTrigger asChild key={item.href}>
                      <Link
                        className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-lg font-semibold text-brand-ivory"
                        href={item.href}
                      >
                        <Icon className="h-5 w-5 text-brand-gold" />
                        {item.label}
                        {item.badge ? <PrayerBadge /> : null}
                      </Link>
                    </SheetTrigger>
                  );
                })}

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-xl px-2 text-lg font-semibold text-brand-ivory [&[data-state=open]>svg]:rotate-90">
                    <Mail className="h-5 w-5 text-brand-gold" />
                    Contact Us
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid gap-3 rounded-2xl border border-brand-border bg-white/5 p-4">
                      {contactLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SheetTrigger asChild key={item.href}>
                            <Link className="group grid h-auto w-full justify-start gap-1" href={item.href}>
                              <div className="flex items-center gap-2 text-sm font-medium leading-none text-brand-ivory group-hover:underline">
                                <Icon className="h-4 w-4 text-brand-gold" />
                                {item.label}
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-brand-stone">
                                {item.description}
                              </div>
                            </Link>
                          </SheetTrigger>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-xl px-2 text-lg font-semibold text-brand-ivory [&[data-state=open]>svg]:rotate-90">
                    <Users className="h-5 w-5 text-brand-gold" />
                    More
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid gap-3 rounded-2xl border border-brand-border bg-white/5 p-4">
                      {moreLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SheetTrigger asChild key={item.href}>
                            <Link className="group grid h-auto w-full justify-start gap-1" href={item.href}>
                              <div className="flex items-center gap-2 text-sm font-medium leading-none text-brand-ivory group-hover:underline">
                                <Icon className="h-4 w-4 text-brand-gold" />
                                {item.label}
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-brand-stone">
                                {item.description}
                              </div>
                            </Link>
                          </SheetTrigger>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <SheetTrigger asChild>
                  <Link className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-lg font-semibold text-brand-ivory" href="/donate">
                    <DollarSign className="h-5 w-5 text-brand-gold" />
                    Donate
                  </Link>
                </SheetTrigger>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {primaryLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link className={desktopLinkClass} href={item.href}>
                        <Icon className="h-4 w-4 text-brand-gold" />
                        {item.label}
                        {item.badge ? <PrayerBadge /> : null}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full bg-transparent text-brand-ivory/90 hover:bg-white/5 hover:text-brand-ivory data-[active]:bg-white/5 data-[state=open]:bg-white/5">
                  <Mail className="mr-2 h-4 w-4 text-brand-gold" />
                  Contact Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-2 rounded-[24px] border border-brand-border bg-[#1f1f1f] p-3 shadow-2xl">
                    {contactLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link className={desktopPanelLinkClass} href={item.href}>
                            <div className="flex items-center gap-2 text-sm font-medium leading-none text-brand-ivory group-hover:underline">
                              <Icon className="h-4 w-4 text-brand-gold" />
                              {item.label}
                            </div>
                            <div className="line-clamp-2 text-sm leading-snug text-brand-stone">
                              {item.description}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full bg-transparent text-brand-ivory/90 hover:bg-white/5 hover:text-brand-ivory data-[active]:bg-white/5 data-[state=open]:bg-white/5">
                  <Users className="mr-2 h-4 w-4 text-brand-gold" />
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-2 rounded-[24px] border border-brand-border bg-[#1f1f1f] p-3 shadow-2xl">
                    {moreLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link className={desktopPanelLinkClass} href={item.href}>
                            <div className="flex items-center gap-2 text-sm font-medium leading-none text-brand-ivory group-hover:underline">
                              <Icon className="h-4 w-4 text-brand-gold" />
                              {item.label}
                            </div>
                            <div className="line-clamp-2 text-sm leading-snug text-brand-stone">
                              {item.description}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <UserDropdown />
          <Button
            asChild
            className="hidden h-10 items-center justify-center rounded-full bg-brand-button-gold px-5 text-sm font-semibold text-[#1f1f1f] shadow-md transition hover:brightness-105 sm:inline-flex"
          >
            <Link href="/donate">
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Donate
              </span>
            </Link>
          </Button>
        </div>
      </header>
    </React.Suspense>
  );
}
