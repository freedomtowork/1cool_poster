
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
    // For now, create a simple gradient background based on style
    let background;
    switch (style) {
      case 'minimal':
        background = 'from-blue-500 to-cyan-400';
        break;
      case 'vibrant':
        background = 'from-pink-500 to-purple-500';
        break;
      case 'elegant':
        background = 'from-amber-400 to-orange-400';
        break;
      case 'retro':
        background = 'from-yellow-400 to-orange-500';
        break;
      default:
        background = 'from-blue-500 to-cyan-400';
    }
    return `bg-gradient-to-br ${background}`;
  };

  // Get appropriate font style based on selected style
  const getFontStyle = () => {
    switch (style) {
      case 'minimal':
        return 'font-light';
      case 'vibrant':
        return 'font-bold';
      case 'elegant':
        return 'font-medium italic';
      case 'retro':
        return 'font-semibold';
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

  return (
    <div className="flex flex-col items-center">
      <div className={`w-full max-w-md ${getAspectRatio()} rounded-xl overflow-hidden shadow-lg relative`}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 ${generatePlaceholderImage()}`}>
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
              <div className={`text-center ${getFontStyle()} text-white`}>
                <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} break-words drop-shadow-md`}>
                  {text || (language === 'zh' ? '在此输入您的文字' : 'Enter your text here')}
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
          下载
        </Button>
        <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-1 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
          <Share2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          分享
        </Button>
      </div>
    </div>
  );
};

export default PosterPreview;
