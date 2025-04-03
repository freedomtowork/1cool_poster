import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../pages/Index';
import { Sun, Moon, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';

// 定义导航项类型
interface NavItem {
  path: string;
  label: string;
  tabId?: string; // 可选标签ID
  icon?: React.ReactNode;
}

interface NavBarProps {
  activeTab?: string; // 当前激活的标签
  onTabChange?: (tabId: string) => void; // 标签切换回调
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // 定义导航项
  const navItems: NavItem[] = [
    { path: '/', label: '封面', tabId: 'cover' },
    // { path: '/', label: '正文', tabId: 'content' },
    { path: '/card-preview', label: '卡片', icon: <CreditCard className="h-4 w-4" /> }
  ];
  
  // 处理导航项点击
  const handleNavItemClick = (item: NavItem, event: React.MouseEvent) => {
    // 如果是首页标签切换
    if (item.path === '/' && item.tabId && onTabChange && location.pathname === '/') {
      event.preventDefault(); // 阻止默认导航
      onTabChange(item.tabId); // 触发标签切换
    }
  };
  
  // 判断当前激活的导航项
  const isActive = (item: NavItem): boolean => {
    // 首页路径且有tabId
    if (item.path === '/' && item.tabId) {
      return location.pathname === '/' && activeTab === item.tabId;
    }
    // 其他路径
    return location.pathname === item.path;
  };

  return (
    <div className="bg-slate-900 p-4 shadow-md fixed top-0 left-0 right-0 z-40">
      <div className={`flex ${isMobile ? 'flex-col' : ''} items-center relative`}>
        {/* 移动端显示垂直布局 */}
        {isMobile ? (
          <>
            <div className="flex w-full justify-between items-center mb-2">
              <h1 className="text-xl font-bold text-primary">1Cool</h1>
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
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path} 
                  className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                    isActive(item) ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={(e) => handleNavItemClick(item, e)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </>
        ) : (
          /* 桌面端显示水平布局 */
          <>
            <h1 className="text-xl font-bold text-primary mr-6">1Cool</h1>
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-4">
                {navItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                      isActive(item) ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                    onClick={(e) => handleNavItemClick(item, e)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
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
  );
};

export default NavBar; 