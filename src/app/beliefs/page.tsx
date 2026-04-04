// app/beliefs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Book, Flame, Heart, Globe2, Cross, Droplets, Wind, Stethoscope, Handshake, Church, Megaphone, Sunrise, Home, Search } from "lucide-react";
import type { ReactNode } from "react";

type BeliefItem = {
  id: string;
  title: string;
  excerpt: string;
  icon: React.ComponentType<{ className?: string }>;
  content: ReactNode;
  keywords: string[];
};

const verseClass = "text-sm text-[#7a746c] italic";
const bodyClass = "text-[#5f584f] leading-relaxed";

const BELIEFS: BeliefItem[] = [
  {
    id: "scripture",
    title: "Scripture",
    excerpt: "The Bible is not just a book — it is breath and light.",
    icon: Book,
    keywords: ["bible", "word", "truth", "scripture", "authority"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>We believe the Scriptures—Old and New Testaments—are the living voice of God, inspired and preserved for all generations. Through its pages, eternity speaks into time, revealing truth, conviction, mercy, and wisdom. It is the final authority for all faith and life.</p>
        <p className={verseClass}>2 Timothy 3:16 • 2 Peter 1:20-21 • 1 Thessalonians 2:13</p>
      </div>
    ),
  },
  {
    id: "trinity",
    title: "The Trinity",
    excerpt: "One God. Three Persons. Perfect harmony.",
    icon: Flame,
    keywords: ["trinity", "father", "son", "holy spirit", "god"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>We believe in one eternal God—Father, Son, and Holy Spirit—distinct yet indivisible. In their divine unity we see perfect love, creation&apos;s source, redemption&apos;s architect, and life&apos;s breath. From this mystery flows all relationship and purpose.</p>
        <p className={verseClass}>Matthew 28:19 • 2 Corinthians 13:14 • John 14:16-17</p>
      </div>
    ),
  },
  {
    id: "jesus",
    title: "Jesus Christ",
    excerpt: "God's Son became one of us to bring us home.",
    icon: Cross,
    keywords: ["jesus", "christ", "messiah", "savior", "lord", "resurrection"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>Jesus Christ is the eternal Son of God—fully divine, fully human, the image of invisible glory. Born of a virgin, He walked among us, healing the broken, forgiving the lost, and defeating death itself. Through His cross and resurrection, He opened the way back to the Father, and one day He will return in power and light.</p>
        <p className={verseClass}>Luke 1:31-35 • Hebrews 7:26 • 1 Corinthians 15:3-4 • Philippians 2:9-11</p>
      </div>
    ),
  },
  {
    id: "humanity",
    title: "Humanity & The Fall",
    excerpt: "We were made in His image—and we forgot His face.",
    icon: Heart,
    keywords: ["humanity", "sin", "fall", "creation", "image of god"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>Humanity was created good, crowned with God&apos;s likeness. But through pride and disobedience, we fractured that image and invited death into creation. Our hearts long for what was lost, and only through Christ can that fellowship be restored.</p>
        <p className={verseClass}>Genesis 1:26-27 • Romans 5:12-19</p>
      </div>
    ),
  },
  {
    id: "salvation",
    title: "Salvation",
    excerpt: "Grace is not earned — it's received.",
    icon: Globe2,
    keywords: ["salvation", "grace", "redemption", "faith", "repentance"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>Salvation is the gift of God&apos;s grace, received through repentance and faith in Jesus Christ. His blood redeems, His Spirit renews, and His mercy calls us sons and daughters. It is not achieved by effort, but accepted by surrender.</p>
        <p className={verseClass}>Ephesians 2:8-9 • Titus 3:5-7 • Romans 10:9-10</p>
      </div>
    ),
  },
  {
    id: "sacraments",
    title: "Baptism & Communion",
    excerpt: "Symbols of death, life, and love remembered.",
    icon: Droplets,
    keywords: ["baptism", "communion", "sacraments", "eucharist", "ordinances"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}><span className="font-semibold text-[#6e5b33]">Baptism</span> testifies that we have died to sin and risen in new life through Jesus.</p>
        <p className={bodyClass}><span className="font-semibold text-[#6e5b33]">Communion</span> draws us to the table of remembrance, where bread and cup whisper of a body broken and a covenant sealed in love.</p>
        <p className={verseClass}>Matthew 28:19 • Romans 6:4 • 1 Corinthians 11:23-26</p>
      </div>
    ),
  },
  {
    id: "holy-spirit",
    title: "The Holy Spirit",
    excerpt: "He is the wind that fills our lungs with life.",
    icon: Wind,
    keywords: ["holy spirit", "spirit", "gifts", "fruits", "comforter"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>The Holy Spirit dwells within believers, awakening faith, empowering gifts, and guiding us in holiness. He comforts, convicts, and carries us toward the likeness of Christ. When we yield, He breathes through us—the pulse of divine presence in human form.</p>
        <p className={verseClass}>John 14:16-17 • Acts 1:8 • Galatians 5:22-23 • 1 Corinthians 12:4-11</p>
      </div>
    ),
  },
  {
    id: "healing",
    title: "Healing",
    excerpt: "God still restores what's broken.",
    icon: Stethoscope,
    keywords: ["healing", "restoration", "miracles", "health"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>We believe healing flows from the compassion of Christ—physical, emotional, and spiritual restoration springing from His victory on the cross. Every prayer for healing is an act of faith that says: His kingdom still breaks through.</p>
        <p className={verseClass}>Isaiah 53:4-5 • James 5:14-16 • Matthew 8:16-17</p>
      </div>
    ),
  },
  {
    id: "marriage",
    title: "Marriage & Family",
    excerpt: "A covenant shaped like love.",
    icon: Handshake,
    keywords: ["marriage", "family", "covenant", "unity"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>Marriage is God&apos;s sacred union between one man and one woman—an echo of Christ&apos;s love for His Church. Within that bond, selfless devotion and faithfulness mirror the eternal covenant between heaven and humanity.</p>
        <p className={verseClass}>Genesis 2:24 • Ephesians 5:22-33 • Mark 10:6-9</p>
      </div>
    ),
  },
  {
    id: "church",
    title: "The Church",
    excerpt: "Not a building — a body.",
    icon: Church,
    keywords: ["church", "body of christ", "community", "fellowship"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>The Church is the living body of Christ, where believers gather as one family under His lordship. Together we worship, serve, and grow, carrying His mission into every corner of the world. Each heart a stone; each life a flame.</p>
        <p className={verseClass}>Ephesians 4:11-16 • 1 Corinthians 12:12-27 • Hebrews 10:24-25</p>
      </div>
    ),
  },
  {
    id: "mission",
    title: "Mission & Evangelism",
    excerpt: "The gospel moves when we do.",
    icon: Megaphone,
    keywords: ["mission", "evangelism", "great commission", "witnessing"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>We exist to know Christ and make Him known. Every believer is called to carry the message of grace—to neighbor, nation, and world—until every heart hears and every soul knows the love of Jesus.</p>
        <p className={verseClass}>Matthew 28:18-20 • Acts 1:8 • Romans 10:13-15</p>
      </div>
    ),
  },
  {
    id: "return",
    title: "The Return of Christ",
    excerpt: "The story ends in glory.",
    icon: Sunrise,
    keywords: ["second coming", "return", "rapture", "resurrection", "heaven"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>We believe Jesus will return to make all things new. The dead in Christ will rise, every tear will be wiped away, and righteousness will dwell forever. Until then, we live in hope, working and waiting for the dawn of His kingdom.</p>
        <p className={verseClass}>1 Thessalonians 4:16-17 • Revelation 21:1-4</p>
      </div>
    ),
  },
  {
    id: "welcome",
    title: "Welcome Home",
    excerpt: "You belong here.",
    icon: Home,
    keywords: ["welcome", "home", "belong", "family"],
    content: (
      <div className="space-y-4">
        <p className={bodyClass}>Whether you&apos;re exploring faith or searching for a spiritual home, we open our hearts to you. This is a place to grow, to heal, to belong—a family centered on Jesus and alive in His love.</p>
        <div className="mt-6 rounded-[20px] border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-6">
          <p className="text-center font-medium text-[#1f1f1f]">Have questions about what we believe? We&apos;d love to talk with you.</p>
          <div className="mt-4 flex justify-center">
            <a href="/contact-us/contact-church" className="inline-flex items-center rounded-full bg-brand-button px-6 py-3 text-brand-ivory transition hover:brightness-110 font-medium">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    ),
  },
];

