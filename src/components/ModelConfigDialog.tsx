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

const ModelConfigDialog: React.FC<ModelConfigDialogProps> = ({ 
  config, 
  onConfigChange,
  children,
  open,
  onOpenChange
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [apiUrl, setApiUrl] = useState(config.apiUrl || "https://api.silicon.run");
  const [model, setModel] = useState(config.model || "deepseek/deepseek-chat-v3-0324:free");

  // 使用外部控制的open状态或内部状态
  const isOpen = open !== undefined ? open : dialogOpen;
  const setIsOpen = onOpenChange || setDialogOpen;

  useEffect(() => {
    setApiKey(config.apiKey);
    setApiUrl(config.apiUrl || "https://api.silicon.run");
    setModel(config.model || "deepseek/deepseek-chat-v3-0324:free");
  }, [config, isOpen]);

  const handleSave = () => {
    const newConfig = {
      apiKey,
      apiUrl,
      model,
      isConfigured: !!apiKey.trim()
    };
    onConfigChange(newConfig);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-slate-200">模型配置</DialogTitle>
          <DialogDescription className="text-slate-400">
            配置生成封面所需的AI模型信息
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right text-slate-300">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="您的API密钥"
              className="col-span-3 bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiUrl" className="text-right text-slate-300">
              API地址
            </Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="API地址"
              className="col-span-3 bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right text-slate-300">
              模型
            </Label>
            <Select 
              value={model} 
              onValueChange={setModel}
            >
              <SelectTrigger className="col-span-3 bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                <SelectItem value="deepseek/deepseek-chat-v3-0324:free">DeepSeek Chat V3 (Free)</SelectItem>
                <SelectItem value="claude-3.7-sonnet">Claude 3.7 Sonnet</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSave} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModelConfigDialog; 