import React, { useState, useEffect, useRef } from 'react';
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
import { Download, Settings } from 'lucide-react';
import SceneSelector from './SceneSelector';
import ModelConfigDialog, { ModelConfig } from './ModelConfigDialog';
import ModelConfigAlert from './ModelConfigAlert';
import axios from 'axios';

// 提示词类型定义
interface Prompt {
  role: string;
  background?: string;  // 可选字段
  task?: string;        // 可选字段
  requirements: {
    [key: string]: string[];
  };
  用户输入?: {
    内容: string;
    [key: string]: string;
  };
}

// 风格定义类型
interface Style {
  name: string;
  design: string[];
  typography: string[];
  visual: string[];
}

// 风格ID映射
const mapStyleId = (styleId: string): string => {
  const styleMap: { [key: string]: string } = {
    'tech_card': 'tech-soft',
    'business_info': 'business',
    'flowing_tech': 'tech-blue',
    'minimalist_grid': 'grid-minimalist',
    'digital_minimal': 'digital-ticket',
    'new_teaching': 'neo-teaching',
    'luxury_nature': 'luxury-nature',
    'industrial_trendy': 'rebel-industrial',
    'cute_knowledge': 'cute-knowledge',
    'business_simple': 'business-card'
  };
  
  return styleMap[styleId] || styleId; // 如果没有映射，则返回原始ID
};

// 导入html2canvas类型
declare global {
  interface Window {
    html2canvas?: (element: HTMLElement) => Promise<HTMLCanvasElement>;
  }
}

