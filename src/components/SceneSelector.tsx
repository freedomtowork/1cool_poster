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
  hideDescription?: boolean;
  displayInline?: boolean;
};

// This component is now only used as a fallback - we've replaced it with tabs in PosterGenerator
const SceneSelector: React.FC<SceneSelectorProps> = ({
  selectedScene,
  selectedLanguage,
  onSceneChange,
  hideDescription = false,
  displayInline = false,
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
    <div className={`${displayInline ? "grid grid-cols-3 gap-2" : "space-y-2"}`}>
      <div className={`${displayInline ? "contents" : "grid grid-cols-1 gap-3"}`}>
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSceneChange(scene.id)}
            className={`text-left px-3 py-2 rounded-xl transition-all duration-300 relative 
              ${selectedScene === scene.id
                ? 'bg-slate-700/60 ring-1 ring-primary/50'
                : 'bg-slate-800/60 hover:bg-slate-700/40'
              } ${displayInline ? 'flex flex-col items-center justify-center' : ''}`}
          >
            <div className={`flex items-center ${displayInline ? 'justify-center' : 'justify-between'}`}>
              <div className={displayInline ? 'text-center' : ''}>
                <div className="font-medium text-slate-200">{scene.name}</div>
                {!hideDescription && (
                  <span className="text-sm text-slate-400">{scene.description}</span>
                )}
              </div>
              {selectedScene === scene.id && !displayInline && (
                <Check size={16} className="text-primary" />
              )}
            </div>
            {selectedScene === scene.id && displayInline && (
              <Check size={16} className="text-primary mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SceneSelector;
