import React from 'react';
import { useApp } from '../../context/AppContext';
import { MetricRing } from '../common/MetricRing';
import {
  Trophy,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Download,
  Share2,
  Bot,
  Activity,
  Pause,
  Volume2,
  Eye,
  HeartHandshake,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { TRAINING_STAGES } from '../../constants/stages';

export const SessionResultView: React.FC = () => {
  const {
    activeSessionResult,
    sessions,
    navigateTo,
    triggerCelebration,
    profile
  } = useApp();

  const session = activeSessionResult || sessions[0];
  const previousSession = sessions.length > 1 ? sessions[1] : null;
  const scoreDiff = previousSession ? session.overallScore - previousSession.overallScore : +6;

  const currentStageIndex = TRAINING_STAGES.findIndex(s => s.id === session.stageId);
  const nextStage = currentStageIndex < TRAINING_STAGES.length - 1 ? TRAINING_STAGES[currentStageIndex + 1] : null;

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'speakingRate': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'pauses': return <Pause className="w-5 h-5 text-amber-600" />;
      case 'voiceClarity': return <Volume2 className="w-5 h-5 text-emerald-600" />;
      case 'eyeContact': return <Eye className="w-5 h-5 text-violet-600" />;
      case 'bodyPosture': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'structure': return <Layers className="w-5 h-5 text-indigo-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-14 print:p-0">
      
      {/* 1. Header Banner & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border-none">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>اكتملت جلسة التدريب بنجاح</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            تقرير تحليل أدائك في الإلقاء
          </h1>
          <p className="text-sm text-slate-600">
            {session.stageTitle} · {session.timestamp} · استغرقت {Math.round(session.durationSeconds / 60)} دقيقة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>تحميل التقرير PDF</span>
          </button>
          <button
            onClick={() => navigateTo('studio', { stageId: session.stageId })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>إعادة التدريب</span>
          </button>
          {nextStage && (
            <button
              onClick={() => navigateTo('studio', { stageId: nextStage.id })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 active:scale-98 transition-all cursor-pointer"
            >
              <span>المرحلة التالية ({nextStage.number})</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Summary Card: Score Ring + Comparative Evolution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Overall Score */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            التقييم الشامل للجلسة
          </span>

          <MetricRing
            score={session.overallScore}
            size={170}
            strokeWidth={14}
            color={session.overallScore >= 80 ? '#10b981' : '#4f46e5'}
            label=""
            sublabel="من 100"
          />

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
            {scoreDiff >= 0 ? (
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5" />
                تحسن بمقدار +{scoreDiff} نقطة عن الجلسة السابقة
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                فارق بسيط، التكرار يثبت المهارة
              </span>
            )}
          </div>
        </div>

        {/* AI Coach Detailed Feedback */}
        <div className="md:col-span-7 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-sm">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>تحليل المدرب الذكي لهذه الجلسة</span>
              </div>
              <span className="text-xs text-indigo-300">
                ملاحظات مخصصة لـ {profile.name}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              "ثباتك ونقاء صوتك اليوم كانا رائعين!"
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-indigo-100/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
              {session.aiCoachTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-200">
            <span>المهارة الأكثر تطورًا: وضوح مخارج الصوت</span>
            <button
              onClick={() => navigateTo('coach')}
              className="text-white hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>محادثة المدرب</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Detailed Metric Cards Grid (Section 6 Requirements) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            تحليل محاور الإلقاء بالتفصيل
          </h2>
          <span className="text-xs text-slate-500">
            6 محاور تم قياسها أثناء عرضك
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(session.metrics).map(([key, metric]) => {
            const isExcellent = metric.status === 'ممتاز';
            const isGood = metric.status === 'جيد';

            return (
              <div
                key={key}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {getMetricIcon(key)}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isExcellent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : isGood
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {metric.label}
                    </h3>
                    <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                      {metric.score}%
                    </span>
                  </div>

                  {metric.valueDisplay && (
                    <span className="text-xs font-mono text-slate-400 block mb-2">
                      القيمة المسجلة: {metric.valueDisplay}
                    </span>
                  )}

                  {/* Progress Line */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isExcellent
                          ? 'bg-emerald-500'
                          : isGood
                          ? 'bg-indigo-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{metric.feedback}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Progression Roadmap Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-right">
          <h3 className="text-base font-bold text-slate-900">
            خطوتك القادمة في الرحلة
          </h3>
          <p className="text-xs text-slate-500">
            كل جلسة تدريبية تقربك خطوة من كسر الرهبة التامة في قاعة المناقشة الحقيقية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            العودة للوحة الطالب
          </button>
          <button
            onClick={() => navigateTo('training')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            استعراض المراحل التالية
          </button>
        </div>
      </div>

    </div>
  );
};
