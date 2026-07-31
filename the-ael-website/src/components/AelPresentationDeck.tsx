import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Globe,
  Terminal,
  Server,
  Activity,
  Workflow,
  Laptop,
  Image,
  MessageSquare,
  ArrowRight,
  Database,
  Lock,
  Box
} from 'lucide-react';

export const UNIFIED_EDGE_SLIDES = [
  {
    slide_number: 1,
    title: "The Unified Edge: Engineering a Dual-Application AI Architecture",
    subtitle: "Concurrent LLM and Diffusion workloads natively executed via WebGPU without proprietary hardware lock-in."
  },
  {
    slide_number: 2,
    title: "The Edge AI Imperative",
    sections: {
      the_cloud_bottleneck: [
        "Data transmission creates hard latency floors.",
        "Continuous inference generates unsustainable cost per token.",
        "Data privacy is compromised by off-device processing."
      ],
      the_edge_ai_imperative: [
        "Direct-to-laptop execution unlocks local, agentic workflows.",
        "Zero-cost ongoing inference.",
        "Data remains strictly on-device, preserving total privacy."
      ]
    },
    applications: {
      application_1: "Conversational / Gemma",
      application_2: "Visual / Stable Diffusion"
    },
    engineering_challenge: "Running generative text and visual synthesis concurrently on everyday laptops."
  },
  {
    slide_number: 3,
    title: "Three Layers of Abstraction",
    subtitle: "Decoupling the model, the framework, and the silicon to guarantee universal deployment.",
    layers: [
      {
        layer: "Application Interface",
        role: "User UI / UX layer"
      },
      {
        layer: "Framework Layer",
        components: {
          conversational: "LiteRT.js",
          visual_creation: "TensorFlow.js"
        }
      },
      {
        layer: "Agnostic Compute",
        components: [
          "WebGPU",
          "WebAssembly"
        ]
      }
    ]
  },
  {
    slide_number: 4,
    title: "Distinct Models, Frameworks, and Profiles",
    summary: "Distinct models. Distinct frameworks. One unified edge environment.",
    comparison: [
      {
        application: "App 1: Conversational AI",
        model_selection: "Gemma 3 (1B-it)",
        inference_framework: "LiteRT.js",
        bottleneck_profile: "Memory Bandwidth (Sequential Generation)",
        native_acceleration: "XNNPack / WebGPU"
      },
      {
        application: "App 2: Visual Creation",
        model_selection: "Stable Diffusion (v1-5)",
        inference_framework: "TensorFlow.js",
        bottleneck_profile: "Compute-Heavy (Parallel Execution)",
        native_acceleration: "WebGL / WebGPU"
      }
    ]
  },
  {
    slide_number: 5,
    title: "App 1: Gemma 3 1B-it",
    specifications: {
      architecture: "Lightweight, open-weights multimodal model.",
      context_window: "32K input tokens, 8192 output tokens.",
      capabilities: "Advanced text generation, code execution, and reasoning."
    },
    edge_advantage: "Built from Gemini technology, Gemma 3 provides state-of-the-art intelligence in a footprint small enough for environments with highly restricted memory, making it the ideal conversational anchor for local execution."
  },
  {
    slide_number: 6,
    title: "The Conversational Engine: LiteRT.js",
    steps: [
      {
        step: "Step 1: Multi-Framework Compilation",
        description: "Native model conversion to the highly optimized .litertim format."
      },
      {
        step: "Step 2: LiteRT.js Orchestration",
        description: "Handling KV-cache management, prompt templating, and memory-mapped embedding parameters to save working memory."
      },
      {
        step: "Step 3: Hardware Acceleration",
        paths: {
          path_a_cpu: "XNNPack mapped to lightweight WebAssembly (Wasm).",
          path_b_gpu: "Native scaling via the WebGPU API."
        }
      }
    ]
  },
  {
    slide_number: 7,
    title: "App 2: Stable Diffusion v1-5",
    specifications: {
      architecture: "Latent text-to-image diffusion model via UNet backbone.",
      encoder: "Fixed, pretrained CLIP ViT-L/14 text encoder.",
      output: "512 x 512 photo-realistic visual generation."
    },
    edge_advantage: "By utilizing a relative downsampling factor of 8 (mapping images of shape H x W x 3 to latents of shape H/f x W/f x 4), the model dramatically reduces spatial dimensionality, making localized rendering mathematically viable on everyday hardware."
  },
  {
    slide_number: 8,
    title: "The Visual Engine: TensorFlow.js",
    steps: [
      {
        step: "Step 1: Model Integration",
        description: "Direct parsing of supported TensorFlow.js Tensors as boundary inputs and outputs."
      },
      {
        step: "Step 2: TensorFlow.js Pipeline",
        description: "Managing the iterative denoising loop and cross-attention mechanisms natively within the JavaScript runtime."
      },
      {
        step: "Step 3: Hardware Acceleration",
        description: "Offloading massive parallel matrix computations directly to local hardware through the WebGPU and WebGL backend, bypassing traditional local servers."
      }
    ]
  },
  {
    slide_number: 9,
    title: "Workload Isolation Matrix",
    engines: [
      {
        name: "The Token Engine",
        type: "Sequential Generation",
        constraint: "Memory Bandwidth Constrained"
      },
      {
        name: "The Latent Engine",
        type: "Iterative Crucible",
        constraint: "Compute Constrained"
      }
    ],
    takeaway: "Two violently different computational profiles. To prevent UI freezing, their execution must be completely isolated."
  },
  {
    slide_number: 10,
    title: "Framework Convergence Layer",
    architecture_flow: {
      text_prompt: "Routes to LiteRT.js Worker",
      visual_prompt: "Routes to TensorFlow.js Worker",
      convergence_point: "Universal Hardware API (WebGPU / WebAssembly)",
      description: "Disparate frameworks converging at the standard browser API layer."
    }
  },
  {
    slide_number: 11,
    title: "WebWorker Execution Threading",
    threads: [
      {
        thread: "Main UI Thread",
        performance: "60fps Responsive Performance (Unblocked UI)"
      },
      {
        thread: "WebWorker A",
        framework: "LiteRT.js / Gemma",
        task: "Token Generation"
      },
      {
        thread: "WebWorker B",
        framework: "TF.js / Stable Diffusion",
        task: "50-step Denoising Loop"
      }
    ],
    takeaway: "By offloading inference entirely to isolated WebWorkers, the Main Thread remains unblocked. The UI never freezes, even under maximum load."
  },
  {
    slide_number: 12,
    title: "The Universal Translation Layer (WebGPU & WebAssembly)",
    funnel_concept: "The Hardware Agnosticism Funnel",
    features: [
      "By targeting web standard APIs, this architecture runs anywhere.",
      "No proprietary silicon dependencies.",
      "No specific vendor lock-in.",
      "True write-once, run-anywhere AI inference."
    ],
    status: "Standardized Execution"
  },
  {
    slide_number: 13,
    title: "The Blueprint Realized",
    key_highlights: [
      {
        feature: "Dual Concurrency",
        description: "Gemma 3 and Stable Diffusion executing simultaneously."
      },
      {
        feature: "Zero-Cloud Reliance",
        description: "100% on-device execution for privacy and zero latency."
      },
      {
        feature: "Universal Scalability",
        description: "Hardware agnostic deployment via WebGPU."
      }
    ],
    conclusion: "Production-ready, native edge AI—engineered for immediate deployment."
  }
];

