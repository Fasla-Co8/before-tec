import React from 'react';
import { useApp } from '../../context/AppContext';
import { MetricRing } from '../common/MetricRing';
import { TRAINING_STAGES, ASSET_IMAGES } from '../../constants/stages';
import {
  Video,
  Mic,
  Bot,
  Users,
  Award,
  Sparkles,
  ArrowLeft,
  Clock,
  TrendingUp,
  Flame,
  ChevronLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { profile, sessions, badges, navigateTo, setActiveStageId } = useApp();

  const skillBars = [
    { label: 'وضوح الصوت', score: profile.skills.voiceClarity, color: 'bg-emerald-500' },
    { label: 'تنظيم الأفكار', score: profile.skills.structure, color: 'bg-indigo-600' },
    { label: 'سرعة الكلام', score: profile.skills.speakingRate, color: 'bg-blue-500' },
    { label: 'الثقة بالنفس', score: profile.skills.confidence, color: 'bg-violet-500' },
    { label: 'التواصل البصري', score: profile.skills.eyeContact, color: 'bg-amber-500' },
  ];

  const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              {profile.university} — {profile.academicYear}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            مرحبًا بك يا {profile.name} 👋
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            أنت الآن في <span className="font-bold text-slate-800">المستوى {profile.level} ({profile.levelTitle})</span>. لديك {sessions.length} جلسات تدريبية مسجلة ومعدل تحسن مستمر.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('training')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span>استعراض كل المراحل</span>
          </button>
          <button
            onClick={() => navigateTo('studio', { stageId: 'camera' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 active:scale-98 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>جلسة تدريب سريعة</span>
          </button>
        </div>
      </div>

      {/* 2. Main Stats & Skill Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Overall Skill Progress Ring Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              المعدل العام للمهارات
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% عن البداية
            </span>
          </div>

          <MetricRing
            score={profile.overallSkillScore}
            size={160}
            strokeWidth={12}
            color="#4f46e5"
            label="مستوى مهارة العرض والتقديم"
            sublabel="من 100"
          />

          <div className="w-full mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 block">الجلسات المكتملة</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {sessions.length} جلسات
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 block">وقت التدريب الإجمالي</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {Math.round(sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60)} دقيقة
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Skills Bar Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              تفصيل المهارات الخمس الأساسية
            </h3>
            <span className="text-xs text-slate-500">
              محدثة بناءً على آخر 5 جلسات
            </span>
          </div>

          <div className="space-y-4 flex-1 justify-center flex flex-col">
            {skillBars.map(item => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <span className="font-bold text-slate-700 font-mono tabular-nums">
                    {item.score}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              أعلى نقطة قوة: وضوح مخارج الصوت ({profile.skills.voiceClarity}%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              فرصة للتطوير: التواصل البصري ({profile.skills.eyeContact}%)
            </span>
          </div>
        </div>

      </div>

      {/* 3. AI Coach Widget & Level Gamification Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Level Progression Card */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-slate-400 uppercase tracking-wider">
                نظام المستويات
              </span>
              <span className="font-mono text-indigo-700 font-bold">
                المستوى {profile.level} / 5
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shrink-0">
                {profile.level === 1 ? '🎙️' : profile.level === 2 ? '📹' : profile.level === 3 ? '🤖' : profile.level === 4 ? '👥' : '🎤'}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {profile.levelTitle}
                </h4>
                <p className="text-xs text-slate-500">
                  {profile.level === 2 ? 'تجاوزت حاجز الصوت فقط وبدأت الظهور أمام الشاشة' : 'تستمر في الصعود نحو قاعة العرض'}
                </p>
              </div>
            </div>

            {/* Progress to next level */}
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>المسافة المتبقية للمستوى التالي</span>
                <span className="font-mono font-bold text-indigo-700">{profile.progressToNextLevel}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${profile.progressToNextLevel}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              الإنجازات المكتسبة: <strong className="text-slate-800">{unlockedBadgesCount}</strong> من {badges.length}
            </span>
            <button
              onClick={() => navigateTo('achievements')}
              className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>عرض الشارات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Coach Card */}
        <div className="md:col-span-7 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden">
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>مدربك الذكي 🤖</span>
              </div>
              <span className="text-xs text-indigo-300">
                ملاحظات مخصصة لـ {profile.name}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              "أداؤك تحسن بنسبة 14% عن أول جلسة!"
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-indigo-100/90 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
              <p>
                • <strong>ملاحظة:</strong> لاحظنا أنك تتحدث بسرعة أعلى عندما تبدأ في شرح مفهوم جديد.
              </p>
              <p>
                • <strong>نصيحة عملية:</strong> جرّب أخذ وقفة لمدة ثانية كاملة قبل الانتقال للشريحة أو الفكرة التالية لتمنح أنفاسك استراحة.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
            <span className="text-xs text-indigo-200">
              الهدف القادم: تحسين التواصل البصري ليتجاوز 70%
            </span>
            <button
              onClick={() => navigateTo('studio', { stageId: 'avatar' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-indigo-50 shadow-sm transition-colors cursor-pointer"
            >
              <span>جرّب نصيحة المدرب الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. Quick Stage Jumpers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            اختر بيئة تدريب اليوم
          </h3>
          <button
            onClick={() => navigateTo('training')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كل التفاصيل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRAINING_STAGES.map(stage => {
            const isCurrent = stage.id === 'camera';
            return (
              <div
                key={stage.id}
                onClick={() => navigateTo('studio', { stageId: stage.id })}
                className={`p-4 rounded-xl border transition-all text-right cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      مرحلة {stage.number}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {stage.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {stage.tagline}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {stage.durationLabel}
                  </span>
                  <span className="font-bold text-indigo-600 inline-flex items-center gap-1 group-hover:underline">
                    دخول
                    <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recent Sessions History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              سجل جلساتك الأخيرة
            </h3>
            <p className="text-xs text-slate-500">
              اضغط على أي جلسة لمعاينة تقرير الأداء الشامل والنصائح
            </p>
          </div>
          <button
            onClick={() => navigateTo('reports')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كل التقارير ({sessions.length})</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {sessions.slice(0, 5).map(session => (
            <div
              key={session.id}
              onClick={() => navigateTo('result', { sessionId: session.id })}
              className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm font-mono shrink-0">
                  {session.overallScore}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {session.stageTitle}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{session.timestamp}</span>
                    <span>·</span>
                    <span>{Math.round(session.durationSeconds / 60)} دقائق</span>
                    {session.topic && (
                      <>
                        <span>·</span>
                        <span className="text-slate-600 truncate max-w-[200px]">{session.topic}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  نقاء الصوت {session.metrics.voiceClarity.score}%
                </span>
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  التقرير
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
