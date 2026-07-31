import React, { useState } from 'react';
import { Real3DSceneCanvas } from './Real3DSceneCanvas';
import { NeuralHallucinationShader } from './NeuralHallucinationShader';
import { Box, Sparkles } from 'lucide-react';

interface ThreeCanvasProps {
  selectedPillarKey: string | null;
  onSelectPillar: (key: string) => void;
  onFpsUpdate?: (fps: number) => void;
  theme?: 'cyber' | 'blackwell' | 'light';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  theme = 'cyber',
  onFpsUpdate
}) => {
  const [renderMode, setRenderMode] = useState<'3d_objects' | 'fluid_shader'>('3d_objects');

  return (
    <div id="three-canvas-container" className="w-full space-y-3">
      {/* View Mode Toggle Header */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-300">
          <Box className="w-4 h-4 text-cyan-400" />
          <span className="font-bold uppercase tracking-wider text-[11px]">Canvas Engine Mode:</span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setRenderMode('3d_objects')}
            className={`px-3 py-1 rounded-md font-bold transition-all flex items-center space-x-1.5 ${
              renderMode === '3d_objects'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Photorealistic 3D Objects (Engine Core / Tourbillon / Visor)</span>
          </button>

          <button
            onClick={() => setRenderMode('fluid_shader')}
            className={`px-3 py-1 rounded-md font-bold transition-all flex items-center space-x-1.5 ${
              renderMode === 'fluid_shader'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fluid Shader Noise</span>
          </button>
        </div>
      </div>

      {/* Render selected canvas component */}
      {renderMode === '3d_objects' ? (
        <Real3DSceneCanvas theme={theme} onFpsUpdate={onFpsUpdate} />
      ) : (
        <NeuralHallucinationShader theme={theme} />
      )}
    </div>
  );
};



