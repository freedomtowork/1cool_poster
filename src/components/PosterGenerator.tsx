
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import LanguageSelector from './LanguageSelector';
import SceneSelector from './SceneSelector';
import StyleSelector from './StyleSelector';
import PosterPreview from './PosterPreview';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

const PosterGenerator = () => {
  const [language, setLanguage] = useState('en');
  const [scene, setScene] = useState('twitter');
  const [style, setStyle] = useState('minimal');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('language');
  const isMobile = useIsMobile();

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
    setOpenSection('scene');
  };

  const placeholderText = language === 'zh' 
    ? '在此输入您的文字内容，AI将为您生成精美海报...' 
    : 'Enter your text here, and our AI will generate a beautiful poster...';

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="py-10 md:py-20" id="generator">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Create Your AI Poster</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Choose your language, platform, and style. Then enter your text to generate a custom poster.
          </p>
        </div>
        
        {isMobile ? (
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <div className="glass rounded-xl p-4 md:p-6">
              <Collapsible 
                open={openSection === 'language'} 
                onOpenChange={() => toggleSection('language')}
                className="mb-4"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium">
                  <span>Language</span>
                  {openSection === 'language' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <LanguageSelector 
                    selectedLanguage={language} 
                    onLanguageChange={handleLanguageChange} 
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible 
                open={openSection === 'scene'} 
                onOpenChange={() => toggleSection('scene')}
                className="mb-4"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium">
                  <span>Platform</span>
                  {openSection === 'scene' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <SceneSelector 
                    selectedScene={scene} 
                    selectedLanguage={language} 
                    onSceneChange={(newScene) => {
                      setScene(newScene);
                      setOpenSection('style');
                    }} 
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible 
                open={openSection === 'style'} 
                onOpenChange={() => toggleSection('style')}
                className="mb-4"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium">
                  <span>Style</span>
                  {openSection === 'style' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <StyleSelector 
                    selectedStyle={style} 
                    onStyleChange={(newStyle) => {
                      setStyle(newStyle);
                      setOpenSection('text');
                    }} 
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible 
                open={openSection === 'text'} 
                onOpenChange={() => toggleSection('text')}
                className="mb-4"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium">
                  <span>Your Text</span>
                  {openSection === 'text' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <Textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholderText}
                    className="min-h-[100px] mb-4"
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating} 
                className="w-full mt-2"
              >
                {isGenerating ? 'Generating...' : 'Generate Poster'}
              </Button>
            </div>
            
            <div className="flex justify-center mt-4">
              <PosterPreview 
                language={language}
                scene={scene}
                style={style}
                text={text}
                loading={isGenerating}
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default PosterGenerator;
