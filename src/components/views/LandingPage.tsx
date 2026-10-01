import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRAINING_STAGES, ASSET_IMAGES } from '../../constants/stages';
import {
  Play,
  Mic,
  Video,
  Bot,
  Users,
  Award,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  Volume2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, setIsBaselineModalOpen } = useApp();

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic': return <Mic className="w-5 h-5 text-indigo-600" />;
      case 'Video': return <Video className="w-5 h-5 text-emerald-600" />;
      case 'Bot': return <Bot className="w-5 h-5 text-violet-600" />;
      case 'Users': return <Users className="w-5 h-5 text-amber-600" />;
      case 'Award': return <Award className="w-5 h-5 text-rose-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Slogan metadata banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-800">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>اتدرّب براحتك... قبل ما تشرح قدام الناس</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                الخوف من التحدث؟ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-700 via-indigo-600 to-violet-600">
                  ابدأ هنا بأمان.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                منصة تفاعلية مخصصة لطلاب تكنولوجيا التعليم. تدرّب على العرض والتقديم خطوة بخطوة؛ من تسجيل صوتي هادئ حتى قاعة المحاضرات ولجنة التقييم، واعرف نقاط قوتك قبل العرض الحقيقي.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('studio', { stageId: 'camera' })}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md shadow-indigo-200 transition-all text-sm sm:text-base cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ابدأ التدريب الآن</span>
                </button>

                <button
                  onClick={scrollToHowItWorks}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>كيف يعمل التطبيق؟</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>بيئة آمنة وخاصة 100% بدون إحراج</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>تدرج في 5 مراحل ذكية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>تحليل فوري لسرعة الإلقاء والصوت</span>
                </div>
              </div>

            </div>

            {/* Hero Mockup / Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="طالب يتدرب على مهارات العرض والتقديم أمام بيئة افتراضية"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Live Simulation Mockup Tag */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      محاكاة تدريب نشطة
                    </span>
                    <span className="text-slate-300 font-mono">01:45 / 03:00</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    المرحلة 2: أمام الكاميرا — تحليل تعبيرات الوجه والتواصل البصري
                  </h4>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-300">
                    <span>سرعة الكلام: 132 ك/د</span>
                    <span>·</span>
                    <span>وضوح الصوت: 88%</span>
                    <span>·</span>
                    <span className="text-emerald-300">ثبات ممتاز</span>
                  </div>
                </div>
              </div>

              {/* Floating diagnostic prompt card */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3.5 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">اختبار مبدئي 60 ثانية</p>
                  <p className="text-[11px] text-slate-500">اعرف مستواك الأساسي الآن</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. The 5-Stage Training Journey (Timeline / Progress Path) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            رحلة التدرج النفسي والمهاري
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            5 مراحل مصممة لكسر الخوف وبناء الهيبة
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            لن نطلب منك الوقوف أمام 50 شخصًا فجأة! نتدرج معك من أهدأ نقطة حتى قاعة العرض الحقيقية.
          </p>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-6 relative">
          
          {TRAINING_STAGES.map((stage, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === TRAINING_STAGES.length - 1;
            
            return (
              <div
                key={stage.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Subtle side accent bar */}
                <div
                  className={`absolute top-0 right-0 bottom-0 w-1.5 ${
                    stage.id === 'voice'
                      ? 'bg-indigo-500'
                      : stage.id === 'camera'
                      ? 'bg-emerald-500'
                      : stage.id === 'avatar'
                      ? 'bg-violet-500'
                      : stage.id === 'audience'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Stage Number & Title */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        {getStageIcon(stage.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block font-mono">
                          المرحلة {stage.number} من 5
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-500 pt-1">
                      {stage.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Measured Metrics */}
                  <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                    <span className="text-xs font-bold text-slate-700 block mb-2.5">
                      يقيس النظام في هذه المرحلة:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {stage.measuredMetrics.slice(0, 4).map((metric, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stage Duration & Action Button */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">المدة المقترحة:</span>
                      <span className="text-sm font-bold text-slate-800 font-mono">
                        {stage.durationLabel}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateTo('studio', { stageId: stage.id })}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 active:scale-98 transition-colors shadow-xs cursor-pointer"
                    >
                      <span>ابدأ المرحلة</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">
              كيف يعمل "قبل ما أشرح"؟
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              مسار بسيط وواضح يأخذ بيدك من التجربة الأولى حتى الاحتراف
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center font-mono">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">اختبار مبدئي 60 ثانية</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                سجّل دقيقة واحدة تتحدث فيها عن نفسك لنقيس خط الأساس لمعدل نبرتك وسرعتك الحالية.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center font-mono">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">اختر بيئة التدريب</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                حدد المرحلة: صوت، كاميرا، مستمع افتراضي، أو قاعة كاملة مع ملف العرض التقديمي.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center font-mono">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">تحليل أداء فوري</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                يقيس التطبيق سرعتك، الوقفات، التواصل البصري، ولغة الجسد بنقاط محددة وقابلة للتطوير.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center font-mono">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-base">توجيهات المدرب الذكي</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تلقَّ نصائح فورية لتطبيقها في جلستك التالية وشاهد تطور نقاطك في تقارير بيانية تفاعلية.
              </p>
            </div>

          </div>

          {/* Quick Baseline Action Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-l from-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-right">
              <h3 className="text-xl sm:text-2xl font-bold">
                جاهز لمعرفة مستواك في مهارة العرض؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                لا يحتاج الأمر سوى 60 ثانية لتسجيل مقدمة صوتية وكشف مؤشراتك الأساسية.
              </p>
            </div>
            <button
              onClick={() => setIsBaselineModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-indigo-900 bg-white hover:bg-slate-100 transition-colors shadow-md text-sm shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>ابدأ الاختبار المبدئي الآن</span>
            </button>
          </div>

        </div>
      </section>

      {/* 4. Student Voices / Proof */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            تجارب طلاب تكنولوجيا التعليم
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            كيف ساعدت البيئة الآمنة زملاءك في الاستعداد لمشروعات التخرج والتدريس المصغر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              "كنت أرتجف بمجرد التفكير في سمنار التدريس المصغر. التدرج من الصوت فقط إلى الكاميرا ثم المستمع الافتراضي جعلني أدخل القاعة الحقيقية وأنا واثق تمامًا من سرعتي."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">أحمد محمد</span>
              <span className="text-slate-500">الفرقة الثالثة — تكنولوجيا تعليم</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              "مؤشر سرعة الكلام والتوقفات ساعدني أعرف إني كنت بجري في الشرح أول ما أتوتر! تطبيق نصيحة المدرب فرقت جدًا في فهم دكتور المادة لعرضي."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">سلمى عبد العزيز</span>
              <span className="text-slate-500">مشروع تخرج بيئات تعلم</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              "أفضل ميزة هي محاكاة الجمهور الافتراضي والشرائح؛ تحس كأنك في مناقشة حقيقية بدون أي خوف من الغلط."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">عمر الشناوي</span>
              <span className="text-slate-500">دبلوم مهني تقنيات تعليم</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>قبل ما أشرح — منصة تدريب العرض والإلقاء لطلاب تكنولوجيا التعليم © 2026</p>
        <p className="mt-1 text-slate-400">"من أول كلمة لحد العرض الحقيقي، خليك مستعد وواثق."</p>
      </footer>

    </div>
  );
};
