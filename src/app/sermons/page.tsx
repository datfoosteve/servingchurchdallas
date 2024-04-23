// src/pages/sermons.tsx
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';


const SermonsPage = () => {
  return (
    <div className="flex container mx-auto px-2 py-8">
      <Card>
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4 content-center text-center">Sermons</CardTitle>
          <div className="flex container w-screen">
            <iframe
              src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins&feed=true"
              allow="autoplay; encrypted-media"
              className="flex container w-3/4 h-screen box-content border-0 overflow-hidden"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SermonsPage;
