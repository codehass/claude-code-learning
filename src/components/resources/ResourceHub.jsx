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
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-dark-900 border border-gray-700 hover:border-brand-primary p-3 rounded-full shadow-lg text-gray-300 hover:text-white transition-all group z-40 flex items-center space-x-2"
      >
        <BookOpen size={20} className="group-hover:text-brand-secondary" />
        <span className="text-sm font-medium pr-1 hidden group-hover:block">Reference</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[82vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-dark-900">
              <div className="flex items-center space-x-2">
                <Terminal size={18} className="text-brand-secondary" />
                <h2 className="text-white font-medium">Claude Code Reference</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 bg-dark-900">
              <button
                onClick={() => setActiveTab('commands')}
                className={`flex items-center space-x-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'commands'
                    ? 'border-brand-primary text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Command size={14} />
                <span>Slash Commands</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">{commandsData.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('shortcuts')}
                className={`flex items-center space-x-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'shortcuts'
                    ? 'border-brand-primary text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Keyboard size={14} />
                <span>Keyboard Shortcuts</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">{shortcutsData.length}</span>
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-800 bg-dark-700">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder={activeTab === 'commands' ? "Search commands (e.g. 'compact', 'batch')..." : "Search shortcuts (e.g. 'cancel', 'thinking')..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 text-white rounded-lg py-2.5 pl-9 pr-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-gray-500 text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === 'commands' ? (
                filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <div key={cmd.name} className="flex flex-col sm:flex-row sm:items-start p-3 rounded-lg bg-dark-900/50 border border-gray-800/50 hover:bg-dark-900 transition-colors">
                      <div className="flex items-center space-x-2 sm:w-1/3 shrink-0 mb-2 sm:mb-0">
                        <Command size={13} className="text-brand-primary shrink-0" />
                        <span className="text-brand-secondary font-mono text-sm">{cmd.name}</span>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-gray-300">{cmd.description}</p>
                        <span className="inline-block mt-2 text-[10px] font-medium uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                          {cmd.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    No commands found matching "{searchQuery}"
                  </div>
                )
              ) : (
                filteredShortcuts.length > 0 ? (
                  filteredShortcuts.map((s, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-dark-900/50 border border-gray-800/50 hover:bg-dark-900 transition-colors gap-3">
                      <div className="sm:w-2/5 shrink-0">
                        <kbd className="inline-block bg-gray-800 border border-gray-600 text-brand-secondary font-mono text-xs px-2 py-1 rounded shadow-sm">
                          {s.keys}
                        </kbd>
                      </div>
                      <div className="sm:w-3/5">
                        <p className="text-sm text-gray-300">{s.action}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                          {s.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    No shortcuts found matching "{searchQuery}"
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
