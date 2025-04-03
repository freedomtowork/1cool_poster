import React, { useState, useContext } from 'react';
import { ThemeContext } from '../pages/Index';
import './CardPreviewPage.css';
import { useIsMobile } from '../hooks/use-mobile';

// 引入新的组件
import ClaudeCards from './ClaudeCards';
import GeminiCards from './GeminiCards';

// Define the structure for tabs for easier management
interface TabInfo {
  id: string;
  label: string;
}

const CardPreviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('claude'); // Default active tab
  const { isDarkMode } = useContext(ThemeContext); // 获取主题模式

  const tabs: TabInfo[] = [
    { id: 'claude', label: 'Claude 3.7 Sonnet' },
    { id: 'gemini', label: 'Gemini 2.5 Pro Exp 03-25' },
  ];

  return (
    // 应用暗黑模式类名到顶层容器
    <div className={`card-preview-container ${isDarkMode ? 'dark' : ''}`}>
      <h1 className="page-title">多风格内容卡片预览</h1>

      {/* Tab Navigation */}
      <div className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - 现在只包含 Tab Pane 结构和对应的组件 */}
      <div className="tab-content">
        {/* Claude Tab Pane */}
        <div
          id="claude"
          className={`tab-pane ${activeTab === 'claude' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="claude-tab-button" // 使用 tab.label 或动态生成
        >
          {/* 根据 activeTab 渲染 Claude 内容 */}
          {activeTab === 'claude' && <ClaudeCards />}
        </div> {/* end #claude */}

        {/* Gemini Tab Pane */}
        <div
          id="gemini"
          className={`tab-pane ${activeTab === 'gemini' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="gemini-tab-button" // 使用 tab.label 或动态生成
        >
           {/* 根据 activeTab 渲染 Gemini 内容 */}
           {activeTab === 'gemini' && <GeminiCards />}
        </div> {/* end #gemini */}
      </div> {/* end .tab-content */}
    </div>
  );
};

export default CardPreviewPage;