const PosterGenerator = () => {
  const language = 'zh';
  const [scene, setScene] = useState('xiaohongshu');
  const [style, setStyle] = useState('tech-soft');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [showConfigAlert, setShowConfigAlert] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const configButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // 模型配置状态
  const [modelConfig, setModelConfig] = useState<ModelConfig>(() => {
    const savedConfig = localStorage.getItem('modelConfig');
    return savedConfig 
      ? JSON.parse(savedConfig) 
      : {
          apiKey: '',
          apiUrl: 'https://api.silicon.run',
          model: 'deepseek/deepseek-chat-v3-0324:free',
          isConfigured: false
        };
  });

  // 当配置变更时保存到本地存储
  useEffect(() => {
    localStorage.setItem('modelConfig', JSON.stringify(modelConfig));
  }, [modelConfig]);

  // 加载提示词和风格数据
  const [promptData, setPromptData] = useState<{[key: string]: Prompt}>({});
  const [styleData, setStyleData] = useState<{[key: string]: Style}>({});

  // 加载提示词数据
  const loadPromptData = async () => {
    try {
      console.log('开始加载提示词数据...');
      
      const xiaohongshuResponse = await fetch('/prompts/redbook.json');
      if (!xiaohongshuResponse.ok) {
        throw new Error(`小红书提示词加载失败: ${xiaohongshuResponse.status} ${xiaohongshuResponse.statusText}`);
      }
      const xiaohongshuPrompt = await xiaohongshuResponse.json();
      
      const wechatResponse = await fetch('/prompts/wechat.json');
      if (!wechatResponse.ok) {
        throw new Error(`微信提示词加载失败: ${wechatResponse.status} ${wechatResponse.statusText}`);
      }
      const wechatPrompt = await wechatResponse.json();
      
      const bilibiliResponse = await fetch('/prompts/bilibili.json');
      if (!bilibiliResponse.ok) {
        throw new Error(`B站提示词加载失败: ${bilibiliResponse.status} ${bilibiliResponse.statusText}`);
      }
      const bilibiliPrompt = await bilibiliResponse.json();
      
      const promptDataObj = {
        xiaohongshu: xiaohongshuPrompt,
        wechat: wechatPrompt,
        bilibili: bilibiliPrompt
      };
      
      console.log('成功加载提示词数据:', Object.keys(promptDataObj));
      setPromptData(promptDataObj);
    } catch (error) {
      console.error('加载提示词数据失败，详细错误:', error);
    }
  };

  // 加载风格数据
  const loadStyleData = async () => {
    try {
      const styles = await fetch('/styles/styles.json').then(res => res.json());
      console.log('加载到的风格数据:', Object.keys(styles));
      setStyleData(styles);
    } catch (error) {
      console.error('加载风格数据失败:', error);
    }
  };

  // 初始数据加载
  useEffect(() => {
    console.log('初始化数据加载...');
    loadPromptData();
    loadStyleData();
  }, []);
  
  // 数据加载状态监控
  useEffect(() => {
    const hasPromptData = Object.keys(promptData).length > 0;
    const hasStyleData = Object.keys(styleData).length > 0;
    console.log('数据加载状态:', { hasPromptData, hasStyleData });
    
    if (hasPromptData && hasStyleData) {
      console.log('所有数据加载完成，可以生成海报');
    }
  }, [promptData, styleData]);

  // 构建完整提示词
  const buildPrompt = () => {
    const scenePrompt = promptData[scene];
    const mappedStyleId = mapStyleId(style);
    const styleInfo = styleData[mappedStyleId];
    
    console.log('构建提示词:', { scene, style, mappedStyleId });
    console.log('场景提示词数据:', scenePrompt);
    console.log('风格数据:', styleInfo);
    
    if (!scenePrompt || !styleInfo) {
      console.error('提示词构建失败，数据不完整:', { 
        scenePromptExists: !!scenePrompt, 
        styleInfoExists: !!styleInfo,
        mappedStyleId,
        availableScenes: Object.keys(promptData),
        availableStyles: Object.keys(styleData)
      });
      return null;
    }

    // 复制提示词对象，避免修改原始数据
    const fullPrompt = { ...scenePrompt };
    
    // 添加用户输入内容
    fullPrompt.用户输入 = {
      内容: text
    };

    // 添加风格要求
    if (!fullPrompt.requirements) {
      fullPrompt.requirements = {};
    }
    
    // 使用映射后的风格ID获取风格信息
    const mappedStyle = styleData[mappedStyleId];
    fullPrompt.requirements.设计风格 = mappedStyle.design;
    fullPrompt.requirements.排版风格 = mappedStyle.typography;
    fullPrompt.requirements.视觉元素 = mappedStyle.visual;

    // 构建提示词，直接使用role字段内容
    const rolePrompt = fullPrompt.role || '';

    // 构建基本要求部分
    const basicRequirements = Object.entries(fullPrompt.requirements)
      .filter(([key]) => key !== '设计风格' && key !== '排版风格' && key !== '视觉元素')
      .map(([key, value]) => `${key}：\n${value.map(item => `- ${item}`).join('\n')}`)
      .join('\n\n');

    // 最终提示词
    const finalPrompt = `${rolePrompt}

基本要求：
${basicRequirements}

风格要求：${mappedStyle.name}
设计风格：
${fullPrompt.requirements.设计风格.map(item => `- ${item}`).join('\n')}

排版风格：
${fullPrompt.requirements.排版风格.map(item => `- ${item}`).join('\n')}

视觉元素：
${fullPrompt.requirements.视觉元素.map(item => `- ${item}`).join('\n')}

用户输入内容：
${fullPrompt.用户输入.内容}

请生成一个HTML和内联CSS样式的海报，生成的HTML应该可以直接渲染为一个精美的海报。只返回HTML代码，不要有任何解释或其他文本, 不要有保存或下载按钮。
`;

    console.log('最终提示词:', finalPrompt);
    return finalPrompt;
  };

  // 调用API生成海报
  const generatePoster = async (prompt: string) => {
    try {
      // 根据配置的API地址决定使用哪个API端点
      const isOpenRouter = !modelConfig.apiUrl.includes('silicon.run');
      
      // 准备API URL
      const apiUrl = isOpenRouter 
        ? 'https://openrouter.ai/api/v1/chat/completions'  // OpenRouter 正确的API端点
        : `${modelConfig.apiUrl}/chat/completions`;     // 其他API端点
      
      console.log('调用API参数:', {
        url: apiUrl,
        model: modelConfig.model,
        apiKeyPartial: modelConfig.apiKey.substring(0, 5) + '...'
      });

      // 请求体日志
      console.log('请求体信息:', {
        model: modelConfig.model,
        messagesCount: 2, // 系统提示和用户消息
        systemPromptLength: "You are a professional web designer, skilled at creating beautiful HTML posters.".length,
        userPromptLength: prompt.length,
        temperature: 1.0,
        max_tokens: 10000
      });

      try {
        // 准备请求头部
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${modelConfig.apiKey}`
        };
        
        // 如果是OpenRouter API，添加额外的头部
        if (isOpenRouter) {
          // 使用安全的URL - 只使用encodeURIComponent（如有必要）
          headers['HTTP-Referer'] = window.location.origin;
          headers['X-Title'] = 'Multilingual Poster Generator';
        }

        console.log('Headers设置完成:', Object.keys(headers));

        // 准备系统提示
        const systemPrompt = "You are a professional web designer, skilled at creating beautiful HTML posters.";
        
        // 创建请求对象
        const requestData = {
          model: modelConfig.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature: 1.0,
          max_tokens: 10000,
        };

        console.log('发送请求到:', apiUrl);
        
        // 发送请求
        const response = await axios.post(apiUrl, requestData, { headers });

        console.log('API响应状态:', {
          status: response.status,
          statusText: response.statusText
        });

        console.log('API响应数据结构:', Object.keys(response.data));
        
        // 从响应中提取HTML
        let htmlContent = '';
        
        // 检查响应数据的类型和结构
        if (typeof response.data === 'string') {
          // 如果响应是字符串，可能是JSON字符串
          try {
            const jsonData = JSON.parse(response.data);
            if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].message && jsonData.choices[0].message.content) {
              htmlContent = jsonData.choices[0].message.content;
              console.log('从JSON字符串中提取HTML内容');
            } else {
              htmlContent = response.data;
              console.log('响应是字符串但不是预期的JSON格式，使用原始字符串');
            }
          } catch (e) {
            // 解析JSON失败，可能是纯HTML字符串
            htmlContent = response.data;
            console.log('响应是字符串但不是JSON，使用原始字符串');
          }
        } else if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
          // 标准API响应结构
          htmlContent = response.data.choices[0].message.content;
          console.log('从标准API响应结构中提取HTML内容');
        } else {
          // 其他情况，尝试检查响应中的内容字段
          if (response.data.content) {
            htmlContent = response.data.content;
            console.log('从content字段提取HTML内容');
          } else if (response.data.html) {
            htmlContent = response.data.html;
            console.log('从html字段提取HTML内容');
          } else {
            // 无法识别的响应结构，记录完整响应以便调试
            console.warn('无法识别的响应结构:', response.data);
            htmlContent = JSON.stringify(response.data);
            console.log('使用完整响应作为内容');
          }
        }
        
        console.log('原始返回内容类型:', typeof htmlContent);
        console.log('原始返回内容预览:', htmlContent?.substring(0, 100) + '...');
        
        // 提取纯HTML代码，去掉可能的markdown标记
        let cleanHtml = htmlContent || '';
        
        // 识别和处理不同的返回格式
        // 1. 标准markdown代码块 ```html ... ```
        const markdownMatch = cleanHtml.match(/```(?:html)?\s*([\s\S]*?)\s*```/);
        if (markdownMatch && markdownMatch[1]) {
          cleanHtml = markdownMatch[1].trim();
          console.log('从markdown代码块提取HTML成功');
        } 
        // 2. HTML文档(<!DOCTYPE html>或<html>开头)
        else if (cleanHtml.trim().match(/^(?:<!DOCTYPE\s+html|<html)/i)) {
          cleanHtml = cleanHtml.trim();
          console.log('识别到完整HTML文档');
        } 
        // 3. 纯HTML片段(以<开头)
        else if (cleanHtml.trim().startsWith('<')) {
          cleanHtml = cleanHtml.trim();
          console.log('识别到HTML片段');
        }
        // 其他情况，尝试提取任何HTML内容
        else {
          const anyHtmlMatch = cleanHtml.match(/<([a-z]+)[\s\S]*?>([\s\S]*?)<\/\1>/i);
          if (anyHtmlMatch) {
            cleanHtml = anyHtmlMatch[0];
            console.log('从文本中提取了可能的HTML内容');
          } else {
            // 尝试检查是否是JSON格式字符串，可能包含HTML内容
            try {
              let jsonObj = null;
              // 如果已经是字符串，尝试解析
              try {
                jsonObj = typeof cleanHtml === 'string' ? JSON.parse(cleanHtml) : cleanHtml;
              } catch (e) {
                console.log('内容不是有效的JSON字符串');
              }
              
              // 检查解析出的JSON对象中是否包含HTML内容
              if (jsonObj && jsonObj.choices && jsonObj.choices[0] && jsonObj.choices[0].message) {
                const messageContent = jsonObj.choices[0].message.content;
                console.log('从JSON对象中提取message.content:', messageContent ? '成功' : '失败');
                
                // 从messageContent中提取HTML
                const contentMarkdownMatch = messageContent.match(/```(?:html)?\s*([\s\S]*?)\s*```/);
                if (contentMarkdownMatch && contentMarkdownMatch[1]) {
                  cleanHtml = contentMarkdownMatch[1].trim();
                  console.log('从JSON内部markdown代码块提取HTML成功');
                } else if (messageContent.trim().match(/^(?:<!DOCTYPE\s+html|<html)/i)) {
                  cleanHtml = messageContent.trim();
                  console.log('从JSON内部识别到完整HTML文档');
                } else if (messageContent.trim().startsWith('<')) {
                  cleanHtml = messageContent.trim();
                  console.log('从JSON内部识别到HTML片段');
                } else {
                  console.warn('JSON内部content不包含有效HTML');
                  cleanHtml = messageContent; // 使用原始内容
                }
              } else {
                console.warn('未能识别JSON中的HTML内容结构');
              }
            } catch (e) {
              console.warn('处理可能的JSON字符串失败:', e);
              console.warn('未能识别HTML内容，使用原始返回');
            }
          }
        }

        console.log('清理后的HTML代码长度:', cleanHtml.length);
        console.log('清理后的HTML代码预览:', cleanHtml);
        
        return cleanHtml;
      } catch (axiosError) {
        if (axios.isAxiosError(axiosError)) {
          console.error('Axios错误:', {
            status: axiosError.response?.status,
            statusText: axiosError.response?.statusText,
            data: axiosError.response?.data,
            message: axiosError.message
          });
        } else {
          console.error('非Axios错误:', axiosError);
        }
        throw axiosError;
      }
    } catch (error) {
      console.error('API调用详细错误:', error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      console.log('请输入海报文本内容');
      return;
    }

    // 检查是否已配置模型
    if (!modelConfig.isConfigured) {
      setShowConfigAlert(true);
      return;
    }
    
    // 检查数据是否加载完成
    if (Object.keys(promptData).length === 0 || Object.keys(styleData).length === 0) {
      console.error('数据尚未加载完成，无法生成海报');
      // 可以添加一个提示，告知用户数据正在加载
      return;
    }
    
    // 检查选择的场景和风格是否有效
    if (!promptData[scene]) {
      console.error(`选择的场景 "${scene}" 不可用，可用场景:`, Object.keys(promptData));
      return;
    }
    
    const mappedStyleId = mapStyleId(style);
    if (!styleData[mappedStyleId]) {
      console.error(`选择的风格 "${style}" (映射为 "${mappedStyleId}") 不可用，可用风格:`, Object.keys(styleData));
      return;
    }
    
    // 设置生成状态并清空错误
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedHtml(null); // 清空现有生成结果，防止残留
    
    try {
      // 清空当前画布内容，移除所有子元素
      if (canvasRef.current) {
        // 使用innerHTML = ''来清除所有内容，包括可能残留的iframe和加载指示器
        canvasRef.current.innerHTML = '';
        
        // 移除可能存在的加载指示器和iframe
        const existingLoaders = document.querySelectorAll('.poster-loading-indicator');
        existingLoaders.forEach(loader => loader.remove());
        
        // 创建并添加一个新的加载指示器，确保ID唯一
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'poster-loading-indicator';
        loadingIndicator.style.position = 'absolute';
        loadingIndicator.style.top = '0';
        loadingIndicator.style.left = '0';
        loadingIndicator.style.width = '100%';
        loadingIndicator.style.height = '100%';
        loadingIndicator.style.display = 'flex';
        loadingIndicator.style.flexDirection = 'column';
        loadingIndicator.style.justifyContent = 'center';
        loadingIndicator.style.alignItems = 'center';
        loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        loadingIndicator.style.zIndex = '1000';
        loadingIndicator.innerHTML = `
          <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <div style="margin-top: 20px; font-size: 18px; color: white;">正在生成海报，请稍候...</div>
          <div style="margin-top: 10px; font-size: 14px; color: #cccccc;">这可能需要几秒钟时间</div>
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `;
        canvasRef.current.appendChild(loadingIndicator);
      }
      
      // 构建提示词
      const prompt = buildPrompt();
      if (!prompt) {
        throw new Error('提示词构建失败');
      }
      
      console.log('开始生成海报，模型:', modelConfig.model, '风格:', style, '场景:', scene);
      
      // 调用API生成海报
      let html = await generatePoster(prompt);
      console.log('获取到原始内容:', html ? '成功' : '失败', '长度:', html?.length);
      
      // 尝试处理可能的JSON格式响应
      if (html && html.trim().startsWith('{') && html.trim().endsWith('}')) {
        console.log('检测到JSON格式的返回内容，尝试直接提取HTML');
        try {
          const jsonResponse = JSON.parse(html);
          if (jsonResponse.choices && 
              jsonResponse.choices[0] && 
              jsonResponse.choices[0].message && 
              jsonResponse.choices[0].message.content) {
            
            const content = jsonResponse.choices[0].message.content;
            console.log('从JSON中提取content成功，长度:', content.length);
            
            // 查找markdown代码块
            const markdownMatch = content.match(/```(?:html)?\s*([\s\S]*?)\s*```/);
            if (markdownMatch && markdownMatch[1]) {
              html = markdownMatch[1].trim();
              console.log('从markdown代码块提取HTML成功');
            } else {
              html = content;
              console.log('使用content作为HTML内容');
            }
          }
        } catch (e) {
          console.warn('解析JSON失败，使用原始内容:', e);
        }
      }
      
      if (!html || html.trim().length === 0) {
        throw new Error('生成的HTML内容为空');
      }
      
      // 检查HTML内容是否包含基本的HTML结构
      if (!html.includes('<') || !html.includes('>')) {
        console.warn('生成的内容可能不是有效的HTML:', html.substring(0, 100));
        // 尝试处理特殊情况，但仍然继续处理
      }
      
      // 移除所有加载指示器
      if (canvasRef.current) {
        const loaders = canvasRef.current.querySelectorAll('.poster-loading-indicator');
        loaders.forEach(loader => loader.remove());
        
        // 完全清空画布再重新渲染，确保没有残留元素
        canvasRef.current.innerHTML = '';
        
        // 直接渲染HTML
        renderHtmlToCanvas(html, canvasRef.current);
      }
      
      // 更新状态，不依赖useEffect触发渲染
      setGeneratedHtml(html);
      console.log('HTML内容已渲染到画布');
      
    } catch (error) {
      console.error('生成海报失败:', error);
      setGenerationError(error instanceof Error ? error.message : '未知错误');
      
      // 清除所有加载指示器
      if (canvasRef.current) {
        const loaders = canvasRef.current.querySelectorAll('.poster-loading-indicator');
        loaders.forEach(loader => loader.remove());
        
        // 显示错误信息在画布上
        canvasRef.current.innerHTML = `
          <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #e74c3c; text-align: center; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 10px;">❌ 生成失败</div>
            <div style="font-size: 16px;">${error instanceof Error ? error.message : '未知错误'}</div>
            <div style="font-size: 14px; margin-top: 20px; color: #7f8c8d;">请尝试更改配置或重新生成</div>
          </div>
        `;
      }
    } finally {
      setIsGenerating(false);
      
      // 最后检查并清理任何可能残留的加载指示器
      setTimeout(() => {
        const remainingLoaders = document.querySelectorAll('.poster-loading-indicator');
        if (remainingLoaders.length > 0) {
          console.log('清理残留的加载指示器:', remainingLoaders.length);
          remainingLoaders.forEach(loader => loader.remove());
        }
      }, 500);
    }
  };

  const handleExport = () => {
    console.log('导出海报...');
    
    if (canvasRef.current && generatedHtml) {
      // 检查是否可以使用html2canvas
      if (typeof window !== 'undefined' && window.html2canvas) {
        console.log('使用html2canvas导出...');
        
        try {
          // 寻找iframe
          const iframe = canvasRef.current.querySelector('iframe');
          
          if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
            console.log('从iframe中导出内容');
            
            // 检查是否为完整HTML文档
            const isCompleteHtml = generatedHtml.includes('<!DOCTYPE html>') || 
                                 (generatedHtml.includes('<html') && generatedHtml.includes('</html>'));
            
            // 获取海报容器
            let exportElement: HTMLElement | null = null;
            
            if (isCompleteHtml) {
              // 对于完整HTML文档，尝试找到主要内容元素
              console.log('导出完整HTML文档内容');
              
              // 尝试查找主容器，根据您提供的样例HTML
              const mainContainer = iframe.contentDocument.querySelector('.main-container');
              if (mainContainer) {
                console.log('找到.main-container元素用于导出');
                exportElement = mainContainer as HTMLElement;
              } else {
                // 如果找不到主容器，尝试使用body内的第一个元素
                const firstElement = iframe.contentDocument.body.firstElementChild as HTMLElement;
                if (firstElement) {
                  console.log('使用body的第一个子元素导出');
                  exportElement = firstElement;
                } else {
                  console.log('使用整个body导出');
                  exportElement = iframe.contentDocument.body;
                }
              }
            } else {
              // 原来的逻辑，适用于HTML片段
              const content = iframe.contentDocument.querySelector('.poster-container');
              
              if (content) {
                console.log('找到海报容器，使用容器导出');
                exportElement = content as HTMLElement;
              } else {
                // 尝试获取主要内容元素（可能没有使用poster-container类）
                const posterDiv = iframe.contentDocument.querySelector('.poster, #poster, [class*="poster"]');
                
                if (posterDiv) {
                  console.log('找到poster元素，使用此元素导出');
                  exportElement = posterDiv as HTMLElement;
                } else if (iframe.contentDocument.body.firstElementChild) {
                  console.log('使用body的第一个子元素导出');
                  exportElement = iframe.contentDocument.body.firstElementChild as HTMLElement;
                } else {
                  console.log('没有找到特定元素，使用整个body导出');
                  exportElement = iframe.contentDocument.body;
                }
              }
            }
            
            if (exportElement) {
              // 计算合适的尺寸
              let width = exportElement.clientWidth || 600;
              let height = exportElement.clientHeight || 800;
              
              // 根据场景调整宽高比 - 对于完整HTML文档，尊重其原始尺寸
              if (!isCompleteHtml) {
                if (scene === 'xiaohongshu') {
                  // 小红书封面比例为3:4
                  console.log('应用小红书尺寸比例 3:4');
                  if (Math.abs(width / height - 0.75) > 0.1) {
                    if (width / height > 0.75) {
                      width = Math.round(height * 0.75);
                    } else {
                      height = Math.round(width / 0.75);
                    }
                  }
                } else if (scene === 'wechat') {
                  // 微信封面比例约为3.35:1
                  console.log('应用微信尺寸比例 3.35:1');
                  if (Math.abs(width / height - 3.35) > 0.1) {
                    if (width / height > 3.35) {
                      height = Math.round(width / 3.35);
                    } else {
                      width = Math.round(height * 3.35);
                    }
                  }
                } else if (scene === 'bilibili') {
                  // B站封面比例为16:10
                  console.log('应用B站尺寸比例 16:10');
                  if (Math.abs(width / height - 1.6) > 0.1) {
                    if (width / height > 1.6) {
                      width = Math.round(height * 1.6);
                    } else {
                      height = Math.round(width / 1.6);
                    }
                  }
                }
              } else {
                console.log('使用原始HTML设定的尺寸比例');
              }
              
              console.log(`导出尺寸: ${width}x${height}`);
              
              // 调整导出元素尺寸
              const originalWidth = exportElement.style.width;
              const originalHeight = exportElement.style.height;
              
              // 临时设置精确尺寸以确保正确导出
              exportElement.style.width = `${width}px`;
              exportElement.style.height = `${height}px`;
              
              // 等待DOM更新
              setTimeout(() => {
                // 使用html2canvas导出
                window.html2canvas!(exportElement as HTMLElement)
                  .then(canvas => {
                    // 创建下载链接
                    const link = document.createElement('a');
                    link.download = `${scene}-poster.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    
                    // 触发下载
                    link.click();
                    console.log('海报导出成功');
                    
                    // 恢复原始尺寸
                    exportElement!.style.width = originalWidth;
                    exportElement!.style.height = originalHeight;
                  })
                  .catch(err => {
                    console.error('html2canvas导出失败:', err);
                    // 恢复原始尺寸
                    exportElement!.style.width = originalWidth;
                    exportElement!.style.height = originalHeight;
                    
                    // 回退到导出HTML
                    exportAsHtml();
                  });
              }, 100);
            } else {
              console.warn('未找到可导出元素，尝试导出整个iframe');
              window.html2canvas!(iframe.contentDocument.body).then(canvas => {
                const link = document.createElement('a');
                link.download = `${scene}-poster.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                console.log('导出整个iframe内容成功');
              }).catch(() => exportAsHtml());
            }
          } else {
            console.warn('未找到iframe或iframe未加载完成，尝试导出整个画布');
            // 回退到导出整个画布
            window.html2canvas!(canvasRef.current).then(canvas => {
              const link = document.createElement('a');
              link.download = `${scene}-poster.png`;
              link.href = canvas.toDataURL('image/png');
              link.click();
              console.log('导出整个画布成功');
            }).catch(() => exportAsHtml());
          }
        } catch (exportError) {
          console.error('导出海报失败:', exportError);
          // 回退到导出HTML
          exportAsHtml();
        }
      } else {
        console.warn('html2canvas不可用，导出HTML文件');
        exportAsHtml();
      }
    } else {
      console.warn('画布不存在或没有生成内容，无法导出');
      alert('无内容可导出，请先生成海报');
    }
    
    // 帮助函数：导出HTML文件
    function exportAsHtml() {
      console.log('回退到导出HTML文件');
      const htmlToExport = generatedHtml;
      
      // 检查是否是完整HTML文档
      const isCompleteHtml = (typeof htmlToExport === 'string') && 
                           (htmlToExport.includes('<!DOCTYPE html>') || 
                           (htmlToExport.includes('<html') && htmlToExport.includes('</html>')));
      
      // 处理可能的JSON格式
      let finalHtml = htmlToExport;
      try {
        if (typeof htmlToExport === 'string' && 
            (htmlToExport.trim().startsWith('{') && htmlToExport.trim().endsWith('}'))) {
          const jsonObj = JSON.parse(htmlToExport);
          if (jsonObj.choices && jsonObj.choices[0] && jsonObj.choices[0].message) {
            const content = jsonObj.choices[0].message.content;
            if (content) {
              const markdownMatch = content.match(/```(?:html)?\s*([\s\S]*?)\s*```/);
              finalHtml = markdownMatch && markdownMatch[1] ? markdownMatch[1].trim() : content;
            }
          }
        }
      } catch (e) {
        console.warn('处理JSON失败，使用原始HTML', e);
      }
      
      // 如果不是HTML文档，添加基本HTML结构
      if (!isCompleteHtml) {
        finalHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${scene}-poster</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    .poster-container {
      background-color: white;
      ${scene === 'xiaohongshu' ? 'width: 600px; height: 800px;' : 
        scene === 'wechat' ? 'width: 1200px; height: 358px;' : 
        scene === 'bilibili' ? 'width: 800px; height: 500px;' : ''}
    }
  </style>
</head>
<body>
  <div class="poster-container">
    ${finalHtml}
  </div>
</body>
</html>`;
      }
      
      const blob = new Blob([finalHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${scene}-poster.html`;
      link.href = url;
      link.click();
      console.log('导出为HTML文件成功');
    }
  };

  const handleConfigChange = (newConfig: ModelConfig) => {
    setModelConfig(newConfig);
  };

  const placeholderText = '请输入结构化文字内容，例如：\n\n主标题：[您的主标题]\n副标题：[您的副标题]\n标语：[您的标语]\n正文：[您的正文内容]\n账号：[您的账号名称]\n日期：[日期信息]\n\n您可以根据需要添加或删除以上元素。AI会根据您的输入生成精美海报。';

  // 定义场景（仅中文）
  const scenes = React.useMemo(() => {
    return [
      { id: 'xiaohongshu', name: '小红书', description: '时尚生活分享平台' },
      { id: 'wechat', name: '微信', description: '内容创作与推广' },
      { id: 'bilibili', name: 'B站', description: '视频内容创作' },
    ];
  }, []);

  // 监控generatedHtml变化，确保在DOM更新后渲染画布
  useEffect(() => {
    // 注意：此useEffect已经不再负责初始渲染
    // 初始渲染直接在handleGenerate函数中完成
    // 此钩子主要用于处理其他地方可能触发的generatedHtml变化
    // 例如：窗口大小变化、组件props变化等情况
    
    if (generatedHtml && canvasRef.current) {
      console.log('generatedHtml变化触发渲染，画布状态:', {
        canvasExists: !!canvasRef.current,
        htmlLength: generatedHtml.length
      });
      
      // 移除所有存在的加载指示器
      const existingLoaders = document.querySelectorAll('.poster-loading-indicator');
      existingLoaders.forEach(loader => loader.remove());
      
      // 直接在这里渲染，不依赖setGeneratedHtml的副作用
      // 这样可以防止多个iframe堆叠的问题
      canvasRef.current.innerHTML = ''; // 先清除画布内容
      
      // 使用setTimeout确保DOM已更新
      setTimeout(() => {
        if (canvasRef.current) {
          renderHtmlToCanvas(generatedHtml, canvasRef.current);
        }
      }, 0);
    }
  }, [generatedHtml]);
  
  // 组件挂载时和卸载时的清理工作
  useEffect(() => {
    // 组件挂载时，确保没有残留的加载指示器
    const cleanupLoaders = () => {
      const existingLoaders = document.querySelectorAll('.poster-loading-indicator');
      existingLoaders.forEach(loader => loader.remove());
    };
    
    // 初始清理
    cleanupLoaders();
    
    // 组件卸载时清理
    return () => {
      cleanupLoaders();
    };
  }, []);
  
  // 渲染HTML到画布的函数
  const renderHtmlToCanvas = (html: string, canvasElement: HTMLDivElement) => {
    try {
      console.log('开始渲染HTML到画布元素...');
      
      // 先移除所有可能存在的iframe和加载指示器
      const existingIframes = document.querySelectorAll('iframe');
      if (existingIframes.length > 0) {
        console.log(`全局检测到${existingIframes.length}个iframe，检查是否需要清除...`);
        existingIframes.forEach(iframe => {
          // 检查是否是我们的canvas中的iframe
          if (iframe.parentElement && canvasElement.contains(iframe.parentElement)) {
            console.log('清除画布中的iframe');
            iframe.remove();
          }
        });
      }
      
      // 彻底清空当前内容，确保没有残留元素
      canvasElement.innerHTML = '';
      
      // 检查是否有残留的iframe（以防万一）
      const remainingIframes = canvasElement.querySelectorAll('iframe');
      if (remainingIframes.length > 0) {
        console.log(`检测到${remainingIframes.length}个残留iframe，正在清除...`);
        remainingIframes.forEach(iframe => iframe.remove());
      }
      
      // 检查是否有加载指示器残留
      const loaders = document.querySelectorAll('.poster-loading-indicator');
      loaders.forEach(loader => loader.remove());
      
      // 预处理HTML内容
      let processedHtml = html;
      
      // 检查内容是否是JSON字符串
      try {
        if (typeof html === 'string' && 
            (html.trim().startsWith('{') && html.trim().endsWith('}')) || 
            (html.trim().startsWith('[') && html.trim().endsWith(']'))) {
          console.log('检测到可能的JSON字符串，尝试解析');
          const jsonObj = JSON.parse(html);
          
          // 从JSON中提取HTML内容
          if (jsonObj.choices && jsonObj.choices[0] && jsonObj.choices[0].message) {
            const messageContent = jsonObj.choices[0].message.content;
            if (messageContent) {
              processedHtml = messageContent;
              console.log('从JSON对象中提取message.content成功');
              
              // 从messageContent中提取markdown代码块
              const contentMarkdownMatch = messageContent.match(/```(?:html)?\s*([\s\S]*?)\s*```/);
              if (contentMarkdownMatch && contentMarkdownMatch[1]) {
                processedHtml = contentMarkdownMatch[1].trim();
                console.log('从JSON内部markdown代码块提取HTML成功');
              }
            }
          }
        }
      } catch (e) {
        console.warn('JSON解析失败，使用原始内容:', e);
      }
      
      // 检查是否为完整HTML文档
      const isCompleteHtml = processedHtml.includes('<!DOCTYPE html>') || 
                            (processedHtml.includes('<html') && processedHtml.includes('</html>'));
      
      console.log('HTML内容类型:', isCompleteHtml ? '完整HTML文档' : '部分HTML片段');
      
      // 创建一个容器来包含iframe
      const iframeContainer = document.createElement('div');
      iframeContainer.id = 'poster-iframe-container';
      iframeContainer.style.width = '100%';
      iframeContainer.style.height = '100%';
      iframeContainer.style.display = 'flex';
      iframeContainer.style.justifyContent = 'center';
      iframeContainer.style.alignItems = 'center';
      iframeContainer.style.position = 'relative';
      
      // 为微信场景添加特殊样式类
      if (scene === 'wechat' && isCompleteHtml) {
        iframeContainer.classList.add('wechat-iframe-container');
      } else if (scene === 'bilibili' && isCompleteHtml) {
        iframeContainer.classList.add('bilibili-iframe-container');
      }
      
      // 将容器添加到画布元素
      canvasElement.appendChild(iframeContainer);
      
      // 创建一个iframe以隔离样式
      const iframe = document.createElement('iframe');
      iframe.id = 'poster-content-iframe';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.backgroundColor = 'white';
      
      if (isCompleteHtml) {
        // 直接使用完整HTML文档
        console.log('使用完整HTML文档渲染');
        iframe.srcdoc = processedHtml;
      } else {
        // 对于HTML片段，提取样式并构建完整文档
        // 提取所有样式标签
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        const styles: string[] = [];
        let styleMatch;
        
        // 提取样式
        while ((styleMatch = styleRegex.exec(processedHtml)) !== null) {
          styles.push(styleMatch[1]);
          // 不要从内容中移除样式标签，保留原始结构
        }
        
        // 移除任何script标签（出于安全考虑）
        const bodyContent = processedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // 构建完整的HTML
        const combinedStyles = styles.length > 0 
          ? `<style>${styles.join('\n')}</style>` 
          : '';
        
        // 为HTML片段创建完整的HTML文档
        const iframeContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              ${combinedStyles}
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: white;
                  overflow: auto;
                }
                
                /* 对应场景的样式 */
                ${scene === 'xiaohongshu' ? `
                  .poster-container {
                    width: 600px;
                    height: 800px; /* 3:4 比例 */
                    overflow: hidden;
                  }
                ` : scene === 'wechat' ? `
                  .poster-container {
                    width: 1200px;
                    height: 358px; /* 3.35:1 比例 */
                    overflow: hidden;
                  }
                ` : scene === 'bilibili' ? `
                  .poster-container {
                    width: 800px;
                    height: 500px; /* 16:10 比例 */
                    overflow: hidden;
                  }
                ` : ''}
              </style>
            </head>
            <body>
              <div class="poster-container">
                ${bodyContent}
              </div>
            </body>
          </html>
        `;
        
        iframe.srcdoc = iframeContent;
      }
      
      // 添加iframe到容器
      iframeContainer.appendChild(iframe);
      
      // 处理iframe加载完成事件
      iframe.onload = () => {
        try {
          if (!iframe.contentDocument) {
            console.warn('iframe contentDocument不可用');
            return;
          }
          
          console.log('iframe内容已加载');
          
          // 允许iframe尺寸适应内容
          if (isCompleteHtml) {
            // 对于完整HTML文档，验证所有外部资源是否已加载
            let resourcesLoaded = true;
            
            // 检查外部CSS是否加载完成
            const styleSheets = Array.from(iframe.contentDocument.styleSheets);
            for (const sheet of styleSheets) {
              try {
                // 尝试访问cssRules属性，如果跨域资源未加载会抛出错误
                if (sheet.cssRules.length === 0) {
                  console.log('样式表可能未完全加载:', sheet.href);
                }
              } catch (e) {
                // 跨域样式表，无法检查，假设已加载
                console.log('跨域样式表，无法检查:', sheet.href);
              }
            }
            
            // 检测是否使用了Tailwind CSS
            const hasTailwindCdn = processedHtml.includes('cdn.tailwindcss.com');
            const hasTailwindReference = processedHtml.includes('tailwindcss');
            const needsExtraWaitForResources = hasTailwindCdn || hasTailwindReference;
            
            if (needsExtraWaitForResources) {
              const hasTailwindStyles = iframe.contentDocument.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="flex"], [class*="grid"]').length > 0;
              
              if (!hasTailwindStyles) {
                console.log('外部资源（如Tailwind CSS）可能未完全加载，启动强制资源加载...');
                resourcesLoaded = false;
                
                // 尝试在iframe中注入额外的脚本，以确保Tailwind CSS完全加载
                try {
                  // 如果是Tailwind CDN版本
                  if (hasTailwindCdn) {
                    // 查找并替换可能的CDN警告
                    const doc = iframe.contentDocument;
                    const scripts = doc.querySelectorAll('script');
                    
                    let tailwindScriptFound = false;
                    scripts.forEach(script => {
                      if (script.src && script.src.includes('tailwindcss')) {
                        tailwindScriptFound = true;
                        console.log('发现Tailwind CDN脚本:', script.src);
                      }
                    });
                    
                    if (!tailwindScriptFound) {
                      // 添加一个本地Tailwind处理器
                      console.log('添加备用Tailwind处理器');
                      const tailwindScript = doc.createElement('script');
                      tailwindScript.src = 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio';
                      doc.head.appendChild(tailwindScript);
                    }
                  }
                  
                  // 检查是否有谷歌字体
                  const hasGoogleFonts = processedHtml.includes('fonts.googleapis.com');
                  if (hasGoogleFonts) {
                    console.log('检测到Google Fonts使用，尝试确保字体加载');
                    const fontLinks = iframe.contentDocument.querySelectorAll('link[href*="fonts.googleapis.com"]');
                    
                    // 如果找到了字体链接但样式尚未应用，尝试强制触发字体加载
                    if (fontLinks.length > 0) {
                      const fontFamilies = Array.from(fontLinks)
                        .map(link => {
                          const href = link.getAttribute('href') || '';
                          // 尝试从链接中提取字体家族名称
                          const familyMatch = href.match(/family=([^&:]+)/);
                          return familyMatch ? familyMatch[1].replace(/\+/g, ' ') : null;
                        })
                        .filter(Boolean);
                      
                      if (fontFamilies.length > 0) {
                        console.log('尝试预加载字体家族:', fontFamilies);
                        // 创建一个字体预加载元素
                        const fontPreloader = iframe.contentDocument.createElement('div');
                        fontPreloader.style.position = 'absolute';
                        fontPreloader.style.opacity = '0';
                        fontPreloader.style.fontFamily = fontFamilies.join(', ');
                        fontPreloader.textContent = 'Font Preloader';
                        iframe.contentDocument.body.appendChild(fontPreloader);
                      }
                    }
                  }
                } catch (scriptError) {
                  console.warn('尝试加载外部资源失败:', scriptError);
                }
                
                // 延长等待时间，确保资源加载
                const waitTime = hasTailwindCdn ? 1000 : 500;
                console.log(`设置${waitTime}ms延迟等待外部资源加载...`);
                
                setTimeout(() => {
                  console.log('延迟后检查资源加载状态');
                  // 再次检查Tailwind样式
                  const tailwindApplied = iframe.contentDocument?.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="flex"], [class*="grid"]').length > 0;
                  console.log('Tailwind样式应用状态:', tailwindApplied ? '已应用' : '未应用');
                  
                  // 无论如何都调整尺寸，因为我们已经等待了足够长的时间
                  adjustIframeSize();
                  
                  // 尝试触发样式重新计算
                  const body = iframe.contentDocument?.body;
                  if (body) {
                    body.style.display = 'none';
                    // 强制重绘
                    const forceReflow = body.offsetHeight;
                    body.style.display = '';
                  }
                }, waitTime);
              } else {
                console.log('Tailwind样式已应用，无需额外等待');
                adjustIframeSize();
              }
            } else if (resourcesLoaded) {
              // 立即调整尺寸
              adjustIframeSize();
            }
          } else {
            // 对于HTML片段，查找并调整poster-container
            const posterContainer = iframe.contentDocument.querySelector('.poster-container');
            if (posterContainer) {
              console.log('海报容器已找到并应用样式');
              
              // 确保iframe能显示完整内容
              iframe.style.height = `${iframe.contentDocument.body.scrollHeight}px`;
              iframe.style.width = `${iframe.contentDocument.body.scrollWidth}px`;
            } else {
              // 如果找不到poster-container，尝试调整整个body
              console.warn('找不到poster-container容器');
              iframe.style.height = `${iframe.contentDocument.body.scrollHeight}px`;
            }
          }
          
          // 记录实际渲染的HTML信息，用于调试
          console.log('实际渲染的HTML结构:', {
            head: iframe.contentDocument.head ? 'head已加载' : '无head',
            body: iframe.contentDocument.body ? 'body已加载' : '无body',
            elements: iframe.contentDocument.body ? iframe.contentDocument.body.children.length : 0
          });
          
          // 添加一个类来标记iframe已加载
          iframe.classList.add('poster-loaded');
        } catch (e) {
          console.error('处理iframe内容时出错:', e);
          showFallbackContent(html, processedHtml);
        }
        
        // 辅助函数：调整iframe尺寸
        function adjustIframeSize() {
          // 调整iframe尺寸以适应内容
          const scrollWidth = iframe.contentDocument!.documentElement.scrollWidth;
          const scrollHeight = iframe.contentDocument!.documentElement.scrollHeight;
          
          console.log(`内容实际尺寸: ${scrollWidth}x${scrollHeight}`);
          
          // 确保内容完全可见
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          
          // 如果是微信场景，确保保持正确比例
          if (scene === 'wechat') {
            // 添加特殊处理，保证微信场景能够正确显示
            adjustWechatContainer();
          } else if (scene === 'bilibili') {
            // 添加特殊处理，保证B站场景能够正确显示
            adjustBilibiliContainer();
          }
        }
        
        // 专门处理微信公众号封面的辅助函数
        function adjustWechatContainer() {
          if (!iframe.contentDocument) return;
          
          // 添加了wechat-iframe-container类，现在确保内容正确显示
          console.log('应用微信公众号封面特殊布局调整');
          
          // 查找主容器，这是我们要调整的目标
          const mainContainer = iframe.contentDocument.querySelector('.main-container');
          if (mainContainer) {
            console.log('找到.main-container，应用微信封面比例');
            
            // 确保正确比例
            const containerWidth = iframeContainer.clientWidth;
            const expectedHeight = Math.round(containerWidth / 3.35);
            
            // 设置容器高度
            iframeContainer.style.height = `${expectedHeight}px`;
            
            // 使用计算后的尺寸，确保完整显示
            (mainContainer as HTMLElement).style.width = '100%';
            (mainContainer as HTMLElement).style.height = `${expectedHeight}px`;
            
            // 移除可能干扰比例的样式
            iframe.contentDocument.body.style.padding = '0';
            iframe.contentDocument.body.style.margin = '0';
            iframe.contentDocument.body.style.overflow = 'hidden';
            
            // 微调内容布局
            const mainContent = mainContainer.querySelector('.main-cover');
            const shareContent = mainContainer.querySelector('.share-cover');
            
            if (mainContent && shareContent) {
              // 确保内容正确显示
              (mainContent as HTMLElement).style.height = '100%';
              (shareContent as HTMLElement).style.height = '100%';
              
              // 检查是否有额外的padding需要调整
              const containerStyles = window.getComputedStyle(mainContainer as HTMLElement);
              const containerPadding = parseInt(containerStyles.paddingLeft) + 
                                       parseInt(containerStyles.paddingRight) + 
                                       parseInt(containerStyles.paddingTop) + 
                                       parseInt(containerStyles.paddingBottom);
              
              if (containerPadding > 0) {
                console.log(`检测到容器内边距: ${containerPadding}px，调整内部元素`);
                // 确保内部元素适应容器大小
                (mainContainer as HTMLElement).style.boxSizing = 'border-box';
                (mainContent as HTMLElement).style.boxSizing = 'border-box';
                (shareContent as HTMLElement).style.boxSizing = 'border-box';
              }
              
              // 检查文字大小，确保在较小尺寸下能够正常显示
              const titleElements = mainContent.querySelectorAll('h1, h2, .title-text');
              if (titleElements.length > 0 && containerWidth < 800) {
                console.log('容器宽度较小，调整文字大小');
                titleElements.forEach(el => {
                  const titleEl = el as HTMLElement;
                  const currentSize = parseInt(window.getComputedStyle(titleEl).fontSize);
                  // 缩小字体，确保在较小宽度下也能显示
                  if (currentSize > 30) {
                    titleEl.style.fontSize = 'calc(1.2vw + 14px)';
                    titleEl.style.lineHeight = '1.2';
                  }
                });
              }
            }
            
            console.log(`微信封面容器调整为: ${containerWidth}x${expectedHeight}`);
          } else {
            console.log('未找到.main-container，使用通用比例调整');
            // 使用容器类确保正确比例
            iframeContainer.classList.add('wechat-iframe-container');
            
            // 确保iframe内容满足比例要求
            const containerWidth = iframeContainer.clientWidth;
            iframe.style.width = `${containerWidth}px`;
            iframe.style.height = `${Math.round(containerWidth / 3.35)}px`;
          }
        }
        
        // 专门处理B站视频封面的辅助函数
        function adjustBilibiliContainer() {
          if (!iframe.contentDocument) return;
          
          // 添加B站封面特殊布局调整
          console.log('应用B站视频封面特殊布局调整');
          
          // 查找主容器
          const mainContainer = iframe.contentDocument.querySelector('.bilibili-container, .poster-container');
          if (mainContainer) {
            console.log('找到封面容器，应用B站封面比例');
            
            // 确保正确比例
            const containerWidth = iframeContainer.clientWidth;
            const expectedHeight = Math.round(containerWidth / 1.6);
            
            // 设置容器高度
            iframeContainer.style.height = `${expectedHeight}px`;
            
            // 使用计算后的尺寸，确保完整显示
            (mainContainer as HTMLElement).style.width = '100%';
            (mainContainer as HTMLElement).style.height = `${expectedHeight}px`;
            
            // 移除可能干扰比例的样式
            iframe.contentDocument.body.style.padding = '0';
            iframe.contentDocument.body.style.margin = '0';
            iframe.contentDocument.body.style.overflow = 'hidden';
            
            // 检查文字大小，确保在较小尺寸下能够正常显示
            const titleElements = mainContainer.querySelectorAll('h1, h2, .title-text');
            if (titleElements.length > 0 && containerWidth < 500) {
              console.log('容器宽度较小，调整文字大小');
              titleElements.forEach(el => {
                const titleEl = el as HTMLElement;
                const currentSize = parseInt(window.getComputedStyle(titleEl).fontSize);
                // 缩小字体，确保在较小宽度下也能显示
                if (currentSize > 24) {
                  titleEl.style.fontSize = 'calc(1.2vw + 12px)';
                  titleEl.style.lineHeight = '1.2';
                }
              });
            }
            
            console.log(`B站封面容器调整为: ${containerWidth}x${expectedHeight}`);
          } else {
            console.log('未找到B站封面容器，使用通用比例调整');
            // 使用容器类确保正确比例
            const containerWidth = iframeContainer.clientWidth;
            iframe.style.width = `${containerWidth}px`;
            iframe.style.height = `${Math.round(containerWidth / 1.6)}px`;
          }
        }
      };
      
      // 添加错误处理
      iframe.onerror = (e) => {
        console.error('iframe加载错误:', e);
        showFallbackContent(html, processedHtml);
      };
      
      console.log('HTML渲染过程已初始化');

    } catch (renderError) {
      console.error('渲染HTML时出错，尝试直接渲染:', renderError);
      showFallbackContent(html, html);
    }
    
    // 帮助函数：显示备用内容
    function showFallbackContent(originalHtml: string, contentHtml: string) {
      canvasElement.innerHTML = `
        <div style="width: 100%; height: 100%; padding: 20px; overflow: auto; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div style="margin-bottom: 20px; color: orange; font-size: 14px; text-align: center;">
            <p>iframe渲染失败，显示直接内容</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 100%; overflow: auto; display: flex; justify-content: center; align-items: center;">
            <div style="position: relative; ${scene === 'xiaohongshu' ? 'width: 375px; height: 500px;' : scene === 'wechat' ? 'width: 1200px; height: 358px;' : scene === 'bilibili' ? 'width: 800px; height: 500px;' : ''}">
              ${contentHtml}
            </div>
          </div>
          <div style="margin-top: 20px; width: 100%; display: flex; justify-content: center; gap: 10px;">
            <button id="downloadHtmlBtn" style="padding: 8px 16px; background-color: #2563EB; color: white; border: none; border-radius: 4px; cursor: pointer;">下载HTML文件</button>
            <button id="toggleCodeBtn" style="padding: 8px 16px; background-color: #4B5563; color: white; border: none; border-radius: 4px; cursor: pointer;">显示源代码</button>
          </div>
          <div id="sourceCodeContainer" style="display: none; margin-top: 20px; width: 100%; max-height: 300px; overflow: auto; background-color: #1E293B; color: #E2E8F0; padding: 16px; border-radius: 8px; font-family: monospace; white-space: pre-wrap; font-size: 12px;"></div>
        </div>
      `;
      
      // 添加下载功能
      const downloadBtn = canvasElement.querySelector('#downloadHtmlBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
          const blob = new Blob([originalHtml], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${scene}-poster.html`;
          link.href = url;
          link.click();
        });
      }
      
      // 添加显示源代码功能
      const toggleCodeBtn = canvasElement.querySelector('#toggleCodeBtn');
      const sourceCodeContainer = canvasElement.querySelector('#sourceCodeContainer') as HTMLElement;
      if (toggleCodeBtn && sourceCodeContainer) {
        toggleCodeBtn.addEventListener('click', () => {
          if (sourceCodeContainer.style.display === 'none') {
            sourceCodeContainer.style.display = 'block';
            sourceCodeContainer.textContent = originalHtml;
            (toggleCodeBtn as HTMLElement).textContent = '隐藏源代码';
          } else {
            sourceCodeContainer.style.display = 'none';
            (toggleCodeBtn as HTMLElement).textContent = '显示源代码';
          }
        });
      }
    }
  };

  // 处理窗口大小变化自动重新渲染
  useEffect(() => {
    // 只有在有生成内容时才需要处理窗口大小变化
    if (!generatedHtml) return;
    
    const handleResize = () => {
      if (canvasRef.current && generatedHtml) {
        console.log('窗口大小变化，重新渲染海报');
        renderHtmlToCanvas(generatedHtml, canvasRef.current);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [generatedHtml]);

  // 中间列的渲染逻辑调整
  const renderMiddleColumn = () => {
    return (
      <div className="flex-1 flex items-center justify-center relative">
        {/* 使用绝对定位确保加载动画不会与内容重叠 */}
        {isGenerating && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 bg-opacity-90">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-slate-300">正在生成海报，请稍候...</p>
            <p className="text-slate-400 text-sm mt-2">这可能需要几秒钟时间</p>
          </div>
        )}
        
        {/* 添加完整HTML样式 */}
        <style>
          {`
            /* 适应完整HTML文档的样式 */
            #poster-iframe-container {
              width: 100%;
              height: 100%;
              min-height: 300px;
              overflow: auto;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            #poster-content-iframe {
              display: block;
              width: 100%;
              height: 100%;
              min-height: 300px;
              border: none;
              background-color: white;
              overflow: hidden;
            }
            
            /* 确保微信场景保持正确的宽高比 */
            .wechat-iframe-container {
              aspect-ratio: 3.35/1;
              width: 100%;
              max-height: 100%;
              overflow: hidden;
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            /* 确保B站场景保持正确的宽高比 */
            .bilibili-iframe-container {
              aspect-ratio: 16/10;
              width: 100%;
              max-height: 100%;
              overflow: hidden;
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            /* 强制字体渲染 */
            #poster-content-iframe body * {
              font-display: swap !important;
            }
            
            /* 禁用可能的CDN警告 */
            #poster-content-iframe .hidden, 
            #poster-content-iframe [hidden],
            #poster-content-iframe [style*="display: none"],
            #poster-content-iframe [style*="display:none"] {
              display: none !important;
            }

            /* 确保内部内容不被截断 */
            .wechat-iframe-container #poster-content-iframe {
              width: 100%;
              height: 100%;
            }
          `}
        </style>
        
        {/* 预览区域始终存在，通过z-index和透明度控制可见性 */}
        <div 
          ref={canvasRef} 
          className="w-full h-full flex items-center justify-center overflow-auto z-0"
          style={{ 
            minHeight: '400px', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '8px',
            position: 'relative',
            opacity: isGenerating ? 0.3 : 1,
            transition: 'opacity 0.3s ease'
          }}
        ></div>
        
        {/* 未生成内容且不在生成过程中时显示预览 */}
        {!generatedHtml && !isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PosterPreview 
              language={language}
              scene={scene}
              style={style}
              text={text}
              loading={isGenerating}
            />
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-full p-4">
        {/* Text Input for mobile view */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            输入文字
          </h3>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholderText}
            className="min-h-[200px] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
          
          {/* 模型配置按钮 */}
          <div className="flex justify-end mb-2">
            <ModelConfigDialog 
              config={modelConfig} 
              onConfigChange={handleConfigChange}
              open={configDialogOpen}
              onOpenChange={setConfigDialogOpen}
            >
              <Button 
                ref={configButtonRef}
                variant="outline" 
                size="sm" 
                className="gap-1 text-slate-400 border-slate-700 hover:bg-slate-800"
              >
                <Settings size={14} />
                配置模型
              </Button>
            </ModelConfigDialog>
          </div>
        </div>
        
        {/* Style Selector */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            选择风格
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
            选择平台
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
          {isGenerating ? '生成中...' : '生成封面'}
        </Button>
        
        {/* Poster preview */}
        {renderMiddleColumn()}
        
        {/* Export button */}
        <Button 
          onClick={handleExport} 
          disabled={!generatedHtml || isGenerating}
          className="w-full gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200"
        >
          <Download className="w-4 h-4" />
          导出
        </Button>

        {/* 配置提示对话框 */}
        <ModelConfigAlert 
          open={showConfigAlert}
          onOpenChange={setShowConfigAlert}
          onConfigure={() => {
            setShowConfigAlert(false);
            setConfigDialogOpen(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left column - Text Input Panel */}
      <div className="w-1/4 bg-slate-900 p-4 pt-6 overflow-y-auto">
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            输入文字
          </h3>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 min-h-[calc(100vh-250px)] mb-4 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
          <div className="text-xs text-slate-400 italic mb-4">
            提示：使用上述格式可让AI更好地理解您的内容结构
          </div>
          
          {/* 模型配置按钮 */}
          <div className="mb-4">
            <ModelConfigDialog 
              config={modelConfig} 
              onConfigChange={handleConfigChange}
              open={configDialogOpen}
              onOpenChange={setConfigDialogOpen}
            >
              <Button 
                ref={configButtonRef}
                variant="outline" 
                size="sm" 
                className="w-full gap-1 text-slate-400 border-slate-700 hover:bg-slate-800"
              >
                <Settings size={14} />
                配置模型
              </Button>
            </ModelConfigDialog>
          </div>
        </div>
      </div>
      
      {/* Middle column - Platform tabs and Canvas */}
      <div className="w-2/4 flex flex-col p-4 bg-slate-950">
        {/* Poster preview */}
        {renderMiddleColumn()}
        
        {/* Export button */}
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleExport} 
            disabled={!generatedHtml || isGenerating}
            className="w-full sm:w-auto gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <Download className="w-4 h-4" />
            导出
          </Button>
        </div>
      </div>
      
      {/* Right column - Style selector and Generate button */}
      <div className="w-1/4 bg-slate-900 p-4 pt-6 overflow-y-auto">
        <div className="glass-card rounded-xl p-4 md:p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            选择风格
          </h3>
          <StyleSelector 
            selectedStyle={style} 
            onStyleChange={setStyle}
            language={language}
          />
        </div>
        
        <div className="glass-card rounded-xl p-4 md:p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-slate-200">
            选择平台
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
          {isGenerating ? '生成中...' : '生成封面'}
        </Button>
      </div>

      {/* 配置提示对话框 */}
      <ModelConfigAlert 
        open={showConfigAlert}
        onOpenChange={setShowConfigAlert}
        onConfigure={() => {
          setShowConfigAlert(false);
          setConfigDialogOpen(true);
        }}
      />
    </div>
  );
};

export default PosterGenerator;
