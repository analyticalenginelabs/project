import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Wand2, Zap, MousePointer, Activity, Gauge, RefreshCw } from 'lucide-react';

export type ShaderNoiseType = 'bioluminescent_ocean' | 'aurora_borealis' | 'liquid_silk' | 'soft_cellular';

export interface NeuralHallucinationShaderProps {
  theme?: 'cyber' | 'blackwell' | 'light';
  overlayMode?: boolean;
  onSpeedIntensityChange?: (intensity: number) => void;
}

// -------------------------------------------------------------
// GLSL VERTEX & FRAGMENT SHADERS (SOOTHING ORGANIC FLUID)
// -------------------------------------------------------------
const VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec3 u_click;
  uniform float u_hover;
  uniform float u_speed;
  uniform float u_intensity;
  uniform float u_speed_intensity; // Gentle fluid swirl boost based on cursor velocity
  uniform int u_noise_mode; // 0 = Bioluminescent Ocean, 1 = Aurora Borealis, 2 = Liquid Silk, 3 = Soft Cellular
  uniform vec3 u_color_a;
  uniform vec3 u_color_b;
  uniform vec3 u_color_c;
  uniform float u_overlay_mode; // 1.0 if transparent overlay over 3D objects

  varying vec2 vUv;

  // Smooth Hash function
  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Smooth 2D Perlin Noise
  float perlinNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y
    );
  }

  // Smooth 4-Octave Fractal Brownian Motion (FBM)
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      value += amplitude * (perlinNoise(p) * 0.5 + 0.5);
      p = rot * p * 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Mouse influence vector for smooth fluid stirring
    vec2 mouseDist = st - u_mouse;
    float mouseLen = length(mouseDist);
    float mouseInfluence = smoothstep(0.65, 0.0, mouseLen) * u_hover;

    // Organic fluid displacement stirring vector
    vec2 stir = normalize(mouseDist + vec2(0.001)) * mouseInfluence * 0.35 * clamp(u_speed_intensity, 1.0, 2.5);

    // Smooth click wave expansion
    float clickTime = u_time - u_click.z;
    float rippleDist = length(st - u_click.xy);
    float rippleWave = sin(rippleDist * 8.0 - clickTime * 4.0) 
                     * exp(-clickTime * 1.5) 
                     * smoothstep(2.5, 0.0, clickTime);
    rippleWave = max(0.0, rippleWave) * 0.15;

    // Fluid coordinates
    float speed = u_speed * 0.25;
    vec2 p = (st + stir + vec2(rippleWave)) * u_intensity * 1.5;

    vec3 finalColor = vec3(0.0);
    float alpha = 0.85;

    if (u_noise_mode == 0) {
      // 🪼 BIOLUMINESCENT OCEAN FLUID (Domain Warped FBM)
      vec2 q = vec2(
        fbm(p + vec2(u_time * speed * 0.8, u_time * speed * 0.5)),
        fbm(p + vec2(5.2, 1.3) + vec2(u_time * speed * 0.6, -u_time * speed * 0.7))
      );

      vec2 r = vec2(
        fbm(p + 3.0 * q + vec2(1.7, 9.2) + u_time * speed * 0.4),
        fbm(p + 3.0 * q + vec2(8.3, 2.8) - u_time * speed * 0.5)
      );

      float f = fbm(p + 3.5 * r);

      // Deep, soothing oceanic color gradient
      vec3 col = mix(u_color_a * 0.25, u_color_b * 0.85, clamp(f * f * 4.0, 0.0, 1.0));
      col = mix(col, u_color_c, clamp(length(q), 0.0, 1.0));
      col = mix(col, vec3(0.7, 0.95, 1.0), clamp(length(r.x), 0.0, 1.0) * 0.45);

      // Soothing bioluminescent glow accents
      col += u_color_a * pow(f, 3.0) * 0.6;
      col += vec3(0.1, 0.8, 0.9) * mouseInfluence * 0.5;

      finalColor = col;
      alpha = u_overlay_mode > 0.5 ? clamp(f * 0.5 + mouseInfluence * 0.2, 0.15, 0.55) : 0.92;

    } else if (u_noise_mode == 1) {
      // 🌌 AURORA BOREALIS CELESTIAL CURTAIN
      vec2 q = vec2(fbm(p * 0.8 + vec2(u_time * speed * 0.4, 0.0)), fbm(p * 0.8));
      float aurora1 = sin(p.x * 2.2 + q.x * 4.0 + u_time * speed * 1.2) * 0.5 + 0.5;
      float aurora2 = cos(p.y * 1.8 + q.y * 3.5 - u_time * speed * 0.9) * 0.5 + 0.5;

      float curtain = pow(aurora1 * aurora2, 1.8);

      vec3 col = mix(u_color_b * 0.3, u_color_a, curtain);
      col = mix(col, u_color_c, sin(curtain * 3.1415 + u_time * 0.3) * 0.5 + 0.5);

      col += vec3(0.4, 0.9, 0.6) * mouseInfluence * 0.4;
      finalColor = col;
      alpha = u_overlay_mode > 0.5 ? clamp(curtain * 0.6 + 0.1, 0.15, 0.6) : 0.90;

    } else if (u_noise_mode == 2) {
      // 🪢 LIQUID SILK RIBBONS
      float ribbon1 = sin(p.x * 2.5 + fbm(p + u_time * speed * 0.5) * 5.0) * 0.5 + 0.5;
      float ribbon2 = cos(p.y * 2.5 + fbm(p - u_time * speed * 0.4) * 4.5) * 0.5 + 0.5;

      float silk = pow(ribbon1 * ribbon2, 2.2);

      vec3 col = mix(u_color_a * 0.2, u_color_b * 0.9, silk);
      col += u_color_c * pow(silk, 3.0) * 0.8;

      finalColor = col;
      alpha = u_overlay_mode > 0.5 ? clamp(silk * 0.5, 0.15, 0.55) : 0.90;

    } else {
      // 🧫 SOFT CELLULAR MEMBRANE
      float cell1 = fbm(p * 1.2 + vec2(u_time * speed * 0.3));
      float cell2 = fbm(p * 2.4 - vec2(0.0, u_time * speed * 0.4));
      float membrane = smoothstep(0.2, 0.7, abs(cell1 - cell2));

      vec3 col = mix(u_color_b * 0.4, u_color_a, 1.0 - membrane);
      col = mix(col, u_color_c * 0.8, cell1);

      finalColor = col;
      alpha = u_overlay_mode > 0.5 ? clamp((1.0 - membrane) * 0.5 + 0.1, 0.15, 0.55) : 0.90;
    }

    // Soft vignette to keep edges comfortable and framed
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    finalColor *= clamp(vignette, 0.4, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// -------------------------------------------------------------
// REACT THREE FIBER SHADER MESH COMPONENT
// -------------------------------------------------------------
interface R3FMeshProps {
  noiseType: ShaderNoiseType;
  colorScheme: 'cyan_violet' | 'amber_gold' | 'emerald_neon';
  baseSpeed: number;
  baseCellScale: number;
  overlayMode?: boolean;
  onSpeedIntensityUpdate?: (intensity: number) => void;
}

const R3FHallucinationMesh: React.FC<R3FMeshProps> = ({
  noiseType,
  colorScheme,
  baseSpeed,
  baseCellScale,
  overlayMode = false,
  onSpeedIntensityUpdate
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  const mousePosRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const clickDataRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, -100));
  const hoverRef = useRef<number>(0);

  // Speed calculation states
  const lastMouseRef = useRef({ x: 0, y: 0, time: performance.now() });
  const targetSpeedIntensityRef = useRef<number>(1.0);
  const currentSpeedIntensityRef = useRef<number>(1.0);

  // Color Palettes
  const palettes = useMemo(() => {
    return {
      cyan_violet: {
        a: new THREE.Color(0x06b6d4),
        b: new THREE.Color(0x6366f1),
        c: new THREE.Color(0xec4899)
      },
      amber_gold: {
        a: new THREE.Color(0xf59e0b),
        b: new THREE.Color(0xd97706),
        c: new THREE.Color(0xef4444)
      },
      emerald_neon: {
        a: new THREE.Color(0x10b981),
        b: new THREE.Color(0x06b6d4),
        c: new THREE.Color(0x3b82f6)
      }
    };
  }, []);

  const activePalette = palettes[colorScheme];

  // Uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_click: { value: new THREE.Vector3(0, 0, -100) },
      u_hover: { value: 0 },
      u_speed: { value: baseSpeed },
      u_intensity: { value: baseCellScale },
      u_speed_intensity: { value: 1.0 },
      u_noise_mode: { 
        value: noiseType === 'bioluminescent_ocean' ? 0 
             : noiseType === 'aurora_borealis' ? 1 
             : noiseType === 'liquid_silk' ? 2 
             : 3 
      },
      u_color_a: { value: activePalette.a },
      u_color_b: { value: activePalette.b },
      u_color_c: { value: activePalette.c },
      u_overlay_mode: { value: overlayMode ? 1.0 : 0.0 }
    }),
    [size.width, size.height, baseSpeed, baseCellScale, noiseType, activePalette, overlayMode]
  );

  // Synchronize uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_noise_mode.value = noiseType === 'bioluminescent_ocean' ? 0 
        : noiseType === 'aurora_borealis' ? 1 
        : noiseType === 'liquid_silk' ? 2 
        : 3;
      materialRef.current.uniforms.u_color_a.value = activePalette.a;
      materialRef.current.uniforms.u_color_b.value = activePalette.b;
      materialRef.current.uniforms.u_color_c.value = activePalette.c;
      materialRef.current.uniforms.u_speed.value = baseSpeed;
      materialRef.current.uniforms.u_intensity.value = baseCellScale;
      materialRef.current.uniforms.u_overlay_mode.value = overlayMode ? 1.0 : 0.0;
    }
  }, [noiseType, activePalette, baseSpeed, baseCellScale, overlayMode]);

  // Track global window/canvas pointer speed
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const now = performance.now();
      const dt = Math.max(1, now - lastMouseRef.current.time);
      const dx = clientX - lastMouseRef.current.x;
      const dy = clientY - lastMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const speedPxPerMs = dist / dt; // Speed in px/ms

      // Map movement speed to intensity boost: baseline 1.0, max 5.0
      targetSpeedIntensityRef.current = Math.min(5.0, 1.0 + speedPxPerMs * 2.2);

      lastMouseRef.current = { x: clientX, y: clientY, time: now };

      // Update normalized mouse coordinates for shader (-1 to +1)
      const rect = { width: window.innerWidth, height: window.innerHeight };
      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;
      mousePosRef.current.set(normX, normY);
      hoverRef.current = 1.0;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;
      clickDataRef.current.set(normX, normY, performance.now() * 0.001);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  // R3F Render Loop Frame Update
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = t;
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
      materialRef.current.uniforms.u_mouse.value.lerp(mousePosRef.current, 0.1);
      materialRef.current.uniforms.u_click.value.copy(clickDataRef.current);

      // Lerp dynamic movement speed intensity smoothly
      currentSpeedIntensityRef.current += (targetSpeedIntensityRef.current - currentSpeedIntensityRef.current) * 0.09;
      // Decay target speed intensity back to 1.0 when cursor stops
      targetSpeedIntensityRef.current += (1.0 - targetSpeedIntensityRef.current) * 0.04;

      materialRef.current.uniforms.u_speed_intensity.value = currentSpeedIntensityRef.current;

      // Lerp hover intensity
      const curHover = materialRef.current.uniforms.u_hover.value;
      materialRef.current.uniforms.u_hover.value += (hoverRef.current - curHover) * 0.08;

      if (onSpeedIntensityUpdate) {
        onSpeedIntensityUpdate(currentSpeedIntensityRef.current);
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

// -------------------------------------------------------------
// MAIN CONTAINER COMPONENT WITH CONTROLS & R3F CANVAS
// -------------------------------------------------------------
export const NeuralHallucinationShader: React.FC<NeuralHallucinationShaderProps> = ({
  theme = 'cyber',
  overlayMode = false
}) => {
  const [noiseType, setNoiseType] = useState<ShaderNoiseType>('bioluminescent_ocean');
  const [baseSpeed, setBaseSpeed] = useState<number>(0.8);
  const [baseCellScale, setBaseCellScale] = useState<number>(1.8);
  const [colorScheme, setColorScheme] = useState<'cyan_violet' | 'amber_gold' | 'emerald_neon'>('cyan_violet');
  const [liveIntensity, setLiveIntensity] = useState<number>(1.0);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiStory, setAiStory] = useState<string>(
    'Soothing, organic FBM domain-warped liquid simulation reacting gently to cursor motion like bioluminescent ocean water.'
  );

  const triggerAiSynthesis = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/hallucinate-shader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `React Three Fiber GLSL Shader (${noiseType}) with velocity-based hallucination intensity`,
          style: colorScheme
        })
      });
      const data = await res.json();
      if (data.success && data.aiDescription) {
        setAiStory(data.aiDescription);
        if (data.particleBehavior?.speed) setBaseSpeed(data.particleBehavior.speed);
        if (data.particleBehavior?.glowIntensity) setBaseCellScale(data.particleBehavior.glowIntensity);
      }
    } catch (e) {
      console.error('Failed to trigger AI shader tuning', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const containerTheme = theme === 'light'
    ? 'bg-white border-slate-200 text-slate-800'
    : theme === 'blackwell'
    ? 'bg-[#0b0a07] border-amber-900/50 text-amber-100'
    : 'bg-slate-900/50 border-slate-800 text-slate-200';

  return (
    <div id="neural-hallucination-shader" className={`border rounded-xl p-5 space-y-4 backdrop-blur-md ${containerTheme}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>React Three Fiber GLSL Shader Component</span>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-tight font-sans">
            Neural Hallucination Noise Engine (R3F)
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {/* Live Speed Gauge Indicator */}
          <div className="px-3 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-cyan-400 flex items-center space-x-2">
            <Gauge className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Velocity Boost: <strong className="text-white font-bold">{liveIntensity.toFixed(2)}x</strong></span>
          </div>

          <button
            onClick={triggerAiSynthesis}
            disabled={isAiLoading}
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-bold rounded flex items-center space-x-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isAiLoading ? 'Synthesizing...' : 'Gemini AI Tune'}</span>
          </button>
        </div>
      </div>

      {/* R3F Canvas Viewport */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-lg overflow-hidden border border-slate-800/80 bg-black cursor-crosshair">
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 1] }}>
          <R3FHallucinationMesh
            noiseType={noiseType}
            colorScheme={colorScheme}
            baseSpeed={baseSpeed}
            baseCellScale={baseCellScale}
            overlayMode={overlayMode}
            onSpeedIntensityUpdate={setLiveIntensity}
          />
        </Canvas>

        {/* Floating Instruction Overlay */}
        <div className="absolute top-3 left-3 bg-black/75 border border-slate-800 px-3 py-1.5 rounded text-[10px] font-mono text-cyan-300 backdrop-blur-md flex items-center space-x-2 pointer-events-none">
          <MousePointer className="w-3 h-3 text-cyan-400" />
          <span>Move mouse/touch fast to trigger hallucination intensity surge • Click for shockwaves</span>
        </div>

        {/* Live Status Telemetry Badge */}
        <div className="absolute bottom-3 right-3 bg-black/75 border border-slate-800 px-3 py-1.5 rounded text-[10px] font-mono text-slate-300 backdrop-blur-md flex items-center space-x-2 pointer-events-none">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>R3F Noise: <strong className="text-cyan-400 uppercase">{noiseType}</strong></span>
        </div>
      </div>

      {/* AI Story Banner */}
      <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 flex items-start space-x-2">
        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-400 uppercase mr-2">AI Latent Description:</span>
          <span className="opacity-90">{aiStory}</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Noise Mode Switcher */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Noise Layer
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => setNoiseType('bioluminescent_ocean')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                noiseType === 'bioluminescent_ocean' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🪼 Ocean
            </button>
            <button
              onClick={() => setNoiseType('aurora_borealis')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                noiseType === 'aurora_borealis' ? 'bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌌 Aurora
            </button>
            <button
              onClick={() => setNoiseType('liquid_silk')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                noiseType === 'liquid_silk' ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🪢 Silk
            </button>
            <button
              onClick={() => setNoiseType('soft_cellular')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                noiseType === 'soft_cellular' ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🧫 Cellular
            </button>
          </div>
        </div>

        {/* Color Scheme Picker */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Color Spectrum
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setColorScheme('cyan_violet')}
              className={`py-1 rounded text-center transition-all ${
                colorScheme === 'cyan_violet' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cyber
            </button>
            <button
              onClick={() => setColorScheme('amber_gold')}
              className={`py-1 rounded text-center transition-all ${
                colorScheme === 'amber_gold' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gold
            </button>
            <button
              onClick={() => setColorScheme('emerald_neon')}
              className={`py-1 rounded text-center transition-all ${
                colorScheme === 'emerald_neon' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Emerald
            </button>
          </div>
        </div>

        {/* Base Speed & Scale Sliders */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Base Speed</span>
              <span className="text-cyan-300 font-bold">{baseSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={baseSpeed}
              onChange={(e) => setBaseSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Cell Scale</span>
              <span className="text-indigo-300 font-bold">{baseCellScale.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.2"
              value={baseCellScale}
              onChange={(e) => setBaseCellScale(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
