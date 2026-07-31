import React from 'react';
import {
  Building2,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  FileText,
  Globe,
  Award,
  ArrowRight,
  Code2,
  Lock,
  Calculator,
  ExternalLink,
  Terminal,
  Scale
} from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';
import { AppTheme } from './Header';

interface CompanySectionProps {
  onNavigateTab: (tab: string) => void;
  onOpenFiverrModal: () => void;
  onOpenRawJson: () => void;
  theme: AppTheme;
}

export const CompanySection: React.FC<CompanySectionProps> = ({
  onNavigateTab,
  onOpenFiverrModal,
  onOpenRawJson,
  theme
}) => {
  const cardBgClass = theme === 'light'
    ? 'bg-white border-slate-200 shadow-sm'
    : theme === 'blackwell'
    ? 'bg-[#0a0805]/80 border-amber-900/40 text-amber-100'
    : 'bg-slate-900/40 border-slate-800 text-slate-200';

  const subBannerClass = theme === 'light'
    ? 'bg-blue-50 border-blue-200 text-slate-800'
    : theme === 'blackwell'
    ? 'bg-amber-950/40 border-amber-800/50 text-amber-200'
    : 'bg-slate-950/80 border-slate-800 text-slate-300';

  const primaryBadgeClass = theme === 'blackwell'
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    : theme === 'light'
    ? 'bg-blue-100 text-blue-800 border-blue-300'
    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

  const works = [
    {
      id: 'overview',
      title: 'AEL-QA88 Synapse AI v1.88.4',
      category: 'Core Neural Engine',
      icon: Cpu,
      badge: '100% Offline',
      description: 'On-device neural inference powered by Gemma 4 E4B, LiteRT.js, and WebGPU texture decoding with sub-ms response times.',
      metrics: '32K Context • 3.66GB Footprint • 1,590 t/s Prefill',
      actionText: 'Explore 3D Neural Spatial Model'
    },
    {
      id: 'obra',
      title: 'Obra Maestro Technology Suite',
      category: 'Flagship Framework v2.2.0',
      icon: Layers,
      badge: 'v2.2.0 Final',
      description: 'Zero-block UI decoupling architecture floating HTML DOM over 60fps WebGPU hardware canvas with Redstone 2.3 neural rendering.',
      metrics: 'Pure JS • 125 TFLOPS • ZeroLang Agentic Infra',
      actionText: 'Inspect Master Suite Architecture'
    },
    {
      id: 'edge_gallery',
      title: 'Edge AI Deployment Hub',
      category: 'Model Gallery & Deployer',
      icon: Globe,
      badge: 'Multi-Model',
      description: 'In-browser one-click deployment engine for edge models including Gemma 4, Phi-3, Llama 3, Mistral 7B, and Whisper.',
      metrics: 'Zero-Cloud • Direct Browser Deploy • WebGPU',
      actionText: 'Launch Edge Model Hub'
    },
    {
      id: 'vault',
      title: 'Air-Gapped WASM Security Vault',
      category: 'Cryptographic Sandbox',
      icon: ShieldCheck,
      badge: '2^128 Quantum Bound',
      description: 'Pure C/Rust WebAssembly 128-bit SIMD intrinsics AES-256 cryptography with zero cloud network dependencies.',
      metrics: 'AES-256 • SIMD Accelerated • Absolute Data Sovereignty',
      actionText: 'Analyze Quantum Bounds & Cryptography'
    },
    {
      id: 'inference',
      title: 'Local Gemma 4 AI Simulator',
      category: 'Interactive Sandbox',
      icon: Terminal,
      badge: 'Sub-ms Latency',
      description: 'Live interactive prompt completion environment testing prefill speeds, decode latency, and offline token generation.',
      metrics: '44 t/s Decode • Zero Cloud Roundtrips • Air-Gapped',
      actionText: 'Test Local AI Inference'
    },
    {
      id: 'shaders',
      title: 'Neural Shaders & Interface Optics',
      category: 'WebGPU Shader Pipeline',
      icon: Sparkles,
      badge: 'WebGPU Optics',
      description: 'Hardware-accelerated neural texture evaluator and spatial frustum renderer running in real-time WebGPU canvas.',
      metrics: '60 FPS Canvas • Microfacet Sampling • Sigmoid Decay',
      actionText: 'View Optics & Shaders'
    },
    {
      id: 'presentation',
      title: 'The AEL Authenticity Hologram Deck',
      category: '12-Slide Executive Brief',
      icon: FileText,
      badge: '12 Slides',
      description: 'Interactive slide presentation detailing Analytical Engine Labs\' zero-cloud vision, technical stack, and market strategy.',
      metrics: 'Executive Summary • Technical Roadmap • Market Fit',
      actionText: 'Launch Presentation Deck'
    },
    {
      id: 'licensing',
      title: 'Dual-Path Licensing & Compliance',
      category: 'Licensing Framework',
      icon: Scale,
      badge: 'GNU GPLv3 / Shield',
      description: 'Transparent compliance framework offering free GPLv3 open source rights or Tier II Commercial Hybrid Shield licensing.',
      metrics: 'GPLv3 Copyleft • Enterprise Hybrid Shield • Compliance Generator',
      actionText: 'View Licensing Specifications'
    }
  ];

  return (
    <div id="company-section-container" className="space-y-8 animate-fade-in">
      {/* Hero Header Banner */}
      <div className={`border rounded-xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden ${cardBgClass}`}>
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Building2 className="w-80 h-80 text-cyan-400" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border ${primaryBadgeClass}`}>
              Analytical Engine Labs (AEL)
            </span>
            <span className="text-xs font-mono text-slate-400">• Official Corporate & Research Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-sans text-white">
            Pioneering Air-Gapped Zero-Latency Edge AI & Cryptographic Computing
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            Analytical Engine Labs (AEL) is an independent AI research laboratory dedicated to building high-throughput on-device artificial intelligence and cryptographic software. We liberate AI compute from high-cost centralized cloud data centers, delivering air-gapped, zero-latency neural intelligence directly to client hardware.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className={`p-3 rounded-lg border ${subBannerClass}`}>
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">Latency Profile</span>
              <span className="text-base font-bold font-mono text-white">Sub-Millisecond</span>
              <span className="text-[10px] text-slate-400 block">On-device local execution</span>
            </div>
            <div className={`p-3 rounded-lg border ${subBannerClass}`}>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-bold">Data Privacy</span>
              <span className="text-base font-bold font-mono text-white">100% Air-Gapped</span>
              <span className="text-[10px] text-slate-400 block">Zero network roundtrips</span>
            </div>
            <div className={`p-3 rounded-lg border ${subBannerClass}`}>
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-bold">Server Cost</span>
              <span className="text-base font-bold font-mono text-white">$0.00 / Month</span>
              <span className="text-[10px] text-slate-400 block">Zero recurring API fees</span>
            </div>
            <div className={`p-3 rounded-lg border ${subBannerClass}`}>
              <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block font-bold">Licensing Model</span>
              <span className="text-base font-bold font-mono text-white">GPLv3 & Hybrid</span>
              <span className="text-[10px] text-slate-400 block">Open & Commercial options</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('overview')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 border border-blue-400/40"
            >
              <Cpu className="w-4 h-4" />
              <span>Explore AEL-QA88 Synapse 3D Model</span>
            </button>

            <button
              onClick={() => onNavigateTab('licensing')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center space-x-2 border border-slate-700"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Review Licensing & Compliance</span>
            </button>

            <button
              onClick={onOpenFiverrModal}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 border border-emerald-400/30"
            >
              <Award className="w-4 h-4" />
              <span>Book Enterprise Contract</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Portfolio of AEL Works Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4" />
              <span>Analytical Engine Labs Portfolio & Breakthroughs</span>
            </h2>
            <h3 className="text-xl font-black uppercase text-white tracking-tight font-sans mt-0.5">
              Complete Works & Technology Showcase
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Select any technology to launch interactive sandbox</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {works.map((work) => {
            const Icon = work.icon;
            return (
              <div
                key={work.id}
                className={`border rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all group ${cardBgClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                          {work.category}
                        </span>
                        <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                          {work.title}
                        </h4>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 uppercase">
                      {work.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {work.description}
                  </p>

                  <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded text-[11px] font-mono text-slate-300">
                    <span className="text-slate-500 mr-2 uppercase font-bold text-[9px]">Spec Highlights:</span>
                    <span>{work.metrics}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab(work.id)}
                  className="w-full py-2.5 px-3 bg-slate-950 hover:bg-blue-600 text-slate-300 hover:text-white font-mono text-xs font-bold rounded-lg border border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group-hover:shadow-md"
                >
                  <span>{work.actionText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Research & Technical Whitepaper Section */}
      <div className={`border rounded-xl p-6 space-y-4 ${cardBgClass}`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>Analytical Engine Labs Technical Whitepapers & Research</span>
          </div>

          <button
            onClick={onOpenRawJson}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Blueprint JSON</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-white font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Zero-Block UI Decoupling</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decoupling high-frequency HTML DOM styling from 60fps WebGPU hardware rendering to eliminate layout reflows during inference.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-white font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>2^128 Quantum Bound Analysis</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Air-gapped WASM AES-256 SIMD intrinsics backed by Landauer limit calculations requiring 9.70 × 10^17 Joules to decrypt.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-white font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>LiteRT.js & Gemma 4 E4B</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-browser local Gemma 4 model execution achieving 1,590 prefill t/s and 44 decode t/s on consumer GPUs with sub-4GB RAM footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
