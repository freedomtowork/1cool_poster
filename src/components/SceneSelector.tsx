
import React from 'react';
import { Check } from 'lucide-react';

type Scene = {
  id: string;
  name: string;
  description: string;
  languageId: string;
};

type SceneSelectorProps = {
  selectedScene: string;
  selectedLanguage: string;
  onSceneChange: (sceneId: string) => void;
};

const SceneSelector: React.FC<SceneSelectorProps> = ({
  selectedScene,
  selectedLanguage,
  onSceneChange,
}) => {
  // Define scenes based on language
  const scenes: Scene[] = React.useMemo(() => {
    if (selectedLanguage === 'zh') {
      return [
        { id: 'xiaohongshu', name: '小红书', description: '时尚生活分享平台', languageId: 'zh' },
        { id: 'wechat', name: '微信', description: '内容创作与推广', languageId: 'zh' },
        { id: 'bilibili', name: 'B站', description: '视频内容创作', languageId: 'zh' },
      ];
    } else {
      return [
        { id: 'twitter', name: 'X (Twitter)', description: 'Microblogging platform', languageId: 'en' },
        { id: 'facebook', name: 'Facebook', description: 'Social networking', languageId: 'en' },
        { id: 'instagram', name: 'Instagram', description: 'Photo and video sharing', languageId: 'en' },
      ];
    }
  }, [selectedLanguage]);

  // If the selected scene is not valid for the current language, reset it
  React.useEffect(() => {
    const validScene = scenes.find(scene => scene.id === selectedScene);
    if (!validScene && scenes.length > 0) {
      onSceneChange(scenes[0].id);
    }
  }, [selectedLanguage, selectedScene, scenes, onSceneChange]);

  return (
    <div className="space-y-2 mb-6">
      <label className="block text-sm font-medium mb-2 text-slate-300">选择平台</label>
      <div className="grid grid-cols-1 gap-3">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSceneChange(scene.id)}
            className={`text-left px-4 py-3 rounded-xl transition-all duration-300 relative 
              ${selectedScene === scene.id
                ? 'bg-slate-700/60 ring-1 ring-primary/50'
                : 'bg-slate-800/60 hover:bg-slate-700/40'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">{scene.name}</div>
                <span className="text-sm text-slate-400">{scene.description}</span>
              </div>
              {selectedScene === scene.id && (
                <Check size={16} className="text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SceneSelector;
