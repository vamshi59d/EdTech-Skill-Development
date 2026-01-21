
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, icon: 'fa-house', label: 'Dashboard' },
    { id: AppTab.TASKS, icon: 'fa-check-double', label: 'Tasks' },
    { id: AppTab.STUDY_BUDDY, icon: 'fa-robot', label: 'AI Tutor' },
    { id: AppTab.FLASHCARDS, icon: 'fa-layer-group', label: 'Flashcards' },
    { id: AppTab.SCHEDULE, icon: 'fa-calendar-days', label: 'Schedule' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <span className="hidden md:block font-bold text-xl text-slate-800 tracking-tight">Academia AI</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
          <img src="https://picsum.photos/seed/student/100/100" className="w-10 h-10 rounded-full border-2 border-indigo-100" alt="Avatar" />
          <div className="hidden md:block overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">Alex Johnson</p>
            <p className="text-xs text-slate-500 truncate">Computer Science</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
