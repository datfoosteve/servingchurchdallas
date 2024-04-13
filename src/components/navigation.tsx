"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import Image from "next/image";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
 
import { cn } from "@/lib/utils"

import yourImagePath from '/src/images/logowordhome.svg';


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  

  export function Navigation() {
    return (
        <nav className="sticky mx-auto top-0 z-auto bg-white shadow flex items-center justify-between p-4">
        {/* Logo Section */}
        <NavigationMenuItem className="flex items-center mx-5">

            <Image
      src={yourImagePath}
      width={120}
      height={40}
      alt="Logo"
    />
          
        </NavigationMenuItem>
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
    <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Start Here
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href="/" legacyBehavior passHref> 
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Messages
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Events
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Weekends</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>More</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem><Button>Donate</Button></NavigationMenuItem>


  </NavigationMenuList>
</NavigationMenu>
</nav>
 )
}