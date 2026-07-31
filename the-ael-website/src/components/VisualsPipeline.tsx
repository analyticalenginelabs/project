import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Sliders, Eye, RefreshCw, Layers, CheckCircle2, Zap, Camera, Shield, Wand2, Loader2, Play } from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';
import { NeuralHallucinationShader } from './NeuralHallucinationShader';

interface VisualsPipelineProps {
  theme?: 'cyber' | 'blackwell' | 'light';
}

export const VisualsPipeline: React.FC<VisualsPipelineProps> = ({ theme = 'cyber' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interface Optics State
  const [focalLength, setFocalLength] = useState<number>(85.0);
  const [controlNetWeight, setControlNetWeight] = useState<number>(0.85);
  const [horizontalFov, setHorizontalFov] = useState<number>(23.91);
  const [sigmoidAlpha, setSigmoidAlpha] = useState<number>(10.0);
  const [sigmoidT0, setSigmoidT0] = useState<number>(0.5);
  const [activeStage, setActiveStage] = useState<number>(3);
  const [shaderFrequency, setShaderFrequency] = useState<number>(2.5);

  // Real Gemini AI Hallucination State
  const [aiPrompt, setAiPrompt] = useState<string>('Biomimetic Neural Cyber-Cortex with Quantum Flux Pulse');
  const [aiStyle, setAiStyle] = useState<string>('cyberpunk');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{
    name: string;
    aiDescription: string;
    colorPalette: string[];
    particleBehavior: { speed: number; waveFrequency: number; glowIntensity: number; morphSpeed: number };
    source: string;
  } | null>(null);

  // Function to call Gemini AI Hallucination Server
  const handleGenerateAiHallucination = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/hallucinate-shader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, style: aiStyle })
      });
      const data = await res.json();
      if (data.success) {
        setAiResult({
          name: data.name,
          aiDescription: data.aiDescription,
          colorPalette: data.colorPalette || ['#06b6d4', '#6366f1', '#ec4899', '#3b82f6'],
          particleBehavior: data.particleBehavior || { speed: 2.0, waveFrequency: 4.0, glowIntensity: 2.0, morphSpeed: 1.0 },
          source: data.source
        });
        if (data.particleBehavior?.waveFrequency) {
          setShaderFrequency(data.particleBehavior.waveFrequency * 0.8);
        }
      }
    } catch (err) {
      console.error("AI Hallucination fetch error:", err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Microfacet WebGPU Canvas Shader Simulation with AI Reactive Palette
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const renderShader = () => {
      const speed = aiResult?.particleBehavior?.speed || 1.0;
      time += 0.02 * speed;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      // Render Latent Texture Grid
      const cols = 24;
      const rows = 14;
      const cellW = width / cols;
      const cellH = height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;

          // Compute Sigmoid decay weight W(t)
          const distFromCenter = Math.sqrt(Math.pow(i - cols / 2, 2) + Math.pow(j - rows / 2, 2)) / (cols / 2);
          const sigmoidW = 1 / (1 + Math.exp(-sigmoidAlpha * (distFromCenter - sigmoidT0)));

          // Wave equation
          const val = Math.sin(i * 0.4 * shaderFrequency + time) * Math.cos(j * 0.4 * shaderFrequency + time);
          const intensity = Math.floor((val + 1) * 127 * controlNetWeight);

          // AI Hallucinated dynamic color mixing
          let colorStyle = `hsla(190, 85%, ${20 + intensity * 0.3}%, ${0.8 - sigmoidW * 0.5})`;
          if (aiResult?.colorPalette && aiResult.colorPalette.length > 0) {
            const paletteIdx = (i + j + Math.floor(time * 2)) % aiResult.colorPalette.length;
            const hexColor = aiResult.colorPalette[paletteIdx];
            colorStyle = hexColor;
          }

          ctx.fillStyle = colorStyle;
          ctx.globalAlpha = Math.max(0.2, 0.85 - sigmoidW * 0.4);
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
          ctx.globalAlpha = 1.0;

          // Microfacet specular highlights
          if (activeStage >= 3 && (i + j + Math.floor(time * 5)) % 7 === 0) {
            const glow = aiResult?.particleBehavior?.glowIntensity || 1.0;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, 0.6 * glow)})`;
            ctx.beginPath();
            ctx.arc(x + cellW / 2, y + cellH / 2, 2.5 * Math.min(glow, 2.0), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw optics FOV grid lines
      ctx.strokeStyle = aiResult ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.4 * (focalLength / 85.0);

      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshair
      ctx.strokeStyle = aiResult ? 'rgba(245, 158, 11, 0.6)' : 'rgba(6, 182, 212, 0.5)';
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy);
      ctx.lineTo(cx + 15, cy);
      ctx.moveTo(cx, cy - 15);
      ctx.lineTo(cx, cy + 15);
      ctx.stroke();

      animId = requestAnimationFrame(renderShader);
    };

    renderShader();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [focalLength, controlNetWeight, horizontalFov, sigmoidAlpha, sigmoidT0, activeStage, shaderFrequency, aiResult]);

  return (
    <div id="visuals-pipeline-container" className="space-y-6">
      {/* Dedicated Interactive Neural Hallucination GLSL Shader Component */}
      <NeuralHallucinationShader theme={theme} />

      {/* Visuals Pipeline Header */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-1 flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>WebGPU Hardware + Gemini AI Real-Time Visual Synthesis</span>
            </h2>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">
              Neural Shader & Optics Pipeline
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              In-browser latent texture decoding combined with server-side Gemini AI graphics hallucination engine.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">Spatial Hash:</span>
            <span className="text-cyan-400 font-bold">{SYNAPSE_BLUEPRINT.interface_optics.spatial_hash}</span>
          </div>
        </div>

        {/* Real Gemini AI Hallucinator Prompt Bar */}
        <div className="mt-6 p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              <Wand2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Gemini 2.5 AI Shader & Graphics Hallucinator</span>
            </div>
            {aiResult && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                Active Source: {aiResult.source}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe desired 3D visual hallucination (e.g. Hyperdimensional Quantum Vortex)..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none font-mono"
            />
            <select
              value={aiStyle}
              onChange={(e) => setAiStyle(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
            >
              <option value="cyberpunk">Cyberpunk Neon</option>
              <option value="bioluminescent">Bioluminescent Synapse</option>
              <option value="blackwell_tensor">Blackwell Tensor Flux</option>
              <option value="quantum_singularity">Quantum Singularity</option>
            </select>
            <button
              onClick={handleGenerateAiHallucination}
              disabled={isLoadingAi}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold rounded flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isLoadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Hallucinating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Synthesize AI Graphics</span>
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          {aiResult && (
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 font-mono">{aiResult.name}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-slate-400 font-mono mr-1">Palette:</span>
                  {aiResult.colorPalette.map((hex, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full inline-block border border-slate-700"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    ></span>
                  ))}
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed italic text-[11px] font-mono">
                "{aiResult.aiDescription}"
              </p>
            </div>
          )}
        </div>

        {/* 3 Pipeline Stages */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {SYNAPSE_BLUEPRINT.visuals_pipeline.map((stage) => {
            const isActive = activeStage >= stage.stage;
            const isCurrent = activeStage === stage.stage;
            return (
              <div
                key={stage.stage}
                onClick={() => setActiveStage(stage.stage)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : isActive
                    ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 uppercase tracking-widest">
                    STAGE {stage.stage}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{stage.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Neural Shader & Optics Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Optics Parameters Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-5 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Interface Optics Parameters</span>
            </h3>
            <span className="text-[9px] font-mono bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">
              1344 x 768 PX
            </span>
          </div>

          {/* Focal Length Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center space-x-1.5">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Camera Focal Length</span>
              </span>
              <span className="text-cyan-300 font-bold">{focalLength.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="35"
              max="150"
              step="1"
              value={focalLength}
              onChange={(e) => setFocalLength(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>35mm (Wide)</span>
              <span>85mm (Blueprint Spec)</span>
              <span>150mm (Tele)</span>
            </div>
          </div>

          {/* ControlNet Conditioning Weight Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>ControlNet Weight</span>
              </span>
              <span className="text-indigo-300 font-bold">{controlNetWeight.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={controlNetWeight}
              onChange={(e) => setControlNetWeight(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.10</span>
              <span>0.85 (Blueprint Spec)</span>
              <span>1.00</span>
            </div>
          </div>

          {/* Horizontal FOV Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Horizontal FOV</span>
              </span>
              <span className="text-cyan-300 font-bold">{horizontalFov.toFixed(2)}°</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="0.5"
              value={horizontalFov}
              onChange={(e) => setHorizontalFov(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10.0°</span>
              <span>23.91° (Blueprint Spec)</span>
              <span>60.0°</span>
            </div>
          </div>

          {/* Sigmoid Decay Parameters W(t) */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-3">
            <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase tracking-wider">
              Strength Decay W(t) = 1 / (1 + e^(-α(t - t_0)))
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">Alpha (α = {sigmoidAlpha.toFixed(1)})</label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={sigmoidAlpha}
                  onChange={(e) => setSigmoidAlpha(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">Center t_0 ({sigmoidT0.toFixed(2)})</label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={sigmoidT0}
                  onChange={(e) => setSigmoidT0(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reset Specs Button */}
          <button
            onClick={() => {
              setFocalLength(85.0);
              setControlNetWeight(0.85);
              setHorizontalFov(23.91);
              setSigmoidAlpha(10.0);
              setSigmoidT0(0.5);
              setAiResult(null);
            }}
            className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-slate-800 transition-colors flex items-center justify-center space-x-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Blueprint Spec Values</span>
          </button>
        </div>

        {/* Right Shader Canvas Visualizer (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-4 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">WebGPU + AI Reactive Canvas</span>
              </div>

              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                60 FPS AI Reactive Sampling
              </span>
            </div>

            {/* Neural Shader Canvas */}
            <div className="relative w-full rounded overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={640}
                height={360}
                className="w-full h-[320px] object-cover"
              />

              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-[10px] font-mono text-cyan-300">
                Index Key: {aiResult ? `ai:hallucinated:${aiResult.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : 'ael:img:flux1:depth:e8f3b092a114c029'}
              </div>
            </div>
          </div>

          {/* Stage Control Bar */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Current Stage:</span>
              <span className="text-cyan-400 font-bold uppercase">Stage {activeStage} of 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Resolution:</span>
              <span className="text-slate-200">{SYNAPSE_BLUEPRINT.interface_optics.pixel_resolution}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

