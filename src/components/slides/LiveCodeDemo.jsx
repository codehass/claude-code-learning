import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function LiveCodeDemo({ data }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Before */}
      <div className="rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: '#0a0812' }}>
        <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2" style={{ background: '#0d0b18' }}>
          <div className="w-2 h-2 rounded-full bg-gray-700" />
          <span className="text-[11px] font-mono text-gray-600 tracking-wider">BEFORE</span>
          <span className="ml-auto text-[10px] font-mono text-gray-700">utils.js</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px' }}
        >
          {data.before}
        </SyntaxHighlighter>
      </div>

      {/* Claude command */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center gap-3 bg-dark-800 border border-brand-primary/20 px-5 py-2.5 rounded-2xl shadow-lg shadow-brand-primary/5">
          <Sparkles size={14} className="text-brand-primary shrink-0" />
          <span className="text-sm text-gray-300 font-medium">{data.command}</span>
          <ArrowDown size={13} className="text-brand-primary/60 shrink-0" />
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="rounded-xl overflow-hidden border border-emerald-500/15 relative"
        style={{ background: '#0a0812' }}
      >
        <div className="px-4 py-2.5 border-b border-emerald-500/10 flex items-center gap-2" style={{ background: '#0d0b18' }}>
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="text-[11px] font-mono text-emerald-500/70 tracking-wider">AFTER</span>
          <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium">updated</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px' }}
        >
          {data.after}
        </SyntaxHighlighter>
        {/* Subtle green glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none"
             style={{ boxShadow: 'inset 0 0 40px rgba(52, 211, 153, 0.03)' }} />
      </motion.div>
    </div>
  );
}
