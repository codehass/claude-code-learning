import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function LiveCodeDemo({ data }) {
  return (
    <div className="flex flex-col space-y-4">
      {/* Before State */}
      <div className="rounded-xl overflow-hidden border border-gray-700 bg-dark-800">
        <div className="px-4 py-2 bg-dark-900 border-b border-gray-700 text-xs font-mono text-gray-400">
          Before (utils.js)
        </div>
        <SyntaxHighlighter 
          language="javascript" 
          style={vscDarkPlus} 
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
        >
          {data.before}
        </SyntaxHighlighter>
      </div>

      {/* Claude Command */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start space-x-3 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-xl"
      >
        <div className="mt-1 bg-brand-primary/20 p-2 rounded-lg text-brand-secondary">
          <Terminal size={18} />
        </div>
        <div>
          <div className="text-xs font-semibold text-brand-secondary uppercase tracking-wider mb-1">
            Claude Command
          </div>
          <div className="text-gray-200 font-medium">
            "{data.command}"
          </div>
        </div>
      </motion.div>

      {/* After State */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="rounded-xl overflow-hidden border border-green-900/50 bg-dark-800 relative"
      >
        <div className="px-4 py-2 bg-dark-900 border-b border-gray-700 flex justify-between items-center">
          <span className="text-xs font-mono text-gray-400">After (utils.js)</span>
          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Updated</span>
        </div>
        <SyntaxHighlighter 
          language="javascript" 
          style={vscDarkPlus} 
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
        >
          {data.after}
        </SyntaxHighlighter>
      </motion.div>
    </div>
  );
}
