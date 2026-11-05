/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDiary } from '../context/DiaryContext';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';

interface SelfCareHubProps {
  onEnterCBTExperience: (subTab?: 'overview' | 'records' | 'distortions' | 'create') => void;
  onOpenBreathingModal: () => void;
  onOpenMoodModal: () => void;
  onOpenGroundingModal: () => void;
  onOpenAssessmentModal: () => void;
  onOpenLumiSanctuary: () => void;
}

export const SelfCareHub: React.FC<SelfCareHubProps> = ({
  onEnterCBTExperience,
  onOpenBreathingModal,
  onOpenMoodModal,
  onOpenGroundingModal,
  onOpenAssessmentModal,
  onOpenLumiSanctuary,
}) => {
  const { pet } = useDiary();

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col pb-28 animate-fadeIn">
      {/* Background Subtle Organic Wave matching screenshot deep navy gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <svg
          viewBox="0 0 400 800"
          className="absolute bottom-0 right-0 w-full h-[70%] opacity-30"
          preserveAspectRatio="none"
        >
          <path
            d="M 400 320 Q 260 440 200 550 T 0 740 L 0 800 L 400 800 Z"
            fill="#013147"
          />
          <path
            d="M 400 460 Q 280 550 230 630 T 60 800 L 400 800 Z"
            fill="#034563"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* Screen Title Centered - Clean font matching screenshot */}
      <div className="text-center pt-1 pb-4">
        <h1 className="text-white text-xl sm:text-[22px] font-bold tracking-tight font-sans">
          Self Care Library
        </h1>
      </div>

      {/* Primary Self Care Tiles Stack */}
      <div className="space-y-3 px-1 max-w-md mx-auto w-full">
        
        {/* TILE 1: BREATHING EXERCISES (Light Turquoise/Cyan #8ee0de) */}
        <div
          id="tile-breathing-exercises"
          onClick={onOpenBreathingModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenBreathingModal()}
          className="w-full rounded-[24px] bg-[#8fe0de] hover:bg-[#83dedb] active:scale-[0.985] transition-all duration-200 p-4 sm:p-4.5 flex items-center justify-between cursor-pointer shadow-md group select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Lotus Meditation Girl Artwork */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#c5f3f1] flex items-center justify-center p-1 relative overflow-hidden shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Radiant subtle aura */}
                <circle cx="32" cy="30" r="26" fill="#e6faf9" opacity="0.8" />
                <path d="M 20 54 C 26 48, 38 48, 44 54 Z" fill="#b1ecea" />
                {/* Glowing pink/white lotus petals under yogi */}
                <path d="M 24 50 C 28 44, 36 44, 40 50 C 35 52, 29 52, 24 50 Z" fill="#ffd1dc" opacity="0.9" />
                <path d="M 32 43 C 29 47, 26 50, 32 52 C 38 50, 35 47, 32 43 Z" fill="#ffb6c1" />
                {/* Yogi body & lotus seated posture */}
                <ellipse cx="32" cy="46" rx="9" ry="4.5" fill="#1e293b" />
                {/* Teal yoga top */}
                <path d="M 27 34 L 37 34 L 39 44 L 25 44 Z" fill="#0d9488" />
                {/* Crossed arms resting on knees in mudra */}
                <path d="M 25 35 Q 21 40 22 46 Q 26 45 28 43" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 39 35 Q 43 40 42 46 Q 38 45 36 43" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
                {/* Head, neck & hair */}
                <circle cx="32" cy="27" r="5" fill="#fcd34d" />
                <path d="M 26 26 C 26 21, 38 21, 38 26 C 38 29, 36 30, 36 33 L 28 33 C 28 30, 26 29, 26 26 Z" fill="#1e293b" />
                <circle cx="32" cy="21" r="2.5" fill="#1e293b" />
              </svg>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <h2 className="text-[#08323a] text-base sm:text-[17px] font-bold leading-tight tracking-tight">
                Breathing Exercises
              </h2>
              <p className="text-[#155663] text-xs sm:text-[13px] font-normal mt-0.5 leading-snug">
                Free tools for calm &amp; better breathing
              </p>
            </div>
          </div>

          {/* Right Chevron Button */}
          <div className="w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70 flex items-center justify-center shrink-0 ml-2 transition text-[#08323a]">
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* TILE 2: LOG MOOD (Soft Warm Cream #fae8cb) */}
        <div
          id="tile-log-mood"
          onClick={onOpenMoodModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenMoodModal()}
          className="w-full rounded-[24px] bg-[#fae8cb] hover:bg-[#f6e2c2] active:scale-[0.985] transition-all duration-200 p-4 sm:p-4.5 flex items-center justify-between cursor-pointer shadow-md group select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Cloud & Emoji Faces Artwork */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#fef5e7] flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Organic cloud/egg background */}
                <path
                  d="M 22 20 C 14 20, 10 26, 12 34 C 8 40, 12 48, 20 48 L 44 48 C 52 48, 56 42, 54 36 C 56 28, 50 22, 42 24 C 38 18, 28 16, 22 20 Z"
                  fill="#e5e9f8"
                  opacity="0.85"
                />
                {/* Happy Yellow Emoji */}
                <circle cx="26" cy="33" r="8" fill="#facc15" stroke="#eab308" strokeWidth="1" />
                <circle cx="23.5" cy="31.5" r="1.1" fill="#713f12" />
                <circle cx="28.5" cy="31.5" r="1.1" fill="#713f12" />
                <path d="M 23 34.5 Q 26 38 29 34.5" fill="none" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
                
                {/* Orange Sad/Mellow Emoji overlapping */}
                <circle cx="37" cy="35" r="7.5" fill="#fb923c" stroke="#ea580c" strokeWidth="1" />
                <circle cx="34.5" cy="33.5" r="1.1" fill="#431407" />
                <circle cx="39.5" cy="33.5" r="1.1" fill="#431407" />
                <path d="M 34.5 38 Q 37 35.5 39.5 38" fill="none" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <h2 className="text-[#3b2606] text-base sm:text-[17px] font-bold leading-tight tracking-tight">
                Log Mood
              </h2>
              <p className="text-[#614312] text-xs sm:text-[13px] font-normal mt-0.5 leading-snug">
                Check in with yourself
              </p>
            </div>
          </div>

          {/* Right Chevron Button */}
          <div className="w-8 h-8 rounded-full bg-[#faeed8] group-hover:bg-[#f3dfc0] flex items-center justify-center shrink-0 ml-2 transition text-[#3b2606]">
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* TILE 3: 5-4-3-2-1 GROUNDING (Soft Mint/Sage #cdeae1) */}
        <div
          id="tile-grounding-exercise"
          onClick={onOpenGroundingModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenGroundingModal()}
          className="w-full rounded-[24px] bg-[#cdeae1] hover:bg-[#c3e4da] active:scale-[0.985] transition-all duration-200 p-4 sm:p-4.5 flex items-center justify-between cursor-pointer shadow-md group select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Grounding Tree & Sensory Badges Artwork */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#e5f6f1] flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Circular badge container */}
                <circle cx="32" cy="32" r="21" fill="#58ab9c" />
                {/* Stylized tree branches & foliage */}
                <circle cx="32" cy="26" r="9" fill="#88d8c8" />
                <circle cx="26" cy="27" r="6" fill="#75cbba" />
                <circle cx="38" cy="27" r="6" fill="#75cbba" />
                {/* Trunk & deep roots */}
                <path d="M 31 31 L 31 43 M 33 31 L 33 43" stroke="#235c52" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 31 43 Q 27 47 24 49 M 33 43 Q 37 47 40 49" stroke="#235c52" strokeWidth="1.8" strokeLinecap="round" />
                {/* Sensory icons circling tree */}
                <circle cx="21" cy="21" r="2.5" fill="#d2f5ee" />
                <circle cx="43" cy="21" r="2.5" fill="#d2f5ee" />
                <circle cx="17" cy="33" r="2.5" fill="#d2f5ee" />
                <circle cx="47" cy="33" r="2.5" fill="#d2f5ee" />
              </svg>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <h2 className="text-[#08342b] text-base sm:text-[17px] font-bold leading-tight tracking-tight">
                5-4-3-2-1 Grounding
              </h2>
              <p className="text-[#16574a] text-xs sm:text-[13px] font-normal mt-0.5 leading-snug">
                A guided sensory reset to calm you
              </p>
            </div>
          </div>

          {/* Right Chevron Button */}
          <div className="w-8 h-8 rounded-full bg-[#badfd5] group-hover:bg-[#a9d4c8] flex items-center justify-center shrink-0 ml-2 transition text-[#08342b]">
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* TILE 4: ASSESS YOUR WELLBEING (Soft Sky/Periwinkle Pastel #8ebfe8) */}
        <div
          id="tile-assess-wellbeing"
          onClick={onOpenAssessmentModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenAssessmentModal()}
          className="w-full rounded-[24px] bg-[#8ebfe8] hover:bg-[#80b5e2] active:scale-[0.985] transition-all duration-200 p-4 sm:p-4.5 flex items-center justify-between cursor-pointer shadow-md group select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Tangled Yarn / Scribble Brain Artwork matching screenshot */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#c5e1fa] flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Circular badge container */}
                <circle cx="32" cy="32" r="21" fill="#6ba5d6" />
                {/* Tangled continuous yarn circle in white */}
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

            {/* Typography */}
            <div className="min-w-0">
              <h2 className="text-[#0d2d48] text-base sm:text-[17px] font-bold leading-tight tracking-tight">
                Assess Your Wellbeing
              </h2>
              <p className="text-[#1b4c73] text-xs sm:text-[13px] font-normal mt-0.5 leading-snug">
                Check in on your mental health
              </p>
            </div>
          </div>

          {/* Right Chevron Button */}
          <div className="w-8 h-8 rounded-full bg-white/40 group-hover:bg-white/60 flex items-center justify-center shrink-0 ml-2 transition text-[#0d2d48]">
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* TILE 5: CBT THOUGHT RECORD (Soothing Lilac/Purple with the Beloved Brain Graphic!) */}
        <div
          id="tile-cbt-thought-record"
          onClick={() => onEnterCBTExperience('overview')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEnterCBTExperience('overview')}
          className="w-full rounded-[24px] bg-[#d8ccf7] hover:bg-[#cfc0f4] active:scale-[0.985] transition-all duration-200 p-4 sm:p-4.5 flex items-center justify-between cursor-pointer shadow-md group select-none border border-purple-200/60"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Beloved Brain Graphic Artwork with bilateral lobes and neural synapses */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#eee7fc] border border-purple-300/80 flex items-center justify-center p-1 relative shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Circular soft backdrop */}
                <circle cx="32" cy="32" r="21" fill="#8b5cf6" />
                {/* Beloved Brain Icon with organic lobes */}
                <g fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Left cerebral hemisphere */}
                  <path d="M 31 23 C 27 22, 22 25, 23 30 C 20 32, 20 37, 24 39 C 22 43, 27 45, 31 42" />
                  <path d="M 24 34 C 27 34, 29 32, 31 35" />
                  {/* Right cerebral hemisphere */}
                  <path d="M 33 23 C 37 22, 42 25, 41 30 C 44 32, 44 37, 40 39 C 42 43, 37 45, 33 42" />
                  <path d="M 40 34 C 37 34, 35 32, 33 35" />
                  {/* Central fissure & neural spark */}
                  <path d="M 32 24 L 32 41" strokeWidth="1.6" opacity="0.8" />
                </g>
                <circle cx="32" cy="32" r="1.5" fill="#fde047" />
              </svg>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <h2 className="text-[#2e1065] text-base sm:text-[17px] font-bold leading-tight tracking-tight">
                CBT Thought Record
              </h2>
              <p className="text-[#4c1d95] text-xs sm:text-[13px] font-normal mt-0.5 leading-snug">
                Catch automatic thoughts, examine facts &amp; reframe
              </p>
            </div>
          </div>

          {/* Right Chevron Button */}
          <div className="w-8 h-8 rounded-full bg-[#beaaf2] group-hover:bg-[#b097eb] flex items-center justify-center shrink-0 ml-2 transition text-[#2e1065]">
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* MINDFUL COMPANION LUMI (Clean access pill) */}
        <div
          onClick={onOpenLumiSanctuary}
          className="mt-3 p-3 rounded-2xl bg-[#002233]/70 hover:bg-[#002b40] border border-[#003d58] flex items-center justify-between cursor-pointer transition text-xs select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm">
              ✨
            </div>
            <div>
              <span className="font-semibold text-white">Mindful Companion: {pet.name}</span>
              <span className="text-[#719bb0] ml-2 text-[11px] hidden sm:inline">Affirmations &amp; gentle pause</span>
            </div>
          </div>
          <span className="text-xs text-[#26c6da] font-medium flex items-center gap-0.5">
            Visit Lumi <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </div>
  );
};
