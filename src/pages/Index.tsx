import React from 'react';
import PosterGenerator from '../components/PosterGenerator';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <div className="bg-slate-900 p-4 shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-bold text-center text-primary">封面生成器</h1>
      </div>
      
      <div className="flex-1 pt-16">
        <PosterGenerator />
      </div>
      
      {isMobile && <Footer />}
    </div>
  );
};

export default Index;
