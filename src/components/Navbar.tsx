
import React, { useState } from 'react';
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

const Navbar = () => {
  const [language, setLanguage] = useState('zh');
  const isMobile = useIsMobile();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // In a real app, you would update the app's language context/state here
  };

  return (
    <nav className={`fixed top-0 right-0 ${!isMobile ? 'left-[var(--sidebar-width)]' : 'left-0'} z-50 bg-slate-900 border-b border-slate-800 py-2`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isMobile && (
            <Link to="/" className="font-semibold tracking-tight text-primary text-lg">
              PosterAI
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {!isMobile && (
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              升级会员
            </Link>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2 text-slate-400 hover:text-white">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{language === 'en' ? 'English' : '简体中文'}</span>
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
