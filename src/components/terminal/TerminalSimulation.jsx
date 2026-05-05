import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function TerminalSimulation({ sequence }) {
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedInput, setTypedInput] = useState('');

  const resetTerminal = () => {
    setHistory([]);
    setCurrentStep(0);
    setIsTyping(false);
    setTypedInput('');
  };

  const runNextStep = () => {
    if (currentStep >= sequence.length || isTyping) return;

    const step = sequence[currentStep];
    setIsTyping(true);

    if (step.input) {
      let charIndex = 0;
      setTypedInput('');

      const typeInterval = setInterval(() => {
        if (charIndex <= step.input.length) {
          setTypedInput(step.input.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setHistory(prev => [...prev, { input: step.input, output: step.output }]);
            setTypedInput('');
            setIsTyping(false);
            setCurrentStep(prev => prev + 1);
          }, step.delay);
        }
      }, 45);
    } else {
      setTimeout(() => {
        setHistory(prev => [...prev, { input: null, output: step.output }]);
        setIsTyping(false);
        setCurrentStep(prev => prev + 1);
      }, step.delay);
    }
  };

  const isDone = !isTyping && currentStep >= sequence.length;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/60 font-mono text-sm"
         style={{ background: '#0a0812' }}>

      {/* Terminal chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
           style={{ background: '#0d0b18' }}>
        <div className="flex items-center gap-3">
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] opacity-80" />
          </div>
          <span className="text-gray-600 text-xs font-mono ml-1">~/project — claude</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runNextStep}
            disabled={currentStep >= sequence.length || isTyping}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-primary/15 text-brand-primary rounded-md hover:bg-brand-primary/25 disabled:opacity-40 transition-colors text-xs font-sans font-medium"
          >
            <Play size={12} />
            Run
          </button>
          <button
            onClick={resetTerminal}
            className="p-1.5 text-gray-600 hover:text-gray-400 rounded-md hover:bg-white/5 transition-colors"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[240px] max-h-[380px] overflow-y-auto space-y-4">
        {history.map((item, idx) => (
          <div key={idx}>
            {item.input !== null && (
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-brand-primary shrink-0 mt-px select-none">❯</span>
                <span className="text-gray-200 break-all">{item.input}</span>
              </div>
            )}
            {item.output && (
              <div className="text-gray-500 whitespace-pre-wrap leading-relaxed pl-5 text-[13px]">
                {item.output}
              </div>
            )}
          </div>
        ))}

        {/* Active typing line */}
        {!isDone && (
          <div className="flex items-start gap-2">
            {sequence[currentStep]?.input !== "" && sequence[currentStep]?.input !== undefined ? (
              <>
                <span className="text-brand-primary shrink-0 mt-px select-none">❯</span>
                <span className="text-gray-200 break-all">{typedInput}</span>
                {isTyping && (
                  <span className="inline-block w-[7px] h-[14px] bg-brand-primary/80 animate-blink ml-0.5 rounded-sm" />
                )}
              </>
            ) : sequence[currentStep]?.input === "" && isTyping ? (
              <span className="text-gray-700 italic text-xs">Processing…</span>
            ) : null}
          </div>
        )}

        {/* Idle cursor when done */}
        {isDone && (
          <div className="flex items-center gap-2">
            <span className="text-brand-primary select-none">❯</span>
            <span className="inline-block w-[7px] h-[14px] bg-gray-600 animate-blink rounded-sm" />
          </div>
        )}
      </div>
    </div>
  );
}
