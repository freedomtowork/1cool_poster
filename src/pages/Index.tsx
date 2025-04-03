import React, { useState, useEffect } from 'react';
import PosterGenerator from '../components/PosterGenerator';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

// 创建主题上下文以便全局访问
export const ThemeContext = React.createContext({
  isDarkMode: true,
  toggleTheme: () => {}
});

interface IndexProps {
  activeTab?: string; // 从App接收的activeTab
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>; // 从App接收的setActiveTab
}

const Index: React.FC<IndexProps> = ({ activeTab = 'cover', setActiveTab }) => {
  const isMobile = useIsMobile();
  const [localActiveTab, setLocalActiveTab] = useState(activeTab); // 本地状态，兼容原有逻辑
  
  // 当外部activeTab变化时，同步更新本地状态
  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);
  
  // 本地标签切换，同时更新外部状态
  const handleTabChange = (newTab: string) => {
    setLocalActiveTab(newTab);
    if (setActiveTab) {
      setActiveTab(newTab);
    }
  };
  
  // 添加主题模式状态
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 检查本地存储中的主题偏好设置，默认为深色模式
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  // 当主题模式变化时保存到本地存储并应用主题
  useEffect(() => {
    localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
    // 更新文档根元素的类来应用主题
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // 切换主题模式
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
        <div className="flex-1">
          {localActiveTab === 'cover' ? (
            <PosterGenerator />
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-cyan-500 mb-4">正文生成功能</h2>
                <p className="text-slate-300">正文生成功能即将上线，敬请期待！</p>
              </div>
            </div>
          )}
        </div>
        
        {isMobile && <Footer />}
      </div>
    </ThemeContext.Provider>
  );
};

export default Index;
