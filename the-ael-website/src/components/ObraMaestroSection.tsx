import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Server,
  Box,
  Terminal,
  CheckCircle2,
  Lock,
  Workflow,
  Radio,
  Sliders,
  Maximize2
} from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';

export const ObraMaestroSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'foundation' | 'intelligence' | 'agentic' | 'visuals' | 'security' | 'hardware'>('foundation');

  return (
    <div id="obra-maestro-container" className="space-y-6 animate-fade-in">
      {/* Obra Maestro Header Banner */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Layers className="w-64 h-64 text-blue-500" />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Master Architecture Report // v2.2.0 Final</span>
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-sans">
              Obra Maestro Technology Suite
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Pure JavaScript & WebGPU Pipeline, 100% Offline AI Execution, ZeroLang Durable Agentic Orchestration, Redstone 2.3 Neural Rendering, and Hardware Interoperability across Blackwell & RDNA™ 4.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">WebGPU Core</span>
              <span className="text-base font-bold font-mono text-white">Pure JS</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">Throughput</span>
              <span className="text-base font-bold font-mono text-blue-300">125 TFLOPS</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">CUDA Cores</span>
              <span className="text-base font-bold font-mono text-indigo-300">24,064</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar inside Obra Maestro */}
        <div className="flex overflow-x-auto gap-2 pt-6 border-t border-slate-800/80 mt-6 scrollbar-none">
          {[
            { id: 'foundation', label: '1. Pure JS & WebGPU Pipeline', icon: Layers },
            { id: 'intelligence', label: '2. 100% Offline AI Execution', icon: Cpu },
            { id: 'agentic', label: '3. ZeroLang Agentic Infra', icon: Workflow },
            { id: 'visuals', label: '4. Redstone & Neural Graphics', icon: Sparkles },
            { id: 'security', label: '5. Zero Trust & Security', icon: ShieldCheck },
            { id: 'hardware', label: '6. Blackwell & RDNA4 Interop', icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtab 1: Pure JavaScript & WebGPU Pipeline */}
      {activeSubTab === 'foundation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>System Foundation: C++ to Pure JavaScript Migration</span>
              </h3>
              <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 uppercase tracking-widest font-bold">
                WebGPU Explicit Standard
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The Obra Maestro Technology Suite completed its migration from C++ backend patterns (specifically the Cauldron Framework used in legacy FidelityFX implementations) to a high-performance, pure JavaScript pipeline. This architecture utilizes the WebGPU standard to provide explicit interfaces for resource barriers and transient memory management, mirroring Vulkan and DirectX 12 logic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
                <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Blackwell SM Throughput</span>
                </div>
                <div className="text-lg font-mono font-bold text-white">125 TFLOPS FP32</div>
                <p className="text-[11px] text-slate-400">Integration of next-generation CUDA cores delivering 1.4x higher FP32 throughput multiplier.</p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
                <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>24,064 CUDA Cores</span>
                </div>
                <div className="text-lg font-mono font-bold text-blue-300">SM 6.6+ Smart Shaders</div>
                <p className="text-[11px] text-slate-400">Dynamic code path selection based on hardware capabilities with explicit Render Pipeline Shaders (RPS).</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Strategic Architectural Constraints</span>
              </h3>
              <ul className="space-y-3 pt-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Exclusion of VR 180° Support:</strong> Optimized strictly for high-throughput 2D/3D viewport rendering.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Exclusion of 85.0mm / 23.91° Constraints:</strong> Dynamic horizontal and vertical FOVs with flexible focal lengths.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Exclusion of 2^128 Quantum Bounds:</strong> Streamlined security posture built around Zero Trust isolate sandboxes.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-slate-400">
              STATUS: Locked 60 FPS WebGPU Execution Buffer Active
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: 100% Offline AI Execution */}
      {activeSubTab === 'intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>Edge Intelligence: Neural Precision & Throughput Matrix</span>
              </h3>
              <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 uppercase tracking-widest font-bold">
                100% Offline Air-Gapped
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Obra Maestro implements zero-latency inference via Second-Gen FP8 Transformer Engine on Blackwell hardware and Arm dedicated neural accelerators (2026), embedding small neural networks directly into programmable shaders for advanced radiance caching and texture decoding.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <th className="p-2.5">Precision Format</th>
                    <th className="p-2.5">Role in Local Inference</th>
                    <th className="p-2.5">Hardware Support Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-blue-400">FP4</td>
                    <td className="p-2.5">Massive throughput for high-density neural networks</td>
                    <td className="p-2.5 text-slate-400">Fifth-Gen Tensor Cores</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-blue-400">FP8</td>
                    <td className="p-2.5">High-efficiency scaling via Transformer Engine</td>
                    <td className="p-2.5 text-slate-400">Second-Gen Transformer Engine</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-indigo-400">INT8 / FP8</td>
                    <td className="p-2.5">Optimized 128-bit loads for low-precision GEMM</td>
                    <td className="p-2.5 text-slate-400">RDNA™ 4 WMMA Layout</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-200">BF16 / TF32</td>
                    <td className="p-2.5">High-precision deep learning prototyping</td>
                    <td className="p-2.5 text-slate-400">Full Unified Support</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-200">FP64</td>
                    <td className="p-2.5">Industrial-grade precision for complex simulations</td>
                    <td className="p-2.5 text-slate-400">Blackwell SM Native</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>RTX Neural Shading Pipeline</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                By training game data and weights on RTX PRO workstations, the suite deploys weights at runtime to facilitate real-time neural texture compression, reducing asset generation overhead.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2 font-mono text-xs">
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Local Model Metrics</div>
              <div className="flex justify-between text-slate-300">
                <span>Model Architecture:</span>
                <span className="text-white font-bold">Gemma 4 E4B</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Prefill Speed:</span>
                <span className="text-blue-300 font-bold">1,590 t/s</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Decode Speed:</span>
                <span className="text-indigo-300 font-bold">44 t/s</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: ZeroLang Agentic Infrastructure */}
      {activeSubTab === 'agentic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Workflow className="w-4 h-4 text-blue-400" />
              <span>ZeroLang Agentic Framework & Durable Orchestration</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <span className="font-bold text-blue-400 font-mono text-[11px] block uppercase">Durable Orchestration (eve)</span>
                ZeroLang utilizes the eve framework to create persistent, stateful agents capable of long-running autonomous workflows.
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <span className="font-bold text-blue-400 font-mono text-[11px] block uppercase">Fluid Compute & Isolated Containers</span>
                Agents execute within Sandboxed VMs using Fluid Compute for strict tenant isolation across all production workloads.
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <span className="font-bold text-blue-400 font-mono text-[11px] block uppercase">Autonomous Investigation</span>
                Engineered to autonomously investigate system telemetry, formulate code fixes, and submit PRs via Vercel CLI & API integrations.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Server className="w-4 h-4 text-blue-400" />
              <span>The Agent Stack Identity & Gateway Layer</span>
            </h3>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded flex items-start space-x-3">
                <Terminal className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">AI SDK & Gateway</span>
                  <span className="text-[11px] text-slate-400">Centralized interface for model interaction, prompt routing, and agent tool calling.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded flex items-start space-x-3">
                <Box className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Sandbox VM Environment</span>
                  <span className="text-[11px] text-slate-400">Secure compute isolates for executing untrusted, agent-generated code without host corruption.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded flex items-start space-x-3">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Passport Zero Trust Layer</span>
                  <span className="text-[11px] text-slate-400">Secures internal agent communication and deployment endpoints against the central identity provider.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Redstone SDK 2.3 & Arm Neural Graphics */}
      {activeSubTab === 'visuals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Redstone SDK 2.3 & Arm Neural Graphics Subsystem</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
                <span className="text-[10px] text-blue-400 font-mono font-bold block uppercase">FSR Upscaling 4.1</span>
                <p className="text-[11px] text-slate-300">ML-driven frame reconstruction for mobile and handheld GPUs.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
                <span className="text-[10px] text-indigo-400 font-mono font-bold block uppercase">Ray Regeneration 1.1</span>
                <p className="text-[11px] text-slate-300">Inferential ML denoiser restoring full ray-traced detail in real-time.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
                <span className="text-[10px] text-blue-400 font-mono font-bold block uppercase">Brixelizer GI</span>
                <p className="text-[11px] text-slate-300">Sparse distance field diffuse and specular global illumination.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="text-[11px] font-mono font-bold text-white uppercase flex items-center justify-between">
                <span>Mega Geometry Handling (NVIDIA RTX Kit)</span>
                <span className="text-blue-400 text-[10px]">100x Ray-Traced Triangles</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Accelerates Bounding Volume Hierarchy (BVH) building for cluster-based geometry systems, enabling photorealistic scenes with billions of ray-traced triangles at high frame rates.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Microfacet Radiance Sampling</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                Evaluates complex BSDF layered material graphs up to 10x faster by substituting traditional heavy shader loops with compact 16-bit RGBA neural latent decoders.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Target Frame Rate</span>
              <span className="text-xl font-bold font-mono text-white">60 FPS (Locked)</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 5: Zero Trust Security & Obfuscation */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Pipeline Integrity & Obfuscation Layer</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <span className="font-bold text-blue-400 font-mono text-[11px] block uppercase">Shader Protection (PreEmptive JSDefender & DashO)</span>
                JavaScript rendering logic and embedded neural shader weights are obfuscated to protect intellectual property against reverse engineering.
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <span className="font-bold text-blue-400 font-mono text-[11px] block uppercase">Isolate Compute Containers</span>
                Production workloads run in isolated Vercel platform containers with custom SSL certificates to ensure strict multi-tenant privacy.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>AMD FidelityFX Breadcrumbs Diagnostic Library</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Integrates the marker-based Breadcrumbs library to track the GPU command stream in real time, allowing precise post-mortem debugging of hardware crashes and compute pipeline stalls.
            </p>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded font-mono text-[11px] text-blue-300 space-y-1">
              <div>[BREADCRUMB_MARKER_0x8F92] Command Queue: Dispatch Compute Shader</div>
              <div>[BREADCRUMB_MARKER_0x8F93] Pipeline Status: PASSED (0 Error Signals)</div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 6: Blackwell & RDNA 4 Interoperability */}
      {activeSubTab === 'hardware' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>NVIDIA Blackwell Hardware Optimizations</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Fifth-Gen Tensor Cores:</strong> 3X higher throughput for sparse neural networks using fine-grained scaling techniques.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>DLSS 4.0 AI Multi-Frame Generation:</strong> Boosts frame rates up to 2X while maintaining sub-millisecond system latency.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center space-x-2">
              <Radio className="w-4 h-4 text-indigo-400" />
              <span>AMD RDNA™ 4 & Cross-Platform Ray Tracing (HIP RT)</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>RDNA™ 4 WMMA Layout:</strong> 128-bit optimized loads for low-precision GEMM (FP8 / INT8) maximizing memory bandwidth.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>HIP RT Cross-Platform Ray Tracing:</strong> Hardware-accelerated ray traced shadows, reflections, and refractions portable across vendor architectures.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
