import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

type PosterPreviewProps = {
  language: string;
  scene: string;
  style: string;
  text: string;
  loading?: boolean;
};

const PosterPreview: React.FC<PosterPreviewProps> = ({
  language,
  scene,
  style,
  text,
  loading = false,
}) => {
  const isMobile = useIsMobile();
  const [parsedContent, setParsedContent] = useState({
    title: language === 'zh' ? '数字化转型 / DIGITAL TRANSFORMATION' : 'DIGITAL TRANSFORMATION',
    keywords: language === 'zh' ? ['科技', '创新', '解决方案'] : ['TECH', 'INNOVATION', 'SOLUTION'],
    tagline: language === 'zh' ? '智能化未来，从这里开始' : 'The intelligent future starts here',
    account: language === 'zh' ? '福老易' : 'FuLaoYi',
    accountLogo: '福',
    date: 'OCTOBER 15, 2024',
    ticketNumber: 'NO. 20241015',
    watermark: language === 'zh' ? '#科技创新 #智能解决方案 #数字化转型' : '#TechInnovation #SmartSolutions #DigitalTransformation'
  });

  // Parse the text input to extract structured content
  useEffect(() => {
    if (text.trim()) {
      try {
        // Simple parsing logic - can be enhanced for more complex structures
        const extractValue = (key: string) => {
          const regex = new RegExp(`${key}[:：]\\s*(.+)`, 'i');
          const match = text.match(regex);
          return match ? match[1].trim() : null;
        };

        const title = extractValue(language === 'zh' ? '主标题' : 'Main Title');
        const tagline = extractValue(language === 'zh' ? '标语' : 'Tagline');
        const account = extractValue(language === 'zh' ? '账号' : 'Account');
        const date = extractValue(language === 'zh' ? '日期' : 'Date');
        
        // Extract keywords from the body
        const bodyText = extractValue(language === 'zh' ? '正文' : 'Body Text');
        const keywords = bodyText ? 
          bodyText.split(/[,，]/).slice(0, 3).map(k => k.trim()) : 
          parsedContent.keywords;

        // Update parsed content
        setParsedContent(prev => ({
          ...prev,
          title: title || prev.title,
          keywords: keywords || prev.keywords,
          tagline: tagline || prev.tagline,
          account: account || prev.account,
          accountLogo: account ? account.charAt(0) : prev.accountLogo,
          date: date || prev.date,
          ticketNumber: date ? `NO. ${date.replace(/[^0-9]/g, '')}` : prev.ticketNumber,
          watermark: bodyText ? bodyText.split(/[,，]/).map(tag => `#${tag.trim()}`).join(' ') : prev.watermark
        }));
      } catch (error) {
        console.error('Error parsing text input:', error);
      }
    }
  }, [text, language]);

  // Determine aspect ratio based on scene
  const getAspectRatio = () => {
    if (scene === 'instagram' || scene === 'xiaohongshu') {
      return 'aspect-[3/4]'; // 3:4 for social media
    } else if (scene === 'twitter' || scene === 'facebook') {
      return 'aspect-[16/9]'; // 16:9
    } else if (scene === 'wechat') {
      return 'aspect-[3/4]'; // 3:4
    } else if (scene === 'bilibili') {
      return 'aspect-[16/10]'; // 16:10
    }
    return 'aspect-[3/4]'; // Default to 3:4
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className={`w-full ${getAspectRatio()} rounded-xl overflow-hidden shadow-2xl relative`}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-white">
            {/* Ticket-style poster */}
            <div className="w-full h-full relative flex flex-col p-8 sm:p-10">
              {/* Corner marks */}
              <div className="absolute top-5 left-5 text-gray-500">+</div>
              <div className="absolute top-5 right-5 text-gray-500">+</div>
              <div className="absolute bottom-5 left-5 text-gray-500">+</div>
              <div className="absolute bottom-5 right-5 text-gray-500">+</div>
              
              {/* Header with ticket number and date */}
              <div className="flex justify-between items-start mb-8 pb-4 border-b border-black">
                <div className="font-mono text-xs text-gray-700">{parsedContent.ticketNumber}</div>
                <div className="font-mono text-xs text-gray-700 text-right">{parsedContent.date}</div>
              </div>
              
              {/* Main content */}
              <div className="flex-1 flex flex-col">
                <div className="font-serif text-xl sm:text-2xl font-bold mb-6">{parsedContent.title}</div>
                
                <div className="flex-1 relative">
                  {/* Keywords */}
                  <div className="mb-12">
                    {parsedContent.keywords.map((keyword, index) => {
                      if (index === 0) {
                        return (
                          <div key={index} className="font-serif text-5xl sm:text-6xl font-black leading-tight">
                            {keyword}
                          </div>
                        );
                      } else if (index === 1) {
                        return (
                          <div key={index} className="font-serif text-5xl sm:text-6xl font-black leading-tight bg-black text-white inline-block px-4 py-1 mb-1">
                            {keyword}
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="font-serif text-5xl sm:text-6xl font-black leading-tight relative inline-block">
                            {keyword}
                            <span className="absolute bottom-2 left-0 w-full h-1 bg-black"></span>
                          </div>
                        );
                      }
                    })}
                  </div>
                  
                  {/* Diagonal text */}
                  <div className="absolute right-0 top-1/2 origin-right transform rotate-90 translate-x-1/2 font-cursive text-xl text-gray-600">
                    Innovative
                  </div>
                  
                  {/* Tagline */}
                  <div className="text-xl font-bold flex items-center">
                    <span className="mr-3">→</span>
                    {parsedContent.tagline}
                  </div>
                </div>
              </div>
              
              {/* Footer with account and barcode */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-black">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold mr-3">
                    {parsedContent.accountLogo}
                  </div>
                  <div className="font-bold">
                    {parsedContent.account}
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="font-mono text-xs mb-1">@{parsedContent.account.toUpperCase().replace(/\s/g, '')}</div>
                  <div className="flex">
                    {Array(12).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-0.5 bg-black mx-0.5 ${i % 2 === 0 ? 'h-6' : 'h-4'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Watermark */}
              <div className="absolute bottom-8 left-8 font-mono text-xs text-gray-400">
                {parsedContent.watermark}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterPreview;
