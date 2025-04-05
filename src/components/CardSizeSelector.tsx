import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

type CardSize = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  ratio: string;
};

type CardSizeSelectorProps = {
  selectedSize: string;
  onSizeChange: (sizeId: string) => void;
  language: string;
};

const CardSizeSelector: React.FC<CardSizeSelectorProps> = ({
  selectedSize,
  onSizeChange,
  language,
}) => {
  const isMobile = useIsMobile();
  
  const sizes: CardSize[] = [
    { 
      id: '1:1', 
      name: '方形', 
      englishName: 'Square',
      description: '特定内容', 
      ratio: '1:1',
    },
    { 
      id: '4:3', 
      name: '横版', 
      englishName: 'Landscape',
      description: '产品卡片', 
      ratio: '4:3',
    },
    { 
      id: '16:9', 
      name: '宽屏', 
      englishName: 'Widescreen',
      description: '视频缩略图', 
      ratio: '16:9',
    },
    { 
      id: '3:4', 
      name: '竖版', 
      englishName: 'Portrait',
      description: '手机海报', 
      ratio: '3:4',
    },
    { 
      id: '9:16', 
      name: '长图', 
      englishName: 'Tall',
      description: '手机全屏', 
      ratio: '9:16',
    },
  ];

  return (
    <div className="space-y-2">
      <div className={`grid grid-cols-5 ${isMobile ? 'gap-1' : 'gap-2'}`}>
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size.id)}
            className={`text-center px-2 py-2 rounded-lg transition-all duration-300 flex flex-col items-center justify-center relative
              ${selectedSize === size.id
                ? 'ring-2 ring-primary shadow-md'
                : 'ring-1 ring-slate-700 hover:ring-slate-600'
              }`}
          >
            <div className="relative z-10 text-slate-200">
              <div className="font-medium text-xs">
                {selectedSize === size.id && (
                  <div className="absolute -right-1 -top-1 bg-primary rounded-full p-0.5">
                    <Check size={10} />
                  </div>
                )}
                {language === 'zh' ? size.name : size.englishName}
              </div>
              <div className="text-xs text-slate-400">{size.ratio}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardSizeSelector; 