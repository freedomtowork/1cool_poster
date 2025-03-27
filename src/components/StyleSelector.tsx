
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
      id: 'tech_card', 
      name: '柔和科技卡片风', 
      englishName: 'Soft Tech Card',
      description: '清新科技感设计', 
      englishDescription: 'Fresh tech-inspired design',
      background: 'bg-gradient-to-br from-blue-50 to-white',
      textColor: 'text-blue-900',
      accent: 'border-blue-200',
    },
    { 
      id: 'business_info', 
      name: '现代商务资讯卡片风', 
      englishName: 'Modern Business Info',
      description: '专业商务信息展示', 
      englishDescription: 'Professional business display',
      background: 'bg-gradient-to-br from-slate-50 to-slate-100',
      textColor: 'text-slate-900',
      accent: 'border-slate-200',
    },
    { 
      id: 'flowing_tech', 
      name: '流动科技蓝风格', 
      englishName: 'Flowing Tech Blue',
      description: '动感科技界面', 
      englishDescription: 'Dynamic tech interface',
      background: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      textColor: 'text-white',
      accent: 'border-blue-300',
    },
    { 
      id: 'minimalist_grid', 
      name: '极简格栅主义封面风格', 
      englishName: 'Minimalist Grid Cover',
      description: '简约网格设计', 
      englishDescription: 'Simple grid design',
      background: 'bg-white',
      textColor: 'text-black',
      accent: 'border-gray-200',
    },
    { 
      id: 'digital_minimal', 
      name: '数字极简票券风', 
      englishName: 'Digital Minimal Ticket',
      description: '简洁数字票券设计', 
      englishDescription: 'Clean digital ticket design',
      background: 'bg-gradient-to-br from-gray-50 to-gray-100',
      textColor: 'text-gray-900',
      accent: 'border-gray-300',
    },
    { 
      id: 'new_teaching', 
      name: '新构成主义教学风', 
      englishName: 'New Constructivist Teaching',
      description: '创新教学内容展示', 
      englishDescription: 'Innovative teaching display',
      background: 'bg-amber-50',
      textColor: 'text-amber-900',
      accent: 'border-amber-200',
    },
    { 
      id: 'luxury_nature', 
      name: '奢华自然意境风', 
      englishName: 'Luxury Nature Aesthetic',
      description: '高雅自然艺术设计', 
      englishDescription: 'Elegant natural art design',
      background: 'bg-gradient-to-br from-green-800 to-green-900',
      textColor: 'text-white',
      accent: 'border-green-600',
    },
    { 
      id: 'industrial_trendy', 
      name: '新潮工业反叛风', 
      englishName: 'Trendy Industrial Rebel',
      description: '工业风格现代设计', 
      englishDescription: 'Industrial modern design',
      background: 'bg-gray-900',
      textColor: 'text-white',
      accent: 'border-red-500',
    },
    { 
      id: 'cute_knowledge', 
      name: '软萌知识卡片风', 
      englishName: 'Cute Knowledge Card',
      description: '可爱知识内容展示', 
      englishDescription: 'Adorable knowledge display',
      background: 'bg-gradient-to-br from-pink-50 to-pink-100',
      textColor: 'text-purple-800',
      accent: 'border-pink-200',
    },
    { 
      id: 'business_simple', 
      name: '商务简约信息卡片风', 
      englishName: 'Business Simple Info Card',
      description: '简约商务信息展示', 
      englishDescription: 'Simple business info display',
      background: 'bg-white',
      textColor: 'text-gray-800',
      accent: 'border-gray-200',
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
