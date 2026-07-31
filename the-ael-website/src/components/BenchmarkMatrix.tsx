import React, { useState } from 'react';
import { Zap, ShieldCheck, DollarSign, WifiOff, Check, X, Award, ExternalLink, Calculator, Layers, FileText } from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';

interface BenchmarkMatrixProps {
  onOpenFiverrModal: () => void;
}

export const BenchmarkMatrix: React.FC<BenchmarkMatrixProps> = ({ onOpenFiverrModal }) => {
  const [monthlyTokenVolumeMillions, setMonthlyTokenVolumeMillions] = useState<number>(50);

  // Cloud pricing assumption: ~$0.003 per 1K tokens ($3 per million tokens)
  const estimatedCloudMonthlyCost = Math.round(monthlyTokenVolumeMillions * 3.0);
  const estimatedCloudAnnualCost = estimatedCloudMonthlyCost * 12;

  return (
    <div id="benchmark-matrix-container" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Architectural Advantage</span>
            </h2>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              Edge Engine vs Networked Cloud AI
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Zero cloud dependency, zero per-token costs, total data privacy, and instantaneous local processing.
            </p>
          </div>

          <button
            onClick={onOpenFiverrModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs uppercase tracking-wider transition-colors border border-blue-400/50 flex items-center space-x-2"
          >
            <Award className="w-4 h-4" />
            <span>Book Fiverr Custom Contract</span>
          </button>
        </div>
      </div>

      {/* Edge vs Cloud Comparison Matrix Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-md">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Benchmark & Capabilities Matrix</span>
          </h3>
          <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded uppercase tracking-wider font-bold">
            100% Offline Air-Gapped
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-xs font-mono text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <th className="p-4 w-1/4">Metric Dimension</th>
                <th className="p-4 w-3/8 text-slate-400">Networked Cloud AI APIs</th>
                <th className="p-4 w-3/8 text-blue-300 bg-blue-950/20 border-l border-slate-800">
                  AEL-QA88 Edge Engine (Gemma 4 E4B)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {SYNAPSE_BLUEPRINT.comparison_edge_vs_cloud.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-semibold text-white font-mono flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{row.metric}</span>
                  </td>
                  <td className="p-4 text-slate-400 font-sans">
                    <div className="flex items-start space-x-2">
                      <X className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>{row.networked_cloud_ai_apis}</span>
                    </div>
                  </td>
                  <td className="p-4 text-blue-200 font-sans bg-blue-950/10 border-l border-slate-800">
                    <div className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-white">{row.ael_qa88_edge_engine}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Cost Savings Calculator & Deployment Licensing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Cost Savings Calculator (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-5 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Zero-Cost Compute Calculator</span>
            </h3>
            <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 font-bold uppercase tracking-wider">
              $0 Recurring Fees
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-300">
              <span>Estimated Monthly Token Usage:</span>
              <span className="text-blue-300 font-bold">{monthlyTokenVolumeMillions} Million Tokens</span>
            </div>

            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={monthlyTokenVolumeMillions}
              onChange={(e) => setMonthlyTokenVolumeMillions(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5M Tokens/mo</span>
              <span>250M Tokens/mo</span>
              <span>500M Tokens/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Cloud API Cost (Monthly)</span>
              <span className="text-lg font-bold text-slate-300 font-mono">${estimatedCloudMonthlyCost.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">@ $3.00 per 1M tokens</span>
            </div>

            <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded">
              <span className="text-[10px] text-blue-400 block font-mono uppercase tracking-wider font-bold">AEL-QA88 Edge Cost</span>
              <span className="text-lg font-bold text-white font-mono">$0.00</span>
              <span className="text-[10px] text-blue-300 block mt-0.5">100% Device Execution</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300 flex items-center justify-between font-mono">
            <span>Annual Cloud Savings:</span>
            <strong className="text-blue-400 text-sm">${estimatedCloudAnnualCost.toLocaleString()} / year</strong>
          </div>
        </div>

        {/* Right Deployment Licensing Model (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-4 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Deployment & Licensing Model</span>
              </h3>
              <span className="text-[9px] font-mono text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-wider">
                Dual-Path Licensing
              </span>
            </div>

            <div className="space-y-4">
              {/* Path A */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs uppercase">{SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.name}</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase">
                    {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.license}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.target}
                </p>
              </div>

              {/* Path B */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-300 text-xs uppercase">{SYNAPSE_BLUEPRINT.deployment_licensing_model.path_b.name}</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase">
                    Commercial License
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_b.target}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Custom Contract Availability:</span>
            <button
              onClick={onOpenFiverrModal}
              className="text-blue-400 hover:text-blue-300 font-bold font-mono flex items-center space-x-1 uppercase text-[11px]"
            >
              <span>{SYNAPSE_BLUEPRINT.custom_services.availability}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
