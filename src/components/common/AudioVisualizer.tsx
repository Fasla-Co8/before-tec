import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface AudioVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream | null;
  height?: number;
  barCount?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isRecording,
  audioStream,
  height = 40,
  barCount = 18
}) => {
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [simulatedBars, setSimulatedBars] = useState<number[]>(Array(barCount).fill(15));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRecording) {
      setVolumeLevel(0);
      setSimulatedBars(Array(barCount).fill(12));
      return;
    }

    // Try real Web Audio API with stream
    if (audioStream && audioStream.getAudioTracks().length > 0) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        const source = ctx.createMediaStreamSource(audioStream);
        source.connect(analyser);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateMeter = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate average volume
          let sum = 0;
          const bars: number[] = [];
          const step = Math.max(1, Math.floor(dataArray.length / barCount));

          for (let i = 0; i < barCount; i++) {
            const val = dataArray[i * step] || 0;
            sum += val;
            bars.push(Math.max(10, Math.min(100, Math.round((val / 255) * 100))));
          }

          const avg = sum / dataArray.length;
          setVolumeLevel(Math.round((avg / 255) * 100));
          setSimulatedBars(bars);

          animationFrameRef.current = requestAnimationFrame(updateMeter);
        };

        updateMeter();

        return () => {
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(() => {});
          }
        };
      } catch (err) {
        console.warn('Real audio analyzer fallback to simulation:', err);
      }
    }

    // Simulated organic speech cadence fallback
    const interval = setInterval(() => {
      const generated = Array.from({ length: barCount }, (_, i) => {
        const centerDist = Math.abs(i - barCount / 2);
        const factor = 1 - centerDist / (barCount / 1.6);
        const randomSpike = Math.random() * 55 + 20;
        return Math.max(12, Math.min(95, Math.round(randomSpike * factor)));
      });
      const avg = Math.round(generated.reduce((a, b) => a + b, 0) / generated.length);
      setVolumeLevel(avg);
      setSimulatedBars(generated);
    }, 120);

    return () => clearInterval(interval);
  }, [isRecording, audioStream, barCount]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>مستوى التقاط الصوت</span>
        </div>
        <span className="font-mono tabular-nums text-slate-700 font-semibold">
          {isRecording ? `${volumeLevel}%` : 'جاهز'}
        </span>
      </div>

      {/* Visualizer bars */}
      <div
        className="flex items-end justify-between gap-1 w-full bg-slate-900/90 rounded-lg p-2 px-3 border border-slate-800"
        style={{ height }}
      >
        {simulatedBars.map((heightPercent, index) => {
          const isHigh = heightPercent > 70;
          const isMed = heightPercent > 35;
          const barColor = isHigh
            ? 'bg-rose-400'
            : isMed
            ? 'bg-emerald-400'
            : 'bg-indigo-400';

          return (
            <div
              key={index}
              className={`flex-1 rounded-sm transition-all duration-100 ease-out ${
                isRecording ? barColor : 'bg-slate-700'
              }`}
              style={{
                height: `${isRecording ? heightPercent : 15}%`,
                minHeight: '4px'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
