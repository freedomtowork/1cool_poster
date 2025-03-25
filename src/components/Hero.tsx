
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-purple-100/30 blur-3xl animate-float animation-delay-400"></div>
      
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block glass px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="text-sm font-medium text-primary/90">Multilingual AI Poster Generator</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in animation-delay-200">
            Create Stunning Posters with AI in Seconds
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-400">
            Generate beautiful, platform-optimized cover images in multiple languages. Perfect for social media, blogs, and marketing materials.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-600">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="#generator">
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
