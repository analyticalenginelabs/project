import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Zap,
  Calculator,
  Check,
  X,
  Award,
  ExternalLink,
  Layers,
  FileText,
  Copy,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Building,
  Terminal,
  Code
} from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';
import { AppTheme } from './Header';

interface LicensingHubSectionProps {
  onOpenFiverrModal: () => void;
  theme: AppTheme;
}

export const LicensingHubSection: React.FC<LicensingHubSectionProps> = ({
  onOpenFiverrModal,
  theme
}) => {
  const [monthlyTokenVolumeMillions, setMonthlyTokenVolumeMillions] = useState<number>(50);
  const [projectType, setProjectType] = useState<'open_source' | 'academic' | 'closed_commercial' | 'enterprise_saas'>('closed_commercial');
  const [distributionModel, setDistributionModel] = useState<'public' | 'internal' | 'binary'>('public');
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);

  // Cloud pricing assumption: ~$0.003 per 1K tokens ($3 per million tokens)
  const estimatedCloudMonthlyCost = Math.round(monthlyTokenVolumeMillions * 3.0);
  const estimatedCloudAnnualCost = estimatedCloudMonthlyCost * 12;

  const cardBgClass = theme === 'light'
    ? 'bg-white border-slate-200 shadow-sm'
    : theme === 'blackwell'
    ? 'bg-[#0a0805]/80 border-amber-900/40 text-amber-100'
    : 'bg-slate-900/40 border-slate-800 text-slate-200';

  const subBannerClass = theme === 'light'
    ? 'bg-slate-50 border-slate-200'
    : theme === 'blackwell'
    ? 'bg-[#0f0c08] border-amber-900/30'
    : 'bg-slate-950/80 border-slate-800';

  // Compliance recommendation calculation
  const isGplCompliant = projectType === 'open_source' || projectType === 'academic';

  const generatedLicenseHeader = isGplCompliant
    ? `/*
 * Analytical Engine Labs (AEL) - AEL-QA88 Synapse AI v1.88.4
 * Copyright (C) 2026 Analytical Engine Labs.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */`
    : `/*
 * Analytical Engine Labs (AEL) - Tier II Commercial Hybrid Shield License
 * License ID: AEL-COMM-2026-HYBRID
 *
 * Licensed exclusively under the Analytical Engine Labs Commercial
 * Hybrid Shield Agreement for proprietary, closed-source, or monetized deployment.
 *
 * Copyleft obligations under GNU GPLv3 are waived for this build instance.
 * Confidential & Proprietary - Analytical Engine Labs
 */`;

  const copyLicenseHeader = () => {
    navigator.clipboard.writeText(generatedLicenseHeader);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 2500);
  };

  return (
    <div id="licensing-hub-container" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className={`border rounded-xl p-6 backdrop-blur-xl relative overflow-hidden ${cardBgClass}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Analytical Engine Labs // Licensing & Compliance Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              Dual-Path Licensing & Enterprise Shield Framework
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-sans">
              Analytical Engine Labs enforces a transparent dual-licensing strategy. Open-source derivatives are governed by the GNU General Public License v3 (GPLv3). Commercial or proprietary applications utilize the Tier II Commercial Hybrid Shield to bypass copyleft constraints.
            </p>
          </div>

          <button
            onClick={onOpenFiverrModal}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 border border-blue-400/50 shrink-0"
          >
            <Award className="w-4 h-4" />
            <span>Inquire Enterprise Commercial Shield</span>
          </button>
        </div>
      </div>

      {/* Dual License Pathways Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Path A: GNU GPLv3 */}
        <div className={`border rounded-xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between ${cardBgClass}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-sm uppercase font-mono">
                  {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.license}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_a.target}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block">Key Open-Source Rights & Rules:</span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Full access to source code, shaders, and WASM intrinsics.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Free usage for personal, non-commercial, and academic research.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-amber-200">Copyleft Rule: All derivative work must remain open source under GNU GPLv3.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded text-[11px] font-mono text-slate-400">
            <strong>Ideal For:</strong> Universities, independent AI researchers, open-source developers, and public GitHub projects.
          </div>
        </div>

        {/* Path B: Tier II Commercial Hybrid Shield */}
        <div className={`border rounded-xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between ${cardBgClass}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-indigo-300 text-sm uppercase font-mono">
                  {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_b.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase">
                Enterprise Commercial
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {SYNAPSE_BLUEPRINT.deployment_licensing_model.path_b.target}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider block">Enterprise Shield Benefits:</span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Complete waiver of GNU GPLv3 copyleft open-source obligations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Right to embed in closed-source commercial SaaS and desktop software.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Dedicated AEL engineering support, custom model quantization, & SLAs.</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenFiverrModal}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold rounded-lg border border-indigo-400/40 transition-all flex items-center justify-center space-x-2"
          >
            <Award className="w-4 h-4" />
            <span>Request Commercial License Quote</span>
          </button>
        </div>
      </div>

      {/* Interactive Compliance Selector & Header Generator */}
      <div className={`border rounded-xl p-6 space-y-6 ${cardBgClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 font-mono">
              <Calculator className="w-4 h-4" />
              <span>Interactive Licensing Compliance Selector</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify your project details to determine exact compliance requirements and copy file license headers.
            </p>
          </div>

          <span className={`text-[10px] font-mono px-3 py-1 rounded border font-bold uppercase ${
            isGplCompliant
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
          }`}>
            Required Path: {isGplCompliant ? 'GNU GPLv3 Open Source' : 'Tier II Commercial Shield'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">1. Select Project Type:</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 text-xs font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="open_source">Open Source Project (Public Repo)</option>
                <option value="academic">Academic & University Research</option>
                <option value="closed_commercial">Closed-Source Monetized Product</option>
                <option value="enterprise_saas">Enterprise Cloud & Proprietary SaaS Platform</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">2. Distribution Model:</label>
              <select
                value={distributionModel}
                onChange={(e) => setDistributionModel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 text-xs font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="public">Public Distribution / Open Website</option>
                <option value="internal">Internal Corporate / Enterprise Use</option>
                <option value="binary">Distributed Binary / Desktop App</option>
              </select>
            </div>

            <div className={`p-4 rounded-lg border text-xs leading-relaxed space-y-2 ${
              isGplCompliant
                ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
                : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200'
            }`}>
              <div className="font-bold uppercase font-mono flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Compliance Recommendation:</span>
              </div>
              <p>
                {isGplCompliant
                  ? 'Your project qualifies for the free GNU GPLv3 Open Source path. Ensure all source modifications are published openly with copyleft credits.'
                  : 'Your project requires the Tier II Commercial Hybrid Shield to legally embed AEL-QA88 Synapse AI or Obra Maestro code in a closed-source product without copyleft obligations.'
                }
              </p>
            </div>
          </div>

          {/* Code Header Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Generated File License Header</span>
              </span>

              <button
                onClick={copyLicenseHeader}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono rounded border border-slate-700 flex items-center space-x-1.5 transition-all"
              >
                {copiedHeader ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHeader ? 'Copied Header!' : 'Copy Header'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 border border-slate-800 text-cyan-300 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed max-h-[220px]">
              {generatedLicenseHeader}
            </pre>
          </div>
        </div>
      </div>

      {/* Edge vs Cloud Capabilities Matrix */}
      <div className={`border rounded-xl overflow-hidden ${cardBgClass}`}>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2 font-mono">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Benchmark & Capabilities Matrix</span>
          </h3>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded uppercase tracking-wider font-bold">
            100% Offline Air-Gapped
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-xs font-mono text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <th className="p-4 w-1/4">Metric Dimension</th>
                <th className="p-4 w-3/8 text-slate-400">Networked Cloud AI APIs</th>
                <th className="p-4 w-3/8 text-cyan-300 bg-cyan-950/20 border-l border-slate-800">
                  AEL-QA88 Edge Engine (Gemma 4 E4B)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {SYNAPSE_BLUEPRINT.comparison_edge_vs_cloud.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-semibold text-white font-mono flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{row.metric}</span>
                  </td>
                  <td className="p-4 text-slate-400 font-sans">
                    <div className="flex items-start space-x-2">
                      <X className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>{row.networked_cloud_ai_apis}</span>
                    </div>
                  </td>
                  <td className="p-4 text-cyan-200 font-sans bg-cyan-950/10 border-l border-slate-800">
                    <div className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-white">{row.ael_qa88_edge_engine}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Savings Calculator */}
      <div className={`border rounded-xl p-6 space-y-5 ${cardBgClass}`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 font-mono">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Zero-Cost On-Device Compute Calculator</span>
          </h3>
          <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded border border-cyan-500/30 font-bold uppercase tracking-wider">
            $0 Recurring Server Fees
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300">
            <span>Estimated Monthly Token Usage across Client Devices:</span>
            <span className="text-cyan-300 font-bold text-sm">{monthlyTokenVolumeMillions} Million Tokens</span>
          </div>

          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={monthlyTokenVolumeMillions}
            onChange={(e) => setMonthlyTokenVolumeMillions(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>5M Tokens/mo</span>
            <span>250M Tokens/mo</span>
            <span>500M Tokens/mo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Cloud API Cost (Monthly)</span>
            <span className="text-xl font-bold text-slate-300 font-mono">${estimatedCloudMonthlyCost.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">@ ~$3.00 per 1M tokens</span>
          </div>

          <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg">
            <span className="text-[10px] text-cyan-400 block font-mono uppercase tracking-wider font-bold">AEL Edge On-Device Cost</span>
            <span className="text-xl font-bold text-white font-mono">$0.00</span>
            <span className="text-[10px] text-cyan-300 block mt-0.5">100% Client Device Execution</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center justify-between font-mono">
          <span>Total Annual On-Device Cloud Savings:</span>
          <strong className="text-cyan-400 text-sm font-bold">${estimatedCloudAnnualCost.toLocaleString()} / year</strong>
        </div>
      </div>
    </div>
  );
};
