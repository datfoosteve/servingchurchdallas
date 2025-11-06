import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crown, Home, Sparkles } from 'lucide-react';

const cardData = [
    {
        id: 1,
        title: "LOOK LIKE CHRIST",
        description: "Live each day reflecting the heart of Jesus—showing love, patience, humility, and grace. We strive to be His hands and feet in our homes, workplaces, and communities.",
        icon: Crown,
        gradient: "from-amber-400 via-orange-500 to-rose-500",
        bgGradient: "from-amber-50 to-orange-50",
        borderColor: "border-amber-200"
    },
    {
        id: 2,
        title: "HEAVENLY FAMILIES",
        description: "Build homes where God's presence dwells and love leads the way. We nurture families rooted in faith, forgiveness, and the fruits of the Spirit, creating heaven on earth within our walls.",
        icon: Home,
        gradient: "from-blue-400 via-indigo-500 to-purple-600",
        bgGradient: "from-blue-50 to-indigo-50",
        borderColor: "border-blue-200"
    },
    {
        id: 3,
        title: "EXPERIENCE GOD",
        description: "Seek a real encounter with the living God. Through worship, prayer, and community, we invite His Spirit to transform our hearts and renew our lives daily.",
        icon: Sparkles,
        gradient: "from-emerald-400 via-teal-500 to-cyan-600",
        bgGradient: "from-emerald-50 to-teal-50",
        borderColor: "border-emerald-200"
    }
];

export function ValueBlocks() {
    return (
        <section className="bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our Core Beliefs
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"></div>
                        <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
                        <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-cyan-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Three pillars that define who we are and guide our journey together
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {cardData.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Card
                                key={card.id}
                                className={`group relative overflow-hidden bg-gradient-to-br ${card.bgGradient} border-2 ${card.borderColor} shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                            >
                                {/* Animated background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <CardHeader className="text-center pb-4 relative z-10">
                                    {/* Icon with gradient background */}
                                    <div className="mx-auto mb-4 relative">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                                        <div className={`relative bg-gradient-to-br ${card.gradient} p-4 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                            <Icon className="h-10 w-10 md:h-12 md:w-12 text-white" strokeWidth={2} />
                                        </div>
                                    </div>

                                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                        {card.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10 px-6 pb-6">
                                    <CardDescription className="text-center text-sm md:text-base text-gray-700 leading-relaxed">
                                        {card.description}
                                    </CardDescription>
                                </CardContent>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
