// src/pages/more/who-we-are.tsx
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const WhoWeArePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          <CardTitle className="text-4xl font-bold mb-4">Who We Are</CardTitle>
          <p>
            We are a community of faith, committed to making a difference in the world around us.
            Our mission is to spread love, hope, and joy to all corners of the globe.
          </p>
          <p>
            Founded in 1984, our community has grown to include thousands of members worldwide,
            dedicated to various causes and outreach programs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoWeArePage;
