import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ChurchIcon from '@/images/icons/ChurchIcon';
import HeartIcon from '@/images/icons/HeartIcon';
import UserIcon from '@/images/icons/UserIcon';
import HelpingHandIcon from '@/images/icons/HelpingHandIcon';

const cardData = [
    { id: 1, title: "EXPERIENCE GOD", description: "Join us for a transformative worship experience that will uplift your spirit and draw you closer to God.", icon: <ChurchIcon className="h-12 w-12 text-indigo-500" /> },
    { id: 2, title: "BECOME A DISCIPLE", description: "Grow in your faith through our discipleship programs and small groups, designed to help you deepen your relationship with Christ.", icon: <HelpingHandIcon className="h-12 w-12 text-indigo-500" /> },
    { id: 3, title: "FIND YOUR PURPOSE", description: "Discover your God-given purpose and use your talents to serve others and make a positive impact in your community.", icon: <HeartIcon className="h-12 w-12 text-indigo-500" /> },
    { id: 4, title: "JOIN A FAMILY", description: "Join our welcoming community of believers and find a spiritual family that will support and encourage you on your faith journey.", icon: <UserIcon className="h-12 w-12 text-indigo-500" /> }
];

export function ValueBlocks() {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {cardData.map(card => (
                        <Card key={card.id} className="shadow-lg transition duration-300 hover:bg-gray-100 hover:scale-105">
                            <CardHeader>
                                <CardTitle className="text-center">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                                {card.icon}
                                <p className="text-center text-gray-600">
                                    {card.description}
                                </p>
                                
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
