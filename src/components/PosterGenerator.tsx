
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StyleSelector from './StyleSelector';
import PosterPreview from './PosterPreview';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Download } from 'lucide-react';
import SceneSelector from './SceneSelector';

const PosterGenerator = () => {
  const [language, setLanguage] = useState('zh');
  const [scene, setScene] = useState('xiaohongshu');
  const [style, setStyle] = useState('tech_card');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleExport = () => {
    console.log('Exporting poster...');
    // Implementation for exporting would go here
  };

  const placeholderText = language === 'zh' 
    ? '请输入结构化文字内容，例如：\n\n主标题：[您的主标题]\n副标题：[您的副标题]\n标语：[您的标语]\n正文：[您的正文内容]\n账号：[您的账号名称]\n日期：[日期信息]\n\n您可以根据需要添加或删除以上元素。AI会根据您的输入生成精美海报。' 
    : 'Please enter structured text content, such as:\n\nMain Title: [Your Main Title]\nSubtitle: [Your Subtitle]\nTagline: [Your Tagline]\nBody Text: [Your Body Content]\nAccount: [Your Account Name]\nDate: [Date Information]\n\nYou can add or remove the above elements as needed. The AI will generate a beautiful poster based on your input.';

  // Define scenes based on language
  const scenes = React.useMemo(() => {
    if (language === 'zh') {
      return [
        { id: 'xiaohongshu', name: '小红书', description: '时尚生活分享平台' },
        { id: 'wechat', name: '微信', description: '内容创作与推广' },
        { id: 'bilibili', name: 'B站', description: '视频内容创作' },
      ];
    } else {
      return [
        { id: 'twitter', name: 'X (Twitter)', description: 'Microblogging platform' },
        { id: 'facebook', name: 'Facebook', description: 'Social networking' },
        { id: 'instagram', name: 'Instagram', description: 'Photo and video sharing' },
      ];
    }
  }, [language]);

  if (isMobile) {
    return (
      <div className="flex flex-col h-full p-4">
        {/* Text Input for mobile view */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '输入文字' : 'Enter Text'}
          </h3>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholderText}
            className="min-h-[200px] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
        </div>
        
        {/* Style Selector */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '选择风格' : 'Choose Style'}
          </h3>
          <StyleSelector 
            selectedStyle={style} 
            onStyleChange={setStyle}
            language={language}
          />
        </div>
        
        {/* Scene Selector */}
        <div className="glass-card rounded-xl p-4 mb-6">
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
          className="w-full mb-6 bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {isGenerating 
            ? (language === 'zh' ? '生成中...' : 'Generating...') 
            : (language === 'zh' ? '生成海报' : 'Generate Poster')}
        </Button>
        
        {/* Poster preview */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <PosterPreview 
            language={language}
            scene={scene}
            style={style}
            text={text}
            loading={isGenerating}
          />
        </div>
        
        {/* Export button */}
        <Button 
          onClick={handleExport} 
          className="w-full gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200"
        >
          <Download className="w-4 h-4" />
          {language === 'zh' ? '导出海报' : 'Export Poster'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left column - Text Input Panel */}
      <div className="w-1/4 bg-slate-900 p-4 overflow-y-auto">
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '输入文字' : 'Enter Text'}
          </h3>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 min-h-[calc(100vh-200px)] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
          <div className="text-xs text-slate-400 italic mb-4">
            {language === 'zh' 
              ? '提示：使用上述格式可让AI更好地理解您的内容结构' 
              : 'Tip: Using the format above will help the AI better understand your content structure'}
          </div>
        </div>
      </div>
      
      {/* Middle column - Platform tabs and Canvas */}
      <div className="w-2/4 flex flex-col p-4 bg-slate-950">
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
        
        {/* Export button */}
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleExport} 
            className="w-full sm:w-auto gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <Download className="w-4 h-4" />
            {language === 'zh' ? '导出海报' : 'Export Poster'}
          </Button>
        </div>
      </div>
      
      {/* Right column - Style selector and Generate button */}
      <div className="w-1/4 bg-slate-900 p-4 overflow-y-auto">
        <div className="glass-card rounded-xl p-4 md:p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '选择风格' : 'Choose Style'}
          </h3>
          <StyleSelector 
            selectedStyle={style} 
            onStyleChange={setStyle}
            language={language}
          />
        </div>
        
        <div className="glass-card rounded-xl p-4 md:p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            {language === 'zh' ? '选择平台' : 'Choose Platform'}
          </h3>
          <SceneSelector 
            selectedScene={scene}
            selectedLanguage={language}
            onSceneChange={setScene}
          />
        </div>
        
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating} 
          className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {isGenerating 
            ? (language === 'zh' ? '生成中...' : 'Generating...') 
            : (language === 'zh' ? '生成海报' : 'Generate Poster')}
        </Button>
      </div>
    </div>
  );
};

export default PosterGenerator;
