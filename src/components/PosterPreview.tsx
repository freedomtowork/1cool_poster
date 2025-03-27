
import React from 'react';
import { Download, Share2 } from 'lucide-react';
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

  // Generate a placeholder image based on the parameters
  const generatePlaceholderImage = () => {
    // Create a gradient background based on style
    let background;
    switch (style) {
      case 'tech_card':
        background = 'from-blue-400 to-cyan-300';
        break;
      case 'business_info':
        background = 'from-slate-600 to-slate-400';
        break;
      case 'fluid_tech':
        background = 'from-blue-600 to-indigo-400';
        break;
      case 'minimalist_grid':
        background = 'from-gray-200 to-gray-300';
        break;
      case 'digital_ticket':
        background = 'from-purple-500 to-pink-400';
        break;
      case 'new_constructivist':
        background = 'from-yellow-400 to-orange-500';
        break;
      case 'luxury_nature':
        background = 'from-emerald-400 to-green-600';
        break;
      case 'industrial_rebel':
        background = 'from-stone-700 to-stone-500';
        break;
      case 'cute_knowledge':
        background = 'from-pink-300 to-rose-200';
        break;
      case 'simple_business':
        background = 'from-blue-500 to-blue-300';
        break;
      default:
        background = 'from-blue-500 to-cyan-400';
    }
    return `bg-gradient-to-br ${background}`;
  };

  // Get appropriate font style based on selected style
  const getFontStyle = () => {
    switch (style) {
      case 'tech_card':
        return 'font-medium';
      case 'business_info':
        return 'font-semibold';
      case 'fluid_tech':
        return 'font-bold';
      case 'minimalist_grid':
        return 'font-light';
      case 'digital_ticket':
        return 'font-medium';
      case 'new_constructivist':
        return 'font-extrabold';
      case 'luxury_nature':
        return 'font-medium italic';
      case 'industrial_rebel':
        return 'font-bold uppercase';
      case 'cute_knowledge':
        return 'font-semibold';
      case 'simple_business':
        return 'font-normal';
      default:
        return 'font-normal';
    }
  };

  // Determine aspect ratio based on scene
  const getAspectRatio = () => {
    if (scene === 'instagram' || scene === 'xiaohongshu') {
      return 'aspect-square'; // 1:1
    } else if (scene === 'twitter' || scene === 'facebook') {
      return isMobile ? 'aspect-[4/3]' : 'aspect-[16/9]'; // 16:9 or 4:3 on mobile
    } else if (scene === 'wechat') {
      return 'aspect-[3/4]'; // 3:4
    }
    return 'aspect-[4/3]'; // Default
  };

  const downloadText = language === 'zh' ? '下载' : 'Download';
  const shareText = language === 'zh' ? '分享' : 'Share';
  const placeholderText = language === 'zh' ? '在此输入您的文字' : 'Enter your text here';

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <div className={`w-full ${getAspectRatio()} rounded-xl overflow-hidden shadow-lg relative`}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 ${generatePlaceholderImage()}`}>
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
              <div className={`text-center ${getFontStyle()} text-white`}>
                <p className="text-xl md:text-2xl break-words drop-shadow-md">
                  {text || placeholderText}
                </p>
              </div>
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
