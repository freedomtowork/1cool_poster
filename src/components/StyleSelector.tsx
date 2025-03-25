
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

type Style = {
  id: string;
  name: string;
  description: string;
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
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
    { id: 'vibrant', name: 'Vibrant', description: 'Bold and colorful style' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
    { id: 'retro', name: 'Retro', description: 'Vintage and nostalgic feel' },
  ];

  return (
    <div className="space-y-2 mb-4 md:mb-6">
      {!isMobile && <label className="block text-sm font-medium mb-2">Select Style</label>}
      <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-3'}`}>
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`glass text-center px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 ${
              selectedStyle === style.id
                ? 'border-primary/50 shadow-md'
                : 'border-transparent hover:border-primary/30'
            }`}
          >
            <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{style.name}</div>
            <span className="text-xs text-muted-foreground">{style.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
