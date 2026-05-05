import React, { useState } from 'react';
import { Search, Terminal, BookOpen, Command, X, Keyboard } from 'lucide-react';
import { commandsData, shortcutsData } from '../../data/commands';

export default function ResourceHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('commands');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommands = commandsData.filter(cmd =>
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredShortcuts = shortcutsData.filter(s =>
    s.keys.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery('');
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-24 right-6 z-40 group flex items-center gap-2.5 bg-dark-900 border border-white/[0.08] hover:border-brand-primary/40 px-4 py-2.5 rounded-2xl shadow-xl shadow-black/40 text-gray-500 hover:text-white transition-all duration-200"
      >
        <BookOpen size={15} className="group-hover:text-brand-primary transition-colors shrink-0" />
        <span className="text-xs font-semibold font-display tracking-wide">Reference</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="w-full max-w-2xl max-h-[82vh] flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/60"
               style={{ background: '#0f0c1a' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]"
                 style={{ background: '#0d0b18' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center">
                  <Terminal size={13} className="text-brand-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white font-display">Claude Code Reference</h2>
                  <p className="text-[10px] text-gray-600 font-mono">Commands &amp; keyboard shortcuts</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.06] transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.05] px-2" style={{ background: '#0d0b18' }}>
              {[
                { key: 'commands', label: 'Slash Commands', icon: Command, count: commandsData.length },
                { key: 'shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard, count: shortcutsData.length },
              ].map(({ key, label, icon: Icon, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                    activeTab === key
                      ? 'border-brand-primary text-white'
                      : 'border-transparent text-gray-600 hover:text-gray-400'
                  }`}
                >
                  <Icon size={12} />
                  {label}
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    activeTab === key ? 'bg-brand-primary/15 text-brand-primary' : 'bg-white/[0.05] text-gray-700'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/[0.05]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
                <input
                  type="text"
                  placeholder={activeTab === 'commands' ? "Search commands…" : "Search shortcuts…"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-white/[0.07] text-gray-300 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/20 placeholder:text-gray-700 text-sm font-mono transition-colors"
                  style={{ background: '#0a0812' }}
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {activeTab === 'commands' ? (
                filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <div
                      key={cmd.name}
                      className="flex flex-col sm:flex-row sm:items-start p-3.5 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors"
                      style={{ background: '#0d0b18' }}
                    >
                      <div className="flex items-center gap-2 sm:w-[38%] shrink-0 mb-2 sm:mb-0">
                        <Command size={11} className="text-brand-primary/60 shrink-0" />
                        <span className="text-brand-secondary font-mono text-[13px] font-medium">{cmd.name}</span>
                      </div>
                      <div className="sm:w-[62%] pl-0 sm:pl-3">
                        <p className="text-[13px] text-gray-400 leading-snug">{cmd.description}</p>
                        <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-700 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.04]">
                          {cmd.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-700 text-sm font-mono">
                    No results for "{searchQuery}"
                  </div>
                )
              ) : (
                filteredShortcuts.length > 0 ? (
                  filteredShortcuts.map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center p-3.5 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors gap-3"
                      style={{ background: '#0d0b18' }}
                    >
                      <div className="sm:w-[38%] shrink-0">
                        <kbd className="inline-block border border-white/[0.12] text-brand-secondary font-mono text-xs px-2.5 py-1 rounded-lg shadow-sm"
                             style={{ background: '#0a0812' }}>
                          {s.keys}
                        </kbd>
                      </div>
                      <div className="sm:w-[62%]">
                        <p className="text-[13px] text-gray-400 leading-snug">{s.action}</p>
                        <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-700 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.04]">
                          {s.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-700 text-sm font-mono">
                    No results for "{searchQuery}"
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
