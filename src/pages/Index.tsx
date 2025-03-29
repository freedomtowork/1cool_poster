import React, { useState, useEffect } from 'react';
import PosterGenerator from '../components/PosterGenerator';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 创建主题上下文以便全局访问
export const ThemeContext = React.createContext({
  isDarkMode: true,
  toggleTheme: () => {}
});

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('cover'); // 'cover' 或 'content'
  
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
        <div className="bg-slate-900 p-4 shadow-md fixed top-0 left-0 right-0 z-50">
          <div className={`flex ${isMobile ? 'flex-col' : ''} items-center relative`}>
            {/* 移动端显示垂直布局 */}
            {isMobile ? (
              <>
                <div className="flex w-full justify-between items-center mb-2">
                  <h1 className="text-xl font-bold text-primary">易美自媒体助手</h1>
                  {/* 主题切换按钮 - 移动版 */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-slate-300" />}
                  </Button>
                </div>
                <div className="flex space-x-4 self-center">
                  <button 
                    className={`px-3 py-1 rounded transition-colors ${activeTab === 'cover' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    onClick={() => setActiveTab('cover')}
                  >
                    封面
                  </button>
                  <button 
                    className={`px-3 py-1 rounded transition-colors ${activeTab === 'content' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    onClick={() => setActiveTab('content')}
                  >
                    正文
                  </button>
                </div>
              </>
            ) : (
              /* 桌面端显示水平布局 */
              <>
                <h1 className="text-xl font-bold text-primary mr-6">易美自媒体助手</h1>
                <div className="flex-1 flex justify-center">
                  <div className="flex space-x-4">
                    <button 
                      className={`px-3 py-1 rounded transition-colors ${activeTab === 'cover' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                      onClick={() => setActiveTab('cover')}
                    >
                      封面
                    </button>
                    <button 
                      className={`px-3 py-1 rounded transition-colors ${activeTab === 'content' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                      onClick={() => setActiveTab('content')}
                    >
                      正文
                    </button>
                  </div>
                </div>
                {/* 主题切换按钮 - 桌面版 */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-full absolute right-0"
                  onClick={toggleTheme}
                >
                  {isDarkMode ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-slate-300" />}
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className={`flex-1 ${isMobile ? 'pt-24' : 'pt-16'}`}>
          {activeTab === 'cover' ? (
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
