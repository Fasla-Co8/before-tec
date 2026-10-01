import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Sparkles,
  Send,
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  HeartHandshake,
  Mic,
  Eye,
  Activity,
  Smile
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'coach' | 'student';
  text: string;
  timestamp: string;
  actionPrompt?: string;
}

export const AICoachView: React.FC = () => {
  const { profile, sessions, navigateTo } = useApp();

  const [inputQuestion, setInputQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'coach',
      text: `أهلاً بك يا ${profile.name}! لقد قمت بتحليل آخر 5 جلسات تدريبية لك في بيئات الصوت والكاميرا والمستمع الافتراضي. أداؤك تحسن بنسبة 14% عن البداية، ونبرتك الصوتية ونقاء مخارجك (84%) نقطة قوة حقيقية لديك!`,
      timestamp: 'الآن'
    },
    {
      id: 'm2',
      sender: 'coach',
      text: 'لاحظنا أنك تتحدث بسرعة عندما تبدأ في شرح نقطة جديدة في الشرائح (145+ كلمة/دقيقة). جرّب أخذ وقفة لمدة ثانية كاملة قبل الانتقال للنقطة التالية.',
      timestamp: 'الآن',
      actionPrompt: 'جرّب نصيحة المدرب في جلسة الكاميرا'
    }
  ]);

  const presetQuestions = [
    'كيف أتغلب على تسارع ضربات القلب وجفاف الريق قبل بداية الشرح؟',
    'ما هي أفضل طريقة لتوزيع نظري على لجنة التحكيم وزملائي؟',
    'كيف أنظم وقت الشريحة حتى لا ينتهي وقت العرض فجأة؟',
    'ماذا أفعل لو نسيت فكرة أو مصطلحًا علميًا أثناء الشرح؟'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuestion;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'student',
      text: query,
      timestamp: 'الآن'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuestion('');

    // Responsive AI coach answers grounded in Educational Technology presentation contexts
    setTimeout(() => {
      let reply = 'سؤال رائع ومهم جدًا لأي طالب في تكنولوجيا التعليم!';

      if (query.includes('ضربات القلب') || query.includes('جفاف الريق')) {
        reply = 'تسارع النبض هو استجابة فسيولوجية طبيعية لحماس جسمك وليس علامة ضعف! أفضل طريقة للتهدئة هي: 1) تمرين تنفس 4-7-8 (شهيق 4 ثوانٍ، كتم 7 ثوانٍ، زفير هادئ 8 ثوانٍ)، 2) شرب رشفة ماء معتدل الحرارة، 3) تذكر أن الحاضرين جاؤوا للاستفادة من فكرتك وليس لمحاسبتك شخصيًا.';
      } else if (query.includes('توزيع نظري') || query.includes('لجنة')) {
        reply = 'استخدم أسلوب "تثبيت النظرة الودودة" (3 ثوانٍ لكل شخص أو قطاع): قسّم القاعة لثلاث مناطق: اليمين، الوسط، واليسار. انظر لوجه شخص ودود في اليمين لمدة جملة واحدة، ثم انتقل للشخص في الوسط، ثم اليسار. هذا يشعر الجميع أنك تخاطبهم شخصيًا ويزيد ثباتك بنسبة 35%!';
      } else if (query.includes('وقت') || query.includes('تنتهي')) {
        reply = 'قاعدة ذهبية: خصص 20% للمقدمة والخطاف، 60% لصلب الموضوع وأمثلة تكنولوجيا التعليم العملية، و20% للخاتمة والأسئلة. في مرحلة العرض الحقيقي بالتطبيق، ستجد مؤقتًا ركنيًا ينبهك بتدرج ألوان هادئ عند انقضاء منتصف الوقت.';
      } else if (query.includes('نسيت') || query.includes('مصطلح')) {
        reply = 'الصمت الواعي هو حليفك الأقوى! إذا نسيت مصطلحًا، لا تقل أبدًا "أنا آسف نسيت" بل خذ وقفة هادئة وابتسم، وقل: "بمعنى آخر أو من منظور تربوي مبسط..." وأعد الشرح بكلماتك التلقائية. الحضور سيظنون أنك تتأمل الفكرة بعمق!';
      } else {
        reply = `بناءً على درجتك الحالية في التواصل (${profile.overallSkillScore}%)، أنصحك بالتركيز على الوقفات الإرادية بين النقاط. كل وقفة مدتها ثانية واحدة ترفع استيعاب الجمهور بنسبة 20% وتمنحك الثبات التام.`;
      }

      const botMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'coach',
        text: reply,
        timestamp: 'الآن',
        actionPrompt: 'تطبيق هذه النصيحة في استوديو التدريب'
      };

      setMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="space-y-8 pb-14">
      
      {/* 1. Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>المرشد الصوتي والخطابي التفاعلي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            مدربك الذكي للإلقاء والعرض
          </h1>
          <p className="text-sm text-slate-600">
            يقدم توجيهات مخصصة لأسلوبك، مبنية على سجل جلساتك الفعلية ونقاط ضعفك ومكامن قوتك.
          </p>
        </div>

        <button
          onClick={() => navigateTo('studio', { stageId: 'avatar' })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <span>جرّب نصيحة المدرب الآن</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Interactive Consultation Chat */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden">
        
        {/* Messages Flow */}
        <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'student' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'coach'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {msg.sender === 'coach' ? <Bot className="w-5 h-5" /> : profile.name.charAt(0)}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'coach'
                    ? 'bg-white border border-slate-200/80 text-slate-800 shadow-xs text-right'
                    : 'bg-indigo-600 text-white text-right'
                }`}
              >
                <p>{msg.text}</p>

                {msg.actionPrompt && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-indigo-700 font-semibold">تطبيق عملي:</span>
                    <button
                      onClick={() => navigateTo('studio', { stageId: 'camera' })}
                      className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {msg.actionPrompt}
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Preset Quick Questions */}
        <div className="p-4 bg-white border-t border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 block mb-2">
            أسئلة شائعة يمكنك سؤال المدرب عنها بنقرة واحدة:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-right"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={inputQuestion}
            onChange={e => setInputQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="اكتب استشارتك للمدرب الذكي حول العرض والتقديم..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>إرسال</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
