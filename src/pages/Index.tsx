
import React from 'react';
import Navbar from '../components/Navbar';
import PosterGenerator from '../components/PosterGenerator';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Navbar />
      
      {!isMobile && <Sidebar />}
      
      <div className={`${!isMobile ? 'editor-area' : ''} flex-1`}>
        <PosterGenerator />
      </div>
      
      {isMobile && <Footer />}
    </div>
  );
};

export default Index;
