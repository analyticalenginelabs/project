import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Play, Square, RefreshCw, Zap, Database, HardDrive, CheckCircle2, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';

export const InferenceSimulator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("Analyze the quantum bound metrics and generate an air-gapped AES-256 SIMD key expansion script.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>("");
  const [currentTokens, setCurrentTokens] = useState(0);
  const [prefillTimeMs, setPrefillTimeMs] = useState<number | null>(null);
  const [ttftMs, setTtftMs] = useState<number | null>(null);
  const [activeTokenRate, setActiveTokenRate] = useState<number>(0);
  const [simulatedContextUsed, setSimulatedContextUsed] = useState(1420);

  const samplePrompts = [
    "Analyze the quantum bound metrics and generate an air-gapped AES-256 SIMD key expansion script.",
    "Compute 180° VR Cubemap frustum matrix with camera focal length 85.0mm and horizontal FOV 23.91°.",
    "Draft a LiteRT-LM local execution pipeline with XNNPACK acceleration for Gemma 4 E4B.",
    "Simulate zero-block UI decoupling layer event routing between HTML DOM and WebGPU shader."
  ];

  const timerRef = useRef<any>(null);

  const simulatedResponses: Record<string, string> = {
    "Analyze the quantum bound metrics and generate an air-gapped AES-256 SIMD key expansion script.":
      `[AEL-QA88 Gemma 4 E4B Offline Inference Engine]\n` +
      `--------------------------------------------------\n` +
      `Executing air-gapped WASM security payload analysis...\n` +
      `Quantum Bound: 2^128 Grover Operations\n` +
      `Landauer Thermodynamic Limit: 9.70 × 10^17 Joules at 298 K\n\n` +
      `// Pure C/Rust 128-bit SIMD Key Expansion (Air-Gapped WASM)\n` +
      `#include <emscripten/wasm_simd128.h>\n\n` +
      `v128_t expand_aes_key_simd(v128_t key_state, v128_t rcon) {\n` +
      `    v128_t sub_words = wasm_i8x16_shuffle(key_state, 0x0E, 0x0D, 0x0C, 0x0F);\n` +
      `    v128_t xor_pass = wasm_v128_xor(key_state, sub_words);\n` +
      `    return wasm_v128_xor(xor_pass, rcon);\n` +
      `}\n\n` +
      `[Status]: Key expansion completed locally in 0.42ms. Zero network packets transmitted.`,

    "Compute 180° VR Cubemap frustum matrix with camera focal length 85.0mm and horizontal FOV 23.91°.":
      `[AEL-QA88 Interface Optics & VR Cubemap Processor]\n` +
      `--------------------------------------------------\n` +
      `Spatial Hash: e8f3b092a114c029\n` +
      `Focal Length: 85.0 mm | Horiz FOV: 23.91° | ControlNet Weight: 0.85\n\n` +
      `Frustum Plane Coordinates:\n` +
      `  - Near Plane: Z = -0.10m (fov_x = 23.91°, fov_y = 13.82°)\n` +
      `  - Far Plane: Z = -100.00m\n` +
      `  - Strength Decay W(t): Sigmoid (alpha = 10.0, t_0 = 0.50)\n\n` +
      `Raycasting mesh bound successfully. Locked 60 FPS frame sync initialized.`,

    "Draft a LiteRT-LM local execution pipeline with XNNPACK acceleration for Gemma 4 E4B.":
      `[AEL-QA88 LiteRT.js & XNNPACK Engine Initialization]\n` +
      `--------------------------------------------------\n` +
      `1. Model Binary: Gemma 4 E4B (2.24 GB Weights)\n` +
      `2. Memory Allocation: 0.67 GB Mapped Embeddings | 0.75 GB Working KV Cache\n` +
      `3. Prefill Speed: 1590 tok/sec | Decode Speed: 44 tok/sec\n\n` +
      `// TypeScript Drop-in Serving Example\n` +
      `import { LiteRTEngine } from '@ael/litert-lm';\n\n` +
      `const engine = await LiteRTEngine.load({\n` +
      `  modelPath: './models/gemma-4-e4b.bin',\n` +
      `  backend: 'webgpu',\n` +
      `  xnnpackAcceleration: true\n` +
      `});\n\n` +
      `const stream = await engine.generate({ prompt, maxTokens: 512 });`,

    "Simulate zero-block UI decoupling layer event routing between HTML DOM and WebGPU shader.":
      `[AEL-QA88 Zero-Block UI Decoupling Architecture Test]\n` +
      `--------------------------------------------------\n` +
      `Layer 1 (Top): HTML DOM Text Layer -> Handling typography without GPU repaint\n` +
      `Layer 2 (Middle): Raycast Mesh -> Capturing user mouse events\n` +
      `Layer 3 (Bottom): WebGPU Canvas -> Shader running at 60 FPS\n\n` +
      `Result: 0 millisecond main thread blocking under peak inference payload.`
  };

  const handleStartInference = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratedOutput("");
    setCurrentTokens(0);

    const promptLen = prompt.length;
    const estPrefillTokens = Math.max(12, Math.floor(promptLen / 4));
    const prefillDuration = Math.round((estPrefillTokens / 1590) * 1000) + 4;
    setPrefillTimeMs(prefillDuration);
    setTtftMs(prefillDuration + 2);

    const fullResponse = simulatedResponses[prompt] ||
      `[AEL-QA88 Local Inference Engine]\nOffline Gemma 4 E4B evaluation complete for prompt: "${prompt}".\nProcessing executed locally with zero cloud API latency.`;

    const tokens = fullResponse.split(" ");
    let index = 0;

    timerRef.current = setInterval(() => {
      if (index < tokens.length) {
        const nextChunk = tokens.slice(0, index + 1).join(" ");
        setGeneratedOutput(nextChunk);
        setCurrentTokens((prev) => prev + 1);
        setActiveTokenRate(44 + (Math.floor(Math.random() * 5) - 2));
        index++;
      } else {
        clearInterval(timerRef.current);
        setIsGenerating(false);
        setActiveTokenRate(0);
        setSimulatedContextUsed((prev) => Math.min(32768, prev + estPrefillTokens + tokens.length));
      }
    }, 22);
  };

  const handleStopInference = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGenerating(false);
    setActiveTokenRate(0);
  };

  return (
    <div id="inference-simulator-container" className="space-y-6">
      {/* Top Banner & Technical Specs */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Offline Local Inference Studio</span>
            </h2>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              Gemma 4 E4B Engine (LiteRT.js)
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              100% device-bound execution utilizing WebGPU & XNNPACK hardware acceleration. Zero cloud API calls, zero latency jitter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">Prefill Speed</span>
              <span className="text-base font-bold font-mono text-white">1,590 <span className="text-[9px] text-slate-500 font-sans">t/s</span></span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">Decode Speed</span>
              <span className="text-base font-bold font-mono text-blue-300">44 <span className="text-[9px] text-slate-500 font-sans">t/s</span></span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest block">RAM Footprint</span>
              <span className="text-base font-bold font-mono text-indigo-300">3.66 GB</span>
            </div>
          </div>
        </div>

        {/* RAM Footprint & Context Breakdown Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Memory Distribution */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
              <span className="flex items-center space-x-1.5">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                <span className="uppercase text-[10px] tracking-wider text-slate-400 font-sans">Device RAM Footprint Breakdown</span>
              </span>
              <span className="text-blue-300 font-bold text-xs">3.66 GB Total</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              <div className="bg-blue-500 h-full text-[9px] text-white font-bold flex items-center justify-center" style={{ width: '61%' }} title="Model Weights: 2.24 GB">
              </div>
              <div className="bg-indigo-500 h-full text-[9px] text-white font-bold flex items-center justify-center" style={{ width: '18%' }} title="Embeddings: 0.67 GB">
              </div>
              <div className="bg-cyan-500 h-full text-[9px] text-slate-950 font-bold flex items-center justify-center" style={{ width: '21%' }} title="Working KV Cache: ~0.75 GB">
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>Weights: 2.24 GB</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>Embeddings: 0.67 GB</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-500 mr-1"></span>Cache: 0.75 GB</span>
            </div>
          </div>

          {/* Context Window Usage */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span className="uppercase text-[10px] tracking-wider text-slate-400 font-sans">Context Window Token Meter</span>
              </span>
              <span className="text-indigo-300 font-bold text-xs">{simulatedContextUsed.toLocaleString()} / 32,768 Tokens</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(simulatedContextUsed / 32768) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
              <span>0 Tokens</span>
              <span>16,384 Tokens</span>
              <span>32,768 Tokens (Max)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Inference Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input & Preset Selection Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 mb-3">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Input Prompt & Inference Task</span>
            </h3>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono resize-none"
              placeholder="Enter local prompt..."
            />

            {/* Quick Presets */}
            <div className="mt-3">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-2">Sample Blueprint AI Tasks:</span>
              <div className="space-y-1.5">
                {samplePrompts.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(sp)}
                    className={`w-full text-left p-2 rounded text-[10px] font-mono transition-all border ${
                      prompt === sp
                        ? 'bg-blue-950/60 border-blue-500/60 text-blue-300'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {sp.length > 65 ? sp.substring(0, 65) + '...' : sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Execution Actions */}
            <div className="mt-5 flex items-center space-x-3">
              {!isGenerating ? (
                <button
                  onClick={handleStartInference}
                  className="w-full py-2.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-blue-500 transition-colors border border-blue-400/50 flex items-center justify-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Local Inference</span>
                </button>
              ) : (
                <button
                  onClick={handleStopInference}
                  className="w-full py-2.5 bg-red-900/40 text-red-200 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-red-900/60 transition-colors border border-red-700/50 flex items-center justify-center space-x-2"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Halt Local Execution</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Execution Monitor & Stream Output Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 backdrop-blur-md min-h-[420px] flex flex-col justify-between">
            <div>
              {/* Terminal Monitor Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider ml-1">Gemma 4 LiteRT Stream Monitor</span>
                </div>

                <div className="flex items-center space-x-3 text-[10px] font-mono">
                  {isGenerating ? (
                    <span className="flex items-center text-blue-400">
                      <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                      Decoding ({activeTokenRate} tok/s)
                    </span>
                  ) : (
                    <span className="text-blue-400 font-semibold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Ready
                    </span>
                  )}
                </div>
              </div>

              {/* Streaming Content Display */}
              <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-slate-200 min-h-[260px] max-h-[340px] overflow-y-auto leading-relaxed whitespace-pre-wrap selection:bg-blue-500 selection:text-white">
                {generatedOutput ? (
                  <div>
                    {generatedOutput}
                    {isGenerating && <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse align-middle"></span>}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 py-12">
                    <Cpu className="w-10 h-10 mb-2 opacity-30" />
                    <span>Click "Execute Local Inference" to evaluate prompt locally via Gemma 4 E4B.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Real-time Telemetry Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <div className="flex items-center space-x-4">
                <span>Tokens: <strong className="text-white">{currentTokens}</strong></span>
                <span>Prefill: <strong className="text-blue-300">{prefillTimeMs ? `${prefillTimeMs} ms` : '0 ms'}</strong></span>
                <span>TTFT: <strong className="text-indigo-300">{ttftMs ? `${ttftMs} ms` : '0 ms'}</strong></span>
              </div>
              <div className="text-[9px] text-blue-400 font-bold bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                100% AIR-GAPPED OFFLINE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
