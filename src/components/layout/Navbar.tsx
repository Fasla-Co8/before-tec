import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Play, User, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    profile,
    unreadNotificationsCount,
    markNotificationsAsRead,
    setIsBaselineModalOpen
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'تحسن في التواصل البصري',
      desc: 'سجلت نسبة 64% في آخر جلسة، استمر في التثبيت!',
      time: 'منذ ساعتين'
    },
    {
      id: 2,
      title: 'مرحلة جديدة جاهزة للتحدي',
      desc: 'يمكنك الآن تجربة المرحلة الرابعة أمام جمهور افتراضي.',
      time: 'اليوم'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 text-right group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              ش
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                قبل ما أشرح
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => navigateTo('landing')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'landing' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => navigateTo('dashboard')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'dashboard' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            لوحة الطالب
          </button>
          <button
            onClick={() => navigateTo('training')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'training' || currentView === 'studio' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            رحلة التدريب
          </button>
          <button
            onClick={() => navigateTo('reports')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'reports' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            التقارير
          </button>
          <button
            onClick={() => navigateTo('achievements')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'achievements' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            الإنجازات
          </button>
          <button
            onClick={() => navigateTo('coach')}
            className={`transition-colors hover:text-indigo-600 ${
              currentView === 'coach' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            المدرب الذكي
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 relative">
          
          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsAsRead();
              }}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors relative"
              aria-label="التنبيهات"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-3 px-4 z-50 text-right animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-semibold text-sm text-slate-800">التنبيهات والملاحظات</span>
                  <span className="text-xs text-indigo-600">جديد</span>
                </div>
                <div className="space-y-2.5">
                  {notifications.map(n => (
                    <div key={n.id} className="text-xs space-y-1 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <p className="font-medium text-slate-900">{n.title}</p>
                      <p className="text-slate-500">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick baseline assessment trigger */}
          <button
            onClick={() => setIsBaselineModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            اختبار الـ 60 ثانية
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => navigateTo('studio', { stageId: 'camera' })}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-lg shadow-sm shadow-indigo-200 transition-all whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            ابدأ التدريب
          </button>

          {/* User profile capsule */}
          <button
            onClick={() => navigateTo('settings')}
            className="flex items-center gap-2 p-1 pl-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="إعدادات الحساب"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs ring-1 ring-indigo-200">
              {profile.name.charAt(0)}
            </div>
            <span className="hidden lg:inline text-xs font-medium text-slate-800 truncate max-w-[80px]">
              {profile.name}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
