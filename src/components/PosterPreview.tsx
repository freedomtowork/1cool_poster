
import React from 'react';
import { Download, Share2, Star, Palette, Code, SquareCode, Infinity } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  // Generate a design based on the style
  const generateDesign = () => {
    let design = {
      background: '',
      textColor: 'text-white',
      fontStyle: 'font-medium',
      layout: 'flex flex-col items-start justify-center',
      accent: '',
      title: language === 'zh' ? '还在用PPT?' : 'Still using PPT?',
      subtitle: language === 'zh' ? 
        '教你用Claude生成惊艳同事的文档可视化网页' : 
        'Learn to create stunning document visualizations with Claude',
      hasGrid: false,
      hasAccent: false,
      hasNumbers: false,
      hasBorder: false,
      cornerElements: false,
      rightSide: true,
    };

    switch (style) {
      case 'info_card':
        design.background = 'bg-blue-50';
        design.textColor = 'text-blue-900';
        design.fontStyle = 'font-medium';
        design.layout = 'grid grid-cols-2 gap-4 p-8';
        design.hasNumbers = true;
        break;
      case 'professional':
        design.background = 'bg-gradient-to-br from-green-50 to-white';
        design.textColor = 'text-green-800';
        design.fontStyle = 'font-medium';
        design.accent = 'border-l-4 border-green-400 pl-4';
        design.hasAccent = true;
        break;
      case 'interactive':
        design.background = 'bg-gradient-to-br from-yellow-50 to-white';
        design.textColor = 'text-yellow-900';
        design.fontStyle = 'font-medium';
        design.hasAccent = true;
        design.accent = 'border-b-2 border-yellow-400';
        break;
      case 'one_click':
        design.background = 'bg-gradient-to-br from-purple-50 to-white';
        design.textColor = 'text-purple-900';
        design.fontStyle = 'font-medium';
        design.layout = 'flex flex-col items-center justify-center text-center';
        break;
      case 'soft_pink':
        design.background = 'bg-gradient-to-r from-pink-50 to-pink-100';
        design.textColor = 'text-purple-800';
        design.fontStyle = 'font-bold';
        design.hasBorder = true;
        design.accent = 'border border-dashed border-pink-300';
        break;
      case 'dark_contrast':
        design.background = 'bg-black';
        design.textColor = 'text-white';
        design.fontStyle = 'font-extrabold';
        design.accent = 'text-yellow-300';
        design.hasAccent = true;
        design.cornerElements = true;
        break;
      case 'minimalist':
        design.background = 'bg-gray-100 bg-opacity-80 backdrop-blur-sm';
        design.textColor = 'text-gray-800';
        design.fontStyle = 'font-normal';
        design.layout = 'flex flex-col items-start justify-center';
        design.hasBorder = false;
        break;
      case 'grid_system':
        design.background = 'bg-black';
        design.textColor = 'text-white';
        design.fontStyle = 'font-bold';
        design.hasGrid = true;
        design.hasAccent = true;
        design.accent = 'text-red-500';
        break;
      case 'tech_blue':
        design.background = 'bg-gradient-to-br from-blue-50 to-white';
        design.textColor = 'text-blue-700';
        design.fontStyle = 'font-bold';
        design.hasAccent = true;
        design.cornerElements = true;
        break;
      case 'green_nature':
        design.background = 'bg-gradient-to-r from-green-800 to-green-900';
        design.textColor = 'text-white';
        design.fontStyle = 'font-medium';
        design.layout = 'flex flex-col items-start justify-center';
        design.hasAccent = true;
        design.cornerElements = true;
        break;
      default:
        design.background = 'bg-blue-50';
        design.textColor = 'text-blue-900';
    }

    return design;
  };

  // Determine aspect ratio based on scene
  const getAspectRatio = () => {
    if (scene === 'instagram' || scene === 'xiaohongshu') {
      return 'aspect-square'; // 1:1
    } else if (scene === 'twitter' || scene === 'facebook') {
      return 'aspect-[16/9]'; // 16:9
    } else if (scene === 'wechat') {
      return 'aspect-[3/4]'; // 3:4
    } else if (scene === 'bilibili') {
      return 'aspect-[16/10]'; // 16:10
    }
    return 'aspect-[16/9]'; // Default
  };

  const design = generateDesign();
  const downloadText = language === 'zh' ? '下载' : 'Download';
  const shareText = language === 'zh' ? '分享' : 'Share';
  const placeholderText = text || (language === 'zh' ? '在此输入您的文字' : 'Enter your text here');

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <div className={`w-full ${getAspectRatio()} rounded-xl overflow-hidden shadow-lg relative`}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 ${design.background}`}>
            {design.hasGrid && (
              <div className="absolute inset-0 grid-pattern"></div>
            )}
            
            <div className="absolute inset-0 flex p-6 md:p-8">
              <div className={`w-${design.rightSide ? '3/5' : 'full'} h-full flex flex-col space-y-2`}>
                <h1 className={`text-3xl sm:text-4xl md:text-5xl ${design.fontStyle} ${design.hasAccent ? design.accent : ''} ${design.textColor}`}>
                  {design.title}
                </h1>
                
                <div className={`text-lg sm:text-xl md:text-2xl ${design.fontStyle} ${design.textColor} opacity-90`}>
                  {design.subtitle}
                </div>
                
                <div className={`mt-4 text-base sm:text-lg ${design.textColor} opacity-80`}>
                  {placeholderText}
                </div>
                
                {design.cornerElements && (
                  <>
                    <div className="absolute top-4 right-4">
                      <Code size={24} className={design.textColor} />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <SquareCode size={24} className={design.textColor} />
                    </div>
                  </>
                )}
              </div>
              
              {design.rightSide && (
                <div className="w-2/5 flex flex-col items-center justify-center text-right space-y-4">
                  <div className={`text-4xl md:text-5xl font-bold ${design.textColor}`}>文档</div>
                  <div className={`text-4xl md:text-5xl font-bold ${design.textColor}`}>可视</div>
                </div>
              )}
            </div>
            
            {/* Watermark */}
            <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">
              PosterAI
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-3 mt-4 animate-fade-in">
        <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-1 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
          <Download className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          {downloadText}
        </Button>
        <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-1 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
          <Share2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          {shareText}
        </Button>
      </div>
    </div>
  );
};

export default PosterPreview;