export const AEL_SLIDES = [
  {
    slide_number: 1,
    title: "A First-Time Execution: The AEL Authenticity Hologram",
    subtitle: "Architectural Deep-Dive: Merging Quantum-Resistant Cryptography, Neural Rendering, and Spatial Audio.",
    spatial_hash: "e8f3b092a114c029"
  },
  {
    slide_number: 2,
    title: "The AEL Architecture Stack",
    subtitle: "Building absolute certainty, layer by layer.",
    stack_layers: [
      { layer: "Edge Deployment", details: "60Hz Elastic Mobile Scaling" },
      { layer: "Audio Anchoring", details: "Dolby Atmos Spatial Audio" },
      { layer: "Visual Manifestation", details: "RTX Neural Appearance Models & WebGPU" },
      { layer: "Cryptographic Foundation", details: "AEL-QA88 & Charles Babbage 1838 Layout" }
    ]
  },
  {
    slide_number: 3,
    title: "Layer I: The Cryptographic Anchor",
    protocol: "AEL-QA88 v1.88.4",
    quantum_bound: "2^128 operations (Grover oracle iterations)",
    spatial_hash: "e8f3b092a114c029",
    description: "The system architecture relies on a foundational computational logic framework to structure the AEL index keys (ael:img). This guarantees that the root generation coordinates for the hologram are mathematically immutable before any rendering begins."
  },
  {
    slide_number: 4,
    title: "The Physical Weight of AEL-QA88",
    description: "The hash is not just computationally secure; it is bound by the thermodynamic limits of the physical universe.",
    metrics: {
      time_to_crack: "1.07 x 10^19 Years (> 780 Million Universe Ages)",
      landauer_energy_limit: "9.70 x 10^17 Joules (Minimum physical thermodynamic work required at room temperature - 298 K)",
      energy_equivalence: "15,396 Bombs (Hiroshima Atomic Bomb yields to overcome this single cryptographic layer)"
    }
  },
  {
    slide_number: 5,
    title: "Layer II: RTX Neural Appearance Models",
    comparison: [
      {
        dimension: "Architecture",
        traditional_procedural: "Deeply layered material shading graphs",
        rtx_neural: "Learned hierarchical textures via neural decoders"
      },
      {
        dimension: "Execution Location",
        traditional_procedural: "External compute/high overhead",
        rtx_neural: "Inlined directly inside real-time path tracer"
      },
      {
        dimension: "Fidelity Ceiling",
        traditional_procedural: "Approximated analytical models",
        rtx_neural: "Microfacet resolution: dust, smudges, ceramic fingerprints"
      },
      {
        dimension: "Performance",
        traditional_procedural: "Variable frame drops",
        rtx_neural: "Fixed evaluation cost, up to 10x faster rendering speed"
      }
    ],
    visual_proof: "RTX Neural BRDF Fidelity"
  },
  {
    slide_number: 6,
    title: "Defining the Optical Frustum",
    camera_parameters: {
      camera_focal_length_f: "85.0 mm",
      horizontal_fov: "23.91°",
      pixel_resolution: "1344 x 768",
      controlnet_conditioning_weight_w0: 0.85
    },
    insight: "The Neural BRDF model transforms directions into learned shading frames, performing anisotropic importance sampling to guarantee zero aliasing at any viewing distance."
  },
  {
    slide_number: 7,
    title: "The WebGPU Parallax Illusion",
    mechanism: "Using the W3C standard WebGPU API, the system bypasses heavy frameworks and interfaces directly with the native Android Sensor framework.",
    data_mapping: "The standard 3-axis coordinate system continuously feeds raw rotation data into the 85mm camera frustum.",
    result: "As the user tilts the device, the neural-rendered object dynamically adjusts to the remapped coordinate system in real-time, creating a flawless illusion of physical depth behind the glass."
  },
  {
    slide_number: 8,
    title: "Layer III: Dolby Atmos Sensory Sync",
    audio_specifications: "24-bit, 48kHz, SNR 129dB via aptX HD",
    description: "Unchained from traditional channel constraints, discrete audio objects maintain their absolute 3D position in space regardless of screen rotation. If the user turns the screen away, the audio remains physically anchored to the origin point."
  },
  {
    slide_number: 9,
    title: "Layer IV: Edge Optimization & Power Orchestration",
    constraint: "Running RTX neural decoders, WebGPU geometry, and spatial audio simultaneously is thermodynamically hostile to mobile batteries.",
    power_orchestration_strategy: [
      "Main high-frequency CPU voltage is entirely bypassed, preventing thermal throttling.",
      "Background orchestration and sensor polling are routed exclusively to low-leakage, low-power cores.",
      "Main High-Performance Cores remain inactive while the GPU independently handles the neural inline execution."
    ]
  },
  {
    slide_number: 10,
    title: "Native 60Hz Elastic Scaling",
    key_highlights: [
      "The AEL Hologram natively and elastically scales down to a strict 60Hz threshold.",
      "By utilizing micro-tile inferencing and limiting the framerate to the standard mobile display baseline, the system interfaces seamlessly with standard sensors without draining the battery.",
      "Delivers a perfect illusion at 60Hz."
    ]
  },
  {
    slide_number: 11,
    title: "Synthesizing the AEL Hologram",
    synthesis_points: [
      "The Charles Babbage layout provides the mathematically immutable anchor.",
      "RTX Neural Models and WebGPU translate that anchor into physical 3D space.",
      "Dolby Atmos binds the object to reality via spatial sound.",
      "60Hz Elastic Scaling ensures the illusion survives on everyday edge devices."
    ],
    quote: "The hologram is not a single technology; it is the perfectly timed collision of cryptography, optics, acoustics, and edge elasticity."
  },
  {
    slide_number: 12,
    title: "Experiencing Certainty",
    description: "We have moved beyond requiring users to trust an interface. With the AEL Authenticity Hologram, security is no longer an invisible mathematical abstraction. It is a physical object you can see, hear, and interact with in real-time.",
    spatial_hash: "e8f3b092a114c029"
  }
];

