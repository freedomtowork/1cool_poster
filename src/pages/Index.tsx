
import React from 'react';
import Navbar from '../components/Navbar';
import PosterGenerator from '../components/PosterGenerator';
import Hero from '../components/Hero';
import MembershipCard from '../components/MembershipCard';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Poster Generator as first component */}
      <PosterGenerator />
      
      {/* Only show Hero for non-mobile */}
      {!isMobile && <Hero />}
      
      {/* MembershipCard and Footer remain */}
      <MembershipCard />
      <Footer />
    </div>
  );
};

export default Index;