export default function BeliefsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBeliefs, setFilteredBeliefs] = useState(BELIEFS);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash && BELIEFS.find((b) => b.id === hash)) {
        setOpenItem(hash);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBeliefs(BELIEFS);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = BELIEFS.filter(
      (belief) =>
        belief.title.toLowerCase().includes(query) ||
        belief.excerpt.toLowerCase().includes(query) ||
        belief.keywords.some((keyword) => keyword.includes(query))
    );
    setFilteredBeliefs(filtered);
  }, [searchQuery]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BELIEFS.filter((b) => b.id !== "welcome").map((b) => ({
      "@type": "Question",
      name: b.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: b.excerpt,
      },
    })),
  };

  return (
    <>
      <section className="bg-[#181818] py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
              <Book className="w-12 h-12 text-brand-gold" />
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Beliefs</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-brand-ivory">
              What We Believe
            </h1>
            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
            <p className="mt-6 text-xl md:text-2xl text-brand-stone mb-4 leading-relaxed">
              Rooted in Scripture. Anchored in truth. Alive in faith.
            </p>
            <p className="text-lg text-brand-stone max-w-2xl mx-auto leading-8">
              These are the core beliefs that shape our community, guide our worship, and fuel our mission.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-brand-section py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7a746c] w-5 h-5" />
              <Input
                type="text"
                placeholder="Search our beliefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white shadow-md border-brand-border focus:ring-2 focus:ring-[rgba(200,169,107,0.35)]"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-[#625c53]">
                Found {filteredBeliefs.length} belief{filteredBeliefs.length !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {filteredBeliefs.length > 0 ? (
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="space-y-4">
              {filteredBeliefs.map(({ id, title, excerpt, icon: Icon, content }) => (
                <AccordionItem
                  key={id}
                  value={id}
                  id={id}
                  className="overflow-hidden rounded-[24px] border border-brand-border bg-white/88 shadow-sm transition-all duration-300 hover:border-brand-gold/30"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] flex items-center justify-center text-brand-gold shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-[#1f1f1f] mb-1">{title}</h3>
                        <p className="text-sm md:text-base text-[#625c53] leading-relaxed">{excerpt}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="pl-6 md:pl-16 border-l-2 border-brand-gold/25">{content}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block mb-4 p-4 rounded-full border border-brand-border bg-white/70">
                <Search className="w-12 h-12 text-[#7a746c]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1f1f1f] mb-2">No results found</h3>
              <p className="text-[#625c53]">Try searching with different keywords</p>
            </div>
          )}

          <div className="mt-16 rounded-[28px] border border-brand-border bg-[#181818] p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-brand-ivory mb-4 text-center">Share Our Beliefs</h3>
            <p className="text-center text-brand-stone mb-6">
              Want to share a specific belief? Click any accordion item to get a shareable link.
            </p>
            <div className="flex justify-center">
              <a href="/contact-us/contact-church" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-button-gold text-[#1f1f1f] hover:brightness-105 transition-all duration-300 font-semibold text-lg">
                <Heart className="w-5 h-5" />
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
