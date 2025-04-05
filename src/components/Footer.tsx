
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-semibold text-primary">1Cool</span>
            <p className="text-sm text-muted-foreground mt-2">
              1分钟创建您的宣传卡片
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
