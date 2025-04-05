import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "./hooks/use-mobile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MobileLayout from "./components/MobileLayout";
import CardPreviewPage from "./components/CardPreviewPage";
import NavBar from "./components/NavBar";
import React, { useEffect, useState } from "react";

const queryClient = new QueryClient();

// 添加一个路由监听组件，确保在路由变化时不会闪烁
const RouteChangeListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // 路由变化时检查是否有主题设置，并应用
  useEffect(() => {
    // 避免每次路由变化都触发主题变更，只在第一次加载和必要时应用
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    } else if (savedTheme !== 'dark' && document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }, [location.pathname]); // 只在路径变化时执行，避免URL参数等其他变化触发

  return <>{children}</>;
};

// 创建主应用布局组件
const MainApp = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('cover'); 

  // 处理标签切换
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // 如果不在首页，导航到首页
    if (location.pathname !== '/') {
      navigate('/');
    }
  };
  
  return (
    <>
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className={`${isMobile ? 'pt-24' : 'pt-16'}`}>
        <Routes>
          <Route path="/" element={<Index activeTab={activeTab} setActiveTab={setActiveTab} />} />
          <Route path="/card-preview" element={<CardPreviewPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isMobile ? (
            <MobileLayout>
              <RouteChangeListener>
                <MainApp />
              </RouteChangeListener>
            </MobileLayout>
          ) : (
            <RouteChangeListener>
              <MainApp />
            </RouteChangeListener>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
