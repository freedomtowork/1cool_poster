
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
      description: '科技感与柔和色调结合', 
      englishDescription: 'Tech feel with soft colors',
      background: 'bg-gradient-to-br from-blue-400 to-cyan-300'
    },
    { 
      id: 'business_info', 
      name: '现代商务资讯卡片风', 
      englishName: 'Modern Business Info',
      description: '专业商务信息展示', 
      englishDescription: 'Professional business information',
      background: 'bg-gradient-to-br from-slate-600 to-slate-400'
    },
    { 
      id: 'fluid_tech', 
      name: '流动科技蓝风格', 
      englishName: 'Fluid Tech Blue',
      description: '流动感科技蓝色主题', 
      englishDescription: 'Flowing tech blue theme',
      background: 'bg-gradient-to-br from-blue-600 to-indigo-400'
    },
    { 
      id: 'minimalist_grid', 
      name: '极简格栅主义封面风格', 
      englishName: 'Minimalist Grid',
      description: '简约网格设计', 
      englishDescription: 'Simple grid design',
      background: 'bg-gradient-to-br from-gray-200 to-gray-300'
    },
    { 
      id: 'digital_ticket', 
      name: '数字极简票券风', 
      englishName: 'Digital Ticket',
      description: '数字化简约票券设计', 
      englishDescription: 'Minimalist digital ticket design',
      background: 'bg-gradient-to-br from-purple-500 to-pink-400'
    },
    { 
      id: 'new_constructivist', 
      name: '新构成主义教学风', 
      englishName: 'New Constructivism',
      description: '现代构成主义教学设计', 
      englishDescription: 'Modern constructivist teaching design',
      background: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    { 
      id: 'luxury_nature', 
      name: '奢华自然意境风', 
      englishName: 'Luxury Nature',
      description: '高级自然意境设计', 
      englishDescription: 'Premium natural scenery design',
      background: 'bg-gradient-to-br from-emerald-400 to-green-600'
    },
    { 
      id: 'industrial_rebel', 
      name: '新潮工业反叛风', 
      englishName: 'Industrial Rebel',
      description: '现代工业反叛设计', 
      englishDescription: 'Modern industrial rebel design',
      background: 'bg-gradient-to-br from-stone-700 to-stone-500'
    },
    { 
      id: 'cute_knowledge', 
      name: '软萌知识卡片风', 
      englishName: 'Cute Knowledge Card',
      description: '可爱知识卡片设计', 
      englishDescription: 'Cute knowledge card design',
      background: 'bg-gradient-to-br from-pink-300 to-rose-200'
    },
    { 
      id: 'simple_business', 
      name: '商务简约信息卡片风', 
      englishName: 'Simple Business Card',
      description: '简约商务信息卡片', 
      englishDescription: 'Simple business information card',
      background: 'bg-gradient-to-br from-blue-500 to-blue-300'
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
            <div className={`absolute inset-0 ${style.background} opacity-70`}></div>
            <div className="relative z-10 text-white">
              <div className="font-medium">
                {selectedStyle === style.id && (
                  <div className="absolute -right-1 -top-1 bg-primary rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
                {language === 'zh' ? style.name : style.englishName}
              </div>
              <span className="text-xs text-white/80">
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
