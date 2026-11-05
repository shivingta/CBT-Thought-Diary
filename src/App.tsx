/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DiaryProvider, useDiary } from './context/DiaryContext';
import { MannkaaMainTab, CBTSubTab } from './types';
import { Navbar } from './components/Navbar';
import { MainAppBottomNav } from './components/MainAppBottomNav';
import { SelfCareHub } from './components/SelfCareHub';
import { CBTExperienceView } from './components/CBTExperienceView';
import { HomeScreen } from './components/HomeScreen';
import { ExpertsScreen } from './components/ExpertsScreen';
import { MenuScreen } from './components/MenuScreen';
import { DistortionGuideModal } from './components/DistortionGuideModal';
import { GuidedBreathingModal } from './components/GuidedBreathingModal';
import { LumiSanctuaryModal } from './components/LumiSanctuaryModal';
import { PetCustomizeModal } from './components/PetCustomizeModal';
import { MoodCheckInModal } from './components/MoodCheckInModal';
import { GroundingExerciseModal } from './components/GroundingExerciseModal';
import { WellbeingAssessmentModal } from './components/WellbeingAssessmentModal';
import {
  Smartphone,
  Monitor,
  Brain,
  Sparkles,
  PlusCircle,
  Home,
  Calendar,
  Layers,
  Menu,
} from 'lucide-react';

