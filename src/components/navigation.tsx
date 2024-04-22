"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"; // Make sure all imports are correct
import { Button } from "@/components/ui/button";
import yourImagePath from "/src/images/logowordhome.svg";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg flex justify-between items-center px-4 py-2">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" passHref>
          <>
            <Image src={yourImagePath} width={160} height={40} alt="Logo" />
          </>
        </Link>
      </div>
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Link href="/about-us" passHref>
              <NavigationMenuLink>About Us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/sermons" passHref>
              <NavigationMenuLink>Sermons</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" passHref>
              <NavigationMenuLink>Events</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Contact Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/contact-us/contact-church" passHref>
                <NavigationMenuLink>Contact Church</NavigationMenuLink>
              </Link>
              <Link href="/contact-us/prayer-request" passHref>
                <NavigationMenuLink>Prayer Request</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/more/gallery" passHref>
                <NavigationMenuLink>Gallery</NavigationMenuLink>
              </Link>
              <Link href="/more/who-we-are" passHref>
                <NavigationMenuLink>Who We Are</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* Donate Button */}
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Donate
      </Button>
    </nav>
  );
}
