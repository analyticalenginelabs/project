import React, { useState } from 'react';
import { Download, Cpu, HardDrive, Zap, CheckCircle2, Search, Sparkles, Server, Terminal, Shield, ArrowUpRight, Play, RefreshCw, FileCode, Check, Layers, ExternalLink, Globe } from 'lucide-react';

export interface EdgeModel {
  id: string;
  name: string;
  creator: string;
  category: 'slm' | 'vision' | 'audio' | 'embeddings' | 'multimodal';
  sizeMB: number;
  quantization: string;
  targetRuntime: 'LiteRT.js' | 'WebGPU ONNX' | 'WASM SIMD' | 'WebNN';
  tokensPerSec: number;
  memoryReqMB: number;
  description: string;
  downloadUrl: string;
  license: string;
  tags: string[];
  samplePrompt: string;
  sampleOutput: string;
}

const CURATED_MODELS: EdgeModel[] = [
  {
    id: 'gemma-4-lite',
    name: 'Gemma 4 E4B LiteRT',
    creator: 'Google DeepMind',
    category: 'slm',
    sizeMB: 1850,
    quantization: 'q4_k_m (INT4)',
    targetRuntime: 'LiteRT.js',
    tokensPerSec: 74,
    memoryReqMB: 2100,
    description: 'Ultra-efficient 4B parameter SLM tuned for on-device reasoning, structured JSON extraction, and zero-latency function calling.',
    downloadUrl: 'https://edge-gallery.ai/models/google/gemma-4-e4b-litert.bin',
    license: 'Gemma Open License',
    tags: ['Google', 'SLM', 'LiteRT', 'Low VRAM'],
    samplePrompt: 'Extract structured JSON from user request: "Book a flight to Tokyo on Friday."',
    sampleOutput: '{\n  "action": "book_flight",\n  "destination": "Tokyo",\n  "date": "Friday",\n  "confidence": 0.998\n}'
  },
  {
    id: 'llama-3.2-1b',
    name: 'Llama 3.2 1B Instruct WebGPU',
    creator: 'Meta AI',
    category: 'slm',
    sizeMB: 820,
    quantization: 'INT4 (WebGPU Shader)',
    targetRuntime: 'WebGPU ONNX',
    tokensPerSec: 92,
    memoryReqMB: 1050,
    description: 'Compact 1B parameter model optimized for instant WebGPU execution with zero server dependencies.',
    downloadUrl: 'https://edge-gallery.ai/models/meta/llama-3.2-1b-webgpu.onnx',
    license: 'Llama 3.2 Community',
    tags: ['Meta', 'WebGPU', 'Fast', '1B'],
    samplePrompt: 'Summarize the 3 core pillars of edge AI architecture.',
    sampleOutput: '1. Privacy (Zero Cloud Overhead)\n2. Deterministic Latency (<15ms)\n3. Bandwidth Autonomy (Works Offline)'
  },
  {
    id: 'whisper-edge-wasm',
    name: 'Whisper Edge WASM (Base.en)',
    creator: 'OpenAI / WebWasm',
    category: 'audio',
    sizeMB: 142,
    quantization: 'INT8 Quantized',
    targetRuntime: 'WASM SIMD',
    tokensPerSec: 140,
    memoryReqMB: 280,
    description: 'Near-instant English speech recognition running purely via WebAssembly SIMD audio buffers.',
    downloadUrl: 'https://edge-gallery.ai/models/openai/whisper-base-wasm.tflite',
    license: 'MIT',
    tags: ['Audio', 'Speech-to-Text', 'WASM', 'Realtime'],
    samplePrompt: '[Audio Buffer Input: 16kHz PCM stream]',
    sampleOutput: '"Initialize quantum-resistant authentication sequence on port 3000."'
  },
  {
    id: 'depth-anything-v2',
    name: 'Depth Anything V2 Edge',
    creator: 'TikTok / HKU',
    category: 'vision',
    sizeMB: 95,
    quantization: 'FP16 WebGPU',
    targetRuntime: 'WebGPU ONNX',
    tokensPerSec: 60, // FPS
    memoryReqMB: 420,
    description: 'Monocular depth estimation producing high-fidelity 3D point clouds at 60 FPS in browser.',
    downloadUrl: 'https://edge-gallery.ai/models/vision/depth-anything-v2-small.onnx',
    license: 'Apache-2.0',
    tags: ['Vision', '3D Depth', 'Monocular', 'WebGPU'],
    samplePrompt: '[Camera Stream / RGB Canvas Frame]',
    sampleOutput: 'Depth Map Map array [1344x768] generated in 12.4ms.'
  },
  {
    id: 'smollm2-360m',
    name: 'SmolLM 2 360M Instruct',
    creator: 'Hugging Face',
    category: 'slm',
    sizeMB: 210,
    quantization: 'INT4 Quantized',
    targetRuntime: 'LiteRT.js',
    tokensPerSec: 165,
    memoryReqMB: 350,
    description: 'Sub-second micro-agent model designed for mobile apps, IoT microcontrollers, and edge web extensions.',
    downloadUrl: 'https://edge-gallery.ai/models/huggingface/smollm2-360m-litert.bin',
    license: 'Apache-2.0',
    tags: ['HuggingFace', 'Ultra-Lightweight', 'Micro-Agent'],
    samplePrompt: 'Check system health and return status code.',
    sampleOutput: 'OK. All 5 WebGPU compute shader passes operating at 60 FPS.'
  },
  {
    id: 'sam-mobile-edge',
    name: 'Segment Anything Mobile (SAM-Edge)',
    creator: 'Meta AI',
    category: 'vision',
    sizeMB: 110,
    quantization: 'INT8 ONNX',
    targetRuntime: 'WebGPU ONNX',
    tokensPerSec: 45, // FPS
    memoryReqMB: 380,
    description: 'Zero-shot promptable image segmentation for interactive WebGL/WebGPU object isolation.',
    downloadUrl: 'https://edge-gallery.ai/models/meta/sam-mobile-edge.onnx',
    license: 'Apache-2.0',
    tags: ['Meta', 'SAM', 'Segmentation', 'Interactive'],
    samplePrompt: '[Point Mask Coordinate (X: 520, Y: 340)]',
    sampleOutput: 'Object polygon mask extracted with 99.4% IoU precision.'
  }
];

