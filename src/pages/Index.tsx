
import React from 'react';
import Navbar from '../components/Navbar';
import PosterGenerator from '../components/PosterGenerator';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Poster Generator as first component */}
      <div className="flex-1">
        <PosterGenerator />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
