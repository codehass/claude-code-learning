import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import Sidebar from './components/layout/Sidebar';
import TerminalSimulation from './components/terminal/TerminalSimulation';
import LiveCodeDemo from './components/slides/LiveCodeDemo';
import InteractiveQuiz from './components/quiz/InteractiveQuiz';
import ResourceHub from './components/resources/ResourceHub';
import { slidesData } from './data/slidesData';

const LEVEL_COLORS = [
  { badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  { badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
  { badge: 'bg-violet-500/10 text-violet-400 border border-violet-500/20' },
];

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const currentLevel = slidesData[currentLevelIndex];
  const currentLesson = currentLevel?.lessons[currentLessonIndex];

  const isLastLessonInLevel = currentLessonIndex === currentLevel?.lessons.length - 1;
  const isLastLevel = currentLevelIndex === slidesData.length - 1;

  const handleNext = () => {
    if (showQuiz) return;
    if (isLastLessonInLevel) {
      setShowQuiz(true);
    } else {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    } else if (currentLevelIndex > 0) {
      setCurrentLevelIndex(prev => prev - 1);
      setCurrentLessonIndex(slidesData[currentLevelIndex - 1].lessons.length - 1);
      setShowQuiz(false);
    }
  };

  const handleQuizComplete = (passed) => {
    if (!isLastLevel) {
      const nextLevel = currentLevelIndex + 1;
      setUnlockedLevels(Math.max(unlockedLevels, nextLevel));
      setCurrentLevelIndex(nextLevel);
      setCurrentLessonIndex(0);
    } else {
      alert("Congratulations! You've completed the Zero to Hero guide.");
    }
    setShowQuiz(false);
  };

  const handleNavigate = (levelIdx, lessonIdx) => {
    setCurrentLevelIndex(levelIdx);
    setCurrentLessonIndex(lessonIdx);
    setShowQuiz(false);
  };

  if (!currentLevel || !currentLesson) return null;

  const isPrevDisabled = currentLevelIndex === 0 && currentLessonIndex === 0 && !showQuiz;
  const levelStyle = LEVEL_COLORS[currentLevelIndex] ?? LEVEL_COLORS[2];

  return (
    <div className="flex h-screen bg-dark-700 text-gray-200 overflow-hidden selection:bg-brand-primary/20 selection:text-white">
      <Sidebar
        currentLevelIndex={currentLevelIndex}
        currentLessonIndex={currentLessonIndex}
        unlockedLevels={unlockedLevels}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid pointer-events-none" />

        {/* Scrollable content */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="px-10 py-12 md:px-16 max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {!showQuiz ? (
                <motion.div
                  key={`${currentLevelIndex}-${currentLessonIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full"
                >
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2.5 mb-7">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full ${levelStyle.badge}`}>
                      {currentLevel.level}
                    </span>
                    <span className="text-gray-700">·</span>
                    <span className="text-gray-600 text-xs font-mono">
                      {currentLessonIndex + 1} / {currentLevel.lessons.length}
                    </span>
                  </div>

                  {/* Lesson heading */}
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-5">
                    {currentLesson.title}
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gradient-to-r from-brand-primary/20 via-brand-primary/10 to-transparent flex-1" />
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-gray-400 leading-relaxed max-w-2xl mb-10">
                    {currentLesson.content}
                  </p>

                  {/* Demo area */}
                  {currentLesson.demoType === 'terminal' && (
                    <TerminalSimulation sequence={currentLesson.terminalSequence} />
                  )}
                  {currentLesson.demoType === 'liveCode' && (
                    <LiveCodeDemo data={currentLesson.liveCode} />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`quiz-${currentLevelIndex}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full py-8"
                >
                  <InteractiveQuiz
                    quiz={currentLevel.quiz}
                    onComplete={handleQuizComplete}
                    levelIndex={currentLevelIndex}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation footer */}
        <div className="relative border-t border-white/[0.05] bg-dark-900/80 backdrop-blur-md p-4 px-8 flex justify-between items-center shrink-0">
          <button
            onClick={handlePrevious}
            disabled={isPrevDisabled}
            className="flex items-center gap-2 text-gray-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/[0.05] text-sm"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {!showQuiz && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-brand-primary text-dark-900 hover:bg-brand-secondary font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/25"
            >
              <span>{isLastLessonInLevel ? 'Take Quiz' : 'Next Lesson'}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </main>

      <ResourceHub />
    </div>
  );
}

export default App;
