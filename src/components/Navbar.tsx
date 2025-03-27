
import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define a global language context
export const LanguageContext = React.createContext({
  language: 'zh',
  setLanguage: (lang: string) => {},
});

const Navbar = () => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage or use default 'zh'
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage || 'zh';
  });
  
  const isMobile = useIsMobile();

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    // Here you would update all the text in your app
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const pricingText = language === 'zh' ? '升级会员' : 'Pricing';
  const languageDisplayName = language === 'zh' ? '简体中文' : 'English';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-semibold tracking-tight text-primary text-lg">
            PosterAI
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            {pricingText}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2 text-slate-400 hover:text-white">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{languageDisplayName}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="text-slate-200 hover:bg-slate-700">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('zh')} className="text-slate-200 hover:bg-slate-700">
                简体中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <Bell size={18} />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-800 text-slate-200">
            <User size={18} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// Removed the duplicate export of LanguageContext here
