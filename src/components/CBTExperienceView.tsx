/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useDiary } from '../context/DiaryContext';
import { ThoughtLog } from './ThoughtLog';
import { ThoughtRecordForm } from './ThoughtRecordForm';
import { PersonalizedCognitiveInsights } from './PersonalizedCognitiveInsights';
import { BrainActivityPatternGraphic } from './BrainActivityPatternGraphic';
import {
  ArrowLeft,
  Brain,
  Sparkles,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

export type CBTActiveView = 'overview' | 'past_records' | 'create';

interface CBTExperienceViewProps {
  onBackToSelfCareHub: () => void;
  onOpenThoughtModal?: () => void;
  onOpenDistortionGuide: () => void;
  initialView?: CBTActiveView;
  activeView?: CBTActiveView;
  onChangeView?: (view: CBTActiveView) => void;
}

export const CBTExperienceView: React.FC<CBTExperienceViewProps> = ({
  onBackToSelfCareHub,
  onOpenDistortionGuide,
  initialView = 'overview',
  activeView: controlledActiveView,
  onChangeView,
}) => {
  const { stats, resetToSampleData, thoughtRecords } = useDiary();
  const [internalActiveView, setInternalActiveView] = useState<CBTActiveView>(initialView);
  const [previewStage, setPreviewStage] = useState<number>(2);

  // Sync with controlled prop if passed
  useEffect(() => {
    if (controlledActiveView) {
      setInternalActiveView(controlledActiveView);
    }
  }, [controlledActiveView]);

  useEffect(() => {
    if (initialView) {
      setInternalActiveView(initialView);
    }
  }, [initialView]);

  const currentView = controlledActiveView || internalActiveView;

  const handleSetView = (view: CBTActiveView) => {
    setInternalActiveView(view);
    if (onChangeView) {
      onChangeView(view);
    }
  };

  // 1. NATIVE IN-APP THOUGHT RECORD CREATION SCREEN
  if (currentView === 'create') {
    return (
      <ThoughtRecordForm
        onBack={() => handleSetView('overview')}
        onComplete={() => handleSetView('past_records')}
        onOpenDistortionGuide={onOpenDistortionGuide}
      />
    );
  }

  // 2. NATIVE IN-APP PAST THOUGHT RECORDS FEED
  if (currentView === 'past_records') {
    return (
      <ThoughtLog
        onBackToCBTHome={() => handleSetView('overview')}
      />
    );
  }

  // 3. NATIVE IN-APP CBT OVERVIEW
  return (
    <div className="space-y-4 animate-fadeIn pb-12">
      {/* Top Header - Mindful, Clean, No Button on Top Right */}
      <div className="bg-[#001724]/95 text-white -mx-4 -mt-4 px-4 py-3 border-b border-[#002d3f] shadow-md sticky top-0 z-20 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={onBackToSelfCareHub}
            className="flex items-center gap-1.5 text-xs text-[#93c5d6] hover:text-white transition py-1 pr-2 rounded-lg group min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#26c6da] group-hover:-translate-x-0.5 transition" />
            <span className="font-semibold text-white">Back</span>
          </button>

          {/* Centered Activity Title */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-[#d8ccf7]">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-white font-serif">
              CBT Thought Record
            </span>
          </div>

          {/* Right Spacer for balance */}
          <div className="w-10" />
        </div>
      </div>

      {/* FRONT & CENTER: Mindful Thought Record Creation Hero Experience */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#122336] via-[#091b2b] to-[#041421] border border-[#26c6da]/35 text-white shadow-xl relative overflow-hidden space-y-3.5">
        {/* Calming backdrop glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#26c6da]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#26c6da]/20 text-[#26c6da] border border-[#26c6da]/40">
              Live Neural Shift
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            How Your Brain Calms Down
          </h2>
          <p className="text-xs text-[#93c5d6] leading-relaxed">
            Watch how your mind naturally shifts from a racing panic loop into clear, grounded thinking as you work through a thought record.
          </p>
        </div>

        {/* Live Seamless Brain Neural Shift Visualizer */}
        <div>
          <BrainActivityPatternGraphic
            stage={previewStage}
            initialBelief={85}
            reframedBelief={25}
            selectedDistortionsCount={2}
            evidenceAgainstCount={1}
            autoCycle={true}
            onStageChange={(newStage) => setPreviewStage(newStage)}
          />
        </div>

        {/* Visually Engaging Main Action Button - Navigates natively into Step 1 */}
        <button
          onClick={() => handleSetView('create')}
          className="w-full py-3.5 rounded-2xl bg-[#26c6da] hover:bg-[#20b2c4] active:scale-[0.985] text-[#001724] font-bold text-sm transition shadow-lg shadow-[#26c6da]/20 flex items-center justify-center gap-2 group cursor-pointer min-h-[48px]"
        >
          <Brain className="w-4 h-4 stroke-[2.2] group-hover:scale-110 transition" />
          <span>Start Thought Record (~3 mins)</span>
        </button>
      </div>

      {/* Personalized Cognitive Health, Data Showcase & AI Self-Reflection Suite */}
      <PersonalizedCognitiveInsights />

      {/* Streamlined Full-Width Navigation Cards - One in a row */}
      <div className="space-y-3 pt-1">
        {/* Past Records Row */}
        <div
          onClick={() => handleSetView('past_records')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSetView('past_records')}
          className="w-full p-4 rounded-2xl bg-[#001b29] hover:bg-[#002235] border border-[#002d3f] hover:border-[#003d58] cursor-pointer transition group select-none flex items-center justify-between shadow-xs active:scale-[0.99] min-h-[56px]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#001420] border border-[#002838] flex items-center justify-center text-[#26c6da] group-hover:scale-105 transition shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Past Thought Records
              </h4>
              <p className="text-xs text-[#93c5d6] leading-snug break-words mt-0.5">
                {thoughtRecords.length} reflections • Date filtered feed
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#001420] flex items-center justify-center text-[#719bb0] group-hover:text-[#26c6da] group-hover:translate-x-0.5 transition shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Distortion Guide Row */}
        <div
          onClick={onOpenDistortionGuide}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenDistortionGuide()}
          className="w-full p-4 rounded-2xl bg-[#001b29] hover:bg-[#002235] border border-[#002d3f] hover:border-[#003d58] cursor-pointer transition group select-none flex items-center justify-between shadow-xs active:scale-[0.99] min-h-[56px]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#001420] border border-[#002838] flex items-center justify-center text-[#26c6da] group-hover:scale-105 transition shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Thinking Traps Guide
              </h4>
              <p className="text-xs text-[#93c5d6] leading-snug break-words mt-0.5">
                12 common cognitive distortions &amp; Socratic questions
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#001420] flex items-center justify-center text-[#719bb0] group-hover:text-[#26c6da] group-hover:translate-x-0.5 transition shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
