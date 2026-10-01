import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Video,
  BarChart3,
  TrendingUp,
  Award,
  Bot,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { currentView, navigateTo, profile } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ElementType; badge?: string }[] = [
    { view: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { view: 'training', label: 'رحلة التدريب', icon: Compass },
    { view: 'studio', label: 'جلسة تدريب جديدة', icon: Video, badge: 'مباشر' },
    { view: 'reports', label: 'تقاريري', icon: BarChart3 },
    { view: 'progress', label: 'تقدمي', icon: TrendingUp },
    { view: 'achievements', label: 'الإنجازات', icon: Award },
    { view: 'coach', label: 'المدرب الذكي', icon: Bot },
    { view: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-slate-200/90 min-h-[calc(100vh-4rem)] p-4 shrink-0">
        
        {/* Student Mini Card */}
        <div className="p-3 mb-4 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-200">
              {profile.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 truncate">{profile.name}</h4>
              <p className="text-xs text-slate-500 truncate">{profile.major}</p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500">المستوى الحالي:</span>
            <span className="font-semibold text-indigo-700">{profile.levelTitle}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1 flex-1">
          <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
            القائمة الرئيسية
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-right ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Educational Banner / Tip */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/60 border border-indigo-100/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>نصيحة اليوم للإلقاء</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "الوقفة الواعية بعد السؤال تمنح الحضور فرصة التفكير، وتمنحك ثانية لضبط أنفاسك."
            </p>
          </div>
        </div>

      </aside>

      {/* Mobile Bottom Navigation Bar (Cap <= 15% viewport height) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => navigateTo('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1.5 text-[10px] font-medium transition-colors ${
            currentView === 'dashboard' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>الرئيسية</span>
        </button>
        <button
          onClick={() => navigateTo('training')}
          className={`flex flex-col items-center gap-0.5 p-1.5 text-[10px] font-medium transition-colors ${
            currentView === 'training' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>المراحل</span>
        </button>
        <button
          onClick={() => navigateTo('studio', { stageId: 'camera' })}
          className="flex flex-col items-center -mt-4 bg-indigo-600 text-white rounded-full p-3 shadow-md shadow-indigo-300 hover:bg-indigo-700 transition-transform active:scale-95"
          aria-label="ابدأ تدريب جديد"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigateTo('reports')}
          className={`flex flex-col items-center gap-0.5 p-1.5 text-[10px] font-medium transition-colors ${
            currentView === 'reports' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>تقاريري</span>
        </button>
        <button
          onClick={() => navigateTo('coach')}
          className={`flex flex-col items-center gap-0.5 p-1.5 text-[10px] font-medium transition-colors ${
            currentView === 'coach' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span>المدرب</span>
        </button>
      </nav>
    </>
  );
};