export const TACTILE_SLIDES = [
  {
    slide_number: 1,
    title: "Engineering the Tactile User Interface",
    subtitle: "A blueprint for Vivid-Matte OSD using Real-Time Neural Appearance Models and decoupled typography"
  },
  {
    slide_number: 2,
    title: "Digital Glare and the Limits of Traditional Shaders",
    the_problem: "Traditional 3D interfaces rely on rigid ubershaders and concentrated light bounces. This creates artificial specular highlights (digital glare), aliases typography, and introduces heavy shader graphs that kill real-time performance.",
    the_objective: "We must engineer a zero-reflectivity aesthetic where light diffuses softly across the data plane."
  },
  {
    slide_number: 3,
    title: "The Vivid-Matte Architecture",
    description: "By deconstructing the UI along the Z-axis, we leverage Tensor-accelerated neural materials for the background while guaranteeing infinite resolution for foreground data.",
    layers: {
      foreground: "Decoupled 2D HTML/CSS Typography (LIVE DATA STREAM)",
      surface: "Neural Appearance Shader (Oren-Nayar microfacet distribution)",
      base_layer: "WebGPU 3D Data Plane"
    }
  },
  {
    slide_number: 4,
    title: "Migrating to the Latent Texture Pyramid",
    problem_statement: "Traditional multi-layer materials require massive gigatexel texture memory. We bypass this by encoding parameters into an 8-dimensional latent texture.",
    traditional_input_channels: [
      "Albedo",
      "Normal",
      "Tangent",
      "Roughness"
    ],
    latent_texture_pyramid_hierarchy: [
      "High-Frequency Latent Detail",
      "Mid-Level Latent Data",
      "Base Latent Code"
    ],
    key_features: [
      "UV-parametrization preserves original texel density.",
      "Latent codes characterize the material filtered with specific radii.",
      "Native support for geometric level-of-detail and anisotropic sampling."
    ]
  },
  {
    slide_number: 5,
    title: "Decoding the Surface with Inlined MLPs",
    description: "The latent code is fed into a neural decoder equipped with graphics priors. This MLP infers the BRDF (Bidirectional Reflectance Distribution Function) value for a given pair of directions, replacing complex layered shading graphs with a single, highly optimized neural pass.",
    pipeline_flow: [
      "WebGPU UI Data (Latent Code)",
      "Shading Frame Extraction",
      "Decoding MLP (64 -> 64 -> 64)",
      "Vivid-Matte OSD Pixel"
    ]
  },
  {
    slide_number: 6,
    title: "Tensor-Accelerated Execution via Slang",
    components: [
      {
        type: "Hardware Acceleration",
        technology: "NVIDIA Tensor Cores",
        details: "Utilizes dedicated hardware units for general matrix multiplication. Tensor Cores execute fine-grained neural networks at every hit point in the ray-tracing shader program, bypassing traditional compute bottlenecks."
      },
      {
        type: "Software Compilation",
        technology: "NVIDIA Slang",
        details: "The runtime compiles the neural material description into optimized shader code. Fully fused neural networks are executed inline with standard rendering code (Vulkan / Direct3D 12 / WebGPU), handling divergent code paths without core thrashing."
      }
    ]
  },
  {
    slide_number: 7,
    title: "Engineering Zero-Reflectivity with Oren-Nayar",
    description: "We embed an Oren-Nayar microfacet distribution as a graphics prior within the neural decoder. This forces the neural sampler to prioritize high micro-roughness, evenly diffusing light across the UI plane and permanently eliminating digital glare.",
    comparison: {
      traditional: "Glare Source (Lambertian/Phong)",
      vivid_matte: "Oren-Nayar Diffuse Scattering"
    }
  },
  {
    slide_number: 8,
    title: "Refining the Optics: Denoising and Anti-Aliasing",
    stages: [
      {
        stage: "Stage 1",
        technology: "AMD FidelityFX Denoiser",
        function: "Removes high-frequency artifacts from the ray-traced shadows while strictly preserving the soft, matte structural finish without introducing blur."
      },
      {
        stage: "Stage 2",
        technology: "AMD FidelityFX LPM",
        function: "Luminance Preserving Mapper applies open-source HDR gamut mapping to ensure the highly saturated vivid colors never blow out or clip at the extremes."
      },
      {
        stage: "Stage 3",
        technology: "Arm NSS (Neural Super Sampling)",
        function: "Configured strictly to 'mid' or 'high' modes. Samples previous frames accurately to eliminate temporal flicker and motion artifacts around moving UI elements."
      }
    ]
  },
  {
    slide_number: 9,
    title: "The Typographic Aliasing Trap",
    problem_statement: "Highly detailed materials alias severely under minification. Baking text into neural models or 3D planes guarantees muddy data visualization. Text must escape the 3D plane.",
    comparison: {
      failure_baked_typography: "Baked into neural models or 3D planes -> Minification Artifacts & Severely Degraded Legibility",
      solution_escaped_typography: "Text must escape the 3D plane -> Razor-Sharp, Pristine Legibility & Decoupled Layer"
    }
  },
  {
    slide_number: 10,
    title: "Decoupled Z-Axis Typology",
    concept: "We physically decouple the semantic data layer from the render plane.",
    layers: {
      background: "The WebGPU neural mesh handles pure aesthetics, data visualization shapes, and 3D lighting.",
      foreground: "Standard HTML/CSS DOM elements are overlaid strictly in screen-space."
    },
    result: "Infinite resolution scaling for typography, zero anti-aliasing cost for text, and a pristine tactile relationship between sharp data and soft background."
  },
  {
    slide_number: 11,
    title: "Pipeline Diagnostic: Traditional vs. Neural UI",
    diagnostic_matrix: [
      {
        feature: "Shading Model",
        traditional_3d_ui: "Massive Ubershaders",
        decoupled_neural_ui: "Tensor-Accelerated MLPs"
      },
      {
        feature: "Optics",
        traditional_3d_ui: "Specular Glare (Phong)",
        decoupled_neural_ui: "Zero-Reflectivity (Oren-Nayar)"
      },
      {
        feature: "Texture Cost",
        traditional_3d_ui: "Gigatexel Baked Textures",
        decoupled_neural_ui: "8-Channel Latent Pyramid"
      },
      {
        feature: "Typography",
        traditional_3d_ui: "Baked & Aliased",
        decoupled_neural_ui: "HTML/CSS Decoupled (Infinite Res)"
      },
      {
        feature: "Filtering",
        traditional_3d_ui: "Expensive MSAA required",
        decoupled_neural_ui: "Pre-filtered Latents + Arm NSS"
      }
    ]
  },
  {
    slide_number: 12,
    title: "The Vivid-Matte Tech Stack",
    stack_components: [
      {
        layer: "Data Plane",
        technology: "WebGPU",
        description: "Foundational mesh and API execution."
      },
      {
        layer: "Rendering",
        technology: "NVIDIA RTX & Slang",
        description: "Inline MLP decoders, Tensor acceleration."
      },
      {
        layer: "Optical Refinement",
        technology: "AMD FidelityFX & Arm NSS",
        description: "Denoiser, LPM, Super Sampling."
      },
      {
        layer: "UI Typology",
        technology: "HTML/CSS DOM",
        description: "Decoupled, absolute-crisp text rendering."
      }
    ],
    closing_statement: "True next-generation interfaces do not look like screens. They look like physical artifacts. Build the tactile future."
  }
];

