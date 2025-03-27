
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Check } from 'lucide-react';

type Style = {
  id: string;
  name: string;
  description: string;
  background: string;
};

type StyleSelectorProps = {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
};

const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
}) => {
  const isMobile = useIsMobile();
  
  const styles: Style[] = [
    { 
      id: 'minimal', 
      name: '简约', 
      description: '清新简洁设计', 
      background: 'bg-gradient-to-br from-blue-500 to-cyan-400'
    },
    { 
      id: 'vibrant', 
      name: '活力', 
      description: '鲜明色彩风格', 
      background: 'bg-gradient-to-br from-pink-500 to-purple-500'
    },
    { 
      id: 'elegant', 
      name: '优雅', 
      description: '精致高级风格', 
      background: 'bg-gradient-to-br from-amber-400 to-orange-400'
    },
    { 
      id: 'retro', 
      name: '复古', 
      description: '复古风格设计', 
      background: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
  ];

  return (
    <div className="space-y-2">
      <div className={`grid grid-cols-2 gap-3`}>
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
                {style.name}
              </div>
              <span className="text-xs text-white/80">{style.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
