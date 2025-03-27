
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SceneSelector from './SceneSelector';
import StyleSelector from './StyleSelector';
import PosterPreview from './PosterPreview';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Save, Undo, Redo, Copy } from 'lucide-react';

const PosterGenerator = () => {
  const [language, setLanguage] = useState('zh');
  const [scene, setScene] = useState('xiaohongshu');
  const [style, setStyle] = useState('info_card');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('text');
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
  };

  const placeholderText = language === 'zh' 
    ? '在此输入您的文字内容，AI将为您生成精美海报...' 
    : 'Enter your text here, and our AI will generate a beautiful poster...';

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
      {/* Left side - Editor Panel */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-slate-900 p-4 overflow-y-auto`}>
        <div className="max-w-md mx-auto space-y-6">
          {/* Text Input - First */}
          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4 text-slate-200">
              {language === 'zh' ? '输入文字' : 'Enter Text'}
            </h3>
            <Textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholderText}
              className="min-h-[100px] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
            />
          </div>
          
          {/* Style Selector - Second */}
          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4 text-slate-200">
              {language === 'zh' ? '选择风格' : 'Choose Style'}
            </h3>
            <StyleSelector 
              selectedStyle={style} 
              onStyleChange={setStyle}
              language={language}
            />
          </div>
          
          {/* Scene/Platform Selector - Third */}
          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4 text-slate-200">
              {language === 'zh' ? '选择平台' : 'Choose Platform'}
            </h3>
            <SceneSelector 
              selectedScene={scene} 
              selectedLanguage={language} 
              onSceneChange={setScene} 
            />
          </div>
          
          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating} 
            className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            {isGenerating 
              ? (language === 'zh' ? '生成中...' : 'Generating...') 
              : (language === 'zh' ? '生成海报' : 'Generate Poster')}
          </Button>
        </div>
      </div>
      
      {/* Right side - Canvas/Preview */}
      <div className={`${isMobile ? 'w-full mt-6' : 'w-2/3'} flex items-center justify-center p-4 bg-slate-950`}>
        <PosterPreview 
          language={language}
          scene={scene}
          style={style}
          text={text}
          loading={isGenerating}
        />
      </div>
    </div>
  );
};

export default PosterGenerator;
