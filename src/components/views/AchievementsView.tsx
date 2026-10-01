import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Trophy,
  Flame,
  TrendingUp,
  Video,
  Mic,
  Bot,
  Users,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronLeft
} from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { profile, badges, triggerCelebration, navigateTo } = useApp();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'Mic': return <Mic className="w-6 h-6 text-indigo-500" />;
      case 'Video': return <Video className="w-6 h-6 text-emerald-500" />;
      case 'Bot': return <Bot className="w-6 h-6 text-violet-500" />;
      case 'Flame': return <Flame className="w-6 h-6 text-rose-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-500" />;
      case 'Users': return <Users className="w-6 h-6 text-amber-500" />;
      case 'Award': return <Award className="w-6 h-6 text-yellow-500" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-500" />;
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;

  const levels = [
    { level: 1, title: 'متحدث مبتدئ 🎙️', desc: 'كسر الرهبة والتدريب الصوتي الهادئ' },
    { level: 2, title: 'أمام الكاميرا 📹', desc: 'التألف مع العدسة وملاحظة الحركات' },
    { level: 3, title: 'أمام شخصية افتراضية 🤖', desc: 'محاورة مستمع ذكي وملاحظة تعبيراته' },
    { level: 4, title: 'أمام الجمهور 👥', desc: 'توزيع النظرات وإدارة توتر القاعة' },
    { level: 5, title: 'جاهز للعرض 🎤', desc: 'إلقاء متكامل مع الشرائح ولجنة التقييم' },
  ];

  return (
    <div className="space-y-8 pb-14">
      
      {/* 1. Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>نظام التحفيز والوسام الأكاديمي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            أوسمة وإنجازات المتحدث
          </h1>
          <p className="text-sm text-slate-600">
            حصلت على <strong className="text-indigo-700">{unlockedCount}</strong> من أصل {badges.length} أوسمة تكريمية لجهودك.
          </p>
        </div>

        <button
          onClick={triggerCelebration}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-100/70 hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>احتفل بالإنجازات 🎉</span>
        </button>
      </div>

      {/* 2. 5-Level Gamification Progression */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              مستويات التطور الخمسة
            </h3>
            <p className="text-xs text-slate-500">
              مستواك الحالي: <strong className="text-indigo-700">{profile.levelTitle} (المستوى {profile.level})</strong>
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">
            {profile.progressToNextLevel}% نحو المستوى التالي
          </span>
        </div>

        {/* Level Track */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {levels.map(item => {
            const isCompleted = item.level < profile.level;
            const isCurrent = item.level === profile.level;
            const isLocked = item.level > profile.level;

            return (
              <div
                key={item.level}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold font-mono text-slate-500">
                      مستوى {item.level}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                        الحالي
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar to next level */}
        <div className="space-y-1.5 pt-2">
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000"
              style={{ width: `${profile.progressToNextLevel}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>المستوى 2</span>
            <span>المستوى 3</span>
          </div>
        </div>
      </div>

      {/* 3. Badges Grid (Section 10) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          معرض الأوسمة والشارات المكتسبة
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(badge => {
            const isUnlocked = badge.unlocked;

            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (isUnlocked) triggerCelebration();
                }}
                className={`p-5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md cursor-pointer group'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-indigo-50 border border-indigo-100 group-hover:scale-105 transition-transform'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isUnlocked ? getBadgeIcon(badge.icon) : <Lock className="w-5 h-5 text-slate-400" />}
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {badge.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {isUnlocked ? badge.unlockedAt || 'مكتمل' : 'مغلق حاليًا'}
                  </span>
                  {isUnlocked && (
                    <span className="font-bold text-indigo-600 text-[11px] group-hover:underline">
                      عرض
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
