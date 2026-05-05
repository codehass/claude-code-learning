import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { slidesData } from '../../data/slidesData';

const LEVEL_STYLES = [
  { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400', ring: 'bg-emerald-400' },
  { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   dot: 'bg-amber-400',   ring: 'bg-amber-400'   },
  { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', dot: 'bg-violet-400',  ring: 'bg-violet-400'  },
];

export default function Sidebar({ currentLevelIndex, currentLessonIndex, unlockedLevels, onNavigate }) {
  const totalLessons = slidesData.reduce((a, l) => a + l.lessons.length, 0);
  const completedLessons = slidesData
    .slice(0, currentLevelIndex)
    .reduce((a, l) => a + l.lessons.length, 0) + currentLessonIndex;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="w-72 h-screen bg-dark-900 border-r border-white/[0.05] flex flex-col shrink-0 relative">
      {/* Subtle gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

      {/* Brand header */}
      <div className="p-5 border-b border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.04] to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/25 shrink-0">
            <span className="text-white font-bold text-base font-display leading-none">I</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight font-display leading-none mb-0.5">Innoby</h1>
            <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase">Zero to Hero</p>
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {slidesData.map((level, levelIdx) => {
          const isUnlocked = levelIdx <= unlockedLevels;
          const isActiveLevel = levelIdx === currentLevelIndex;
          const style = LEVEL_STYLES[levelIdx] ?? LEVEL_STYLES[2];

          return (
            <div key={level.level} className="space-y-1.5">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className={`text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${
                  isUnlocked ? style.badge : 'bg-white/[0.03] text-gray-700 border-white/[0.05]'
                }`}>
                  {level.level}
                </span>
                {!isUnlocked && <Lock size={10} className="text-gray-700" />}
              </div>

              <div className="space-y-0.5">
                {level.lessons.map((lesson, lessonIdx) => {
                  const isActive = isActiveLevel && lessonIdx === currentLessonIndex;
                  const isCompleted = levelIdx < currentLevelIndex || (isActiveLevel && lessonIdx < currentLessonIndex);

                  return (
                    <button
                      key={lesson.id}
                      disabled={!isUnlocked}
                      onClick={() => onNavigate(levelIdx, lessonIdx)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-left transition-all duration-200 relative group ${
                        isActive
                          ? 'bg-white/[0.06] text-white'
                          : isUnlocked
                            ? 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                            : 'text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-brand-primary rounded-r-full" />
                      )}

                      <div className="shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 size={14} className="text-emerald-500/70" />
                        ) : isActive ? (
                          <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.ring} opacity-40`} />
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${style.dot}`} />
                          </div>
                        ) : (
                          <Circle size={14} className={isUnlocked ? 'text-gray-700' : 'text-gray-800'} />
                        )}
                      </div>

                      <span className="truncate leading-snug font-medium">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress footer */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="bg-dark-800 rounded-xl p-3.5 border border-white/[0.04]">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-brand-primary font-mono">{progress}%</span>
          </div>
          <div className="w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
          <p className="text-[10px] text-gray-700 mt-2.5 font-mono">
            {completedLessons} / {totalLessons} lessons
          </p>
        </div>
      </div>
    </div>
  );
}
