
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Check } from 'lucide-react';

type Style = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  englishDescription: string;
  background: string;
  textColor: string;
  accent?: string;
  imageUrl?: string;
};

type StyleSelectorProps = {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  language: string;
};

const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
  language,
}) => {
  const isMobile = useIsMobile();
  
  const styles: Style[] = [
    { 
      id: 'info_card', 
      name: '快速生成风格', 
      englishName: 'Quick Info Card',
      description: '节省时间简洁展示', 
      englishDescription: 'Clean and time-saving display',
      background: 'bg-blue-50',
      textColor: 'text-blue-900',
      accent: 'border-blue-200',
    },
    { 
      id: 'professional', 
      name: '专业美观风格', 
      englishName: 'Professional Design',
      description: '高质量设计感', 
      englishDescription: 'High-quality design aesthetic',
      background: 'bg-green-50',
      textColor: 'text-green-900',
      accent: 'border-green-200',
    },
    { 
      id: 'interactive', 
      name: '交互体验风格', 
      englishName: 'Interactive Experience',
      description: '动态内容展示', 
      englishDescription: 'Dynamic content display',
      background: 'bg-yellow-50',
      textColor: 'text-yellow-900',
      accent: 'border-yellow-200',
    },
    { 
      id: 'one_click', 
      name: '一键分享风格', 
      englishName: 'One-click Share',
      description: '便捷传播信息', 
      englishDescription: 'Easy information sharing',
      background: 'bg-purple-50',
      textColor: 'text-purple-900',
      accent: 'border-purple-200',
    },
    { 
      id: 'soft_pink', 
      name: '柔美粉色风格', 
      englishName: 'Soft Pink Style',
      description: '温柔视觉体验', 
      englishDescription: 'Gentle visual experience',
      background: 'bg-pink-50',
      textColor: 'text-purple-700',
      accent: 'border-pink-200',
    },
    { 
      id: 'dark_contrast', 
      name: '黑白对比风格', 
      englishName: 'Dark Contrast',
      description: '强烈视觉冲击', 
      englishDescription: 'Strong visual impact',
      background: 'bg-black',
      textColor: 'text-white',
      accent: 'border-yellow-400',
    },
    { 
      id: 'minimalist', 
      name: '极简自然风格', 
      englishName: 'Minimalist Nature',
      description: '简约大气设计', 
      englishDescription: 'Simple elegant design',
      background: 'bg-gray-100',
      textColor: 'text-gray-800',
      accent: 'border-gray-300',
    },
    { 
      id: 'grid_system', 
      name: '网格构成风格', 
      englishName: 'Grid System',
      description: '结构化设计系统', 
      englishDescription: 'Structured design system',
      background: 'bg-gray-900',
      textColor: 'text-white',
      accent: 'border-red-500',
    },
    { 
      id: 'tech_blue', 
      name: '科技蓝风格', 
      englishName: 'Tech Blue',
      description: '现代科技感设计', 
      englishDescription: 'Modern tech design',
      background: 'bg-blue-50',
      textColor: 'text-blue-700',
      accent: 'border-blue-300',
    },
    { 
      id: 'green_nature', 
      name: '绿色环保风格', 
      englishName: 'Green Nature',
      description: '自然生态主题', 
      englishDescription: 'Natural eco theme',
      background: 'bg-green-800',
      textColor: 'text-white',
      accent: 'border-green-300',
    },
  ];

  return (
    <div className="space-y-2">
      <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'gap-3'}`}>
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`text-center px-3 py-3 rounded-xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden
              ${selectedStyle === style.id
                ? 'ring-2 ring-primary shadow-lg'
                : 'ring-1 ring-slate-700 hover:ring-slate-600'
              }`}
          >
            <div className={`absolute inset-0 ${style.background} opacity-80`}></div>
            <div className={`relative z-10 ${style.textColor}`}>
              <div className="font-medium">
                {selectedStyle === style.id && (
                  <div className="absolute -right-1 -top-1 bg-primary rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
                {language === 'zh' ? style.name : style.englishName}
              </div>
              <span className={`text-xs ${style.textColor} opacity-80`}>
                {language === 'zh' ? style.description : style.englishDescription}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
