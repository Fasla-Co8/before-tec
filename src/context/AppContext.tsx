import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  PracticeSession,
  StageId,
  AchievementBadge,
  SessionMetrics,
  VirtualAvatar,
  VirtualAudienceOption,
  SlideItem
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_RECENT_SESSIONS,
  INITIAL_BADGES,
  TRAINING_STAGES,
  VIRTUAL_AVATARS,
  VIRTUAL_AUDIENCE_OPTIONS,
  SAMPLE_PRESENTATION_SLIDES
} from '../constants/stages';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'training'
  | 'studio'
  | 'result'
  | 'reports'
  | 'progress'
  | 'achievements'
  | 'coach'
  | 'settings';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateTo: (view: AppView, options?: { stageId?: StageId; sessionId?: string }) => void;
  
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  
  sessions: PracticeSession[];
  activeStageId: StageId;
  setActiveStageId: (stageId: StageId) => void;
  
  activeSessionResult: PracticeSession | null;
  setActiveSessionResult: (session: PracticeSession | null) => void;
  
  badges: AchievementBadge[];
  unlockBadge: (badgeId: string) => void;
  
  selectedAvatar: VirtualAvatar;
  setSelectedAvatar: (avatar: VirtualAvatar) => void;
  
  selectedAudience: VirtualAudienceOption;
  setSelectedAudience: (audience: VirtualAudienceOption) => void;
  
  slides: SlideItem[];
  addSlide: (slide: SlideItem) => void;
  
  isBaselineModalOpen: boolean;
  setIsBaselineModalOpen: (open: boolean) => void;
  
  saveCompletedSession: (newSession: PracticeSession) => void;
  recordBaselineScore: (score: number, metricsSummary: { confidence: number; clarity: number; rate: number; eye: number }) => void;
  
  triggerCelebration: () => void;
  resetAllData: () => void;
  
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'qabl_profile_v2',
  SESSIONS: 'qabl_sessions_v2',
  BADGES: 'qabl_badges_v2',
  ACTIVE_STAGE: 'qabl_active_stage_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeStageId, setActiveStageId] = useState<StageId>('camera');
  const [activeSessionResult, setActiveSessionResult] = useState<PracticeSession | null>(
    INITIAL_RECENT_SESSIONS[0]
  );
  
  // Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  // Sessions state
  const [sessions, setSessions] = useState<PracticeSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return saved ? JSON.parse(saved) : INITIAL_RECENT_SESSIONS;
    } catch {
      return INITIAL_RECENT_SESSIONS;
    }
  });

  // Badges state
  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Avatar and audience configuration for simulations
  const [selectedAvatar, setSelectedAvatar] = useState<VirtualAvatar>(VIRTUAL_AVATARS[0]);
  const [selectedAudience, setSelectedAudience] = useState<VirtualAudienceOption>(VIRTUAL_AUDIENCE_OPTIONS[0]);
  const [slides, setSlides] = useState<SlideItem[]>(SAMPLE_PRESENTATION_SLIDES);
  
  // Baseline modal
  const [isBaselineModalOpen, setIsBaselineModalOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(2);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }, [badges]);

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Safe fallback if canvas is restricted
    }
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => (b.id === badgeId ? { ...b, unlocked: true, unlockedAt: 'الآن' } : b))
    );
    triggerCelebration();
  };

  const navigateTo = (view: AppView, options?: { stageId?: StageId; sessionId?: string }) => {
    if (options?.stageId) {
      setActiveStageId(options.stageId);
    }
    if (options?.sessionId) {
      const target = sessions.find(s => s.id === options.sessionId);
      if (target) {
        setActiveSessionResult(target);
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveCompletedSession = (newSession: PracticeSession) => {
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setActiveSessionResult(newSession);

    // Compute updated average skill scores
    const avgScore = Math.round(
      updatedSessions.reduce((acc, curr) => acc + curr.overallScore, 0) / updatedSessions.length
    );

    // Update level and skills progression
    const totalSessions = updatedSessions.length;
    let newLevel = profile.level;
    let newLevelTitle = profile.levelTitle;

    if (totalSessions >= 8 || newSession.overallScore >= 85) {
      newLevel = 5;
      newLevelTitle = 'جاهز للعرض';
    } else if (totalSessions >= 6 || newSession.stageId === 'audience') {
      newLevel = 4;
      newLevelTitle = 'أمام الجمهور';
    } else if (totalSessions >= 4 || newSession.stageId === 'avatar') {
      newLevel = 3;
      newLevelTitle = 'أمام شخصية افتراضية';
    } else if (totalSessions >= 2) {
      newLevel = 2;
      newLevelTitle = 'أمام الكاميرا';
    }

    const currentStageIdx = TRAINING_STAGES.findIndex(s => s.id === newSession.stageId);
    const progressPercent = Math.min(100, Math.round(((currentStageIdx + 1) / 5) * 100));

    updateProfile({
      overallSkillScore: avgScore,
      level: newLevel,
      levelTitle: newLevelTitle,
      progressToNextLevel: progressPercent,
      skills: {
        confidence: Math.min(95, Math.round((profile.skills.confidence + newSession.overallScore) / 2)),
        voiceClarity: Math.min(98, Math.round((profile.skills.voiceClarity + newSession.metrics.voiceClarity.score) / 2)),
        speakingRate: Math.min(95, Math.round((profile.skills.speakingRate + newSession.metrics.speakingRate.score) / 2)),
        eyeContact: Math.min(92, Math.round((profile.skills.eyeContact + newSession.metrics.eyeContact.score) / 2)),
        structure: Math.min(94, Math.round((profile.skills.structure + newSession.metrics.structure.score) / 2))
      }
    });

    // Check unlocks
    if (newSession.stageId === 'audience') {
      unlockBadge('face_the_crowd');
    }
    if (newSession.stageId === 'presentation' && newSession.overallScore >= 80) {
      unlockBadge('ready_for_stage');
    }
    if (totalSessions >= 5) {
      unlockBadge('five_sessions');
    }

    navigateTo('result');
    triggerCelebration();
  };

  const recordBaselineScore = (
    score: number,
    metricsSummary: { confidence: number; clarity: number; rate: number; eye: number }
  ) => {
    updateProfile({
      baselineScore: score,
      baselineCompleted: true,
      skills: {
        ...profile.skills,
        confidence: metricsSummary.confidence,
        voiceClarity: metricsSummary.clarity,
        speakingRate: metricsSummary.rate,
        eyeContact: metricsSummary.eye
      }
    });
    setIsBaselineModalOpen(false);
    triggerCelebration();
  };

  const addSlide = (slide: SlideItem) => {
    setSlides(prev => [...prev, slide]);
  };

  const markNotificationsAsRead = () => {
    setUnreadNotificationsCount(0);
  };

  const resetAllData = () => {
    localStorage.clear();
    setProfile(INITIAL_STUDENT_PROFILE);
    setSessions(INITIAL_RECENT_SESSIONS);
    setBadges(INITIAL_BADGES);
    setActiveSessionResult(INITIAL_RECENT_SESSIONS[0]);
    setActiveStageId('camera');
    setCurrentView('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        profile,
        updateProfile,
        sessions,
        activeStageId,
        setActiveStageId,
        activeSessionResult,
        setActiveSessionResult,
        badges,
        unlockBadge,
        selectedAvatar,
        setSelectedAvatar,
        selectedAudience,
        setSelectedAudience,
        slides,
        addSlide,
        isBaselineModalOpen,
        setIsBaselineModalOpen,
        saveCompletedSession,
        recordBaselineScore,
        triggerCelebration,
        resetAllData,
        unreadNotificationsCount,
        markNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
