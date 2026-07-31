import React from 'react';
import { Building2, Layers, Sparkles, Globe, Terminal, ShieldCheck, Scale, FileText, Code2, Award } from 'lucide-react';

export type AppTheme = 'cyber' | 'blackwell' | 'light';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRawJson: () => void;
  onOpenFiverrModal: () => void;
  fpsCount: number;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenRawJson,
  onOpenFiverrModal,
  theme,
  setTheme
}) => {
  const tabs = [
    { id: 'company', label: 'Company & Portfolio', icon: Building2 },
    { id: 'overview', label: '3D Synapse Model', icon: Layers },
    { id: 'obra', label: 'Obra Maestro Suite', icon: Sparkles },
    { id: 'edge_gallery', label: 'Edge AI Hub', icon: Globe },
    { id: 'inference', label: 'Local Inference', icon: Terminal },
    { id: 'vault', label: 'WASM Vault', icon: ShieldCheck },
    { id: 'presentation', label: 'Executive Deck', icon: FileText },
    { id: 'tech_report', label: 'Technical Spec', icon: Code2 },
    { id: 'licensing', label: 'Licensing & IP Shield', icon: Scale },
  ];

  const headerBg = theme === 'light'
    ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    : theme === 'blackwell'
    ? 'bg-[#0f0c08]/95 border-amber-900/40 text-amber-50 shadow-md'
    : 'bg-slate-950/95 border-slate-800 text-slate-100 shadow-md';

  return (
    <header id="main-header" className={`${headerBg} border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Executive Corporate Header Bar */}
        <div className="flex items-center justify-between h-16 border-b border-slate-800/40">
          {/* Corporate Brand - Header Left */}
          <div
            onClick={() => setActiveTab('company')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className={`p-2 rounded-lg font-bold border transition-colors ${
              theme === 'light'
                ? 'bg-blue-600 text-white border-blue-700'
                : theme === 'blackwell'
                ? 'bg-amber-600 text-black border-amber-500 font-bold'
                : 'bg-blue-600/20 text-blue-400 border-blue-500/40 group-hover:bg-blue-600 group-hover:text-white'
            }`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight font-sans uppercase">
                  Analytical Engine Website
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                  AEL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans tracking-wide hidden sm:block">
                On-Device AI & Cryptographic Computing Research
              </p>
            </div>
          </div>

          {/* Action CTAs & Theme Switcher - Header Right */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setTheme('cyber')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  theme === 'cyber'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Slate
              </button>
              <button
                onClick={() => setTheme('blackwell')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  theme === 'blackwell'
                    ? 'bg-amber-600 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Titanium
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Light
              </button>
            </div>

            {/* Public Spec Blueprint */}
            <button
              onClick={onOpenRawJson}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium font-mono transition-all ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Public Spec</span>
            </button>

            {/* Enterprise Engagement CTA */}
            <button
              onClick={onOpenFiverrModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-sm transition-all text-xs font-sans border border-blue-400/30"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Enterprise Services</span>
            </button>
          </div>
        </div>

        {/* Clean Corporate Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            const activeClass = theme === 'light'
              ? 'bg-blue-600 text-white font-bold shadow-sm border-blue-700'
              : theme === 'blackwell'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
              : 'bg-blue-600/20 text-blue-300 border-blue-500/40 font-bold';

            const inactiveClass = theme === 'light'
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border-transparent';

            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (theme === 'light' ? 'text-white' : 'text-blue-400') : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


