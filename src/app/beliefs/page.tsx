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
  keywords: string[]; // For search
};

const BELIEFS: BeliefItem[] = [
  {
    id: "scripture",
    title: "Scripture",
    excerpt: "The Bible is not just a book — it is breath and light.",
    icon: Book,
    keywords: ["bible", "word", "truth", "scripture", "authority"],
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          We believe the Scriptures—Old and New Testaments—are the living voice of God, inspired and preserved for all
          generations. Through its pages, eternity speaks into time, revealing truth, conviction, mercy, and wisdom. It is
          the final authority for all faith and life.
        </p>
        <p className="text-sm text-gray-500 italic">2 Timothy 3:16 • 2 Peter 1:20-21 • 1 Thessalonians 2:13</p>
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
        <p className="text-gray-700 leading-relaxed">
          We believe in one eternal God—Father, Son, and Holy Spirit—distinct yet indivisible. In their divine unity we
          see perfect love, creation&apos;s source, redemption&apos;s architect, and life&apos;s breath. From this mystery flows all
          relationship and purpose.
        </p>
        <p className="text-sm text-gray-500 italic">Matthew 28:19 • 2 Corinthians 13:14 • John 14:16-17</p>
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
        <p className="text-gray-700 leading-relaxed">
          Jesus Christ is the eternal Son of God—fully divine, fully human, the image of invisible glory. Born of a
          virgin, He walked among us, healing the broken, forgiving the lost, and defeating death itself. Through His
          cross and resurrection, He opened the way back to the Father, and one day He will return in power and light.
        </p>
        <p className="text-sm text-gray-500 italic">Luke 1:31-35 • Hebrews 7:26 • 1 Corinthians 15:3-4 • Philippians 2:9-11</p>
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
        <p className="text-gray-700 leading-relaxed">
          Humanity was created good, crowned with God&apos;s likeness. But through pride and disobedience, we fractured that
          image and invited death into creation. Our hearts long for what was lost, and only through Christ can that
          fellowship be restored.
        </p>
        <p className="text-sm text-gray-500 italic">Genesis 1:26-27 • Romans 5:12-19</p>
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
        <p className="text-gray-700 leading-relaxed">
          Salvation is the gift of God&apos;s grace, received through repentance and faith in Jesus Christ. His blood redeems,
          His Spirit renews, and His mercy calls us sons and daughters. It is not achieved by effort, but accepted by
          surrender.
        </p>
        <p className="text-sm text-gray-500 italic">Ephesians 2:8-9 • Titus 3:5-7 • Romans 10:9-10</p>
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
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold text-blue-700">Baptism</span> testifies that we have died to sin and risen in new life through Jesus.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold text-purple-700">Communion</span> draws us to the table of remembrance, where bread and cup whisper of a body
          broken and a covenant sealed in love.
        </p>
        <p className="text-sm text-gray-500 italic">Matthew 28:19 • Romans 6:4 • 1 Corinthians 11:23-26</p>
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
        <p className="text-gray-700 leading-relaxed">
          The Holy Spirit dwells within believers, awakening faith, empowering gifts, and guiding us in holiness. He
          comforts, convicts, and carries us toward the likeness of Christ. When we yield, He breathes through us—the
          pulse of divine presence in human form.
        </p>
        <p className="text-sm text-gray-500 italic">John 14:16-17 • Acts 1:8 • Galatians 5:22-23 • 1 Corinthians 12:4-11</p>
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
        <p className="text-gray-700 leading-relaxed">
          We believe healing flows from the compassion of Christ—physical, emotional, and spiritual restoration springing
          from His victory on the cross. Every prayer for healing is an act of faith that says: His kingdom still breaks
          through.
        </p>
        <p className="text-sm text-gray-500 italic">Isaiah 53:4-5 • James 5:14-16 • Matthew 8:16-17</p>
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
        <p className="text-gray-700 leading-relaxed">
          Marriage is God&apos;s sacred union between one man and one woman—an echo of Christ&apos;s love for His Church. Within
          that bond, selfless devotion and faithfulness mirror the eternal covenant between heaven and humanity.
        </p>
        <p className="text-sm text-gray-500 italic">Genesis 2:24 • Ephesians 5:22-33 • Mark 10:6-9</p>
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
        <p className="text-gray-700 leading-relaxed">
          The Church is the living body of Christ, where believers gather as one family under His lordship. Together we
          worship, serve, and grow, carrying His mission into every corner of the world. Each heart a stone; each life a
          flame.
        </p>
        <p className="text-sm text-gray-500 italic">Ephesians 4:11-16 • 1 Corinthians 12:12-27 • Hebrews 10:24-25</p>
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
        <p className="text-gray-700 leading-relaxed">
          We exist to know Christ and make Him known. Every believer is called to carry the message of grace—to neighbor,
          nation, and world—until every heart hears and every soul knows the love of Jesus.
        </p>
        <p className="text-sm text-gray-500 italic">Matthew 28:18-20 • Acts 1:8 • Romans 10:13-15</p>
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
        <p className="text-gray-700 leading-relaxed">
          We believe Jesus will return to make all things new. The dead in Christ will rise, every tear will be wiped
          away, and righteousness will dwell forever. Until then, we live in hope, working and waiting for the dawn of His
          kingdom.
        </p>
        <p className="text-sm text-gray-500 italic">1 Thessalonians 4:16-17 • Revelation 21:1-4</p>
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
        <p className="text-gray-700 leading-relaxed">
          Whether you&apos;re exploring faith or searching for a spiritual home, we open our hearts to you. This is a place to
          grow, to heal, to belong—a family centered on Jesus and alive in His love.
        </p>
        <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <p className="text-center text-gray-800 font-medium">
            Have questions about what we believe? We&apos;d love to talk with you.
          </p>
          <div className="flex justify-center mt-4">
            <a
              href="/contact-us/contact-church"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
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

  // Handle deep linking to specific belief
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash && BELIEFS.find(b => b.id === hash)) {
        setOpenItem(hash);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, []);

  // Search filtering
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

  // FAQ schema for SEO
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Book className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              What We Believe
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Rooted in Scripture. Anchored in truth. Alive in faith.
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto">
              These are the core beliefs that shape our community, guide our worship, and fuel our mission.
              Explore each one to discover the heart of our faith.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search our beliefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white shadow-md border-gray-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600">
                Found {filteredBeliefs.length} belief{filteredBeliefs.length !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {/* Accordion */}
          {filteredBeliefs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
              className="space-y-4"
            >
              {filteredBeliefs.map(({ id, title, excerpt, icon: Icon, content }) => (
                <AccordionItem
                  key={id}
                  value={id}
                  id={id}
                  className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-purple-200 transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                          {title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {excerpt}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="pl-16 border-l-4 border-purple-200">
                      {content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block mb-4 p-4 bg-gray-100 rounded-full">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Share Our Beliefs
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Want to share a specific belief? Click any accordion item to get a shareable link!
            </p>
            <div className="flex justify-center">
              <a
                href="/contact-us/contact-church"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                <Heart className="w-5 h-5" />
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
