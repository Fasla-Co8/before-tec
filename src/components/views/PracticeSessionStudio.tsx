import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { TRAINING_STAGES, ASSET_IMAGES } from '../../constants/stages';
import { AudioVisualizer } from '../common/AudioVisualizer';
import { PracticeSession, SessionMetrics } from '../../types';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Activity,
  HeartHandshake,
  Bot,
  Users,
  ChevronRight,
  ChevronLeft,
  FileText,
  Volume2,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const PracticeSessionStudio: React.FC = () => {
  const {
    activeStageId,
    setActiveStageId,
    selectedAvatar,
    selectedAudience,
    slides,
    saveCompletedSession,
    navigateTo,
    profile
  } = useApp();

  const currentStage = TRAINING_STAGES.find(s => s.id === activeStageId) || TRAINING_STAGES[1];

  // System states: 'idle' | 'recording' | 'paused' | 'processing'
  const [studioState, setStudioState] = useState<'idle' | 'recording' | 'paused' | 'processing'>('idle');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(activeStageId !== 'voice');
  const [isMicActive, setIsMicActive] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  // Slide presenter index for stage 5
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);

  // Live performance indicators (updated during recording)
  const [liveIndicators, setLiveIndicators] = useState({
    wpm: 128,
    clarityPercent: 86,
    pauseCount: 2,
    eyeContactRating: 'ممتاز (ثابت مع الكاميرا)',
    bodyPosture: 'مستقيم ومستقر',
    stressLevel: 'هادئ ومتزن'
  });

  // Avatar reaction status for stage 3
  const [avatarReaction, setAvatarReaction] = useState<'يومئ برأسه' | 'يبتسم' | 'مستمع باهتمام' | 'يدون ملاحظة'>('مستمع باهتمام');

  // Video element ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Initialize camera/mic if not stage 1
  useEffect(() => {
    let localStream: MediaStream | null = null;

    if (activeStageId !== 'voice' && isCameraActive) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localStream = stream;
          setCameraStream(stream);
          setPermissionError(null);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.warn('Camera/mic access unavailable or denied:', err);
          setPermissionError('لم نتمكن من تشغيل الكاميرا الحقيقية. تم تفعيل وضع المحاكاة البصرية الآمن.');
        });
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeStageId, isCameraActive]);

  // Timer handling
  useEffect(() => {
    if (studioState === 'recording') {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerSeconds(prev => prev + 1);

        // Dynamically simulate subtle live indicator fluctuations
        if (Math.random() > 0.6) {
          setLiveIndicators(prev => ({
            ...prev,
            wpm: Math.floor(Math.random() * 20 + 120),
            clarityPercent: Math.min(96, Math.max(78, prev.clarityPercent + (Math.random() > 0.5 ? 1 : -1))),
            pauseCount: prev.pauseCount + (Math.random() > 0.85 ? 1 : 0),
            eyeContactRating: Math.random() > 0.25 ? 'ممتاز (ثابت مع الكاميرا)' : 'تشتت طفيف لأسفل',
            stressLevel: Math.random() > 0.8 ? 'نبض طبيعي متزن' : 'ثقة مرتفعة'
          }));
        }

        // Avatar reaction cycle for stage 3
        if (activeStageId === 'avatar' && Math.random() > 0.7) {
          const reactions: ('يومئ برأسه' | 'يبتسم' | 'مستمع باهتمام' | 'يدون ملاحظة')[] = [
            'يومئ برأسه',
            'يبتسم',
            'مستمع باهتمام',
            'يدون ملاحظة'
          ];
          setAvatarReaction(reactions[Math.floor(Math.random() * reactions.length)]);
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [studioState, activeStageId]);

  const handleStartRecording = () => {
    setStudioState('recording');
  };

  const handlePauseRecording = () => {
    setStudioState(prev => (prev === 'recording' ? 'paused' : 'recording'));
  };

  const handleFinishRecording = () => {
    setStudioState('processing');

    // Simulate multi-stage AI radar analysis
    setTimeout(() => {
      const recordedDuration = Math.max(45, timerSeconds);
      
      // Calculate realistic metrics
      const calculatedOverallScore = Math.min(94, Math.max(68, Math.round(74 + (timerSeconds > 60 ? 6 : 2))));

      const newSession: PracticeSession = {
        id: `ses-${Date.now().toString().slice(-4)}`,
        stageId: activeStageId,
        stageTitle: `${currentStage.tagline} — تدريب تطبيقي`,
        timestamp: 'الآن',
        durationSeconds: recordedDuration,
        overallScore: calculatedOverallScore,
        metrics: {
          speakingRate: {
            score: Math.min(92, Math.max(72, liveIndicators.wpm > 145 ? 74 : 84)),
            label: 'سرعة الكلام',
            valueDisplay: `${liveIndicators.wpm} كلمة/دقيقة`,
            feedback: liveIndicators.wpm > 140
              ? 'سرعتك كانت حماسية، لكن حاول التمهل قليلًا لإتاحة فرصة استيعاب المفاهيم الجديدة.'
              : 'معدل كلماتك في الدقيقة نموذجي ومريح للأذن والتركيز.',
            status: liveIndicators.wpm > 140 ? 'جيد' : 'ممتاز'
          },
          pauses: {
            score: 84,
            label: 'التوقفات والوقفات',
            valueDisplay: `${Math.max(2, liveIndicators.pauseCount)} وقفات واعية`,
            feedback: 'استخدمت وقفات مدروسة بين الأفكار الرئيسية، مما يعكس ثقة عالية بالنفس.',
            status: 'ممتاز'
          },
          voiceClarity: {
            score: liveIndicators.clarityPercent,
            label: 'وضوح الصوت ونقاؤه',
            valueDisplay: `${liveIndicators.clarityPercent}% نقاء`,
            feedback: 'الصوت واضح، مخارج الألفاظ منضبطة بدون انخفاض مفاجئ في نبرة نهاية العبارات.',
            status: 'ممتاز'
          },
          eyeContact: {
            score: activeStageId === 'voice' ? 70 : 76,
            label: 'التواصل البصري',
            valueDisplay: activeStageId === 'voice' ? 'غير مفعل (صوتي)' : '76% ثبات بصري',
            feedback: activeStageId === 'voice'
              ? 'تدريب صوتي ركّز على نبرتك.'
              : 'توزيع نظراتك أمام الكاميرا كان جيدًا مع حاجة بسيطة لتقليل النظر للملاحظات أسفل الشاشة.',
            status: 'جيد'
          },
          bodyPosture: {
            score: 80,
            label: 'لغة الجسد والثبات',
            valueDisplay: '80% ثبات متزن',
            feedback: 'حافظت على استقامة الكتفين وحركات يدين عفوية ومقنعة تشرح الأفكار.',
            status: 'ممتاز'
          },
          structure: {
            score: 82,
            label: 'تنظيم وتسلسل العرض',
            valueDisplay: '82% ترابط منطقي',
            feedback: 'الانتقال بين النقاط كان متسلسلاً بطريقة تربوية تتناسب مع طلاب تكنولوجيا التعليم.',
            status: 'ممتاز'
          }
        },
        aiCoachTips: [
          'أداؤك في هذه الجلسة أظهر تقدمًا ملحوظًا في التحكم بنبرة الصوت وتوزيع النفس.',
          'تذكر أن أخذ نفس عميق قبل أي فكرة جديدة يزيل أي تسارع غير مقصود في ضربات القلب.',
          'في المرحلة القادمة، ركّز على تكرار نفس الهدوء أمام جمهور أوسع.'
        ],
        topic: activeStageId === 'presentation'
          ? 'بيئات التعلم الذكية وتطبيقات الذكاء الاصطناعي'
          : 'شرح مفهوم تعليمي مصغر'
      };

      saveCompletedSession(newSession);
    }, 2400);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Processing Screen
  if (studioState === 'processing') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">
            جاري تحليل أدائك في الإلقاء...
          </h2>
          <p className="text-sm text-slate-500">
            نقوم الآن بقياس سرعة الكلام، مخارج الحروف، فترات الصمت، والتواصل البصري لإعداد تقريرك الشامل.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
            <span>معالجة المؤشرات</span>
            <span className="text-indigo-600 font-bold">92%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-11/12 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Studio Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('training')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="الرجوع لاختيار المراحل"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                المرحلة {currentStage.number}: {currentStage.tagline}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                الهدف: {currentStage.durationLabel}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              استوديو التدريب الآمن
            </h1>
          </div>
        </div>

        {/* Live Timer Display */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-base font-bold shadow-xs">
            <Clock className={`w-4 h-4 ${studioState === 'recording' ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          {/* Studio State Badge */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {studioState === 'recording' ? (
              <span className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                جاري التسجيل
              </span>
            ) : studioState === 'paused' ? (
              <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                متوقف مؤقتًا
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                جاهز للبدء
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Pre-recording Guidance Message */}
      {studioState === 'idle' && (
        <div className="bg-gradient-to-l from-indigo-50 via-purple-50 to-white rounded-xl p-4 border border-indigo-100/80 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <p className="font-medium">
              "خذ نفسًا عميقًا، ابتسم، وابدأ بهدوء. لن يراك أحد سوى مرآتك التدريبية، ولك حرية إعادة المحاولة في أي وقت."
            </p>
          </div>
          <span className="hidden sm:inline text-indigo-700 font-semibold shrink-0 mr-4">
            تذكر: الصمت الواعي قوة
          </span>
        </div>
      )}

      {/* Camera / Audio Warning if Permission is simulated */}
      {permissionError && (
        <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{permissionError}</span>
          </div>
          <button
            onClick={() => {
              navigator.mediaDevices?.getUserMedia({ video: true, audio: true }).then(() => {
                setPermissionError(null);
                window.location.reload();
              });
            }}
            className="text-amber-900 font-bold hover:underline shrink-0 mr-3 cursor-pointer"
          >
            إعادة طلب الصلاحية
          </button>
        </div>
      )}

      {/* Main Studio Arena: Stage Preview + Live Indicators Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Stage Center Stage (Webcam / Avatar / Crowd / Slides) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-video shadow-xl border border-slate-800 flex items-center justify-center">
            
            {/* 1. Voice Only View (Stage 1) */}
            {activeStageId === 'voice' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white space-y-6 bg-gradient-to-b from-slate-900 to-indigo-950">
                <div className="relative">
                  <div className={`w-28 h-28 rounded-full bg-indigo-600/30 border-2 border-indigo-400 flex items-center justify-center ${studioState === 'recording' ? 'animate-ping' : ''}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/50">
                      <Mic className="w-10 h-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold">المرحلة الأولى: صوتك أولًا</h3>
                  <p className="text-xs text-slate-300 max-w-sm">
                    ركز على رنين صوتك وسرعة إلقائك بدون أي قلق من المظهر أو الكاميرا.
                  </p>
                </div>

                <div className="w-full max-w-md">
                  <AudioVisualizer isRecording={studioState === 'recording'} audioStream={cameraStream} height={48} barCount={24} />
                </div>
              </div>
            )}

            {/* 2. Camera View (Stage 2) */}
            {activeStageId === 'camera' && (
              <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                {cameraStream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={ASSET_IMAGES.hero}
                      alt="محاكاة الكاميرا التدريبية"
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-white/20">
                        وضع محاكاة الكاميرا التفاعلية
                      </div>
                    </div>
                  </div>
                )}

                {/* Eye Contact Guideline Box */}
                {studioState === 'recording' && (
                  <div className="absolute top-1/4 inset-x-1/4 bottom-1/4 border-2 border-dashed border-indigo-400/40 rounded-2xl pointer-events-none flex flex-col items-center justify-between p-3">
                    <span className="text-[10px] text-indigo-300 bg-black/60 px-2 py-0.5 rounded-full font-medium">
                      منطقة التركيز البصري الموصى بها
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-black/60 px-2 py-0.5 rounded-full">
                      ✓ تواصل بصري ممتاز
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 3. Virtual Avatar View (Stage 3) */}
            {activeStageId === 'avatar' && (
              <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                {/* Background Mentor Studio */}
                <img
                  src={selectedAvatar.imageUrl}
                  alt={selectedAvatar.name}
                  className="w-full h-full object-cover object-top opacity-90"
                  referrerPolicy="no-referrer"
                />

                {/* Avatar Speech/Reaction Bubble */}
                <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 text-slate-800 text-right animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-900">{selectedAvatar.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({selectedAvatar.personality})</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {studioState === 'recording'
                      ? `أستمع إليك باهتمام... ${avatarReaction === 'يبتسم' ? 'ابتسامتك ونبرتك مشجعة جدًا!' : 'فكرة ممتازة، أكمل الشرح.'}`
                      : 'أنا جاهزة للاستماع لشرحك في أي وقت. تفضل بالبدء.'}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>حالة المستمع:</span>
                    <span className="font-semibold text-indigo-600">{avatarReaction}</span>
                  </div>
                </div>

                {/* Presenter PIP (Picture-in-Picture) */}
                <div className="absolute bottom-4 left-4 w-32 sm:w-44 aspect-video rounded-xl overflow-hidden border-2 border-white/60 shadow-lg bg-black">
                  {cameraStream ? (
                    <video
                      autoPlay
                      playsInline
                      muted
                      ref={el => {
                        if (el && cameraStream) el.srcObject = cameraStream;
                      }}
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-[10px]">
                      كاميرتك هنا
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Virtual Audience View (Stage 4) */}
            {activeStageId === 'audience' && (
              <div className="w-full h-full relative bg-slate-900">
                <img
                  src={ASSET_IMAGES.audienceHall}
                  alt="قاعة الجمهور الافتراضي"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Audience Density Overlay Tag */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-white text-xs flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>{selectedAudience.title}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-400">تفاعل الحضور: 84%</span>
                </div>

                {/* Audience Stress / Room Temperature Gauge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  <span>مستوى التوتر بالقاعة: <strong className="text-emerald-300 font-mono">طبيعي</strong></span>
                </div>

                {/* Presenter PIP */}
                <div className="absolute bottom-4 left-4 w-32 sm:w-44 aspect-video rounded-xl overflow-hidden border-2 border-white/60 shadow-lg bg-black">
                  {cameraStream ? (
                    <video
                      autoPlay
                      playsInline
                      muted
                      ref={el => {
                        if (el && cameraStream) el.srcObject = cameraStream;
                      }}
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-[10px]">
                      كاميرا المتحدث
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. Full Presentation Simulation (Stage 5 with Slides Deck) */}
            {activeStageId === 'presentation' && (
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-slate-900">
                
                {/* Slide View (Left 8 cols) */}
                <div className="md:col-span-8 p-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
                  <div>
                    <div className="flex items-center justify-between text-xs text-indigo-300 mb-3 border-b border-white/10 pb-2">
                      <span className="font-mono">الشريحة {currentSlideIndex + 1} من {slides.length}</span>
                      <span className="text-slate-400">مشروع تكنولوجيا التعليم</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                      {slides[currentSlideIndex].title}
                    </h2>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {slides[currentSlideIndex].bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Slide controls */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentSlideIndex === 0}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition-colors"
                        title="الشريحة السابقة"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                        disabled={currentSlideIndex === slides.length - 1}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition-colors"
                        title="الشريحة التالية"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="text-indigo-300 hover:text-white flex items-center gap-1 font-medium"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{showNotes ? 'إخفاء ملاحظات الإلقاء' : 'إظهار الملاحظات'}</span>
                    </button>
                  </div>
                </div>

                {/* Audience & Presenter Split (Right 4 cols) */}
                <div className="md:col-span-4 bg-slate-950 border-r border-white/10 flex flex-col justify-between p-3">
                  <div className="rounded-xl overflow-hidden aspect-video relative border border-white/20">
                    <img
                      src={ASSET_IMAGES.audienceHall}
                      alt="الجمهور"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-2 text-[10px] text-white bg-black/60 px-1.5 rounded">
                      لجنة التحكيم
                    </div>
                  </div>

                  {/* Presenter Camera in Stage 5 */}
                  <div className="mt-3 rounded-xl overflow-hidden aspect-video relative border border-white/20 bg-black">
                    {cameraStream ? (
                      <video
                        autoPlay
                        playsInline
                        muted
                        ref={el => {
                          if (el && cameraStream) el.srcObject = cameraStream;
                        }}
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-[10px]">
                        كاميرتك
                      </div>
                    )}
                    <div className="absolute bottom-1 right-2 text-[10px] text-emerald-400 bg-black/60 px-1.5 rounded">
                      بث مباشر
                    </div>
                  </div>

                  {/* Presenter Notes */}
                  {showNotes && (
                    <div className="mt-3 bg-white/10 p-2.5 rounded-xl border border-white/10 text-[11px] text-indigo-200">
                      <span className="font-bold block text-white mb-0.5">💡 ملاحظة هذه الشريحة:</span>
                      {slides[currentSlideIndex].note}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Overlaid Audio Bar at bottom of stage preview */}
            {activeStageId !== 'voice' && (
              <div className="absolute bottom-3 inset-x-4 max-w-sm pointer-events-none">
                <div className="bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <AudioVisualizer isRecording={studioState === 'recording'} audioStream={cameraStream} height={24} barCount={18} />
                </div>
              </div>
            )}

          </div>

          {/* Interactive Studio Bottom Action Deck */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Quick Media Hardware Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMicActive(!isMicActive)}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isMicActive
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}
                title={isMicActive ? 'كتم الميكروفون' : 'تشغيل الميكروفون'}
              >
                {isMicActive ? <Mic className="w-4 h-4 text-emerald-600" /> : <MicOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{isMicActive ? 'الميكروفون نشط' : 'مكتوم'}</span>
              </button>

              {activeStageId !== 'voice' && (
                <button
                  onClick={() => setIsCameraActive(!isCameraActive)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isCameraActive
                      ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      : 'bg-rose-50 border-rose-200 text-rose-700'
                  }`}
                  title={isCameraActive ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
                >
                  {isCameraActive ? <Video className="w-4 h-4 text-indigo-600" /> : <VideoOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isCameraActive ? 'الكاميرا نشطة' : 'متوقفة'}</span>
                </button>
              )}
            </div>

            {/* Central Master Recording Controls */}
            <div className="flex items-center gap-3">
              {studioState === 'idle' ? (
                <button
                  onClick={handleStartRecording}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-98 shadow-md shadow-rose-200 transition-all text-sm cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ابدأ التسجيل الآن</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePauseRecording}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-xs cursor-pointer"
                  >
                    <Pause className="w-4 h-4" />
                    <span>{studioState === 'paused' ? 'استئناف' : 'إيقاف مؤقت'}</span>
                  </button>

                  <button
                    onClick={handleFinishRecording}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all text-xs cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>إنهاء وتحليل الأداء</span>
                  </button>
                </>
              )}
            </div>

            {/* Reset / Guidance shortcut */}
            <div>
              <button
                onClick={() => {
                  setStudioState('idle');
                  setTimerSeconds(0);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 p-2 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة التهيئة</span>
              </button>
            </div>

          </div>

        </div>

        {/* Real-Time Performance Indicators Side Deck */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  مؤشرات الأداء اللحظية
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                مباشر
              </span>
            </div>

            {/* Metric 1: Voice & Clarity */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  جودة ووضوح الصوت
                </span>
                <span className="font-mono font-bold text-slate-800">{liveIndicators.clarityPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${liveIndicators.clarityPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">نبرة جهورية واضحة ومستقرة</span>
            </div>

            {/* Metric 2: Speaking Speed */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  سرعة الكلام (ك/د)
                </span>
                <span className="font-mono font-bold text-slate-800">{liveIndicators.wpm} كلمة/دقيقة</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (liveIndicators.wpm / 180) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>هادئ (110)</span>
                <span className="font-semibold text-slate-600">مثالي (130-145)</span>
                <span>سريع (170+)</span>
              </div>
            </div>

            {/* Metric 3: Pauses */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                <Pause className="w-3.5 h-3.5 text-amber-600" />
                التوقفات والوقفات الواعية
              </span>
              <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {liveIndicators.pauseCount} وقفات
              </span>
            </div>

            {/* Metric 4: Eye Contact */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Eye className="w-3.5 h-3.5 text-violet-600" />
                  التواصل البصري
                </span>
                <span className="text-emerald-700 font-semibold text-[11px]">
                  {liveIndicators.eyeContactRating}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                استمر في النظر للعدسة أثناء إبراز الكلمات الأساسية.
              </p>
            </div>

            {/* Metric 5: Body Posture & Calmness */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
                  إدارة التوتر والهدوء
                </span>
                <span className="text-indigo-700 font-semibold text-[11px]">
                  {liveIndicators.stressLevel}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                كتفان مسترخيان وحركات يدين متوازنة.
              </p>
            </div>

          </div>

          {/* Quick Coach Tip Box during rehearsal */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-right space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>نصيحة سريعة أثناء التسجيل</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              إذا نسيت كلمة، لا تعتذر ولا تقف محتارًا؛ خذ شهيقًا هادئًا وأعد صياغة الفكرة بكلماتك البسيطة.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
