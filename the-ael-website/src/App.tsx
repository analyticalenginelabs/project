import React, { useState } from 'react';
import { Header, AppTheme } from './components/Header';
import { CompanySection } from './components/CompanySection';
import { ThreeCanvas } from './components/ThreeCanvas';
import { AnatomySection } from './components/AnatomySection';
import { InferenceSimulator } from './components/InferenceSimulator';
import { VisualsPipeline } from './components/VisualsPipeline';
import { WasmVaultSection } from './components/WasmVaultSection';
import { BenchmarkMatrix } from './components/BenchmarkMatrix';
import { ObraMaestroSection } from './components/ObraMaestroSection';
import { EdgeGalleryDeployer } from './components/EdgeGalleryDeployer';
import { AelPresentationDeck } from './components/AelPresentationDeck';
import { TechnicalReportSection } from './components/TechnicalReportSection';
import { LicensingHubSection } from './components/LicensingHubSection';
import { RawJsonModal } from './components/RawJsonModal';
import { FiverrServicesModal } from './components/FiverrServicesModal';
import { SYNAPSE_BLUEPRINT } from './data/blueprintData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('company');
  const [selectedPillarKey, setSelectedPillarKey] = useState<string | null>('the_brain');
  const [fpsCount, setFpsCount] = useState<number>(60);
  const [theme, setTheme] = useState<AppTheme>('cyber');
  const [rawJsonOpen, setRawJsonOpen] = useState<boolean>(false);
  const [fiverrModalOpen, setFiverrModalOpen] = useState<boolean>(false);

  const containerThemeClasses = {
    cyber: 'bg-slate-950 text-slate-200 selection:bg-blue-600 selection:text-white',
    blackwell: 'bg-[#0a0806] text-amber-50 selection:bg-amber-500 selection:text-black',
    light: 'bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white'
  };

  return (
    <div className={`min-h-screen ${containerThemeClasses[theme]} font-sans flex flex-col relative overflow-x-hidden transition-colors duration-200`}>
      {/* Background Ambient Glows */}
      {theme === 'cyber' && (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-950/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
        </>
      )}

      {theme === 'blackwell' && (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-950/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-900/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
        </>
      )}

      {theme === 'light' && (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
        </>
      )}

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRawJson={() => setRawJsonOpen(true)}
        onOpenFiverrModal={() => setFiverrModalOpen(true)}
        fpsCount={fpsCount}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8 relative z-10">
        {/* Tab 0: Analytical Engine Labs Company Showcase & Portfolio */}
        {activeTab === 'company' && (
          <CompanySection
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenFiverrModal={() => setFiverrModalOpen(true)}
            onOpenRawJson={() => setRawJsonOpen(true)}
            theme={theme}
          />
        )}

        {/* Tab 1: Overview & 3D Spatial Canvas */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* 3D WebGL VR Spatial Frustum & Node Lattice Canvas */}
            <ThreeCanvas
              selectedPillarKey={selectedPillarKey}
              onSelectPillar={(key) => setSelectedPillarKey(key)}
              onFpsUpdate={(fps) => setFpsCount(fps)}
              theme={theme}
            />

            {/* Core Anatomy Pillars & Zero-Block UI Decoupling Architecture */}
            <AnatomySection
              selectedPillarKey={selectedPillarKey}
              onSelectPillar={(key) => setSelectedPillarKey(key)}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          </div>
        )}

        {/* Tab Technical Report: Full Interactive Synapse Spec */}
        {activeTab === 'tech_report' && (
          <div className="animate-fade-in">
            <TechnicalReportSection theme={theme} />
          </div>
        )}

        {/* Tab 1.1: The AEL Authenticity Hologram 12-Slide Presentation */}
        {activeTab === 'presentation' && (
          <div className="animate-fade-in">
            <AelPresentationDeck />
          </div>
        )}

        {/* Tab 1.25: Built-In Edge AI Gallery & Easy Deployment Hub */}
        {activeTab === 'edge_gallery' && (
          <div className="animate-fade-in">
            <EdgeGalleryDeployer />
          </div>
        )}

        {/* Tab 1.5: Obra Maestro Technology Suite (v2.2.0 Final) */}
        {activeTab === 'obra' && (
          <div className="animate-fade-in">
            <ObraMaestroSection />
          </div>
        )}

        {/* Tab 2: Gemma 4 Offline Local Inference Simulator */}
        {activeTab === 'inference' && (
          <div className="animate-fade-in">
            <InferenceSimulator />
          </div>
        )}

        {/* Tab 3: Neural Shaders & Interface Optics Pipeline */}
        {activeTab === 'shaders' && (
          <div className="animate-fade-in">
            <VisualsPipeline theme={theme} />
          </div>
        )}

        {/* Tab 4: WASM Security Vault & Quantum Bounds */}
        {activeTab === 'vault' && (
          <div className="animate-fade-in">
            <WasmVaultSection />
          </div>
        )}

        {/* Tab 5: Edge vs Cloud Benchmarks & Licensing Hub */}
        {(activeTab === 'licensing' || activeTab === 'matrix') && (
          <div className="animate-fade-in">
            <LicensingHubSection
              onOpenFiverrModal={() => setFiverrModalOpen(true)}
              theme={theme}
            />
          </div>
        )}
      </main>

      {/* Immersive Corporate Footer */}
      <footer className={`relative z-10 border-t mt-12 backdrop-blur-md ${
        theme === 'light'
          ? 'bg-white border-slate-200 text-slate-700'
          : theme === 'blackwell'
          ? 'bg-[#0a0805] border-amber-900/40 text-amber-100/80'
          : 'bg-slate-950 border-slate-800/80 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center space-x-3">
              <span className={`w-2 h-2 rounded-full ${
                theme === 'blackwell' ? 'bg-amber-400' : 'bg-blue-500'
              }`}></span>
              <span className="font-semibold text-slate-300">
                Analytical Engine Labs (AEL) • {SYNAPSE_BLUEPRINT.document_title} v{SYNAPSE_BLUEPRINT.version}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setRawJsonOpen(true)} className="hover:text-blue-400 transition-colors">
                Public Specification
              </button>
              <button onClick={() => setFiverrModalOpen(true)} className="hover:text-blue-400 font-medium transition-colors">
                Enterprise Engagements
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('licensing')} className="hover:text-blue-400 font-semibold transition-colors">
                GNU GPLv3 & Commercial Hybrid Shield
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RawJsonModal isOpen={rawJsonOpen} onClose={() => setRawJsonOpen(false)} />
      <FiverrServicesModal isOpen={fiverrModalOpen} onClose={() => setFiverrModalOpen(false)} />
    </div>
  );
}

