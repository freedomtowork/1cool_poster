
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
import { ChevronDown, ChevronUp, Save, Undo, Redo, Copy } from 'lucide-react';

const PosterGenerator = () => {
  const [language, setLanguage] = useState('zh');
  const [scene, setScene] = useState('xiaohongshu');
  const [style, setStyle] = useState('minimal');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('style');
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
    <div className={!isMobile ? 'flex flex-row' : ''}>
      {/* Editor Toolbar */}
      {!isMobile && (
        <div className="editor-toolbar">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Undo size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Redo size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Copy size={16} />
            </Button>
          </div>
          <div>
            <Button variant="default" size="sm" className="gap-1 bg-teal-500 hover:bg-teal-600 text-white">
              <Save size={16} />
              保存样式
            </Button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`${!isMobile ? 'editor-content' : 'pt-16 pb-4 px-4'} flex-1`}>
        <div className="max-w-4xl mx-auto">
          {isMobile ? (
            <div className="flex flex-col gap-6 max-w-md mx-auto">
              <div className="glass-card rounded-xl p-4 md:p-6">
                <Collapsible 
                  open={openSection === 'language'} 
                  onOpenChange={() => toggleSection('language')}
                  className="mb-4"
                >
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium text-slate-200">
                    <span>语言</span>
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
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium text-slate-200">
                    <span>平台</span>
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
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium text-slate-200">
                    <span>样式</span>
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
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left font-medium text-slate-200">
                    <span>输入文字</span>
                    {openSection === 'text' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <Textarea 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={placeholderText}
                      className="min-h-[100px] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                    />
                  </CollapsibleContent>
                </Collapsible>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {isGenerating ? '生成中...' : '生成海报'}
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
            <div className="flex items-start justify-center space-x-8">
              <PosterPreview 
                language={language}
                scene={scene}
                style={style}
                text={text}
                loading={isGenerating}
              />
              
              <div className="glass-card rounded-xl p-6 w-1/3">
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
                  <label className="block text-sm font-medium mb-2 text-slate-300">输入文字</label>
                  <Textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholderText}
                    className="min-h-[120px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {isGenerating ? '生成中...' : '生成海报'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;
