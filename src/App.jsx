import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import Sidebar from './components/layout/Sidebar';
import TerminalSimulation from './components/terminal/TerminalSimulation';
import LiveCodeDemo from './components/slides/LiveCodeDemo';
import InteractiveQuiz from './components/quiz/InteractiveQuiz';
import ResourceHub from './components/resources/ResourceHub';
import { slidesData } from './data/slidesData';

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
      // Finished everything
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

  return (
    <div className="flex h-screen bg-dark-700 text-gray-200 overflow-hidden selection:bg-brand-primary/30 selection:text-white">
      <Sidebar 
        currentLevelIndex={currentLevelIndex}
        currentLessonIndex={currentLessonIndex}
        unlockedLevels={unlockedLevels}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Main Content Area */}
        <div className="flex-1 px-8 py-12 md:px-16 max-w-5xl mx-auto w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key={`${currentLevelIndex}-${currentLessonIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center space-x-2 bg-dark-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-gray-800">
                    <span className="text-brand-secondary">{currentLevel.level}</span>
                    <span className="text-gray-600">/</span>
                    <span>Lesson {currentLessonIndex + 1}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    {currentLesson.title}
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
                    {currentLesson.content}
                  </p>
                </div>

                <div className="mt-8">
                  {currentLesson.demoType === 'terminal' && (
                    <TerminalSimulation sequence={currentLesson.terminalSequence} />
                  )}
                  {currentLesson.demoType === 'liveCode' && (
                    <LiveCodeDemo data={currentLesson.liveCode} />
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`quiz-${currentLevelIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full py-10"
              >
                <InteractiveQuiz 
                  quiz={currentLevel.quiz} 
                  onComplete={handleQuizComplete} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="bg-dark-900 border-t border-gray-800 p-4 px-8 flex justify-between items-center sticky bottom-0">
          <button
            onClick={handlePrevious}
            disabled={currentLevelIndex === 0 && currentLessonIndex === 0 && !showQuiz}
            className="flex items-center space-x-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>
          
          {!showQuiz && (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg"
            >
              <span>{isLastLessonInLevel ? 'Take Quiz' : 'Next Lesson'}</span>
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </main>
      
      <ResourceHub />
    </div>
  );
}

export default App;
