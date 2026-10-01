import React from 'react';

interface MetricRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  showPercent?: boolean;
}

export const MetricRing: React.FC<MetricRingProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label = 'مستوى مهارة العرض',
  sublabel,
  color = '#4f46e5', // indigo-600
  showPercent = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
            {clampedScore}
            {showPercent && <span className="text-lg font-bold text-slate-500 mr-0.5">%</span>}
          </span>
          {sublabel && (
            <span className="text-[11px] font-medium text-slate-500 mt-0.5 max-w-[80px] truncate">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-3 text-sm font-bold text-slate-800">
          {label}
        </span>
      )}
    </div>
  );
};
