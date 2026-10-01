/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/views/LandingPage';
import { DashboardView } from './components/views/DashboardView';
import { TrainingSelectionView } from './components/views/TrainingSelectionView';
import { PracticeSessionStudio } from './components/views/PracticeSessionStudio';
import { SessionResultView } from './components/views/SessionResultView';
import { ReportsView } from './components/views/ReportsView';
import { AchievementsView } from './components/views/AchievementsView';
import { AICoachView } from './components/views/AICoachView';
import { SettingsView } from './components/views/SettingsView';
import { BaselineTestModal } from './components/views/BaselineTestModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans" dir="rtl">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
          {/* Sidebar */}
          <Sidebar />

          {/* Core Page Canvas */}
          <main className="flex-1 min-w-0">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'training' && <TrainingSelectionView />}
            {currentView === 'studio' && <PracticeSessionStudio />}
            {currentView === 'result' && <SessionResultView />}
            {currentView === 'reports' && <ReportsView />}
            {currentView === 'progress' && <ReportsView />}
            {currentView === 'achievements' && <AchievementsView />}
            {currentView === 'coach' && <AICoachView />}
            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      )}

      {/* 60-second diagnostic modal */}
      <BaselineTestModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
