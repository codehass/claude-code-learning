import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

const LEVEL_LABELS = ['Beginner Check', 'Intermediate Check', 'Advanced Check'];

export default function InteractiveQuiz({ quiz, onComplete, levelIndex = 0 }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  };

  const isCorrect = selectedOption === quiz.correctIndex;
  const label = LEVEL_LABELS[levelIndex] ?? 'Knowledge Check';

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/50"
           style={{ background: '#0f0c1a' }}>

        {/* Header */}
        <div className="px-7 py-5 border-b border-white/[0.05]" style={{ background: '#0d0b18' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center shrink-0">
              <span className="text-brand-primary font-bold text-sm font-mono">?</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary/70 mb-0.5">{label}</p>
              <p className="text-[11px] text-gray-600 font-mono">Select the correct answer to continue</p>
            </div>
          </div>
        </div>

        <div className="p-7 space-y-6">
          {/* Question */}
          <p className="text-lg font-display font-semibold text-white leading-snug">
            {quiz.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === quiz.correctIndex;
              const isWrong = isSubmitted && isSelected && !isCorrectOption;
              const isRight = isSubmitted && isCorrectOption;
              const isDimmed = isSubmitted && !isCorrectOption && !isSelected;

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group ${
                    isRight
                      ? 'bg-emerald-500/8 border-emerald-500/30 text-emerald-300'
                      : isWrong
                        ? 'bg-red-500/8 border-red-500/30 text-red-300'
                        : isDimmed
                          ? 'border-white/[0.04] text-gray-700 opacity-50'
                          : isSelected
                            ? 'bg-brand-primary/8 border-brand-primary/40 text-white'
                            : 'border-white/[0.06] text-gray-400 hover:border-white/[0.14] hover:text-gray-200 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Letter badge */}
                  <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    isRight
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isWrong
                        ? 'bg-red-500/20 text-red-400'
                        : isSelected
                          ? 'bg-brand-primary/20 text-brand-primary'
                          : 'bg-white/[0.05] text-gray-600 group-hover:bg-white/[0.08]'
                  }`}>
                    {LETTERS[idx]}
                  </span>

                  <span className="flex-1 text-sm font-medium leading-snug">{option}</span>

                  {isRight && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  {isWrong && <XCircle size={16} className="text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.25 }}
                className={`rounded-xl p-4 flex items-start gap-3 border ${
                  isCorrect
                    ? 'bg-emerald-500/8 border-emerald-500/20'
                    : 'bg-red-500/8 border-red-500/20'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCorrect
                    ? <CheckCircle2 size={16} className="text-emerald-400" />
                    : <XCircle size={16} className="text-red-400" />}
                </div>
                <div>
                  <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite.'}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {isCorrect
                      ? "Great work — you're ready for the next module."
                      : `The correct answer was "${quiz.options[quiz.correctIndex]}". You can still continue.`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-end pt-1">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="bg-white/90 text-dark-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all font-display"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => onComplete(isCorrect)}
                className="bg-brand-primary text-dark-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-secondary transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/20 font-display"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
