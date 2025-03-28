import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModelConfigAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfigure: () => void;
}

const ModelConfigAlert: React.FC<ModelConfigAlertProps> = ({
  open,
  onOpenChange,
  onConfigure,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-200">未配置AI模型</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            您尚未配置AI模型信息。需要设置API Key才能使用DeepSeek V3、Claude 3.7等模型生成海报。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600">
            取消
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfigure}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            前往配置
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelConfigAlert; 