function AppContent() {
  const { setCbtSubTab, deviceMode, setDeviceMode, stats, pet } = useDiary();

  // Primary Mannkaa App Navigation State - defaults to Self Care
  const [mainTab, setMainTab] = useState<MannkaaMainTab>('self_care');

  // In-Exercise CBT State (inside Self Care)
  const [isCBTExperienceOpen, setIsCBTExperienceOpen] = useState<boolean>(false);
  const [cbtActiveView, setCbtActiveView] = useState<'overview' | 'past_records' | 'create'>('overview');

  // Modals
  const [isDistortionGuideOpen, setIsDistortionGuideOpen] = useState<boolean>(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState<boolean>(false);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState<boolean>(false);
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState<boolean>(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isLumiSanctuaryOpen, setIsLumiSanctuaryOpen] = useState<boolean>(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState<boolean>(false);

  const handleEnterCBTExperience = (subTab?: CBTSubTab | 'records' | 'create' | 'overview') => {
    setMainTab('self_care');
    setIsCBTExperienceOpen(true);
    if (subTab === 'records') {
      setCbtActiveView('past_records');
    } else if (subTab === 'create') {
      setCbtActiveView('create');
    } else {
      setCbtActiveView('overview');
    }
    if (subTab === 'records' || subTab === 'distortions') {
      setCbtSubTab(subTab);
    }
  };

  const handleOpenCreateThought = () => {
    setMainTab('self_care');
    setIsCBTExperienceOpen(true);
    setCbtActiveView('create');
  };

  return (
    <div className="min-h-screen bg-[#000d14] text-white flex flex-col font-sans antialiased selection:bg-[#26c6da] selection:text-[#001724]">
      
      {/* Top Device Switcher Toolbar */}
      <header className="sticky top-0 z-50 bg-[#00111a]/95 border-b border-[#002838] px-4 py-2.5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#26c6da]/20 border border-[#26c6da]/40 flex items-center justify-center text-[#26c6da]">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight font-serif text-white hidden sm:inline">
              Mannkaa
            </span>
          </div>
          <span className="text-[11px] text-[#93c5d6] bg-[#001f30] px-2.5 py-0.5 rounded-full border border-[#00344d]">
            CBT Thought Diary
          </span>
        </div>

        {/* Device Switcher Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#001b29] p-1 rounded-xl border border-[#002f44] text-xs">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              deviceMode === 'mobile'
                ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                : 'text-[#93c5d6] hover:text-white'
            }`}
            title="Switch to Mobile App View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setDeviceMode('web')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              deviceMode === 'web'
                ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                : 'text-[#93c5d6] hover:text-white'
            }`}
            title="Switch to Web / Fullscreen View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web View</span>
          </button>
        </div>
      </header>

      {/* VIEWPORT 1: MOBILE APP EXPERIENCE (iPhone / Android Shell) */}
      {deviceMode === 'mobile' ? (
        <div className="flex-1 flex items-center justify-center py-4 sm:py-6 px-2 overflow-y-auto">
          <div className="w-full max-w-[420px] bg-[#001724] min-h-[810px] rounded-[42px] border-[6px] border-[#0c2a3d] shadow-2xl relative flex flex-col overflow-hidden">
            
            {/* Realistic Mobile Notch / Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1a24] border border-[#1e3442]" />
            </div>

            {/* Mobile Top Status Bar - Exact Match to Screenshot */}
            <div className="pt-2.5 px-6 pb-1 flex items-center justify-between text-white text-xs font-semibold select-none z-30 bg-[#001724]">
              <span className="tracking-tight text-xs font-bold pl-1 font-sans">10:38</span>
              <div className="flex items-center gap-1.5 text-white pr-1">
                {/* 4-bar signal */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className="w-0.5 h-1 bg-white rounded-xs" />
                  <div className="w-0.5 h-1.5 bg-white rounded-xs" />
                  <div className="w-0.5 h-2 bg-white rounded-xs" />
                  <div className="w-0.5 h-2.5 bg-white rounded-xs" />
                </div>
                {/* Wifi icon */}
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" strokeLinecap="round" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" strokeLinecap="round" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
                {/* Yellow battery pill with 46% */}
                <div className="px-1.5 py-0.2 rounded-full bg-[#facc15] text-[#001724] text-[10px] font-bold leading-tight flex items-center">
                  46
                </div>
              </div>
            </div>

            {/* Mobile Top App Bar (shown only for home, sessions/experts, menu) */}
            {mainTab !== 'self_care' && (
              <Navbar
                currentTab={mainTab}
                onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                onOpenCustomizeModal={() => setIsCustomizeModalOpen(true)}
                onGoToCBT={() => handleEnterCBTExperience('overview')}
              />
            )}

            {/* Mobile Tab Content Body */}
            <main className={`flex-1 px-4 overflow-y-auto pb-24 ${isCBTExperienceOpen && mainTab === 'self_care' ? 'pt-4' : 'pt-2'}`}>
              
              {/* 1. HOME TAB */}
              {mainTab === 'home' && (
                <HomeScreen
                  onGoToCBTExperience={handleEnterCBTExperience}
                  onOpenThoughtModal={handleOpenCreateThought}
                  onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                  onOpenLumiSanctuary={() => setIsLumiSanctuaryOpen(true)}
                  onGoToExperts={() => setMainTab('experts')}
                />
              )}

              {/* 2. SESSIONS / EXPERTS TAB */}
              {mainTab === 'experts' && <ExpertsScreen />}

              {/* 3. SELF CARE TAB */}
              {mainTab === 'self_care' && (
                <>
                  {isCBTExperienceOpen ? (
                    <CBTExperienceView
                      onBackToSelfCareHub={() => {
                        setIsCBTExperienceOpen(false);
                        setCbtActiveView('overview');
                      }}
                      activeView={cbtActiveView}
                      onChangeView={setCbtActiveView}
                      onOpenThoughtModal={handleOpenCreateThought}
                      onOpenDistortionGuide={() => setIsDistortionGuideOpen(true)}
                    />
                  ) : (
                    <SelfCareHub
                      onEnterCBTExperience={handleEnterCBTExperience}
                      onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                      onOpenMoodModal={() => setIsMoodModalOpen(true)}
                      onOpenGroundingModal={() => setIsGroundingModalOpen(true)}
                      onOpenAssessmentModal={() => setIsAssessmentModalOpen(true)}
                      onOpenLumiSanctuary={() => setIsLumiSanctuaryOpen(true)}
                    />
                  )}
                </>
              )}

              {/* 4. MENU TAB */}
              {mainTab === 'menu' && (
                <MenuScreen
                  onGoToSelfCare={() => {
                    setMainTab('self_care');
                    setIsCBTExperienceOpen(false);
                  }}
                  onOpenCustomizeCompanion={() => setIsCustomizeModalOpen(true)}
                />
              )}

            </main>

            {/* Mobile Home Bottom Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full pointer-events-none z-50" />

            {/* Fixed Mobile Bottom Navigation Bar */}
            <MainAppBottomNav
              activeTab={mainTab}
              onSelectTab={(tab) => {
                setMainTab(tab);
              }}
              isCBTExperienceOpen={mainTab === 'self_care' && isCBTExperienceOpen}
            />

          </div>
        </div>
      ) : (
        /* VIEWPORT 2: WEB / FULLSCREEN EXPERIENCE */
        <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-8 py-6">
          
          {/* Web Desktop Header */}
          <div className="bg-[#001724] border border-[#002f44] rounded-3xl p-5 mb-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#26c6da]/20 border border-[#26c6da]/40 flex items-center justify-center text-[#26c6da] shadow-inner">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold font-serif text-white">Mannkaa Self Care</h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00283c] text-[#26c6da] border border-[#003d58]">
                    Web Portal
                  </span>
                </div>
                <p className="text-xs text-[#93c5d6] mt-0.5">
                  Catch automatic thoughts, examine facts &amp; form balanced perspectives
                </p>
              </div>
            </div>

            {/* Web Nav Tabs & Action */}
            <div className="flex items-center gap-2 flex-wrap">
              <nav className="flex items-center gap-1 bg-[#00121c] p-1.5 rounded-2xl border border-[#002d42] text-xs">
                <button
                  onClick={() => {
                    setMainTab('self_care');
                    setIsCBTExperienceOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    mainTab === 'self_care' && !isCBTExperienceOpen
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'text-[#93c5d6] hover:text-white'
                  }`}
                >
                  Self Care Library
                </button>
                <button
                  onClick={() => handleEnterCBTExperience('records')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    mainTab === 'self_care' && isCBTExperienceOpen
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'text-[#93c5d6] hover:text-white'
                  }`}
                >
                  Thought Records ({stats.totalThoughtRecords})
                </button>
                <button
                  onClick={() => setMainTab('home')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    mainTab === 'home'
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'text-[#93c5d6] hover:text-white'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setMainTab('experts')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    mainTab === 'experts'
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'text-[#93c5d6] hover:text-white'
                  }`}
                >
                  Sessions
                </button>
                <button
                  onClick={() => setMainTab('menu')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    mainTab === 'menu'
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'text-[#93c5d6] hover:text-white'
                  }`}
                >
                  Settings
                </button>
              </nav>

              <button
                onClick={handleOpenCreateThought}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold bg-[#26c6da] hover:bg-[#20b2c4] text-[#001724] shadow-md transition active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Thought Record</span>
              </button>
            </div>
          </div>

          {/* Web Main Content */}
          <main className="flex-1 bg-[#001724] border border-[#002d42] rounded-3xl p-6 shadow-xl">
            {/* 1. HOME TAB */}
            {mainTab === 'home' && (
              <HomeScreen
                onGoToCBTExperience={handleEnterCBTExperience}
                onOpenThoughtModal={handleOpenCreateThought}
                onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                onOpenLumiSanctuary={() => setIsLumiSanctuaryOpen(true)}
                onGoToExperts={() => setMainTab('experts')}
              />
            )}

            {/* 2. SESSIONS / EXPERTS TAB */}
            {mainTab === 'experts' && <ExpertsScreen />}

            {/* 3. SELF CARE TAB */}
            {mainTab === 'self_care' && (
              <>
                {isCBTExperienceOpen ? (
                  <CBTExperienceView
                    onBackToSelfCareHub={() => {
                      setIsCBTExperienceOpen(false);
                      setCbtActiveView('overview');
                    }}
                    activeView={cbtActiveView}
                    onChangeView={setCbtActiveView}
                    onOpenThoughtModal={handleOpenCreateThought}
                    onOpenDistortionGuide={() => setIsDistortionGuideOpen(true)}
                  />
                ) : (
                  <SelfCareHub
                    onEnterCBTExperience={handleEnterCBTExperience}
                    onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                    onOpenMoodModal={() => setIsMoodModalOpen(true)}
                    onOpenGroundingModal={() => setIsGroundingModalOpen(true)}
                    onOpenAssessmentModal={() => setIsAssessmentModalOpen(true)}
                    onOpenLumiSanctuary={() => setIsLumiSanctuaryOpen(true)}
                  />
                )}
              </>
            )}

            {/* 4. MENU TAB */}
            {mainTab === 'menu' && (
              <MenuScreen
                onGoToSelfCare={() => {
                  setMainTab('self_care');
                  setIsCBTExperienceOpen(false);
                }}
                onOpenCustomizeCompanion={() => setIsCustomizeModalOpen(true)}
              />
            )}
          </main>

        </div>
      )}

      {/* Floating Interactive Modals (Shared across mobile and web) */}
      <DistortionGuideModal
        isOpen={isDistortionGuideOpen}
        onClose={() => setIsDistortionGuideOpen(false)}
        onSelectDistortionToChallenge={() => {
          setIsDistortionGuideOpen(false);
          handleOpenCreateThought();
        }}
      />

      <GuidedBreathingModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
      />

      <MoodCheckInModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
      />

      <GroundingExerciseModal
        isOpen={isGroundingModalOpen}
        onClose={() => setIsGroundingModalOpen(false)}
      />

      <WellbeingAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
      />

      <LumiSanctuaryModal
        isOpen={isLumiSanctuaryOpen}
        onClose={() => setIsLumiSanctuaryOpen(false)}
        onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
        onOpenCustomizeModal={() => setIsCustomizeModalOpen(true)}
      />

      <PetCustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <DiaryProvider>
      <AppContent />
    </DiaryProvider>
  );
}
