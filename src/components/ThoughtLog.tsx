/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useDiary } from '../context/DiaryContext';
import { COGNITIVE_DISTORTIONS } from '../data/cbtData';
import { ThoughtRecord } from '../types';
import {
  Brain,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Scale,
  ArrowLeft,
  CalendarRange,
  RotateCcw,
  Sparkles,
  TrendingDown,
  Search,
  CheckCircle2,
  Heart,
  Clock,
  Activity,
  AlertCircle,
  Tag,
  Filter,
} from 'lucide-react';

interface ThoughtLogProps {
  onBackToCBTHome?: () => void;
  onOpenCreateThought?: () => void;
}

type DateFilterOption = 'all' | '7days' | '30days' | 'range';

const PAGE_SIZE = 6;

export const ThoughtLog: React.FC<ThoughtLogProps> = ({
  onBackToCBTHome,
  onOpenCreateThought,
}) => {
  const { thoughtRecords, deleteThoughtRecord } = useDiary();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEmotionFilter, setSelectedEmotionFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Feed pagination state
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Desktop master-detail selection
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Mobile accordion expand state
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    if (expandedRecordIds.includes(id)) {
      setExpandedRecordIds(expandedRecordIds.filter((item) => item !== id));
    } else {
      setExpandedRecordIds([...expandedRecordIds, id]);
    }
  };

  const getDistortionDetails = (id: string) => {
    return COGNITIVE_DISTORTIONS.find((d) => d.id === id);
  };

  // Filter records by date, emotion, and search query
  const filteredRecords = useMemo(() => {
    const now = new Date();
    const query = searchQuery.trim().toLowerCase();

    return thoughtRecords.filter((record) => {
      // 1. Text search
      if (query) {
        const matchThought = record.automaticThought.toLowerCase().includes(query);
        const matchReframe = record.balancedAlternative.toLowerCase().includes(query);
        const matchSituation = record.situation.toLowerCase().includes(query);
        const matchEmotion = record.emotion.toLowerCase().includes(query);
        if (!matchThought && !matchReframe && !matchSituation && !matchEmotion) {
          return false;
        }
      }

      // 2. Emotion filter
      if (selectedEmotionFilter !== 'all') {
        if (record.emotion.toLowerCase() !== selectedEmotionFilter.toLowerCase()) {
          return false;
        }
      }

      // 3. Date filter
      if (dateFilter === 'all') return true;

      const recordDate = new Date(record.date);
      if (isNaN(recordDate.getTime())) return true;

      if (dateFilter === '7days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return recordDate >= sevenDaysAgo;
      }

      if (dateFilter === '30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return recordDate >= thirtyDaysAgo;
      }

      if (dateFilter === 'range') {
        if (startDate && record.date < startDate) return false;
        if (endDate && record.date > endDate) return false;
        return true;
      }

      return true;
    });
  }, [thoughtRecords, searchQuery, selectedEmotionFilter, dateFilter, startDate, endDate]);

  // Sliced for mobile feed
  const paginatedRecords = filteredRecords.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecords.length;

  // Selected record for desktop inspection
  const activeSelectedRecord = useMemo<ThoughtRecord | null>(() => {
    if (!filteredRecords.length) return null;
    if (selectedRecordId) {
      const match = filteredRecords.find((r) => r.id === selectedRecordId);
      if (match) return match;
    }
    return filteredRecords[0] || null;
  }, [filteredRecords, selectedRecordId]);

  // Aggregate stats
  const aggregateMetrics = useMemo(() => {
    if (!thoughtRecords.length) {
      return { avgRelief: 0, topTrapName: 'None' };
    }
    let totalRelief = 0;
    let countWithRelief = 0;
    const trapFreq: Record<string, number> = {};

    thoughtRecords.forEach((r) => {
      const initial = r.belief || 75;
      const reframed = r.reframedBelief !== undefined ? r.reframedBelief : 30;
      const diff = Math.max(0, initial - reframed);
      totalRelief += diff;
      countWithRelief += 1;

      (r.distortions || []).forEach((dId) => {
        trapFreq[dId] = (trapFreq[dId] || 0) + 1;
      });
    });

    const avgRelief = countWithRelief > 0 ? Math.round(totalRelief / countWithRelief) : 48;

    let topTrapId = '';
    let maxFreq = 0;
    Object.entries(trapFreq).forEach(([id, freq]) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        topTrapId = id;
      }
    });

    const topTrap = COGNITIVE_DISTORTIONS.find((d) => d.id === topTrapId);

    return {
      avgRelief,
      topTrapName: topTrap ? topTrap.name : 'Catastrophizing',
    };
  }, [thoughtRecords]);

  // Distinct emotions for filter chips
  const distinctEmotions = useMemo(() => {
    const set = new Set<string>();
    thoughtRecords.forEach((r) => {
      if (r.emotion) set.add(r.emotion);
    });
    return Array.from(set);
  }, [thoughtRecords]);

  const isAllExpanded =
    paginatedRecords.length > 0 &&
    paginatedRecords.every((r) => expandedRecordIds.includes(r.id));

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setExpandedRecordIds([]);
    } else {
      setExpandedRecordIds(paginatedRecords.map((r) => r.id));
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const clearDateRange = () => {
    setStartDate('');
    setEndDate('');
    setDateFilter('all');
    setSearchQuery('');
    setSelectedEmotionFilter('all');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="w-full text-white animate-fadeIn pb-16 space-y-5">
      {/* 1. TOP HEADER & METRIC SUMMARY BAR (Organized & Responsive) */}
      <div className="bg-[#001724] p-4 sm:p-6 rounded-3xl border border-[#002f44] shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Back Navigation */}
          {onBackToCBTHome ? (
            <button
              onClick={onBackToCBTHome}
              className="inline-flex items-center gap-1.5 text-xs text-[#93c5d6] hover:text-white transition py-1 pr-3 rounded-lg group cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4 text-[#26c6da] group-hover:-translate-x-0.5 transition" />
              <span className="font-semibold text-white">Back to CBT Overview</span>
            </button>
          ) : <div />}

          {/* Quick Action */}
          {onOpenCreateThought && (
            <button
              onClick={onOpenCreateThought}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#26c6da] hover:bg-[#20b2c4] text-[#001724] shadow-sm transition active:scale-95 self-start sm:self-auto cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>+ New Thought Record</span>
            </button>
          )}
        </div>

        {/* Title & Clinical Metrics Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[#00283c]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#26c6da]/20 border border-[#26c6da]/40 flex items-center justify-center text-[#26c6da]">
                <Brain className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight">
                Past Thought Records
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#002235] text-[#26c6da] border border-[#003d58]">
                {filteredRecords.length} {filteredRecords.length === 1 ? 'record' : 'records'}
              </span>
            </div>
            <p className="text-xs text-[#93c5d6] mt-1">
              Browse, filter, and review your cognitive reappraisals and factual evidence tests.
            </p>
          </div>

          {/* 3 Quick Layman Metric Badges (Desktop & Tablet) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-2xl bg-[#001420] border border-[#002838] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#719bb0] block">Average Relief</span>
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">−{aggregateMetrics.avgRelief}% anxiety</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#001420] border border-[#002838] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#719bb0] block">Common Trap</span>
                <span className="font-bold text-amber-300 text-xs truncate block max-w-[120px]">
                  {aggregateMetrics.topTrapName}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex p-2.5 rounded-2xl bg-[#001420] border border-[#002838] items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#26c6da]/15 text-[#26c6da] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#719bb0] block">Logged Records</span>
                <span className="font-bold text-white text-xs sm:text-sm">{thoughtRecords.length} completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-3 border-t border-[#00283c] space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#719bb0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search thoughts, situations, or reframes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#00121c] border border-[#002d42] text-xs text-white placeholder:text-[#577b8f] focus:border-[#26c6da] outline-hidden transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#719bb0] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Date Preset Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-[#719bb0] flex items-center gap-1 mr-1 shrink-0">
                <CalendarRange className="w-3.5 h-3.5 text-[#26c6da]" />
                Range:
              </span>

              {(['all', '7days', '30days', 'range'] as DateFilterOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDateFilter(opt);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    dateFilter === opt
                      ? 'bg-[#26c6da] text-[#001724] font-bold shadow-xs'
                      : 'bg-[#00121c] text-[#93c5d6] hover:text-white border border-[#002d42]'
                  }`}
                >
                  {opt === 'all' && 'All Time'}
                  {opt === '7days' && 'Past 7 Days'}
                  {opt === '30days' && 'Past 30 Days'}
                  {opt === 'range' && 'Custom Range'}
                </button>
              ))}
            </div>
          </div>

          {/* Emotion Filter Chips */}
          {distinctEmotions.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
              <span className="text-[11px] text-[#719bb0] font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#26c6da]" />
                Emotion:
              </span>
              <button
                onClick={() => setSelectedEmotionFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                  selectedEmotionFilter === 'all'
                    ? 'bg-[#002f44] text-[#26c6da] font-bold border border-[#26c6da]/50'
                    : 'bg-[#001420] text-[#719bb0] hover:text-white border border-[#002838]'
                }`}
              >
                All Emotions
              </button>
              {distinctEmotions.map((em) => (
                <button
                  key={em}
                  onClick={() => setSelectedEmotionFilter(em)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    selectedEmotionFilter === em
                      ? 'bg-[#002f44] text-[#26c6da] font-bold border border-[#26c6da]/50'
                      : 'bg-[#001420] text-[#719bb0] hover:text-white border border-[#002838]'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Custom Date Range Picker */}
          {dateFilter === 'range' && (
            <div className="p-3 bg-[#00121c] rounded-2xl border border-[#002f44] space-y-2 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-[#93c5d6] block mb-1">
                    From Date:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#00364d] bg-[#001b29] text-xs text-white outline-hidden focus:border-[#26c6da]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#93c5d6] block mb-1">
                    To Date:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#00364d] bg-[#001b29] text-xs text-white outline-hidden focus:border-[#26c6da]"
                  />
                </div>
              </div>

              {(startDate || endDate) && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#26c6da]">
                    Showing records between {startDate || 'start'} and {endDate || 'today'}
                  </span>
                  <button
                    onClick={clearDateRange}
                    className="text-[11px] text-[#93c5d6] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset filter</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA: ZERO RESULTS STATE OR RESPONSIVE MASTER-DETAIL LAYOUT */}
      {filteredRecords.length === 0 ? (
        <div className="py-16 px-4 text-center border border-[#002f44] rounded-3xl bg-[#001724] shadow-md space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00121c] border border-[#002f44] flex items-center justify-center text-[#719bb0]">
            <Brain className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-white">No Thought Records Found</h4>
          <p className="text-xs text-[#93c5d6] max-w-md mx-auto leading-relaxed">
            {searchQuery || dateFilter !== 'all' || selectedEmotionFilter !== 'all'
              ? 'Try clearing your search query or reset your date filter to view your reflections.'
              : 'You have not recorded any thoughts yet. Tapping "Start Thought Record" guides you through a 3-minute reflection.'}
          </p>
          {(searchQuery || dateFilter !== 'all' || selectedEmotionFilter !== 'all') && (
            <button
              onClick={clearDateRange}
              className="px-4 py-2 rounded-xl bg-[#002235] hover:bg-[#002f44] border border-[#003d58] text-xs font-bold text-[#26c6da] transition cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* DESKTOP VIEWPORT: PURPOSE-BUILT MASTER-DETAIL CLINICAL WORKSPACE (Hidden on small screens) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN (5 of 12): Thought Stream Master List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1 text-xs text-[#719bb0]">
                <span className="font-semibold">
                  {filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'} Available
                </span>
                <span className="text-[11px]">Select to inspect details</span>
              </div>

              {/* Scrollable List of Records */}
              <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 scrollbar-thin">
                {filteredRecords.map((record) => {
                  const isSelected = activeSelectedRecord?.id === record.id;
                  const initial = record.belief || 75;
                  const reframed = record.reframedBelief !== undefined ? record.reframedBelief : 25;
                  const drop = initial - reframed;

                  return (
                    <div
                      key={record.id}
                      onClick={() => setSelectedRecordId(record.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group text-left select-none relative ${
                        isSelected
                          ? 'bg-[#001d2c] border-[#26c6da] shadow-md ring-1 ring-[#26c6da]/50'
                          : 'bg-[#001724] border-[#002f44] hover:bg-[#001b2a] hover:border-[#004766]'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#26c6da] rounded-r-full" />
                      )}

                      {/* Header Row: Date & Emotion */}
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#00283c]">
                        <div className="flex items-center gap-1.5 text-[#93c5d6]">
                          <Calendar className="w-3.5 h-3.5 text-[#26c6da]" />
                          <span className="font-semibold text-white">{record.date}</span>
                          <span className="text-[#003d58]">•</span>
                          <span className="text-[11px] text-[#719bb0]">{record.time}</span>
                        </div>

                        {/* Emotion Pill */}
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#00121c] text-[#26c6da] border border-[#00344d]">
                          {record.emotion}
                        </span>
                      </div>

                      {/* Automatic Thought Snippet */}
                      <div className="pt-2 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-rose-300/90 block">
                          Caught Thought
                        </span>
                        <p className="text-xs text-slate-100 font-medium line-clamp-2 leading-relaxed">
                          &quot;{record.automaticThought}&quot;
                        </p>
                      </div>

                      {/* Relief Metric & Traps Footer */}
                      <div className="mt-2.5 pt-2 border-t border-[#002438] flex items-center justify-between text-xs">
                        {drop > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                            <TrendingDown className="w-3 h-3" />
                            <span>{initial}% → {reframed}% (−{drop}%)</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#719bb0]">Belief: {initial}%</span>
                        )}

                        {record.distortions && record.distortions.length > 0 && (
                          <span className="text-[10px] text-[#93c5d6] bg-[#00121c] px-2 py-0.5 rounded-md border border-[#002f44]">
                            {record.distortions.length} {record.distortions.length === 1 ? 'trap' : 'traps'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN (7 of 12): Full Clinical Inspection Card (Sticky & Ergonomic) */}
            <div className="lg:col-span-7 sticky top-20">
              {activeSelectedRecord ? (
                <div className="p-6 rounded-3xl bg-[#001724] border border-[#002f44] shadow-xl space-y-5 text-xs animate-fadeIn">
                  
                  {/* Top Bar: Timestamp & Actions */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#00283c]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#26c6da]/20 border border-[#26c6da]/40 flex items-center justify-center text-[#26c6da]">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{activeSelectedRecord.date}</span>
                          <span className="text-xs text-[#719bb0]">{activeSelectedRecord.time}</span>
                        </div>
                        <span className="text-[11px] text-[#93c5d6]">Detailed Cognitive Review</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#002235] text-[#26c6da] border border-[#003d58]">
                        {activeSelectedRecord.emotion}
                      </span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this thought record?')) {
                            deleteThoughtRecord(activeSelectedRecord.id);
                          }
                        }}
                        className="p-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-950/40 border border-transparent hover:border-rose-800/40 transition cursor-pointer"
                        title="Delete this record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Conviction Shift Visualizer Bar */}
                  <div className="p-3.5 rounded-2xl bg-[#00121c] border border-[#002838] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#93c5d6] flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                        Belief De-escalation Shift:
                      </span>
                      <span className="text-xs font-bold text-emerald-300">
                        Drop from {activeSelectedRecord.belief || 75}% to {activeSelectedRecord.reframedBelief !== undefined ? activeSelectedRecord.reframedBelief : 25}%
                      </span>
                    </div>

                    {/* Visual 2-color track */}
                    <div className="w-full h-2 rounded-full bg-[#002438] overflow-hidden flex">
                      <div
                        className="h-full bg-rose-500/70"
                        style={{ width: `${activeSelectedRecord.belief || 75}%` }}
                        title={`Initial conviction: ${activeSelectedRecord.belief || 75}%`}
                      />
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#002438] overflow-hidden flex">
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${activeSelectedRecord.reframedBelief !== undefined ? activeSelectedRecord.reframedBelief : 25}%` }}
                        title={`Reframed conviction: ${activeSelectedRecord.reframedBelief !== undefined ? activeSelectedRecord.reframedBelief : 25}%`}
                      />
                    </div>
                  </div>

                  {/* Situation Card */}
                  <div className="p-3.5 rounded-2xl bg-[#001b2a] border border-[#003248] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#719bb0] tracking-wider block">
                      Trigger Situation (Observable Facts)
                    </span>
                    <p className="text-white text-xs sm:text-[13px] leading-relaxed">
                      {activeSelectedRecord.situation}
                    </p>
                  </div>

                  {/* Caught Automatic Thought Box (Rose Accent) */}
                  <div className="p-4 rounded-2xl bg-[#001420] border border-[#002f44] border-l-4 border-l-rose-400 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider block">
                      Caught Automatic Thought
                    </span>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      &quot;{activeSelectedRecord.automaticThought}&quot;
                    </p>
                  </div>

                  {/* Thinking Traps & Somatic Sensations Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Traps */}
                    <div className="p-3.5 rounded-2xl bg-[#001b2a] border border-[#003248] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#719bb0] tracking-wider block">
                        Identified Thinking Traps
                      </span>
                      {activeSelectedRecord.distortions && activeSelectedRecord.distortions.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {activeSelectedRecord.distortions.map((dId) => {
                            const info = getDistortionDetails(dId);
                            return (
                              <span
                                key={dId}
                                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#002438] text-[#26c6da] border border-[#003f5e]"
                              >
                                {info ? info.name : dId}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-xs text-[#719bb0]">None tagged</span>
                      )}
                    </div>

                    {/* Somatic Cues */}
                    <div className="p-3.5 rounded-2xl bg-[#001b2a] border border-[#003248] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#719bb0] tracking-wider block">
                        Body Tension &amp; Physical Signs
                      </span>
                      {activeSelectedRecord.sensations && activeSelectedRecord.sensations.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {activeSelectedRecord.sensations.map((sens) => (
                            <span
                              key={sens}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#002438] text-amber-200 border border-[#003f5e]"
                            >
                              {sens}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-[#719bb0]">None logged</span>
                      )}
                    </div>
                  </div>

                  {/* Evidence Examination: Side-by-Side Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#001420] border border-[#002a3d] space-y-1.5">
                      <span className="font-bold text-[#cbd5e1] text-xs flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#719bb0]" />
                        <span>Observable Facts For</span>
                      </span>
                      <p className="text-[#93c5d6] text-xs leading-relaxed">
                        {activeSelectedRecord.evidenceFor || 'None recorded.'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#001420] border border-[#003d58] space-y-1.5">
                      <span className="font-bold text-[#26c6da] text-xs flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#26c6da]" />
                        <span>Facts Against the Thought</span>
                      </span>
                      <p className="text-[#93c5d6] text-xs leading-relaxed">
                        {activeSelectedRecord.evidenceAgainst || 'None recorded.'}
                      </p>
                    </div>
                  </div>

                  {/* Balanced Reframe (Teal Accent) */}
                  <div className="p-4 rounded-2xl bg-[#001b29] border border-[#004766] border-l-4 border-l-[#26c6da] space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#26c6da] tracking-wider block">
                      Balanced Perspective
                    </span>
                    <p className="text-sm text-white font-medium leading-relaxed">
                      &quot;{activeSelectedRecord.balancedAlternative}&quot;
                    </p>
                  </div>

                  {/* Coping Action */}
                  {activeSelectedRecord.actionPlan && (
                    <div className="p-3 rounded-2xl bg-[#00121c] border border-[#002f44] text-xs">
                      <strong className="text-[#26c6da]">Grounded Next Step: </strong>
                      <span className="text-slate-200">{activeSelectedRecord.actionPlan}</span>
                    </div>
                  )}

                </div>
              ) : null}
            </div>

          </div>

          {/* MOBILE VIEWPORT: CLEAN EXPANDABLE ACCORDION FEED (Hidden on desktop) */}
          <div className="block lg:hidden space-y-3">
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="text-xs text-[#93c5d6] font-medium">
                Showing {paginatedRecords.length} of {filteredRecords.length} {filteredRecords.length === 1 ? 'reflection' : 'reflections'}
              </span>

              <button
                onClick={handleToggleAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#001724] hover:bg-[#002235] text-[#93c5d6] hover:text-white border border-[#002f44] transition active:scale-95 shadow-xs cursor-pointer"
              >
                {isAllExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#26c6da]" />
                    <span>Collapse all</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#26c6da]" />
                    <span>Expand all</span>
                  </>
                )}
              </button>
            </div>

            {paginatedRecords.map((record) => {
              const isExpanded = expandedRecordIds.includes(record.id);

              return (
                <div
                  key={record.id}
                  className="rounded-2xl bg-[#001724] border border-[#002f44] overflow-hidden hover:border-[#26c6da]/50 transition shadow-md"
                >
                  {/* Header (Tap anywhere to expand/collapse) */}
                  <div
                    onClick={() => toggleExpand(record.id)}
                    className="p-4 sm:p-5 cursor-pointer select-none space-y-3 hover:bg-[#001f30] transition"
                  >
                    {/* Top Line: Date + Emotion Badge + Expand Chevron */}
                    <div className="flex items-center justify-between text-xs border-b border-[#00283c] pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#00121c] border border-[#002f44] flex items-center justify-center text-[#26c6da]">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-white text-xs">{record.date}</span>
                        <span className="text-[#003d58]">•</span>
                        <span className="text-[#93c5d6] text-[11px]">{record.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#00121c] text-[#26c6da] border border-[#003d58]">
                          {record.emotion}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#00121c] border border-[#002f44] flex items-center justify-center text-[#93c5d6]">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Automatic Thought Box */}
                    <div className="p-3.5 rounded-xl bg-[#00121c] border border-[#002d42] border-l-4 border-l-rose-400 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-rose-300 block">
                        Caught Automatic Thought
                      </span>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed line-clamp-2">
                        &quot;{record.automaticThought}&quot;
                      </p>
                    </div>

                    {/* Balanced Reframe Box */}
                    <div className="p-3.5 rounded-xl bg-[#001b2a] border border-[#003f5e] border-l-4 border-l-[#26c6da] space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#26c6da] block">
                        Balanced Perspective
                      </span>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed line-clamp-2">
                        &quot;{record.balancedAlternative}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Expanded Full Reflection Details */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-[#002f44] bg-[#00121c] space-y-3.5 text-xs animate-fadeIn">
                      
                      {/* Situation */}
                      <div className="p-3 rounded-xl bg-[#001724] border border-[#002f44] space-y-1">
                        <span className="text-[#93c5d6] text-[11px] font-bold uppercase tracking-wider block">
                          What was happening:
                        </span>
                        <p className="text-white text-xs sm:text-[13px] leading-relaxed">{record.situation}</p>
                      </div>

                      {/* Somatic body cues */}
                      {record.sensations && record.sensations.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] text-[#93c5d6] font-semibold block">Body Tension Cues:</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {record.sensations.map((sens) => (
                              <span
                                key={sens}
                                className="px-2.5 py-1 rounded-lg bg-[#001d2c] text-[#26c6da] border border-[#00364d] text-xs font-medium"
                              >
                                {sens}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Thinking Traps caught */}
                      {record.distortions && record.distortions.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] text-[#93c5d6] font-semibold block">Identified Thinking Traps:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {record.distortions.map((dId) => {
                              const info = getDistortionDetails(dId);
                              return (
                                <span
                                  key={dId}
                                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#001d2c] text-white border border-[#003d58]"
                                >
                                  {info ? info.name : dId}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Evidence For vs Evidence Against */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-[#001724] border border-[#002f44] space-y-1.5">
                          <span className="font-bold text-[#cbd5e1] text-xs flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-[#93c5d6]" />
                            <span>Observable Facts Supporting</span>
                          </span>
                          <p className="text-[#93c5d6] text-xs leading-relaxed">
                            {record.evidenceFor || 'None recorded.'}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#001724] border border-[#003f5e] space-y-1.5">
                          <span className="font-bold text-[#26c6da] text-xs flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-[#26c6da]" />
                            <span>Facts Against the Thought</span>
                          </span>
                          <p className="text-[#93c5d6] text-xs leading-relaxed">
                            {record.evidenceAgainst || 'None recorded.'}
                          </p>
                        </div>
                      </div>

                      {/* Practical Next Step */}
                      {record.actionPlan && (
                        <div className="p-3 rounded-xl bg-[#001724] border border-[#002f44] text-xs text-[#93c5d6]">
                          <strong className="text-[#26c6da]">Coping Action: </strong>
                          <span className="text-white">{record.actionPlan}</span>
                        </div>
                      )}

                      {/* Delete action */}
                      <div className="flex justify-end pt-2 border-t border-[#00283c]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Delete this thought record?')) {
                              deleteThoughtRecord(record.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 transition py-1 px-2.5 rounded-lg hover:bg-rose-950/40 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete record</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Load More */}
            {hasMore && (
              <div className="pt-2 text-center">
                <button
                  onClick={handleLoadMore}
                  className="w-full py-3 rounded-2xl bg-[#001724] hover:bg-[#002235] text-xs font-bold text-[#26c6da] hover:text-white border border-[#002f44] transition active:scale-98 shadow-sm cursor-pointer"
                >
                  Load Earlier Records ({filteredRecords.length - visibleCount} more)
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
