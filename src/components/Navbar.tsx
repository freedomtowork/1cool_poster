
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/10 ${isMobile ? 'py-3' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`font-semibold tracking-tight text-primary ${isMobile ? 'text-lg' : 'text-xl'}`}>PosterAI</span>
        </div>
        
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#generator" className="text-sm font-medium hover:text-primary transition-colors">Create</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <Button variant="default" size="sm" className="ml-4">
              Sign Up
            </Button>
          </div>
        )}
        
        {!isMobile && (
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <div></div>}
          </button>
        )}
      </div>
      
      {/* Mobile Menu - Only shown when not using the MobileLayout */}
      {!isMobile && isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass shadow-lg border border-white/10 animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#generator" className="text-sm font-medium hover:text-primary transition-colors">Create</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <Button variant="default" size="sm" className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
