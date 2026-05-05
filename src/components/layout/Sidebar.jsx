import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, Play } from 'lucide-react';
import { slidesData } from '../../data/slidesData';

export default function Sidebar({ currentLevelIndex, currentLessonIndex, unlockedLevels, onNavigate }) {
  return (
    <div className="w-80 h-screen bg-dark-900 border-r border-gray-800 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Innoby</h1>
        </div>
        <p className="text-xs text-gray-400 font-medium">Smart Quote</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {slidesData.map((level, levelIdx) => {
          const isUnlocked = levelIdx <= unlockedLevels;
          const isActiveLevel = levelIdx === currentLevelIndex;
          
          return (
            <div key={level.level} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                  {level.level}
                </h2>
                {!isUnlocked && <Lock size={12} className="text-gray-600" />}
              </div>
              
              <div className="space-y-1">
                {level.lessons.map((lesson, lessonIdx) => {
                  const isActive = isActiveLevel && lessonIdx === currentLessonIndex;
                  const isCompleted = levelIdx < currentLevelIndex || (isActiveLevel && lessonIdx < currentLessonIndex);
                  
                  return (
                    <button
                      key={lesson.id}
                      disabled={!isUnlocked}
                      onClick={() => onNavigate(levelIdx, lessonIdx)}
                      className={`w-full flex items-center p-2 rounded-lg text-sm text-left transition-colors ${
                        isActive 
                          ? 'bg-brand-primary/10 text-brand-secondary font-medium' 
                          : isUnlocked 
                            ? 'text-gray-300 hover:bg-gray-800/50' 
                            : 'text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <div className="mr-3 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : isActive ? (
                          <div className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-primary border-2 border-[#16181d]"></span>
                          </div>
                        ) : (
                          <Circle size={16} className={isUnlocked ? 'text-gray-600' : 'text-gray-800'} />
                        )}
                      </div>
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800 bg-dark-900">
        <div className="bg-dark-800 rounded-lg p-3">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-medium text-gray-400">Overall Progress</span>
            <span className="text-xs font-bold text-brand-secondary">
              {Math.round(((currentLevelIndex * 2 + currentLessonIndex) / (slidesData.length * 2)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-brand-primary h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentLevelIndex * 2 + currentLessonIndex) / (slidesData.length * 2)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
