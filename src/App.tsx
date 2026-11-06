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
import { MannkaaWebNavbar } from './components/MannkaaWebNavbar';
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
        /* VIEWPORT 2: AUTHENTIC MANNKAA WEB EXPERIENCE (Matches Screenshot 1) */
        <div className="flex-1 flex flex-col w-full bg-[#001724] relative min-h-screen">
          
          {/* Authentic Top Web Navigation Bar (Matches Screenshot 1) */}
          <MannkaaWebNavbar
            onGoToSelfCareLibrary={() => {
              setIsCBTExperienceOpen(false);
              setMainTab('self_care');
            }}
            isCBTExperienceOpen={isCBTExperienceOpen}
            onContactSupport={() => setIsBreathingModalOpen(true)}
          />

          {/* Main Web Body */}
          <div className="flex-1 w-full">
            {isCBTExperienceOpen ? (
              /* When in CBT Experience: Responsive 2-Column Desktop Layout */
              <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6">
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
              </div>
            ) : (
              /* When in Self Care Library: Centered Vertical Stack matching Screenshot 1 */
              <div className="w-full min-h-[calc(100vh-120px)] flex flex-col justify-center items-center px-4 py-8 relative">
                
                {/* Organic backdrop wave */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                  <svg
                    viewBox="0 0 1440 800"
                    className="absolute bottom-0 right-0 w-full h-[70%] opacity-20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 1440 320 Q 900 440 600 550 T 0 740 L 0 800 L 1440 800 Z"
                      fill="#013147"
                    />
                  </svg>
                </div>

                {/* Centered Page Title - Clean Sans Serif matching Screenshot 1 */}
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 font-sans">
                  Self Care Library
                </h1>

                {/* Centered Stacked Tiles Container (~580px wide, exactly like Screenshot 1) */}
                <div className="w-full max-w-xl mx-auto space-y-4">
                  
                  {/* TILE 1: BREATHING EXERCISES (Light Turquoise/Cyan #8ee0de) */}
                  <div
                    onClick={() => setIsBreathingModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsBreathingModalOpen(true)}
                    className="w-full rounded-[26px] bg-[#8fe0de] hover:bg-[#82dedb] active:scale-[0.99] transition-all duration-200 p-4 sm:p-5 flex items-center justify-between cursor-pointer shadow-lg group select-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Lotus Meditation Girl Artwork */}
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#c5f3f1] flex items-center justify-center p-1 relative overflow-hidden shadow-inner group-hover:scale-105 transition">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <circle cx="32" cy="30" r="26" fill="#e6faf9" opacity="0.8" />
                          <path d="M 20 54 C 26 48, 38 48, 44 54 Z" fill="#b1ecea" />
                          <path d="M 24 50 C 28 44, 36 44, 40 50 C 35 52, 29 52, 24 50 Z" fill="#ffd1dc" opacity="0.9" />
                          <path d="M 32 43 C 29 47, 26 50, 32 52 C 38 50, 35 47, 32 43 Z" fill="#ffb6c1" />
                          <ellipse cx="32" cy="46" rx="9" ry="4.5" fill="#1e293b" />
                          <path d="M 27 34 L 37 34 L 39 44 L 25 44 Z" fill="#0d9488" />
                          <path d="M 25 35 Q 21 40 22 46 Q 26 45 28 43" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
                          <path d="M 39 35 Q 43 40 42 46 Q 38 45 36 43" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
                          <circle cx="32" cy="27" r="5" fill="#fcd34d" />
                          <path d="M 26 26 C 26 21, 38 21, 38 26 C 38 29, 36 30, 36 33 L 28 33 C 28 30, 26 29, 26 26 Z" fill="#1e293b" />
                          <circle cx="32" cy="21" r="2.5" fill="#1e293b" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-[#08323a] text-lg font-bold leading-tight tracking-tight">
                          Breathing Exercises
                        </h2>
                        <p className="text-[#155663] text-sm font-normal mt-0.5 leading-snug">
                          Free tools for calm &amp; better breathing
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/50 group-hover:bg-white/80 flex items-center justify-center shrink-0 ml-2 transition text-[#08323a]">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* TILE 2: LOG MOOD (Soft Warm Cream #fae8cb) */}
                  <div
                    onClick={() => setIsMoodModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsMoodModalOpen(true)}
                    className="w-full rounded-[26px] bg-[#fae8cb] hover:bg-[#f6e2c2] active:scale-[0.99] transition-all duration-200 p-4 sm:p-5 flex items-center justify-between cursor-pointer shadow-lg group select-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#fef5e7] flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <path
                            d="M 22 20 C 14 20, 10 26, 12 34 C 8 40, 12 48, 20 48 L 44 48 C 52 48, 56 42, 54 36 C 56 28, 50 22, 42 24 C 38 18, 28 16, 22 20 Z"
                            fill="#e5e9f8"
                            opacity="0.85"
                          />
                          <circle cx="26" cy="33" r="8" fill="#facc15" stroke="#eab308" strokeWidth="1" />
                          <circle cx="23.5" cy="31.5" r="1.1" fill="#713f12" />
                          <circle cx="28.5" cy="31.5" r="1.1" fill="#713f12" />
                          <path d="M 23 34.5 Q 26 38 29 34.5" fill="none" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="37" cy="35" r="7.5" fill="#fb923c" stroke="#ea580c" strokeWidth="1" />
                          <circle cx="34.5" cy="33.5" r="1.1" fill="#431407" />
                          <circle cx="39.5" cy="33.5" r="1.1" fill="#431407" />
                          <path d="M 34.5 38 Q 37 35.5 39.5 38" fill="none" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-[#3b2606] text-lg font-bold leading-tight tracking-tight">
                          Log Mood
                        </h2>
                        <p className="text-[#614312] text-sm font-normal mt-0.5 leading-snug">
                          Check in with yourself
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#faeed8] group-hover:bg-[#f1dec1] flex items-center justify-center shrink-0 ml-2 transition text-[#3b2606]">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* TILE 3: ASSESS YOUR WELLBEING (Soft Sky/Periwinkle Pastel #8ebfe8) */}
                  <div
                    onClick={() => setIsAssessmentModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsAssessmentModalOpen(true)}
                    className="w-full rounded-[26px] bg-[#8ebfe8] hover:bg-[#80b5e2] active:scale-[0.99] transition-all duration-200 p-4 sm:p-5 flex items-center justify-between cursor-pointer shadow-lg group select-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#c5e1fa] flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <circle cx="32" cy="32" r="21" fill="#6ba5d6" />
                          <path
                            d="M 23 32 C 21 26, 27 22, 33 23 C 39 24, 42 29, 40 35 C 38 41, 30 42, 25 38 C 21 34, 25 27, 31 27 C 37 27, 41 33, 37 38 C 34 41, 28 39, 27 34 C 26 30, 31 29, 34 31 C 37 33, 35 36, 32 36"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="32" cy="32" r="19" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-[#0d2d48] text-lg font-bold leading-tight tracking-tight">
                          Assess Your Wellbeing
                        </h2>
                        <p className="text-[#1b4c73] text-sm font-normal mt-0.5 leading-snug">
                          Check in on your mental health
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/40 group-hover:bg-white/70 flex items-center justify-center shrink-0 ml-2 transition text-[#0d2d48]">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* TILE 4: CBT THOUGHT RECORD (Soothing Lilac/Purple with Anatomical Brain Graphic) */}
                  <div
                    onClick={() => handleEnterCBTExperience('overview')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleEnterCBTExperience('overview')}
                    className="w-full rounded-[26px] bg-[#d8ccf7] hover:bg-[#cebdf6] active:scale-[0.99] transition-all duration-200 p-4 sm:p-5 flex items-center justify-between cursor-pointer shadow-lg group select-none border border-purple-200/50"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#eee7fc] border border-purple-300/80 flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <circle cx="32" cy="32" r="21" fill="#8b5cf6" />
                          <g fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 31 23 C 27 22, 22 25, 23 30 C 20 32, 20 37, 24 39 C 22 43, 27 45, 31 42" />
                            <path d="M 24 34 C 27 34, 29 32, 31 35" />
                            <path d="M 33 23 C 37 22, 42 25, 41 30 C 44 32, 44 37, 40 39 C 42 43, 37 45, 33 42" />
                            <path d="M 40 34 C 37 34, 35 32, 33 35" />
                            <path d="M 32 24 L 32 41" strokeWidth="1.6" opacity="0.8" />
                          </g>
                          <circle cx="32" cy="32" r="1.5" fill="#fde047" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-[#2e1065] text-lg font-bold leading-tight tracking-tight">
                          CBT Thought Record
                        </h2>
                        <p className="text-[#4c1d95] text-sm font-normal mt-0.5 leading-snug">
                          Catch automatic thoughts, examine facts &amp; reframe
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#beaaf2] group-hover:bg-[#b096eb] flex items-center justify-center shrink-0 ml-2 transition text-[#2e1065]">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* Gentle Lumi Sanctuary Link */}
                  <div
                    onClick={() => setIsLumiSanctuaryOpen(true)}
                    className="p-3.5 rounded-2xl bg-[#002233]/70 hover:bg-[#002b40] border border-[#003d58] flex items-center justify-between cursor-pointer transition text-xs select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm">
                        ✨
                      </div>
                      <div>
                        <span className="font-semibold text-white">Mindful Companion: {pet.name}</span>
                        <span className="text-[#719bb0] ml-2 text-[11px] hidden sm:inline">Affirmations &amp; gentle pause</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#26c6da] font-medium flex items-center gap-0.5">
                      Visit Lumi →
                    </span>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* Floating WhatsApp Action Button in Bottom Right (Matches Screenshot 1) */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-black/20"
            title="Chat with Mannkaa Support on WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              setIsBreathingModalOpen(true);
            }}
          >
            {/* Authentic WhatsApp Icon SVG */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>

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
