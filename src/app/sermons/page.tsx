// src/pages/sermons.tsx
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const SermonsPage = () => {
  return (
    <div className="container mx-auto px-2 py-8">
      <Card className="shadow-lg">
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4 text-center">Sermons</CardTitle>
          <div className="flex flex-col items-center">
            <iframe
              src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins&feed=true"
              title="sermons"
              className="w-full h-screen max-w-4xl shadow-md"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SermonsPage;
