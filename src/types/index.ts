export type StageId = 'voice' | 'camera' | 'avatar' | 'audience' | 'presentation';

export interface StageInfo {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  iconName: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي';
  durationLabel: string;
  defaultDurationSec: number;
  measuredMetrics: string[];
  tips: string[];
}

export interface MetricDetail {
  score: number; // 0 - 100
  label: string;
  valueDisplay: string;
  feedback: string;
  status: 'ممتاز' | 'جيد' | 'يحتاج تحسين';
}

export interface SessionMetrics {
  speakingRate: MetricDetail;
  pauses: MetricDetail;
  voiceClarity: MetricDetail;
  eyeContact: MetricDetail;
  bodyPosture: MetricDetail;
  structure: MetricDetail;
}

export interface PracticeSession {
  id: string;
  stageId: StageId;
  stageTitle: string;
  timestamp: string;
  durationSeconds: number;
  overallScore: number;
  metrics: SessionMetrics;
  aiCoachTips: string[];
  audienceType?: string;
  slidesUsed?: boolean;
  topic?: string;
}

export interface StudentProfile {
  name: string;
  major: string;
  university: string;
  academicYear: string;
  overallSkillScore: number; // e.g. 72%
  skills: {
    confidence: number; // 68%
    voiceClarity: number; // 84%
    speakingRate: number; // 75%
    eyeContact: number; // 61%
    structure: number; // 79%
  };
  level: number; // 1 to 5
  levelTitle: string; // e.g. "أمام الكاميرا"
  progressToNextLevel: number; // 68%
  baselineScore?: number;
  baselineCompleted: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'بدايات' | 'استمرار' | 'إتقان' | 'تحدي';
}

export interface VirtualAvatar {
  id: string;
  name: string;
  role: string;
  description: string;
  personality: 'ودود' | 'أكاديمي' | 'طالب زميل' | 'لجنة تحكيم';
  reactionStatus: 'مستمع باهتمام' | 'يومئ برأسه' | 'يبتسم' | 'يدون ملاحظة';
  imageUrl: string;
}

export interface VirtualAudienceOption {
  id: string;
  title: string;
  count: number;
  label: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم' | 'العرض الحقيقي';
  stressLevel: 'منخفض' | 'متوسط' | 'مرتفع';
  description: string;
}

export interface SlideItem {
  id: number;
  title: string;
  bullets: string[];
  note: string;
}
