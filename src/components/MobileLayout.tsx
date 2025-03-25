
import React from 'react';
import { 
  Home, 
  Image, 
  User, 
  DollarSign,
  Menu 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '../hooks/use-mobile';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-t border-gray-200 flex items-center justify-around z-50">
        <Link to="/" className="flex flex-col items-center justify-center text-primary">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <a href="#generator" className="flex flex-col items-center justify-center">
          <Image size={24} />
          <span className="text-xs mt-1">Create</span>
        </a>
        
        <Link to="/pricing" className="flex flex-col items-center justify-center">
          <DollarSign size={24} />
          <span className="text-xs mt-1">Pricing</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center">
              <Menu size={24} />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:w-[385px]">
            <div className="py-6">
              <h2 className="text-xl font-semibold mb-4">Menu</h2>
              <nav className="space-y-4">
                <Link to="/" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary">
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <a href="#generator" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary">
                  <Image size={20} />
                  <span>Create Poster</span>
                </a>
                <Link to="/pricing" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary">
                  <DollarSign size={20} />
                  <span>Pricing</span>
                </Link>
                <div className="border-t my-4"></div>
                <a href="#" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary">
                  <User size={20} />
                  <span>Sign Up / Login</span>
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <a href="#" className="flex flex-col items-center justify-center">
          <User size={24} />
          <span className="text-xs mt-1">Account</span>
        </a>
      </nav>
      
      {/* Add bottom padding to account for the navigation bar */}
      <div className="h-16"></div>
    </div>
  );
};

export default MobileLayout;
