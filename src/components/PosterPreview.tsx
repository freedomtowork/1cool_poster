
import React from 'react';
import { Download, Share2, Star, Palette, Code, SquareCode, Infinity, BookOpen, Lightbulb, BarChart } from 'lucide-react';
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
      icon: <Palette size={24} className="text-white" />,
      secondIcon: <Code size={24} className="text-white" />,
    };

    switch (style) {
      case 'tech_card':
        design.background = 'bg-gradient-to-br from-blue-50 to-blue-100';
        design.textColor = 'text-blue-900';
        design.fontStyle = 'font-medium';
        design.layout = 'grid grid-cols-2 gap-4 p-8';
        design.hasNumbers = true;
        design.title = language === 'zh' ? '科技创新' : 'Tech Innovation';
        design.subtitle = language === 'zh' ? '探索AI驱动的未来' : 'Exploring AI-driven Future';
        design.icon = <Code size={28} className="text-blue-600" />;
        break;
      case 'business_info':
        design.background = 'bg-gradient-to-br from-slate-50 to-slate-100';
        design.textColor = 'text-slate-900';
        design.fontStyle = 'font-medium';
        design.accent = 'border-l-4 border-slate-400 pl-4';
        design.hasAccent = true;
        design.title = language === 'zh' ? '商业资讯' : 'Business Info';
        design.subtitle = language === 'zh' ? '专业市场分析与见解' : 'Professional Market Analysis';
        design.icon = <BarChart size={28} className="text-slate-700" />;
        break;
      case 'flowing_tech':
        design.background = 'bg-gradient-to-r from-blue-400 to-indigo-500';
        design.textColor = 'text-white';
        design.fontStyle = 'font-bold';
        design.hasAccent = true;
        design.accent = 'border-b-2 border-white/50';
        design.title = language === 'zh' ? '流动科技' : 'Flowing Tech';
        design.subtitle = language === 'zh' ? '创新数字体验设计' : 'Innovative Digital Experience';
        design.icon = <Infinity size={28} className="text-white" />;
        break;
      case 'minimalist_grid':
        design.background = 'bg-white';
        design.textColor = 'text-black';
        design.fontStyle = 'font-medium';
        design.layout = 'flex flex-col items-center justify-center text-center';
        design.hasGrid = true;
        design.title = language === 'zh' ? '极简设计' : 'Minimalist Design';
        design.subtitle = language === 'zh' ? '网格构成美学原理' : 'Grid Composition Aesthetics';
        design.icon = <SquareCode size={28} className="text-black" />;
        break;
      case 'digital_minimal':
        design.background = 'bg-gradient-to-br from-gray-50 to-gray-100';
        design.textColor = 'text-gray-900';
        design.fontStyle = 'font-bold';
        design.hasBorder = true;
        design.accent = 'border border-dashed border-gray-300';
        design.title = language === 'zh' ? '数字票券' : 'Digital Ticket';
        design.subtitle = language === 'zh' ? '简约现代设计语言' : 'Simple Modern Design Language';
        design.icon = <Share2 size={28} className="text-gray-700" />;
        break;
      case 'new_teaching':
        design.background = 'bg-amber-50';
        design.textColor = 'text-amber-900';
        design.fontStyle = 'font-extrabold';
        design.accent = 'text-amber-600';
        design.hasAccent = true;
        design.cornerElements = true;
        design.title = language === 'zh' ? '教学创新' : 'Teaching Innovation';
        design.subtitle = language === 'zh' ? '新构成主义教育方法' : 'New Constructivist Methods';
        design.icon = <BookOpen size={28} className="text-amber-600" />;
        break;
      case 'luxury_nature':
        design.background = 'bg-gradient-to-r from-green-800 to-green-900';
        design.textColor = 'text-white';
        design.fontStyle = 'font-normal';
        design.layout = 'flex flex-col items-start justify-center';
        design.hasBorder = false;
        design.title = language === 'zh' ? '自然奢华' : 'Luxury Nature';
        design.subtitle = language === 'zh' ? '意境优雅的生态设计' : 'Elegant Ecological Design';
        design.icon = <Lightbulb size={28} className="text-green-300" />;
        break;
      case 'industrial_trendy':
        design.background = 'bg-gray-900';
        design.textColor = 'text-white';
        design.fontStyle = 'font-bold';
        design.hasGrid = true;
        design.hasAccent = true;
        design.accent = 'text-red-500';
        design.title = language === 'zh' ? '工业风潮' : 'Industrial Trend';
        design.subtitle = language === 'zh' ? '反叛现代设计美学' : 'Rebellious Modern Design';
        design.icon = <Star size={28} className="text-red-500" />;
        break;
      case 'cute_knowledge':
        design.background = 'bg-gradient-to-r from-pink-50 to-pink-100';
        design.textColor = 'text-purple-800';
        design.fontStyle = 'font-bold';
        design.hasAccent = true;
        design.cornerElements = true;
        design.title = language === 'zh' ? '软萌知识' : 'Cute Knowledge';
        design.subtitle = language === 'zh' ? '可爱风格学习内容' : 'Adorable Learning Content';
        design.icon = <Lightbulb size={28} className="text-purple-500" />;
        break;
      case 'business_simple':
        design.background = 'bg-white';
        design.textColor = 'text-gray-800';
        design.fontStyle = 'font-medium';
        design.layout = 'flex flex-col items-start justify-center';
        design.hasAccent = true;
        design.cornerElements = true;
        design.title = language === 'zh' ? '商务简报' : 'Business Brief';
        design.subtitle = language === 'zh' ? '信息简约清晰呈现' : 'Clear Concise Information';
        design.icon = <BarChart size={28} className="text-gray-600" />;
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
  
  // Process text content to include in the poster
  const displayText = text || (language === 'zh' ? 
    '在此展示您的重点内容，讲述您的故事或分享您的知识。根据不同风格，内容将以不同方式呈现。' : 
    'Display your key content here, tell your story or share your knowledge. Content will be presented differently according to different styles.');

  // Format text content based on style
  const formatTextContent = () => {
    if (style === 'industrial_trendy' || style === 'tech_card') {
      // For list-style display
      const points = displayText.split('。').filter(p => p.trim().length > 0);
      return (
        <div className="mt-4 space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex items-start">
              <span className={`text-sm font-bold mr-2 ${design.accent ? design.accent : design.textColor}`}>0{index + 1}</span>
              <p className={`text-sm ${design.textColor} opacity-90`}>{point}。</p>
            </div>
          ))}
        </div>
      );
    } else if (style === 'minimalist_grid') {
      // Grid-style layout
      return (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {displayText.split('。').filter(p => p.trim().length > 0).map((point, index) => (
            <div key={index} className={`text-sm p-2 ${design.textColor} opacity-80 border border-gray-200`}>
              {point}。
            </div>
          ))}
        </div>
      );
    } else {
      // Default paragraph display
      return (
        <div className={`mt-4 text-sm sm:text-base ${design.textColor} opacity-80`}>
          {displayText}
        </div>
      );
    }
  };

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
              <div className={`w-${design.rightSide ? '3/5' : 'full'} h-full flex flex-col ${design.hasBorder ? design.accent : ''}`}>
                <div className="flex items-center mb-4">
                  {design.icon}
                  <div className="ml-2 font-bold text-sm opacity-80">PosterAI</div>
                </div>
                
                <h1 className={`text-2xl sm:text-3xl md:text-4xl ${design.fontStyle} ${design.hasAccent ? design.accent : ''} ${design.textColor}`}>
                  {design.title}
                </h1>
                
                <div className={`mt-1 text-lg sm:text-xl ${design.fontStyle} ${design.textColor} opacity-90`}>
                  {design.subtitle}
                </div>
                
                {formatTextContent()}
                
                {design.cornerElements && (
                  <>
                    <div className="absolute top-4 right-4">
                      {design.secondIcon || design.icon}
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <SquareCode size={24} className={design.textColor} />
                    </div>
                  </>
                )}
              </div>
              
              {design.rightSide && style === 'tech_card' && (
                <div className="w-2/5 flex flex-col items-center justify-center text-right space-y-4">
                  <div className={`text-4xl md:text-5xl font-bold ${design.textColor}`}>文档</div>
                  <div className={`text-4xl md:text-5xl font-bold ${design.textColor}`}>可视</div>
                </div>
              )}
            </div>
            
            {/* Watermark */}
            <div className="absolute bottom-2 right-2 text-xs text-white/70 mix-blend-difference">
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
