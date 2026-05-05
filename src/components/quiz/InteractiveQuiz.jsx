import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

export default function InteractiveQuiz({ quiz, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  };

  const isCorrect = selectedOption === quiz.correctIndex;

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-dark-800 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-dark-900">
          <h3 className="text-lg font-medium text-white flex items-center space-x-2">
            <span className="bg-brand-primary/20 text-brand-secondary px-2 py-1 rounded text-xs uppercase tracking-wider font-bold">Knowledge Check</span>
          </h3>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <p className="text-lg text-gray-200">{quiz.question}</p>
          
          <div className="space-y-3">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ";
              
              if (isSubmitted) {
                if (idx === quiz.correctIndex) {
                  btnClass += "bg-green-500/10 border-green-500/50 text-green-400";
                } else if (isSelected) {
                  btnClass += "bg-red-500/10 border-red-500/50 text-red-400";
                } else {
                  btnClass += "bg-dark-900 border-gray-700 text-gray-500 opacity-50";
                }
              } else {
                if (isSelected) {
                  btnClass += "bg-brand-primary/10 border-brand-primary text-white";
                } else {
                  btnClass += "bg-dark-900 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-dark-700";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={btnClass}
                >
                  <span className="font-medium">{option}</span>
                  {isSubmitted && idx === quiz.correctIndex && <CheckCircle2 size={18} className="text-green-500" />}
                  {isSubmitted && isSelected && idx !== quiz.correctIndex && <XCircle size={18} className="text-red-500" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-4 rounded-xl flex items-start space-x-3 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCorrect ? <CheckCircle2 size={18} className="text-green-400" /> : <XCircle size={18} className="text-red-400" />}
                </div>
                <div>
                  <h4 className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right.'}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {isCorrect 
                      ? "Great job! You're ready to proceed to the next module." 
                      : `The correct answer was "${quiz.options[quiz.correctIndex]}". Feel free to continue anyway.`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="pt-4 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => onComplete(isCorrect)}
                className="bg-brand-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-primary/90 transition-colors flex items-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
