import React, { useState } from 'react';
import { X, Copy, Check, Download, FileJson } from 'lucide-react';
import { SYNAPSE_BLUEPRINT } from '../data/blueprintData';

interface RawJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RawJsonModal: React.FC<RawJsonModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(SYNAPSE_BLUEPRINT, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AEL-QA88-Synapse-AI-Blueprint-v1.88.4.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900/95 border border-slate-800 rounded-lg w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2 text-white font-mono font-bold text-xs uppercase tracking-wider">
            <FileJson className="w-4 h-4 text-blue-400" />
            <span>AEL-QA88 Synapse AI Blueprint Specification (JSON)</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded text-xs font-mono border border-slate-800 transition-colors uppercase tracking-wider"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-bold transition-colors uppercase tracking-wider border border-blue-400/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .json</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Code Viewer Body */}
        <div className="p-5 bg-slate-950 overflow-y-auto flex-1 font-mono text-xs text-blue-300 leading-relaxed">
          <pre className="whitespace-pre-wrap selection:bg-blue-500 selection:text-slate-950">
            {jsonString}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs font-mono flex justify-between items-center">
          <span className="uppercase tracking-wider text-[10px]">Version 1.88.4 • 100% Valid JSON Blueprint Schema</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-xs font-mono uppercase tracking-wider border border-slate-800"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
