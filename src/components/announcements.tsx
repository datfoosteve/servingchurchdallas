"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Info, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  description: string;
  variant: "default" | "info" | "success" | "warning";
  icon: React.ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

// Configure your announcements here
const announcements: Announcement[] = [
  {
    id: "service-times",
    title: "Join Us This Sunday!",
    description: "Sunday Service at 10:00 AM at Sunnyvale High School. We can't wait to worship together!",
    variant: "info",
    icon: <Calendar className="h-4 w-4" />,
    link: {
      href: "/location",
      text: "Get Directions",
    },
  },
  // Add more announcements as needed
  // {
  //   id: "special-event",
  //   title: "Special Event Coming Up",
  //   description: "Don't miss our upcoming community outreach event next Saturday!",
  //   variant: "success",
  //   icon: <Sparkles className="h-4 w-4" />,
  //   link: {
  //     href: "/events",
  //     text: "Learn More",
  //   },
  // },
];

export function Announcements() {
  if (announcements.length === 0) return null;

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Alert key={announcement.id} variant={announcement.variant}>
              {announcement.icon}
              <AlertTitle>{announcement.title}</AlertTitle>
              <AlertDescription>
                {announcement.description}
                {announcement.link && (
                  <>
                    {" "}
                    <Link
                      href={announcement.link.href}
                      className="font-medium underline underline-offset-4 hover:no-underline"
                    >
                      {announcement.link.text} →
                    </Link>
                  </>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
}
