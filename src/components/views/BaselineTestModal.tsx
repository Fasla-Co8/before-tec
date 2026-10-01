import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSET_IMAGES } from '../../constants/stages';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  Mic,
  Play,
  Square,
  Sparkles,
  Clock,
  CheckCircle2,
  X,
  Volume2,
  ArrowLeft
} from 'lucide-react';

export const BaselineTestModal: React.FC = () => {
  const {
    isBaselineModalOpen,
    setIsBaselineModalOpen,
    recordBaselineScore,
    profile,
    navigateTo
  } = useApp();

  const [state, setState] = useState<'intro' | 'recording' | 'analyzing' | 'done'>('intro');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Result metrics
  const baselineResults = {
    overall: 58,
    confidence: 45,
    clarity: 71,
    rate: 58,
    eye: 42
  };

  useEffect(() => {
    let timer: number | null = null;
    if (state === 'recording' && secondsLeft > 0) {
      timer = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleCompleteRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state, secondsLeft]);

  if (!isBaselineModalOpen) return null;

  const startTestRecording = () => {
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then(s => setStream(s))
      .catch(() => {});
    setState('recording');
    setSecondsLeft(60);
  };

  const handleCompleteRecording = () => {
    setState('analyzing');
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }
    setTimeout(() => {
      setState('done');
    }, 2000);
  };

  const handleSaveAndClose = () => {
    recordBaselineScore(baselineResults.overall, {
      confidence: baselineResults.confidence,
      clarity: baselineResults.clarity,
      rate: baselineResults.rate,
      eye: baselineResults.eye
    });
    navigateTo('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden text-right">
        
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                اختبار تحديد المستوى المبدئي (60 ثانية)
              </h3>
              <p className="text-[11px] text-slate-500">
                نقطة الانطلاق لقياس وتتبع تطورك
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBaselineModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* State 1: Intro */}
          {state === 'intro' && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
                <Mic className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-slate-900">
                  خلينا نعرف مستواك الحالي
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  تحدث ببساطة لمدة 60 ثانية عن موضوع مألوف لديك: <br />
                  <strong className="text-slate-900 font-semibold">
                    "عرّف نفسك، كليتك، وتخصصك في تكنولوجيا التعليم وما الذي تحب شرحه للناس."
                  </strong>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs text-slate-600 text-right space-y-1">
                <p>• لا تشغل بالك بالخطأ أو التردد؛ هذا اختبار استكشافي فقط.</p>
                <p>• سنقيس: سرعة الكلام، وضوح مخارج الصوت، وفترات التوقف.</p>
              </div>

              <button
                onClick={startTestRecording}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md shadow-indigo-200 text-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ابدأ الـ 60 ثانية الآن</span>
              </button>
            </div>
          )}

          {/* State 2: Recording */}
          {state === 'recording' && (
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-extrabold text-slate-900 font-mono">
                <Clock className="w-6 h-6 text-rose-500 animate-pulse" />
                <span>00:{secondsLeft.toString().padStart(2, '0')}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <p className="text-xs text-indigo-200">
                  "تحدث الآن: عرّف نفسك وتخصصك في تكنولوجيا التعليم..."
                </p>
                <AudioVisualizer isRecording={true} audioStream={stream} height={42} barCount={20} />
              </div>

              <button
                onClick={handleCompleteRecording}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-98 text-sm transition-all cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>إنهاء وحساب خط الأساس</span>
              </button>
            </div>
          )}

          {/* State 3: Analyzing */}
          {state === 'analyzing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">
                جاري حساب خط الأساس المبدئي...
              </h4>
              <p className="text-xs text-slate-500">
                نقوم بتحليل تسجيلك لتحديد أرقام البداية الدقيقة.
              </p>
            </div>
          )}

          {/* State 4: Done Results */}
          {state === 'done' && (
            <div className="space-y-5 text-right">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  تم تحديد خط الأساس بنجاح!
                </h4>
                <p className="text-xs text-slate-500">
                  النتيجة الإجمالية الأولية: <strong className="text-indigo-700 font-mono font-bold text-sm">58 / 100</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-500 block">الثقة بالنفس:</span>
                  <span className="text-base font-bold text-slate-900 font-mono">45%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-500 block">وضوح الصوت:</span>
                  <span className="text-base font-bold text-emerald-700 font-mono">71%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-500 block">سرعة الكلام:</span>
                  <span className="text-base font-bold text-blue-700 font-mono">58%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-500 block">التواصل البصري:</span>
                  <span className="text-base font-bold text-amber-700 font-mono">42%</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 leading-relaxed">
                💡 <strong className="text-indigo-900">الخطوة القادمة:</strong> "هنستخدم النتيجة دي لمتابعة تطورك في كل جلسة حتى تصل للعرض الحقيقي بنسبة 85%+!"
              </p>

              <button
                onClick={handleSaveAndClose}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                <span>حفظ والانتقال للوحة الطالب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
