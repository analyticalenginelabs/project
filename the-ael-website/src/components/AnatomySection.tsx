import React from 'react';
import { Cpu, Eye, ShieldCheck, Layers, Sparkles, CheckCircle2, ArrowRight, Lock, Zap, Box } from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';

interface AnatomySectionProps {
  selectedPillarKey: string | null;
  onSelectPillar: (key: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({
  selectedPillarKey,
  onSelectPillar,
  onNavigateToTab,
}) => {
  const pillars = [
    {
      key: 'the_brain',
      title: 'THE BRAIN',
      icon: Cpu,
      borderColor: 'border-blue-500/30',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      data: SYNAPSE_BLUEPRINT.anatomy.the_brain,
      tabLink: 'inference',
      highlights: ['Gemma 4 E4B Model', 'LiteRT.js Engine', 'Sub-millisecond Local', 'Zero Cloud']
    },
    {
      key: 'the_visuals',
      title: 'THE VISUALS',
      icon: Sparkles,
      borderColor: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      data: SYNAPSE_BLUEPRINT.anatomy.the_visuals,
      tabLink: 'shaders',
      highlights: ['WebGPU Architecture', 'Latent Texture Decoding', 'Neural Shader', 'Microfacet Sampling']
    },
    {
      key: 'the_interface',
      title: 'THE INTERFACE',
      icon: Eye,
      borderColor: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      data: SYNAPSE_BLUEPRINT.anatomy.the_interface,
      tabLink: 'shaders',
      highlights: ['180° VR Cubemap', 'Spatial Frustums', 'Node Lattice Mapping', '85.0mm Focal Optics']
    },
    {
      key: 'the_architecture',
      title: 'THE ARCHITECTURE',
      icon: Layers,
      borderColor: 'border-blue-500/30',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      data: SYNAPSE_BLUEPRINT.anatomy.the_architecture,
      tabLink: 'overview',
      highlights: ['Zero-Block Decoupling', 'HTML DOM Text Layer', 'Invisible Interaction Mesh', 'Locked 60fps WebGPU']
    },
    {
      key: 'the_vault',
      title: 'THE VAULT',
      icon: ShieldCheck,
      borderColor: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      data: SYNAPSE_BLUEPRINT.anatomy.the_vault,
      tabLink: 'vault',
      highlights: ['Air-Gapped WASM', 'C/Rust AES-256 Crypto', '128-bit SIMD Intrinsics', '2^128 Quantum Bound']
    }
  ];

  return (
    <div id="anatomy-section" className="space-y-8">
      {/* 5 Pillars Grid */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-400" />
              <span>Hardware Anatomy</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Select any pillar to inspect architectural specifications and 3D node focus.</p>
          </div>
          <span className="text-[10px] font-mono text-blue-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded">
            5 CORE PILLARS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPillarKey === item.key;
            return (
              <div
                key={item.key}
                id={`pillar-card-${item.key}`}
                onClick={() => onSelectPillar(item.key)}
                className={`p-4 rounded-lg border-l-2 ${item.borderColor} border-t border-r border-b transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900/90 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/40'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs tracking-wider uppercase group-hover:text-blue-300 transition-colors">{item.title}</h3>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold border ${item.badgeBg}`}>
                        {item.data.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.data.feature}</span>
                  </div>
                  {item.data.model && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      Model: <span className="text-blue-300 font-bold">{item.data.model}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {item.data.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <div className="flex flex-wrap gap-1">
                    {item.highlights.slice(0, 2).map((h, idx) => (
                      <span key={idx} className="bg-slate-950/80 text-slate-400 px-2 py-0.5 rounded text-[9px] font-mono border border-slate-800">
                        {h}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToTab(item.tabLink);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wider flex items-center space-x-1 ml-2 shrink-0 text-[10px]"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zero-Block UI Decoupling Technique Deep Dive */}
      <div id="decoupling-architecture-block" className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-1">
              Architectural Protocol
            </h2>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
              Zero-Block UI Decoupling Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Separates user text & styling repaints from the WebGPU 3D canvas thread to prevent frame drops during AI inference.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-blue-400 bg-slate-950 px-3 py-1.5 rounded border border-blue-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>GPU Main Thread Unblocked</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Layer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold rounded-bl border-b border-l border-blue-500/30 uppercase tracking-widest">
              LAYER 1 (TOP)
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.top_layer.name}</h4>
                <span className="text-[10px] text-blue-400 font-mono">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.top_layer.type}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.top_layer.description}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Status: <span className="text-blue-400 font-bold">0 GPU Repaints</span>
            </div>
          </div>

          {/* Middle Layer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-mono font-bold rounded-bl border-b border-l border-indigo-500/30 uppercase tracking-widest">
              LAYER 2 (MIDDLE)
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded bg-indigo-500/10 text-indigo-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.middle_layer.name}</h4>
                <span className="text-[10px] text-indigo-400 font-mono">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.middle_layer.type}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.middle_layer.description}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Status: <span className="text-indigo-400 font-bold">Spatial Raycast Mesh Active</span>
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold rounded-bl border-b border-l border-cyan-500/30 uppercase tracking-widest">
              LAYER 3 (BOTTOM)
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.bottom_layer.name}</h4>
                <span className="text-[10px] text-cyan-400 font-mono">{SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.bottom_layer.type}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SYNAPSE_BLUEPRINT.zero_block_ui_decoupling.bottom_layer.description}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Status: <span className="text-cyan-400 font-bold">Locked 60 FPS WebGPU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
