import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export type ModelConfig = {
  apiKey: string;
  apiUrl: string;
  model: string;
  isConfigured: boolean;
};

interface ModelConfigDialogProps {
  config: ModelConfig;
  onConfigChange: (config: ModelConfig) => void;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type ModelProvider = string;

interface ModelInfo {
  id: string;
  name: string;
}

interface ProviderInfo {
  name: string;
  url: string;
  models: ModelInfo[];
}

interface ModelProvidersConfig {
  providers: Record<ModelProvider, ProviderInfo>;
  defaultProvider: ModelProvider;
  defaultModels: Record<ModelProvider, string>;
  tabOrder: ModelProvider[][];
}

const ModelConfigDialog: React.FC<ModelConfigDialogProps> = ({ 
  config, 
  onConfigChange,
  children,
  open,
  onOpenChange
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [apiUrl, setApiUrl] = useState(config.apiUrl || "");
  const [selectedProvider, setSelectedProvider] = useState<ModelProvider>("");
  const [model, setModel] = useState(config.model || "");
  const [customModelInput, setCustomModelInput] = useState("");
  const [customUrlInput, setCustomUrlInput] = useState("");
  
  // 加载配置文件的状态
  const [providersConfig, setProvidersConfig] = useState<ModelProvidersConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 使用外部控制的open状态或内部状态
  const isOpen = open !== undefined ? open : dialogOpen;
  const setIsOpen = onOpenChange || setDialogOpen;

  // 加载模型提供商配置
  useEffect(() => {
    const loadProvidersConfig = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const response = await fetch('/config/model-providers.json');
        
        if (!response.ok) {
          throw new Error(`无法加载模型配置: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setProvidersConfig(data);
        
        // 设置默认提供商，如果当前未设置
        if (!selectedProvider) {
          setSelectedProvider(data.defaultProvider);
        }
      } catch (error) {
        console.error('加载模型配置文件失败:', error);
        setLoadError(error instanceof Error ? error.message : '未知错误');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProvidersConfig();
  }, []);

  // 根据当前保存的配置识别提供商和模型
  useEffect(() => {
    if (!providersConfig) return;
    
    setApiKey(config.apiKey);
    
    // 尝试根据API URL和模型识别提供商
    let detectedProvider: ModelProvider = 'custom';
    let modelToSet = config.model || '';
    
    // 检查URL是否匹配某个提供商
    for (const [providerKey, providerData] of Object.entries(providersConfig.providers)) {
      if (providerKey !== 'custom' && config.apiUrl?.includes(providerData.url)) {
        detectedProvider = providerKey;
        
        // 检查模型是否存在于该提供商的模型列表中
        const modelExists = providerData.models.some(m => m.id === config.model);
        if (modelExists) {
          modelToSet = config.model;
        } else {
          // 如果模型不在提供商列表中，但URL匹配，设为自定义模型
          setCustomModelInput(config.model || '');
        }
        break;
      }
    }
    
    // 如果没有匹配任何提供商，设为自定义
    if (detectedProvider === 'custom') {
      setCustomUrlInput(config.apiUrl || '');
      setCustomModelInput(config.model || '');
    }
    
    setSelectedProvider(detectedProvider);
    setApiUrl(config.apiUrl || '');
    setModel(modelToSet);
  }, [config, isOpen, providersConfig]);

  // 处理提供商切换
  const handleProviderChange = (provider: ModelProvider) => {
    if (!providersConfig) return;
    
    setSelectedProvider(provider);
    
    // 更新API URL
    if (provider !== 'custom') {
      setApiUrl(providersConfig.providers[provider].url);
      
      // 如果提供商有默认模型，设置第一个作为默认值
      const providerModels = providersConfig.providers[provider].models;
      if (providerModels.length > 0) {
        // 如果有默认模型配置，使用默认模型，否则使用第一个
        const defaultModel = providersConfig.defaultModels[provider];
        if (defaultModel && providerModels.some(m => m.id === defaultModel)) {
          setModel(defaultModel);
        } else {
          setModel(providerModels[0].id);
        }
      } else {
        setModel('');
      }
    } else {
      // 自定义提供商
      setCustomUrlInput(apiUrl);
    }
  };

  const handleSave = () => {
    let finalModel = model;
    let finalApiUrl = apiUrl;
    
    // 如果是自定义提供商，使用自定义输入
    if (selectedProvider === 'custom') {
      finalModel = customModelInput.trim();
      finalApiUrl = customUrlInput.trim();
    }
    
    const newConfig = {
      apiKey: apiKey.trim(),
      apiUrl: finalApiUrl,
      model: finalModel,
      isConfigured: !!apiKey.trim()
    };
    
    onConfigChange(newConfig);
    setIsOpen(false);
  };

  const isValidConfig = () => {
    if (!apiKey.trim()) return false;
    
    if (selectedProvider === 'custom') {
      return !!customUrlInput.trim() && !!customModelInput.trim();
    }
    
    return !!model;
  };

  // 渲染加载状态
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700 text-slate-200">
          <div className="py-10 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mb-4" />
            <p className="text-slate-300">加载模型配置...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // 渲染错误状态
  if (loadError) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-200">配置加载错误</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-red-400">
            <p>无法加载模型配置: {loadError}</p>
            <p className="mt-2 text-slate-300">请检查网络连接或联系管理员。</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} className="bg-slate-700 hover:bg-slate-600">
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // 渲染配置对话框
  if (!providersConfig) {
    return null;
  }

  // 根据行数决定使用不同的布局方式
  const renderTabList = (row: ModelProvider[]) => {
    // 根据每行的项目数量确定合适的布局类名
    const getGridClass = (count: number) => {
      switch (count) {
        case 1: return "w-full";
        case 2: return "grid grid-cols-2 gap-2 w-full";
        case 3: return "grid grid-cols-3 gap-2 w-full";
        case 4: return "grid grid-cols-4 gap-2 w-full";
        case 5: return "grid grid-cols-5 gap-2 w-full";
        default: return "flex flex-wrap gap-2";
      }
    };

    return (
      <TabsList className={`${getGridClass(row.length)} mb-2 bg-slate-700`}>
        {row.map(providerId => (
          <TabsTrigger 
            key={providerId} 
            value={providerId} 
            className="data-[state=active]:bg-cyan-500 px-3 py-1.5 text-sm"
          >
            {providersConfig.providers[providerId].name}
          </TabsTrigger>
        ))}
      </TabsList>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-slate-200">模型配置</DialogTitle>
          <DialogDescription className="text-slate-400">
            配置生成AI的模型信息和API密钥
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Label htmlFor="apiKey" className="block mb-2 text-slate-300">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="您的API密钥"
              className="w-full bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
          
          <div className="mb-6">
            <Label className="block mb-2 text-slate-300">服务提供商</Label>
            <Tabs 
              defaultValue={selectedProvider} 
              value={selectedProvider}
              onValueChange={(value) => handleProviderChange(value)}
              className="w-full"
            >
              {/* 根据配置的tabOrder渲染标签页 */}
              {providersConfig.tabOrder.map((row, rowIndex) => (
                <div key={rowIndex} className={rowIndex > 0 ? 'mt-2' : ''}>
                  {renderTabList(row)}
                </div>
              ))}
              
              {/* 各提供商的具体配置 */}
              {Object.entries(providersConfig.providers).map(([key, provider]) => {
                return (
                  <TabsContent key={key} value={key} className="mt-4">
                    {key !== 'custom' ? (
                      <>
                        <div className="mb-4">
                          <Label className="block mb-2 text-slate-300">API 地址</Label>
                          <Input
                            value={apiUrl}
                            readOnly
                            className="w-full bg-slate-700 border-slate-600 text-slate-200 opacity-70"
                          />
                          <p className="text-xs text-slate-400 mt-1">
                            {provider.name} 的默认 API 地址
                          </p>
                        </div>
                        
                        <div>
                          <Label className="block mb-2 text-slate-300">模型</Label>
                          {provider.models.length > 0 ? (
                            <Select 
                              value={model} 
                              onValueChange={setModel}
                            >
                              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                                <SelectValue placeholder="选择模型" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600 text-slate-200 max-h-[300px]">
                                {provider.models.map(modelOption => (
                                  <SelectItem 
                                    key={modelOption.id} 
                                    value={modelOption.id}
                                  >
                                    {modelOption.name}
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom_model">自定义模型ID</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="text-yellow-400">
                              此提供商无预设模型
                            </p>
                          )}
                        </div>
                        
                        {model === 'custom_model' && (
                          <div className="mt-4">
                            <Label className="block mb-2 text-slate-300">自定义模型ID</Label>
                            <Input
                              value={customModelInput}
                              onChange={(e) => setCustomModelInput(e.target.value)}
                              placeholder="输入完整的模型ID"
                              className="w-full bg-slate-700 border-slate-600 text-slate-200"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <Label className="block mb-2 text-slate-300">自定义API地址</Label>
                          <Input
                            value={customUrlInput}
                            onChange={(e) => setCustomUrlInput(e.target.value)}
                            placeholder="输入完整的API地址"
                            className="w-full bg-slate-700 border-slate-600 text-slate-200"
                          />
                          <p className="text-xs text-slate-400 mt-1">
                            例如: https://api.example.com/v1
                          </p>
                        </div>
                        
                        <div>
                          <Label className="block mb-2 text-slate-300">自定义模型ID</Label>
                          <Input
                            value={customModelInput}
                            onChange={(e) => setCustomModelInput(e.target.value)}
                            placeholder="输入完整的模型ID"
                            className="w-full bg-slate-700 border-slate-600 text-slate-200"
                          />
                          <p className="text-xs text-slate-400 mt-1">
                            例如: gpt-4, claude-3-opus, mistral-large 等
                          </p>
                        </div>
                      </>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSave} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
            disabled={!isValidConfig()}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModelConfigDialog; 