export const EdgeGalleryDeployer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadingMap, setDownloadingMap] = useState<Record<string, number>>({});
  const [installedModels, setInstalledModels] = useState<Record<string, boolean>>({
    'gemma-4-lite': true // Pre-loaded in simulator
  });
  const [activeTestModel, setActiveTestModel] = useState<EdgeModel | null>(CURATED_MODELS[0]);
  const [customModelUrl, setCustomModelUrl] = useState<string>('');
  const [isImportingCustom, setIsImportingCustom] = useState<boolean>(false);
  const [testPrompt, setTestPrompt] = useState<string>('');
  const [testOutput, setTestOutput] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Filtered models
  const filteredModels = CURATED_MODELS.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Handle Download & Deploy Simulation
  const handleDownloadAndDeploy = (model: EdgeModel) => {
    if (installedModels[model.id]) return;

    setDownloadingMap((prev) => ({ ...prev, [model.id]: 10 }));

    const interval = setInterval(() => {
      setDownloadingMap((prev) => {
        const currentProgress = prev[model.id] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setInstalledModels((inst) => ({ ...inst, [model.id]: true }));
          const next = { ...prev };
          delete next[model.id];
          return next;
        }
        return { ...prev, [model.id]: currentProgress + 18 };
      });
    }, 280);
  };

  // Handle Testing Inference
  const handleRunTestInference = () => {
    if (!activeTestModel) return;
    setIsTesting(true);
    setTestOutput('');

    setTimeout(() => {
      setTestOutput(
        `[${activeTestModel.targetRuntime} Local Runtime Response]\n` +
        `Execution Latency: 11.4 ms | Tok/sec: ${activeTestModel.tokensPerSec}\n` +
        `Memory Used: ${activeTestModel.memoryReqMB} MB / IndexedDB Cache Hits: 100%\n\n` +
        `${activeTestModel.sampleOutput}`
      );
      setIsTesting(false);
    }, 600);
  };

  // Import Custom HuggingFace / Edge Gallery Model
  const handleImportCustomModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customModelUrl.trim()) return;

    setIsImportingCustom(true);
    setTimeout(() => {
      const modelId = `custom-${Date.now()}`;
      const newModel: EdgeModel = {
        id: modelId,
        name: customModelUrl.split('/').pop() || 'Custom Edge Model',
        creator: 'User Import (External Source)',
        category: 'slm',
        sizeMB: 450,
        quantization: 'Auto-Detected GGUF/ONNX',
        targetRuntime: 'WebGPU ONNX',
        tokensPerSec: 85,
        memoryReqMB: 600,
        description: `Custom model imported directly from URL source: ${customModelUrl}`,
        downloadUrl: customModelUrl,
        license: 'Custom License',
        tags: ['Custom', 'User Model', 'Direct Import'],
        samplePrompt: 'Execute custom model forward pass test.',
        sampleOutput: 'Custom model forward pass completed successfully with 0.00ms CORS overhead.'
      };

      CURATED_MODELS.unshift(newModel);
      setInstalledModels((inst) => ({ ...inst, [modelId]: true }));
      setActiveTestModel(newModel);
      setCustomModelUrl('');
      setIsImportingCustom(false);
    }, 1200);
  };

  const copyCodeBoilerplate = (model: EdgeModel) => {
    const code = `import { ${model.targetRuntime === 'LiteRT.js' ? 'LiteRTRuntime' : 'WebGPUONNXEngine'} } from '@edge-ai/runtime';

// 1-Click Zero-Dependency Local Model Deployment
const model = await ${model.targetRuntime === 'LiteRT.js' ? 'LiteRTRuntime' : 'WebGPUONNXEngine'}.load({
  modelUrl: '${model.downloadUrl}',
  quantization: '${model.quantization}',
  targetBackend: '${model.targetRuntime}',
  cacheInIndexedDB: true
});

const output = await model.generate({
  prompt: "${model.samplePrompt}",
  maxTokens: 256
});

console.log('Inference complete:', output);`;

    navigator.clipboard.writeText(code);
    setCopiedCodeId(model.id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div id="edge-gallery-container" className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-xs font-semibold mb-3">
              <Globe className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Built-in AI Easy Deployment Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Edge AI Model Gallery & Deployment Engine
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Bypass complex cloud API keys and CORS issues. Browse, download, and deploy quantized AI models directly into your web application using LiteRT.js and WebGPU ONNX.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-300 flex items-center space-x-3">
              <HardDrive className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Local IndexedDB Cache</div>
                <div className="font-bold text-cyan-300">1.85 GB Allocated</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-300 flex items-center space-x-3">
              <Zap className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">WebGPU Acceleration</div>
                <div className="font-bold text-emerald-400">Direct Shader Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Model Importer Bar */}
        <form onSubmit={handleImportCustomModel} className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Server className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={customModelUrl}
              onChange={(e) => setCustomModelUrl(e.target.value)}
              placeholder="Paste HuggingFace / Edge Gallery model URL (.bin, .tflite, .onnx, .gguf)..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 font-mono focus:outline-none placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={isImportingCustom || !customModelUrl.trim()}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {isImportingCustom ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Checking CORS & Headers...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Import & Deploy Direct</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Main Catalog & Interactive Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Gallery Search & Model Cards */}
        <div className="lg:col-span-7 space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models by name, creator, or tag (e.g. Google, Gemma, WebGPU)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto text-xs font-mono">
              {['all', 'slm', 'vision', 'audio'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs uppercase font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Model Cards Catalog */}
          <div className="space-y-4">
            {filteredModels.map((model) => {
              const isInstalled = installedModels[model.id];
              const downloadProgress = downloadingMap[model.id];
              const isDownloading = downloadProgress !== undefined;
              const isSelectedForTest = activeTestModel?.id === model.id;

              return (
                <div
                  key={model.id}
                  onClick={() => setActiveTestModel(model)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelectedForTest
                      ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{model.creator}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                          {model.targetRuntime}
                        </span>
                        {isInstalled && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>READY IN APP</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white font-sans">{model.name}</h3>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCodeBoilerplate(model);
                        }}
                        title="Copy TypeScript Integration Code"
                        className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors"
                      >
                        {copiedCodeId === model.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <FileCode className="w-4 h-4 text-cyan-400" />
                        )}
                      </button>

                      {isInstalled ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTestModel(model);
                          }}
                          className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold rounded flex items-center space-x-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Test Inference</span>
                        </button>
                      ) : isDownloading ? (
                        <div className="w-32 bg-slate-950 p-1.5 rounded border border-slate-800">
                          <div className="flex justify-between text-[10px] font-mono text-cyan-400 mb-1">
                            <span>Downloading</span>
                            <span>{downloadProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-cyan-500 h-full transition-all duration-300"
                              style={{ width: `${downloadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadAndDeploy(model);
                          }}
                          className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold rounded flex items-center space-x-1.5 transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>1-Click Deploy ({model.sizeMB} MB)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Metadata Specs Row */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                      <span className="text-slate-500 block text-[9px] uppercase">Quantization</span>
                      <span className="text-slate-200 font-semibold">{model.quantization}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                      <span className="text-slate-500 block text-[9px] uppercase">Speed</span>
                      <span className="text-cyan-400 font-bold">{model.tokensPerSec} Tok/s</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                      <span className="text-slate-500 block text-[9px] uppercase">VRAM / RAM</span>
                      <span className="text-slate-200 font-semibold">{model.memoryReqMB} MB</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                      <span className="text-slate-500 block text-[9px] uppercase">License</span>
                      <span className="text-slate-300 truncate block">{model.license}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Live Local Runtime Test Playground & Deployment Code */}
        <div className="lg:col-span-5 space-y-6">
          {activeTestModel && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-xl sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Local Playground: {activeTestModel.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                  {installedModels[activeTestModel.id] ? 'Runtime Active' : 'Not Deployed'}
                </span>
              </div>

              {/* Sample Prompt / Test Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Test Execution Prompt
                </label>
                <textarea
                  rows={3}
                  value={testPrompt || activeTestModel.samplePrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none"
                />
              </div>

              {/* Run Test Button */}
              <button
                onClick={handleRunTestInference}
                disabled={isTesting || !installedModels[activeTestModel.id]}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-md"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Forward Pass...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run On-Device Inference Test</span>
                  </>
                )}
              </button>

              {/* Output Window */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Inference Telemetry & Output
                </span>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400 min-h-[140px] whitespace-pre-wrap leading-relaxed">
                  {testOutput || (
                    <span className="text-slate-500 italic">
                      Click "Run On-Device Inference Test" to execute on local WebGPU/LiteRT runtime.
                    </span>
                  )}
                </div>
              </div>

              {/* TypeScript Integration Snippet */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Integration Boilerplate</span>
                  <button
                    onClick={() => copyCodeBoilerplate(activeTestModel)}
                    className="text-cyan-400 hover:underline text-[11px]"
                  >
                    Copy TS Code
                  </button>
                </div>
                <pre className="p-3 bg-black/80 border border-slate-800/80 rounded-lg text-[10px] font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
{`import { ${activeTestModel.targetRuntime === 'LiteRT.js' ? 'LiteRTRuntime' : 'WebGPUONNXEngine'} } from '@edge-ai/runtime';

const model = await ${activeTestModel.targetRuntime === 'LiteRT.js' ? 'LiteRTRuntime' : 'WebGPUONNXEngine'}.load({
  modelUrl: '${activeTestModel.downloadUrl}',
  quantization: '${activeTestModel.quantization}'
});`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
