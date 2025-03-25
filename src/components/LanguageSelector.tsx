
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
    { id: 'zh', name: '中文', nativeName: '简体中文' },
    { id: 'en', name: 'English', nativeName: 'English' },
  ];

  return (
    <div className="space-y-2 mb-6">
      <label className="block text-sm font-medium mb-2 text-slate-300">选择语言</label>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => onLanguageChange(language.id)}
            className={`text-center px-4 py-3 rounded-xl transition-all duration-300
              ${selectedLanguage === language.id
                ? 'bg-slate-700/60 ring-1 ring-primary/50'
                : 'bg-slate-800/60 hover:bg-slate-700/40'
              }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-slate-200">{language.name}</span>
              {selectedLanguage === language.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
            <span className="text-sm text-slate-400 block text-left">{language.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
