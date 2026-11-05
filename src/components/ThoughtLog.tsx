/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useDiary } from '../context/DiaryContext';
import { COGNITIVE_DISTORTIONS } from '../data/cbtData';
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
} from 'lucide-react';

interface ThoughtLogProps {
  onBackToCBTHome?: () => void;
}

type DateFilterOption = 'all' | '7days' | '30days' | 'range';

const PAGE_SIZE = 5;

export const ThoughtLog: React.FC<ThoughtLogProps> = ({
  onBackToCBTHome,
}) => {
  const { thoughtRecords, deleteThoughtRecord } = useDiary();
  
  // Date range filter state
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Feed pagination state
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Default: all thought records are collapsed
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

  // Date filtering logic
  const filteredRecords = useMemo(() => {
    const now = new Date();

    return thoughtRecords.filter((record) => {
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
  }, [thoughtRecords, dateFilter, startDate, endDate]);

  // Sliced for progressive feed
  const paginatedRecords = filteredRecords.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecords.length;

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
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="space-y-4 text-white animate-fadeIn pb-14">
      {/* Top Header with Crisp Bordering */}
      <div className="bg-[#002233] p-4 sm:p-5 rounded-3xl border border-[#004766] shadow-md shadow-black/30 space-y-3">
        {onBackToCBTHome && (
          <button
            onClick={onBackToCBTHome}
            className="flex items-center gap-1.5 text-xs text-[#93c5d6] hover:text-white transition py-1 pr-2 rounded-lg group"
          >
            <ArrowLeft className="w-4 h-4 text-[#26c6da] group-hover:-translate-x-0.5 transition" />
            <span className="font-semibold text-white">Back to CBT Overview</span>
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#003852]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                Past Thought Records
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#001724] text-[#26c6da] border border-[#005073]">
                {filteredRecords.length} {filteredRecords.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
            <p className="text-xs text-[#93c5d6] mt-0.5">
              Reflections, evidence examinations &amp; reframes over time
            </p>
          </div>
        </div>

        {/* Date Range Filter Section - Crisp, Defined Borders & High Readability */}
        <div className="pt-2.5 border-t border-[#003852] space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-xs font-semibold text-[#93c5d6] flex items-center gap-1 mr-1 shrink-0">
              <CalendarRange className="w-3.5 h-3.5 text-[#26c6da]" />
              Date Filter:
            </span>

            <button
              onClick={() => {
                setDateFilter('all');
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                dateFilter === 'all'
                  ? 'bg-[#26c6da] text-[#001724] font-bold shadow-sm'
                  : 'bg-[#001724] text-[#93c5d6] hover:text-white border border-[#004766]'
              }`}
            >
              All Time
            </button>

            <button
              onClick={() => {
                setDateFilter('7days');
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                dateFilter === '7days'
                  ? 'bg-[#26c6da] text-[#001724] font-bold shadow-sm'
                  : 'bg-[#001724] text-[#93c5d6] hover:text-white border border-[#004766]'
              }`}
            >
              Past 7 Days
            </button>

            <button
              onClick={() => {
                setDateFilter('30days');
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                dateFilter === '30days'
                  ? 'bg-[#26c6da] text-[#001724] font-bold shadow-sm'
                  : 'bg-[#001724] text-[#93c5d6] hover:text-white border border-[#004766]'
              }`}
            >
              Past 30 Days
            </button>

            <button
              onClick={() => {
                setDateFilter('range');
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                dateFilter === 'range'
                  ? 'bg-[#26c6da] text-[#001724] font-bold shadow-sm'
                  : 'bg-[#001724] text-[#93c5d6] hover:text-white border border-[#004766]'
              }`}
            >
              Custom Range
            </button>
          </div>

          {/* Custom Date Range Selector Inputs */}
          {dateFilter === 'range' && (
            <div className="p-3 bg-[#001724] rounded-2xl border border-[#004d6d] space-y-2 animate-fadeIn">
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
                    className="w-full px-3 py-2 rounded-xl border border-[#004f75] bg-[#001d2c] text-xs text-white outline-hidden focus:border-[#26c6da]"
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
                    className="w-full px-3 py-2 rounded-xl border border-[#004f75] bg-[#001d2c] text-xs text-white outline-hidden focus:border-[#26c6da]"
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
                    className="text-[11px] text-[#93c5d6] hover:text-white flex items-center gap-1"
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

      {/* Serene Past Records Feed with Enhanced Bordering & Visual Separation */}
      {filteredRecords.length === 0 ? (
        <div className="py-14 px-4 text-center border border-[#004766] rounded-3xl bg-[#002233] shadow-md">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#001724] border border-[#004766] flex items-center justify-center text-[#93c5d6] mb-3">
            <Brain className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">No Thought Records For This Period</h4>
          <p className="text-xs text-[#93c5d6] max-w-sm mx-auto">
            {dateFilter !== 'all'
              ? 'Try adjusting your date range filter or switch to "All Time" to view your saved reflections.'
              : 'You have not recorded any thoughts yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Feed Sub-Header Bar: Record Count & Smart Expand/Collapse All Action */}
          <div className="flex items-center justify-between px-1 text-xs">
            <span className="text-xs text-[#93c5d6] font-medium">
              Showing {paginatedRecords.length} of {filteredRecords.length} {filteredRecords.length === 1 ? 'reflection' : 'reflections'}
            </span>

            <button
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#001724] hover:bg-[#002235] text-[#93c5d6] hover:text-white border border-[#004766] transition active:scale-95 shadow-xs"
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
                className="rounded-2xl bg-[#002233] border border-[#004766] overflow-hidden hover:border-[#26c6da]/50 transition shadow-md shadow-black/20"
              >
                {/* Header (Tap anywhere to expand/collapse) */}
                <div
                  onClick={() => toggleExpand(record.id)}
                  className="p-4 sm:p-5 cursor-pointer select-none space-y-3 hover:bg-[#00273a] transition"
                >
                  {/* Top Line: Date + Emotion Badge + Expand Chevron */}
                  <div className="flex items-center justify-between text-xs border-b border-[#00364d] pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#001724] border border-[#004766] flex items-center justify-center text-[#26c6da]">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-white text-xs">{record.date}</span>
                      <span className="text-[#004d6d]">•</span>
                      <span className="text-[#93c5d6] text-[11px]">{record.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* High-Contrast Emotion Pill */}
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#001724] text-[#26c6da] border border-[#005c84]">
                        {record.emotion}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#001724] border border-[#004766] flex items-center justify-center text-[#93c5d6]">
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Automatic Thought Box: Crisp Border & Structural Distinction */}
                  <div className="p-3.5 rounded-xl bg-[#001724] border border-[#003d58] border-l-4 border-l-rose-400 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-rose-300 block">
                      Caught Automatic Thought
                    </span>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed line-clamp-2">
                      &quot;{record.automaticThought}&quot;
                    </p>
                  </div>

                  {/* Balanced Reframe Box: Crisp Border & Structural Distinction */}
                  <div className="p-3.5 rounded-xl bg-[#001b2a] border border-[#004d6d] border-l-4 border-l-[#26c6da] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#26c6da] block">
                      Balanced Perspective
                    </span>
                    <p className="text-xs sm:text-sm text-white font-medium leading-relaxed line-clamp-2">
                      &quot;{record.balancedAlternative}&quot;
                    </p>
                  </div>
                </div>

                {/* Expanded Full Reflection Details with Strong Separation */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-[#00405c] bg-[#001724] space-y-3.5 text-xs animate-fadeIn">
                    
                    {/* Situation */}
                    <div className="p-3 rounded-xl bg-[#001f30] border border-[#003d58] space-y-1">
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
                              className="px-2.5 py-1 rounded-lg bg-[#002438] text-[#26c6da] border border-[#004766] text-xs font-medium"
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
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#00283c] text-white border border-[#005073]"
                              >
                                {info ? info.name : dId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Evidence For vs Evidence Against with Distinct Border Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-[#001f30] border border-[#00405c] space-y-1.5">
                        <span className="font-bold text-[#cbd5e1] text-xs flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-[#93c5d6]" />
                          <span>Observable Facts Supporting</span>
                        </span>
                        <p className="text-[#93c5d6] text-xs leading-relaxed">
                          {record.evidenceFor || 'None recorded.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#001f30] border border-[#005073] space-y-1.5">
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
                      <div className="p-3 rounded-xl bg-[#001f30] border border-[#00405c] text-xs text-[#93c5d6]">
                        <strong className="text-[#26c6da]">Coping Action: </strong>
                        <span className="text-white">{record.actionPlan}</span>
                      </div>
                    )}

                    {/* Delete action */}
                    <div className="flex justify-end pt-2 border-t border-[#00344d]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Delete this thought record?')) {
                            deleteThoughtRecord(record.id);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 transition py-1 px-2.5 rounded-lg hover:bg-rose-950/40"
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

          {/* Feed Pagination / Load More */}
          {hasMore && (
            <div className="pt-2 text-center">
              <button
                onClick={handleLoadMore}
                className="w-full py-3 rounded-2xl bg-[#002233] hover:bg-[#002c42] text-xs font-bold text-[#26c6da] hover:text-white border border-[#004766] transition active:scale-98 shadow-sm"
              >
                Load Earlier Records ({filteredRecords.length - visibleCount} more)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
