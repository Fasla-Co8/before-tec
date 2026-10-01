import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TRAINING_STAGES,
  VIRTUAL_AVATARS,
  VIRTUAL_AUDIENCE_OPTIONS,
  ASSET_IMAGES
} from '../../constants/stages';
import {
  Mic,
  Video,
  Bot,
  Users,
  Award,
  Play,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload,
  Settings2,
  Info
} from 'lucide-react';
import { StageId } from '../../types';

export const TrainingSelectionView: React.FC = () => {
  const {
    navigateTo,
    selectedAvatar,
    setSelectedAvatar,
    selectedAudience,
    setSelectedAudience,
    slides
  } = useApp();

  const [activeTab, setActiveTab] = useState<StageId>('camera');

  const getStageIcon = (id: StageId) => {
    switch (id) {
      case 'voice': return <Mic className="w-6 h-6 text-indigo-600" />;
      case 'camera': return <Video className="w-6 h-6 text-emerald-600" />;
      case 'avatar': return <Bot className="w-6 h-6 text-violet-600" />;
      case 'audience': return <Users className="w-6 h-6 text-amber-600" />;
      case 'presentation': return <Award className="w-6 h-6 text-rose-600" />;
    }
  };

  const currentStageInfo = TRAINING_STAGES.find(s => s.id === activeTab) || TRAINING_STAGES[1];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs text-right space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>اختر بيئة المحاكاة المناسبة لك اليوم</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          ماذا تريد أن تتدرب عليه؟
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          تدرّج براحتك. يمكنك البدء بتسجيل صوتي بسيط، أو تشغيل الكاميرا، أو تجربة التحدث أمام شخصية افتراضية أو قاعة طلاب كاملة مع شرائح العرض.
        </p>
      </div>

      {/* 5 Stage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {TRAINING_STAGES.map(stage => {
          const isSelected = activeTab === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveTab(stage.id)}
              className={`p-5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                    {getStageIcon(stage.id)}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {stage.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {stage.tagline}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {stage.durationLabel}
                </span>
                <span className={`font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {isSelected ? 'محدد حاليًا' : 'تحديد'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Configuration & Launch Section for Selected Stage */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                {getStageIcon(currentStageInfo.id)}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600">
                  المرحلة {currentStageInfo.number}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {currentStageInfo.title}
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {currentStageInfo.description}
            </p>

            {/* Stage 3 Customization: Choose Avatar */}
            {activeTab === 'avatar' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>اختر شخصية المستمع الافتراضي:</span>
                  <span className="text-indigo-600">{selectedAvatar.role}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VIRTUAL_AVATARS.map(avatar => {
                    const isSelected = selectedAvatar.id === avatar.id;
                    return (
                      <div
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-violet-50/80 border-violet-400 ring-2 ring-violet-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={avatar.imageUrl}
                            alt={avatar.name}
                            className="w-10 h-10 rounded-full object-cover border border-violet-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {avatar.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">
                              {avatar.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          {avatar.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stage 4 Customization: Choose Audience Size */}
            {activeTab === 'audience' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>اختر حجم الجمهور الافتراضي:</span>
                  <span className="text-amber-700">{selectedAudience.label}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VIRTUAL_AUDIENCE_OPTIONS.map(option => {
                    const isSelected = selectedAudience.id === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setSelectedAudience(option)}
                        className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-slate-900">
                            {option.title}
                          </h4>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                            {option.difficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stage 5 Customization: Slides preview */}
            {activeTab === 'presentation' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>الشرائح التقديمية المحملة ({slides.length} شرائح):</span>
                  <span className="text-rose-600 text-[11px] font-normal">عرض تكنولوجيا التعليم الجاهز</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      📄 العرض الحالي: "بيئات التعلم الذكية وتطبيقات الذكاء الاصطناعي"
                    </span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      جاهز للعرض
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    يمكنك التنقل بين الشرائح أثناء التسجيل بضغطة زر وتلقي تقييم على تزامن شرحك مع كل شريحة.
                  </p>
                </div>
              </div>
            )}

            {/* Measured Metrics Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 block">
                مؤشرات التحليل التي ستركز عليها هذه الجلسة:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {currentStageInfo.measuredMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Preview Card & Start CTA */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-5">
            
            <div className="rounded-xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-900">
              <img
                src={
                  activeTab === 'avatar'
                    ? ASSET_IMAGES.avatarCoach
                    : activeTab === 'audience' || activeTab === 'presentation'
                    ? ASSET_IMAGES.audienceHall
                    : ASSET_IMAGES.hero
                }
                alt="بيئة المحاكاة المحددة"
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  بيئة محاكاة تفاعلية فورية
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span>الصعوبة:</span>
                <span className="font-bold text-slate-800">{currentStageInfo.difficulty}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span>المدة النموذجية:</span>
                <span className="font-bold text-slate-800 font-mono">{currentStageInfo.durationLabel}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>الكاميرا مطلوبة:</span>
                <span className="font-bold text-slate-800">
                  {activeTab === 'voice' ? 'لا (صوت فقط)' : 'نعم (أو محاكاة بديلة)'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('studio', { stageId: activeTab })}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md shadow-indigo-200 transition-all text-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>دخول جلسة التدريب الآن</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                "خذ نفسًا عميقًا، ابتسم، وابدأ بهدوء."
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