export const AelPresentationDeck: React.FC = () => {
  const [activeDeck, setActiveDeck] = useState<'unified' | 'ael' | 'tactile'>('unified');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const slides = activeDeck === 'unified' 
    ? UNIFIED_EDGE_SLIDES 
    : activeDeck === 'ael' 
    ? AEL_SLIDES 
    : TACTILE_SLIDES;

  const slide = slides[currentSlideIndex] || slides[0];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const switchDeck = (deck: 'unified' | 'ael' | 'tactile') => {
    setActiveDeck(deck);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        handleNext();
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  return (
    <div id="ael-presentation-deck" className="space-y-6">
      {/* Deck Selector & Presentation Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Deck Switcher Toggle */}
          <div className="p-1 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center gap-1 font-mono text-xs">
            <button
              onClick={() => switchDeck('unified')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeDeck === 'unified'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> The Unified Edge (13 Slides)
            </button>
            <button
              onClick={() => switchDeck('ael')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeDeck === 'ael'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> AEL Hologram Deck (12 Slides)
            </button>
            <button
              onClick={() => switchDeck('tactile')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeDeck === 'tactile'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Tactile UI Deck (12 Slides)
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center">
              {slide.slide_number}
            </span>
            <span className="text-white font-bold max-w-[240px] truncate">{slide.title}</span>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 border transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Auto' : 'Auto Play (4.5s)'}</span>
          </button>

          <button
            onClick={handlePrev}
            className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-400 px-2">
            {currentSlideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={handleNext}
            className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Stage Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden min-h-[500px] flex flex-col justify-between shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* UNIFIED EDGE SLIDES RENDERING */}
        {activeDeck === 'unified' && (
          <div className="space-y-6 relative z-10">
            {/* Slide 1 */}
            {slide.slide_number === 1 && (
              <div className="space-y-6 my-auto py-10">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dual-Application AI Architecture</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl font-sans uppercase">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-cyan-400 font-bold">
                    LiteRT.js (Gemma 3)
                  </span>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-indigo-400 font-bold">
                    TensorFlow.js (Stable Diffusion v1-5)
                  </span>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400 font-bold">
                    WebGPU Direct Backend
                  </span>
                </div>
              </div>
            )}

            {/* Slide 2: The Edge AI Imperative */}
            {slide.slide_number === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-amber-400 mt-1 uppercase tracking-wider">
                    Engineering Challenge: {(slide as any).engineering_challenge}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cloud Bottleneck */}
                  <div className="p-5 bg-slate-900/70 border border-rose-900/40 rounded-xl space-y-3">
                    <div className="text-xs font-mono text-rose-400 uppercase font-bold flex items-center gap-2">
                      <Server className="w-4 h-4" /> The Cloud Bottleneck
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {(slide as any).sections?.the_cloud_bottleneck?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Edge AI Imperative */}
                  <div className="p-5 bg-slate-900/70 border border-emerald-900/40 rounded-xl space-y-3">
                    <div className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-2">
                      <Laptop className="w-4 h-4" /> The Edge AI Imperative
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {(slide as any).sections?.the_edge_ai_imperative?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-around font-mono text-xs">
                  <div className="text-center">
                    <span className="text-slate-500 block text-[10px] uppercase">Application 1</span>
                    <strong className="text-cyan-300">{(slide as any).applications?.application_1}</strong>
                  </div>
                  <div className="text-slate-600 font-bold">+</div>
                  <div className="text-center">
                    <span className="text-slate-500 block text-[10px] uppercase">Application 2</span>
                    <strong className="text-indigo-300">{(slide as any).applications?.application_2}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Three Layers of Abstraction */}
            {slide.slide_number === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-slate-400 text-xs font-mono mt-1">{slide.subtitle}</p>
                </div>

                <div className="space-y-3">
                  {(slide as any).layers?.map((layer: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                          Layer {idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-white">{layer.layer}</h3>
                      </div>

                      {layer.role && (
                        <span className="text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                          Role: {layer.role}
                        </span>
                      )}

                      {layer.components && typeof layer.components === 'object' && !Array.isArray(layer.components) && (
                        <div className="flex gap-2 font-mono text-xs">
                          <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 rounded-lg">
                            Conversational: {layer.components.conversational}
                          </span>
                          <span className="px-3 py-1 bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 rounded-lg">
                            Visual: {layer.components.visual_creation}
                          </span>
                        </div>
                      )}

                      {layer.components && Array.isArray(layer.components) && (
                        <div className="flex gap-2 font-mono text-xs">
                          {layer.components.map((comp: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 rounded-lg font-bold">
                              {comp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 4: Distinct Models, Frameworks, Profiles */}
            {slide.slide_number === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">{(slide as any).summary}</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 uppercase">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Application</th>
                        <th className="p-3 border-b border-slate-800 text-cyan-400">Model</th>
                        <th className="p-3 border-b border-slate-800 text-indigo-400">Framework</th>
                        <th className="p-3 border-b border-slate-800 text-amber-400">Bottleneck Profile</th>
                        <th className="p-3 border-b border-slate-800 text-emerald-400">Native Acceleration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                      {(slide as any).comparison?.map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-bold text-white">{row.application}</td>
                          <td className="p-3 text-cyan-300 font-bold">{row.model_selection}</td>
                          <td className="p-3 text-indigo-300 font-bold">{row.inference_framework}</td>
                          <td className="p-3 text-amber-300">{row.bottleneck_profile}</td>
                          <td className="p-3 text-emerald-300 font-bold">{row.native_acceleration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Slide 5: App 1: Gemma 3 1B-it */}
            {slide.slide_number === 5 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">App 1 Specifications</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Architecture</span>
                    <strong className="text-cyan-300">{(slide as any).specifications?.architecture}</strong>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Context Window</span>
                    <strong className="text-emerald-300">{(slide as any).specifications?.context_window}</strong>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Capabilities</span>
                    <strong className="text-indigo-300">{(slide as any).specifications?.capabilities}</strong>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950 border border-cyan-800/60 rounded-xl space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Edge Advantage
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {(slide as any).edge_advantage}
                  </p>
                </div>
              </div>
            )}

            {/* Slide 6: The Conversational Engine: LiteRT.js */}
            {slide.slide_number === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1 uppercase">Native Execution Orchestration Pipeline</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {(slide as any).steps?.map((st: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="text-cyan-400 font-bold">{st.step}</div>
                      {st.description && <p className="text-slate-300 font-sans text-xs">{st.description}</p>}
                      {st.paths && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-300">
                            <span className="text-amber-400 font-bold block text-[10px]">CPU Execution Path A:</span>
                            {st.paths.path_a_cpu}
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-300">
                            <span className="text-emerald-400 font-bold block text-[10px]">GPU Execution Path B:</span>
                            {st.paths.path_b_gpu}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 7: App 2: Stable Diffusion v1-5 */}
            {slide.slide_number === 7 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    <Image className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">App 2 Specifications</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Architecture</span>
                    <strong className="text-indigo-300">{(slide as any).specifications?.architecture}</strong>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Encoder</span>
                    <strong className="text-purple-300">{(slide as any).specifications?.encoder}</strong>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] block">Output</span>
                    <strong className="text-emerald-300">{(slide as any).specifications?.output}</strong>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-950 border border-indigo-800/60 rounded-xl space-y-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Spatial Reduction Edge Advantage
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {(slide as any).edge_advantage}
                  </p>
                </div>
              </div>
            )}

            {/* Slide 8: The Visual Engine: TensorFlow.js */}
            {slide.slide_number === 8 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-indigo-400 mt-1 uppercase">Browser-Native Denoising Pipeline</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {(slide as any).steps?.map((st: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-indigo-400 font-bold">{st.step}</div>
                      <p className="text-slate-300 font-sans text-xs">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 9: Workload Isolation Matrix */}
            {slide.slide_number === 9 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-amber-400 mt-1 uppercase">Preventing UI Freeze & Execution Clashing</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(slide as any).engines?.map((eng: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                      <div className="text-sm font-mono font-bold text-cyan-400 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> {eng.name}
                      </div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="text-slate-400">Execution Type: <strong className="text-white">{eng.type}</strong></div>
                        <div className="text-slate-400">Primary Constraint: <strong className="text-amber-400">{eng.constraint}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-xl text-xs font-mono text-amber-200">
                  <span className="font-bold uppercase block mb-1">Architectural Takeaway:</span>
                  {(slide as any).takeaway}
                </div>
              </div>
            )}

            {/* Slide 10: Framework Convergence Layer */}
            {slide.slide_number === 10 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1 uppercase">
                    {(slide as any).architecture_flow?.description}
                  </p>
                </div>

                <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                      <span className="text-slate-500 uppercase block text-[10px]">Input Stream 1</span>
                      <div className="text-white font-bold">Text Prompt</div>
                      <div className="text-cyan-400 font-bold flex items-center gap-1">
                        <ArrowRight className="w-3.5 h-3.5" /> {(slide as any).architecture_flow?.text_prompt}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                      <span className="text-slate-500 uppercase block text-[10px]">Input Stream 2</span>
                      <div className="text-white font-bold">Visual Prompt</div>
                      <div className="text-indigo-400 font-bold flex items-center gap-1">
                        <ArrowRight className="w-3.5 h-3.5" /> {(slide as any).architecture_flow?.visual_prompt}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-950 to-indigo-950 border border-emerald-500/50 rounded-xl text-center space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Hardware Convergence Point</span>
                    <div className="text-base font-mono font-black text-emerald-400">
                      {(slide as any).architecture_flow?.convergence_point}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 11: WebWorker Execution Threading */}
            {slide.slide_number === 11 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-emerald-400 mt-1 uppercase">Isolated Threading Model</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  {(slide as any).threads?.map((th: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="text-white font-bold text-sm">{th.thread}</div>
                      {th.performance && <div className="text-emerald-400 font-bold">{th.performance}</div>}
                      {th.framework && <div className="text-cyan-300">Framework: {th.framework}</div>}
                      {th.task && <div className="text-indigo-300">Task: {th.task}</div>}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl text-xs font-mono text-emerald-200">
                  <span className="font-bold uppercase block mb-1">Threading Guarantee:</span>
                  {(slide as any).takeaway}
                </div>
              </div>
            )}

            {/* Slide 12: The Universal Translation Layer */}
            {slide.slide_number === 12 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold">
                    {(slide as any).status}
                  </span>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    Funnel Concept: {(slide as any).funnel_concept}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    {(slide as any).features?.map((feat: string, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 13: The Blueprint Realized */}
            {slide.slide_number === 13 && (
              <div className="space-y-6 py-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">{slide.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(slide as any).key_highlights?.map((hl: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="text-xs font-mono text-cyan-400 uppercase font-bold">{hl.feature}</div>
                      <p className="text-sm text-slate-200 font-sans">{hl.description}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/50 rounded-2xl text-center space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-widest block">Executive Conclusion</span>
                  <div className="text-lg sm:text-xl font-bold text-white font-sans">
                    "{(slide as any).conclusion}"
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AEL HOLOGRAM DECK SLIDES RENDERING */}
        {activeDeck === 'ael' && (
          <div className="space-y-6 relative z-10">
            {/* Slide 1 */}
            {slide.slide_number === 1 && (
              <div className="space-y-6 my-auto py-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>A First-Time Execution</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
                  The AEL Authenticity Hologram
                </h1>
                <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="inline-block p-4 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300">
                  <span className="text-slate-500 block text-[10px] uppercase">Quantum-Anchored Spatial Hash</span>
                  <span className="text-lg font-bold text-cyan-400">{(slide as any).spatial_hash}</span>
                </div>
              </div>
            )}

            {/* Slide 2 */}
            {slide.slide_number === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-slate-400 text-sm mt-1">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(slide as any).stack_layers?.map((layer: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2 backdrop-blur-md">
                      <div className="text-xs font-mono text-cyan-400 uppercase font-semibold">Layer {4 - idx}</div>
                      <div className="text-lg font-bold text-white">{layer.layer}</div>
                      <div className="text-xs text-slate-300 font-mono">{layer.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 3 */}
            {slide.slide_number === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block uppercase text-[10px]">Protocol</span>
                    <span className="text-sm font-bold text-cyan-400">{(slide as any).protocol}</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block uppercase text-[10px]">Quantum Bound</span>
                    <span className="text-sm font-bold text-emerald-400">{(slide as any).quantum_bound}</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block uppercase text-[10px]">Spatial Hash</span>
                    <span className="text-sm font-bold text-purple-400">{(slide as any).spatial_hash}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
                  {(slide as any).description}
                </p>
              </div>
            )}

            {/* Slide 4 */}
            {slide.slide_number === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-slate-400 text-sm mt-1">{(slide as any).description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-cyan-400 uppercase">Time to Crack</div>
                    <div className="text-xl font-bold text-white">{(slide as any).metrics?.time_to_crack.split(' (')[0]}</div>
                  </div>
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-amber-400 uppercase">Landauer Energy Limit</div>
                    <div className="text-xl font-bold text-white">{(slide as any).metrics?.landauer_energy_limit.split(' (')[0]}</div>
                  </div>
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-purple-400 uppercase">Energy Equivalence</div>
                    <div className="text-xl font-bold text-white">{(slide as any).metrics?.energy_equivalence.split(' (')[0]}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5 */}
            {slide.slide_number === 5 && (
              <div className="space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 uppercase">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Dimension</th>
                        <th className="p-3 border-b border-slate-800 text-slate-400">Traditional Procedural</th>
                        <th className="p-3 border-b border-slate-800 text-cyan-400">RTX Neural</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                      {(slide as any).comparison?.map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-bold text-slate-200">{row.dimension}</td>
                          <td className="p-3 text-slate-400">{row.traditional_procedural}</td>
                          <td className="p-3 text-cyan-300 font-semibold">{row.rtx_neural}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Slide 6 */}
            {slide.slide_number === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase">Focal Length</span>
                    <span className="text-cyan-400 font-bold">{(slide as any).camera_parameters?.camera_focal_length_f}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase">Horizontal FOV</span>
                    <span className="text-cyan-400 font-bold">{(slide as any).camera_parameters?.horizontal_fov}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase">Resolution</span>
                    <span className="text-cyan-400 font-bold">{(slide as any).camera_parameters?.pixel_resolution}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase">ControlNet Weight</span>
                    <span className="text-emerald-400 font-bold">{(slide as any).camera_parameters?.controlnet_conditioning_weight_w0}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 bg-slate-900/40 p-5 rounded-xl border border-slate-800 leading-relaxed">
                  {(slide as any).insight}
                </p>
              </div>
            )}

            {/* Slide 7 */}
            {slide.slide_number === 7 && (
              <div className="space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-cyan-400 font-bold uppercase block text-[10px]">Mechanism</span>
                    <p className="text-slate-300 font-sans text-sm">{(slide as any).mechanism}</p>
                  </div>
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-purple-400 font-bold uppercase block text-[10px]">Data Mapping</span>
                    <p className="text-slate-300 font-sans text-sm">{(slide as any).data_mapping}</p>
                  </div>
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-emerald-400 font-bold uppercase block text-[10px]">Physical Result</span>
                    <p className="text-slate-300 font-sans text-sm">{(slide as any).result}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 8 */}
            {slide.slide_number === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    Audio Specs: {(slide as any).audio_specifications}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{(slide as any).description}</p>
                </div>
              </div>
            )}

            {/* Slide 9 */}
            {slide.slide_number === 9 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <p className="text-amber-400/90 text-sm font-mono bg-amber-500/10 p-4 rounded-xl border border-amber-500/30">
                  Constraint: {(slide as any).constraint}
                </p>
                <div className="space-y-3">
                  {(slide as any).power_orchestration_strategy?.map((strat: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{strat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 10 */}
            {slide.slide_number === 10 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="space-y-3">
                  {(slide as any).key_highlights?.map((hl: string, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed">
                      {hl}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 11 */}
            {slide.slide_number === 11 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {(slide as any).synthesis_points?.map((pt: string, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-200">
                      <span className="text-cyan-400 font-bold block mb-1">Pillar {idx + 1}</span>
                      {pt}
                    </div>
                  ))}
                </div>
                <blockquote className="p-4 bg-slate-900/40 border-l-4 border-cyan-500 italic text-slate-300 text-sm font-serif">
                  "{(slide as any).quote}"
                </blockquote>
              </div>
            )}

            {/* Slide 12 */}
            {slide.slide_number === 12 && (
              <div className="space-y-6 py-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{slide.title}</h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {(slide as any).description}
                </p>
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 inline-block">
                  <span className="text-slate-500 block text-[10px] uppercase">Immutable Holographic Spatial Hash</span>
                  <span className="text-xl font-bold text-cyan-400">{(slide as any).spatial_hash}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIVID-MATTE TACTILE UI DECK SLIDES RENDERING */}
        {activeDeck === 'tactile' && (
          <div className="space-y-6 relative z-10">
            {/* Slide 1 */}
            {slide.slide_number === 1 && (
              <div className="space-y-6 my-auto py-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-mono text-xs font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Vivid-Matte OSD Blueprint</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl font-sans">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-sans">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-amber-400 font-bold">
                    Real-Time Neural Appearance Models
                  </span>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-cyan-400 font-bold">
                    Decoupled Z-Axis Typography
                  </span>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400 font-bold">
                    WebGPU + Slang Inline MLPs
                  </span>
                </div>
              </div>
            )}

            {/* Slide 2 */}
            {slide.slide_number === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-rose-950/30 border border-rose-800/50 rounded-xl space-y-3">
                    <div className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-2">
                      <Flame className="w-4 h-4" /> The Problem: Digital Glare
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {(slide as any).the_problem}
                    </p>
                  </div>
                  <div className="p-5 bg-emerald-950/30 border border-emerald-800/50 rounded-xl space-y-3">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> The Engineering Objective
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {(slide as any).the_objective}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3 */}
            {slide.slide_number === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{(slide as any).description}</p>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/40 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Top Layer (Z = +1)</span>
                      <div className="text-sm font-bold text-white font-sans">{(slide as any).layers?.foreground}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-mono rounded font-bold">Infinite Res</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Surface Layer (Z = 0)</span>
                      <div className="text-sm font-bold text-white font-sans">{(slide as any).layers?.surface}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono rounded font-bold">Oren-Nayar Microfacets</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/40 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Base Layer (Z = -1)</span>
                      <div className="text-sm font-bold text-white font-sans">{(slide as any).layers?.base_layer}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono rounded font-bold">WebGPU Mesh</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4 */}
            {slide.slide_number === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-xs font-mono text-amber-400 mt-1">{(slide as any).problem_statement}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/80 border border-rose-900/40 rounded-xl space-y-2">
                    <div className="text-xs font-mono text-rose-400 font-bold uppercase">Traditional 4-Channel Input</div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                      {(slide as any).traditional_input_channels?.map((ch: string, idx: number) => (
                        <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 text-center">{ch}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/80 border border-emerald-900/40 rounded-xl space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">8D Latent Texture Pyramid Hierarchy</div>
                    <div className="space-y-1.5 text-xs font-mono text-slate-300">
                      {(slide as any).latent_texture_pyramid_hierarchy?.map((h: string, idx: number) => (
                        <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 text-emerald-300 font-bold flex items-center gap-2">
                          <span className="text-amber-400">L{idx + 1}:</span> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase">Key Architectural Features</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                    {(slide as any).key_features?.map((feat: string, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5 */}
            {slide.slide_number === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{(slide as any).description}</p>
                </div>

                <div className="p-5 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-4">
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    Inlined Neural BRDF Inference Pipeline
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {(slide as any).pipeline_flow?.map((step: string, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1 relative">
                        <span className="text-[10px] font-mono text-slate-500 block">Step 0{idx + 1}</span>
                        <div className="text-xs font-mono font-bold text-cyan-300">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 6 */}
            {slide.slide_number === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(slide as any).components?.map((comp: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase">{comp.type}</span>
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[10px] rounded font-bold">
                          {comp.technology}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{comp.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 7 */}
            {slide.slide_number === 7 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{(slide as any).description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-center space-y-2">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase block">Traditional Optics</span>
                    <div className="text-lg font-bold text-white">{(slide as any).comparison?.traditional}</div>
                    <span className="text-xs text-rose-300/70 font-mono block">Specular hotspots & unnatural light sheen</span>
                  </div>
                  <div className="p-5 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-center space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">Vivid-Matte Standard</span>
                    <div className="text-lg font-bold text-emerald-300 font-mono">{(slide as any).comparison?.vivid_matte}</div>
                    <span className="text-xs text-emerald-300/70 font-mono block">Zero digital glare & microfacet light diffusion</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 8 */}
            {slide.slide_number === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(slide as any).stages?.map((st: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-400 font-bold">{st.stage}</span>
                      </div>
                      <div className="text-sm font-bold text-cyan-300 font-mono">{st.technology}</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{st.function}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 9 */}
            {slide.slide_number === 9 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-sm text-rose-300 font-mono mt-2">{(slide as any).problem_statement}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-rose-950/30 border border-rose-800/50 rounded-xl space-y-2">
                    <div className="text-xs font-mono text-rose-400 font-bold uppercase">Failure Mode</div>
                    <p className="text-sm text-slate-200 font-mono">{(slide as any).comparison?.failure_baked_typography}</p>
                  </div>
                  <div className="p-5 bg-emerald-950/30 border border-emerald-800/50 rounded-xl space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Engineered Solution</div>
                    <p className="text-sm text-slate-200 font-mono">{(slide as any).comparison?.solution_escaped_typography}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 10 */}
            {slide.slide_number === 10 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                  <p className="text-sm text-amber-400 font-mono mt-1">{(slide as any).concept}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-xl space-y-2">
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Background Render Plane</span>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">{(slide as any).layers?.background}</p>
                  </div>
                  <div className="p-4 bg-slate-900/80 border border-cyan-900/50 rounded-xl space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Foreground Semantic Layer</span>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">{(slide as any).layers?.foreground}</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-xs font-mono text-emerald-300 font-bold">
                  Result: {(slide as any).result}
                </div>
              </div>
            )}

            {/* Slide 11 */}
            {slide.slide_number === 11 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">{slide.title}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase">
                        <th className="p-3">Feature</th>
                        <th className="p-3 text-rose-400">Traditional 3D UI</th>
                        <th className="p-3 text-emerald-400">Decoupled Neural UI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {(slide as any).diagnostic_matrix?.map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-amber-400">{row.feature}</td>
                          <td className="p-3 text-slate-300">{row.traditional_3d_ui}</td>
                          <td className="p-3 text-emerald-300 font-bold">{row.decoupled_neural_ui}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Slide 12 */}
            {slide.slide_number === 12 && (
              <div className="space-y-6 py-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{slide.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(slide as any).stack_components?.map((sc: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{sc.layer}</span>
                        <span className="text-xs font-mono font-bold text-amber-400">{sc.technology}</span>
                      </div>
                      <p className="text-xs text-slate-300">{sc.description}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl italic text-amber-200 text-sm font-sans font-medium">
                  "{(slide as any).closing_statement}"
                </blockquote>
              </div>
            )}
          </div>
        )}

        {/* Thumbnail Selector Strip */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`shrink-0 w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                currentSlideIndex === idx
                  ? activeDeck === 'unified'
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.8)] scale-110'
                    : activeDeck === 'ael'
                    ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.8)] scale-110'
                    : 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-110'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s.slide_number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
