import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

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
      // Simulate typing effect
      let charIndex = 0;
      setTypedInput('');
      
      const typeInterval = setInterval(() => {
        if (charIndex <= step.input.length) {
          setTypedInput(step.input.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Wait for delay then show output
          setTimeout(() => {
            setHistory(prev => [...prev, { input: step.input, output: step.output }]);
            setTypedInput('');
            setIsTyping(false);
            setCurrentStep(prev => prev + 1);
          }, step.delay);
        }
      }, 50); // 50ms per character
    } else {
      // No input, just simulate thinking/processing delay
      setTimeout(() => {
        setHistory(prev => [...prev, { input: null, output: step.output }]);
        setIsTyping(false);
        setCurrentStep(prev => prev + 1);
      }, step.delay);
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-2xl bg-black font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-gray-400 font-medium text-xs">claude-code — node</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={runNextStep} 
            disabled={currentStep >= sequence.length || isTyping}
            className="flex items-center space-x-1 px-2 py-1 bg-brand-primary/20 text-brand-secondary rounded hover:bg-brand-primary/30 disabled:opacity-50 transition-colors"
          >
            <Play size={14} />
            <span className="text-xs">Run</span>
          </button>
          <button 
            onClick={resetTerminal}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 min-h-[250px] max-h-[400px] overflow-y-auto">
        {history.map((item, idx) => (
          <div key={idx} className="mb-4">
            {item.input !== null && (
              <div className="flex text-gray-300 mb-1">
                <span className="text-[#da7756] mr-2">❯</span>
                <span>{item.input}</span>
              </div>
            )}
            {item.output && (
              <div className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                {item.output}
              </div>
            )}
          </div>
        ))}
        
        {/* Active typing line */}
        {(isTyping || currentStep < sequence.length) && (
          <div className="flex text-gray-300">
            {sequence[currentStep]?.input !== "" && sequence[currentStep]?.input !== undefined && (
              <>
                <span className="text-[#da7756] mr-2">❯</span>
                <span>{typedInput}</span>
                {isTyping && <span className="w-2 h-4 ml-1 bg-gray-400 animate-blink inline-block align-middle"></span>}
              </>
            )}
            {sequence[currentStep]?.input === "" && isTyping && (
              <span className="text-gray-500 italic">Processing...</span>
            )}
          </div>
        )}
        
        {!isTyping && currentStep >= sequence.length && (
          <div className="flex text-gray-300 mt-2">
            <span className="text-[#da7756] mr-2">❯</span>
            <span className="w-2 h-4 bg-gray-400 animate-blink inline-block align-middle"></span>
          </div>
        )}
      </div>
    </div>
  );
}
