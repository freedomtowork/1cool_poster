
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import LanguageSelector from './LanguageSelector';
import SceneSelector from './SceneSelector';
import StyleSelector from './StyleSelector';
import PosterPreview from './PosterPreview';

const PosterGenerator = () => {
  const [language, setLanguage] = useState('en');
  const [scene, setScene] = useState('twitter');
  const [style, setStyle] = useState('minimal');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!text.trim()) {
      // In a real application, you would show a toast notification here
      console.log('Please enter some text for your poster');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Reset scene selection based on language
    if (newLanguage === 'zh') {
      setScene('xiaohongshu');
    } else {
      setScene('twitter');
    }
  };

  const placeholderText = language === 'zh' 
    ? '在此输入您的文字内容，AI将为您生成精美海报...' 
    : 'Enter your text here, and our AI will generate a beautiful poster...';

  return (
    <div className="py-20" id="generator">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Create Your AI Poster</h2>
          <p className="text-muted-foreground">
            Choose your language, platform, and style. Then enter your text to generate a custom poster.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="glass rounded-xl p-6">
            <LanguageSelector 
              selectedLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            
            <SceneSelector 
              selectedScene={scene} 
              selectedLanguage={language} 
              onSceneChange={setScene} 
            />
            
            <StyleSelector 
              selectedStyle={style} 
              onStyleChange={setStyle} 
            />
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Enter Your Text</label>
              <Textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholderText}
                className="min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating} 
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Poster'}
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <PosterPreview 
              language={language}
              scene={scene}
              style={style}
              text={text}
              loading={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;
