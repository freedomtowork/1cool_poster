
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
  const [style, setStyle] = useState('tech_card');
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
    ? '请输入结构化文字内容，例如：\n\n主标题：[您的主标题]\n副标题：[您的副标题]\n标语：[您的标语]\n正文：[您的正文内容]\n账号：[您的账号名称]\n日期：[日期信息]\n\n您可以根据需要添加或删除以上元素。AI会根据您的输入生成精美海报。' 
    : 'Please enter structured text content, such as:\n\nMain Title: [Your Main Title]\nSubtitle: [Your Subtitle]\nTagline: [Your Tagline]\nBody Text: [Your Body Content]\nAccount: [Your Account Name]\nDate: [Date Information]\n\nYou can add or remove the above elements as needed. The AI will generate a beautiful poster based on your input.';

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
      {/* Left side - Editor Panel */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-slate-900 p-4 overflow-y-auto`}>
        <div className="max-w-md mx-auto space-y-6">
          {/* Text Input */}
          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4 text-slate-200">
              {language === 'zh' ? '输入文字' : 'Enter Text'}
            </h3>
            <Textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholderText}
              className="min-h-[150px] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
            />
            <div className="text-xs text-slate-400 italic">
              {language === 'zh' 
                ? '提示：使用上述格式可让AI更好地理解您的内容结构' 
                : 'Tip: Using the format above will help the AI better understand your content structure'}
            </div>
          </div>
          
          {/* Style Selector */}
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
      <div className={`${isMobile ? 'w-full mt-6' : 'w-2/3'} flex flex-col p-4 bg-slate-950`}>
        {/* Platform selector moved to above canvas */}
        <div className="mb-4 glass-card rounded-xl p-4">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '选择平台' : 'Choose Platform'}
          </h3>
          <SceneSelector 
            selectedScene={scene} 
            selectedLanguage={language} 
            onSceneChange={setScene} 
          />
        </div>
        
        {/* Poster preview */}
        <div className="flex-1 flex items-center justify-center">
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
  );
};

export default PosterGenerator;
