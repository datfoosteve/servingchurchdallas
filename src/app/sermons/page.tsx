// src/pages/sermons.tsx
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';


const SermonsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4">Sermons</CardTitle>
          <div className="iframe-container">
            <iframe
              src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins&feed=true"
              allow="autoplay; encrypted-media"
              title="Sermons Podcast"
              className="iframe"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SermonsPage;
