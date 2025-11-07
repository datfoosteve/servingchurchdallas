"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
  Search,
} from "lucide-react";

const pages = [
  {
    group: "Main",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "About Us", href: "/about-us", icon: Info },
      { name: "Sermons", href: "/sermons", icon: Mic2 },
      { name: "Events", href: "/events", icon: Calendar },
      { name: "Prayer Wall", href: "/prayers", icon: Heart },
    ],
  },
  {
    group: "Contact",
    items: [
      { name: "Location & Directions", href: "/location", icon: MapPin },
      { name: "Contact Church", href: "/contact-us/contact-church", icon: Mail },
      { name: "Prayer Request", href: "/contact-us/prayer-request", icon: MessageSquare },
    ],
  },
  {
    group: "More",
    items: [
      { name: "Gallery", href: "/more/gallery", icon: ImageIcon },
      { name: "Who We Are", href: "/more/who-we-are", icon: Users },
    ],
  },
  {
    group: "Support",
    items: [
      { name: "Donate", href: "/donate", icon: DollarSign },
    ],
  },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-white border rounded-md hover:bg-gray-50 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Quick search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {pages.map((group, i) => (
            <React.Fragment key={group.group}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={group.group}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      onSelect={() => {
                        runCommand(() => router.push(item.href));
                      }}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
