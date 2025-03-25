
import React from 'react';
import { Check } from 'lucide-react';

type Language = {
  id: string;
  name: string;
  nativeName: string;
};

type LanguageSelectorProps = {
  selectedLanguage: string;
  onLanguageChange: (languageId: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const languages: Language[] = [
    { id: 'zh', name: 'Chinese', nativeName: '中文' },
    { id: 'en', name: 'English', nativeName: 'English' },
  ];

  return (
    <div className="space-y-2 mb-6">
      <label className="block text-sm font-medium mb-2">Select Language</label>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => onLanguageChange(language.id)}
            className={`glass text-center px-4 py-4 rounded-xl transition-all duration-300 border ${
              selectedLanguage === language.id
                ? 'border-primary/50 shadow-md'
                : 'border-transparent hover:border-primary/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{language.name}</span>
              {selectedLanguage === language.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
            <span className="text-sm text-muted-foreground">{language.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
