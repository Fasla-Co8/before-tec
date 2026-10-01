import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  Filter,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { sessions, profile, navigateTo } = useApp();

  const [filterStage, setFilterStage] = useState<string>('all');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Filtered list
  const filteredSessions = filterStage === 'all'
    ? sessions
    : sessions.filter(s => s.stageId === filterStage);

  // Total stats
  const totalMinutes = Math.round(sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60);
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.overallScore, 0) / sessions.length)
    : 0;

  // Chart data: chronological order (oldest to newest)
  const chartSessions = [...sessions].reverse();

  // SVG Line Chart calculations
  const svgWidth = 720;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingY * 2;
  const minScore = 40;
  const maxScore = 100;

  const points = chartSessions.map((session, index) => {
    const x = paddingX + (index / Math.max(1, chartSessions.length - 1)) * usableWidth;
    const y = svgHeight - paddingY - ((session.overallScore - minScore) / (maxScore - minScore)) * usableHeight;
    return { x, y, score: session.overallScore, label: `جلسة ${index + 1}`, session };
  });

  const pathD = points.length > 1
    ? points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')
    : '';

  const areaD = points.length > 1
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`
    : '';

  return (
    <div className="space-y-8 pb-14 print:p-0">
      
      {/* 1. Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 print:border-none">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>السجل التحليلي التراكمي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            تقارير تطور مهارات العرض
          </h1>
          <p className="text-sm text-slate-600">
            سجل موثق لجميع جلسات الطالب {profile.name} — قسم {profile.major}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer print:hidden shrink-0"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>طباعة / تصدير PDF</span>
        </button>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">جلسات التدريب</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {sessions.length}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block mt-1">تراكمي كامل</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">وقت التدريب الإجمالي</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalMinutes} <span className="text-xs font-normal text-slate-500">دقيقة</span>
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">تسجيل فعلي</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">متوسط التقييم</span>
          <span className="text-2xl font-extrabold text-indigo-700 font-mono tabular-nums">
            {avgScore}%
          </span>
          <span className="text-[10px] text-indigo-500 font-medium block mt-1">مستوى جيد جدًا</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">أفضل مهارة</span>
          <span className="text-sm font-bold text-slate-900 truncate block">
            وضوح الصوت
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block mt-1">88% نقاء ومخارج</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">تحتاج تطوير</span>
          <span className="text-sm font-bold text-slate-900 truncate block">
            التواصل البصري
          </span>
          <span className="text-[10px] text-amber-600 font-medium block mt-1">64% تركيز على العدسة</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-right">
          <span className="text-[11px] text-slate-400 block mb-1">معدل التحسن</span>
          <span className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
            +26%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">مقارنة بـ 52 خط الأساس</span>
        </div>

      </div>

      {/* 3. Performance Progression Line Chart (Section 7) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              مسار تطور الدرجة العامة عبر الجلسات (Line Chart)
            </h3>
            <p className="text-xs text-slate-500">
              تدرج أداء الطالب من جلسة 1 (52) حتى جلسة 5 (78)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              الدرجة المحققة
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-0.5 bg-slate-300" />
              خط الأساس (52)
            </span>
          </div>
        </div>

        {/* Interactive Responsive SVG Line Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px] relative py-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 overflow-visible">
              
              {/* Horizontal Grid lines */}
              {[40, 60, 80, 100].map(val => {
                const y = svgHeight - paddingY - ((val - minScore) / (maxScore - minScore)) * usableHeight;
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 4}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Baseline reference line at 52 */}
              {(() => {
                const baseY = svgHeight - paddingY - ((52 - minScore) / (maxScore - minScore)) * usableHeight;
                return (
                  <line
                    x1={paddingX}
                    y1={baseY}
                    x2={svgWidth - paddingX}
                    y2={baseY}
                    stroke="#cbd5e1"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                  />
                );
              })()}

              {/* Area fill */}
              {areaD && (
                <path
                  d={areaD}
                  fill="url(#indigoGrad)"
                  opacity="0.15"
                />
              )}

              {/* Main Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint === i ? 7 : 5}
                    fill="#ffffff"
                    stroke="#4f46e5"
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Score Label above point */}
                  <text
                    x={p.x}
                    y={p.y - 12}
                    fill="#1e293b"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {p.score}
                  </text>
                  {/* Session Label below axis */}
                  <text
                    x={p.x}
                    y={svgHeight - 8}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              {/* Linear Gradient definition */}
              <defs>
                <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Hovered point details card */}
        {hoveredPoint !== null && points[hoveredPoint] && (
          <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-100 flex items-center justify-between text-xs animate-in fade-in">
            <span className="font-bold text-slate-800">
              {points[hoveredPoint].session.stageTitle}
            </span>
            <span className="text-indigo-700 font-mono font-bold">
              الدرجة: {points[hoveredPoint].session.overallScore}/100 · {points[hoveredPoint].session.timestamp}
            </span>
          </div>
        )}
      </div>

      {/* 4. Filterable Sessions History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              جدول الجلسات التفصيلي ({filteredSessions.length} جلسة)
            </h3>
            <p className="text-xs text-slate-500">
              انقر على أي صف لمطالعة التقرير الفردي الكامل
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setFilterStage('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                filterStage === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilterStage('voice')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                filterStage === 'voice' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              صوتي
            </button>
            <button
              onClick={() => setFilterStage('camera')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                filterStage === 'camera' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              كاميرا
            </button>
            <button
              onClick={() => setFilterStage('avatar')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                filterStage === 'avatar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              شخصية افتراضية
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                <th className="py-3 px-3">الجلسة والبيئة</th>
                <th className="py-3 px-3">التاريخ والوقت</th>
                <th className="py-3 px-3">المدة</th>
                <th className="py-3 px-3">سرعة الكلام</th>
                <th className="py-3 px-3">نقاء الصوت</th>
                <th className="py-3 px-3">التواصل البصري</th>
                <th className="py-3 px-3">التقييم العام</th>
                <th className="py-3 px-3 print:hidden">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSessions.map(s => (
                <tr
                  key={s.id}
                  onClick={() => navigateTo('result', { sessionId: s.id })}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block truncate max-w-[200px]">
                      {s.stageTitle}
                    </span>
                    {s.topic && <span className="text-[11px] text-slate-400">{s.topic}</span>}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">
                    {s.timestamp}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono">
                    {Math.round(s.durationSeconds / 60)} دقيقة
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700">
                    {s.metrics.speakingRate.score}%
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-700">
                    {s.metrics.voiceClarity.score}%
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700">
                    {s.metrics.eyeContact.score}%
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-extrabold text-sm text-indigo-700 font-mono">
                      {s.overallScore} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 print:hidden">
                    <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-1">
                      معاينة
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
