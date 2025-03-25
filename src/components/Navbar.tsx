
import React, { useState } from 'react';
import { X, ChevronDown, Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // In a real app, you would update the app's language context/state here
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/10 ${isMobile ? 'py-3' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className={`font-semibold tracking-tight text-primary ${isMobile ? 'text-lg' : 'text-xl'}`}>PosterAI</Link>
        </div>
        
        {/* Desktop Navigation - Only show on non-mobile */}
        {!isMobile && (
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Create</Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </div>
        )}
        
        {/* Language Dropdown - Visible on both mobile and desktop */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{language === 'en' ? 'English' : '中文'}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('zh')}>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {!isMobile && (
            <Button variant="default" size="sm" className="ml-4">
              Sign Up
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Toggle - Only on desktop when not using MobileLayout */}
        {!isMobile && (
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      
      {/* Mobile Menu - Only shown when not using the MobileLayout */}
      {!isMobile && isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass shadow-lg border border-white/10 animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Create</Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
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
