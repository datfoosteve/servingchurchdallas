import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://servingchurchdallas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },

    { url: `${SITE_URL}/about-us`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/events`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/sermons`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/donate`, lastModified, changeFrequency: "monthly", priority: 0.7 },

    { url: `${SITE_URL}/contact-us`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact-us/contact-church`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact-us/prayer-request`, lastModified, changeFrequency: "monthly", priority: 0.6 },

    { url: `${SITE_URL}/more`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/more/gallery`, lastModified, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/more/who-we-are`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
