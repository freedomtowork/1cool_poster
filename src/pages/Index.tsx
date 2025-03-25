
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PosterGenerator from '../components/PosterGenerator';
import MembershipCard from '../components/MembershipCard';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-background to-secondary/20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-muted-foreground">
              Our AI-powered poster generator provides everything you need to create stunning visuals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Languages</h3>
              <p className="text-muted-foreground">
                Create posters in Chinese and English with optimized layouts for each language.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Platform Optimized</h3>
              <p className="text-muted-foreground">
                Designs tailored for various platforms like Xiaohongshu, WeChat, Twitter, and Instagram.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Styles</h3>
              <p className="text-muted-foreground">
                Choose from various design styles including minimal, vibrant, elegant, and retro.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <PosterGenerator />
      <MembershipCard />
      <Footer />
    </div>
  );
};

export default Index;
