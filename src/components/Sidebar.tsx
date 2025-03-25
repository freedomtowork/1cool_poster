
import React from 'react';
import { LayoutTemplate, Image, Settings, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item active">
        <div className="sidebar-icon">
          <LayoutTemplate size={20} />
        </div>
        <span>模板</span>
      </Link>
      
      <Link to="/" className="sidebar-item">
        <div className="sidebar-icon">
          <Image size={20} />
        </div>
        <span>背景</span>
      </Link>
      
      <Link to="/" className="sidebar-item">
        <div className="sidebar-icon">
          <BookOpen size={20} />
        </div>
        <span>教程</span>
      </Link>
      
      <Link to="/pricing" className="sidebar-item">
        <div className="sidebar-icon">
          <Settings size={20} />
        </div>
        <span>设置</span>
      </Link>
    </div>
  );
};

export default Sidebar;
