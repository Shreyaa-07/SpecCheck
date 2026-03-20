import React from 'react';
import { AlertTriangle, Info, ExternalLink, ChevronDown } from 'lucide-react';

function IssueList({ violations }) {
  if (!violations || violations.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-green-200 shadow-sm flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Awesome Job!</h3>
        <p className="text-green-600">No accessibility violations were found on this page.</p>
      </div>
    );
  }

  const badgeColors = {
    critical: 'bg-red-500',
    serious: 'bg-orange-500',
    moderate: 'bg-yellow-500',
    minor: 'bg-blue-500'
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-xl font-semibold text-slate-800">Accessibility Issues</h3>
        <span className="bg-red-50 border border-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {violations.reduce((acc, v) => acc + v.nodes.length, 0)} Total Occurrences
        </span>
      </div>
      
      <div className="space-y-4">
        {violations.map((violation, idx) => (
          <details key={idx} className="group border border-slate-200 rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden bg-white hover:border-slate-300 transition-colors">
            <summary className="flex items-center cursor-pointer p-4 bg-slate-50 hover:bg-slate-100 transition-colors relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: badgeColors[violation.impact]?.replace('bg-', '') || '#94a3b8' }} />
              <div className="flex-1 flex items-center pl-2">
                <span className={`w-3 h-3 rounded-full mr-4 shadow-sm ${badgeColors[violation.impact] || 'bg-slate-400'}`}></span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-base">{violation.help}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize font-medium tracking-wide">
                    {violation.impact} 
                    <span className="mx-2">•</span> 
                    {violation.nodes.length} Element{violation.nodes.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
            </summary>
            
            <div className="p-5 bg-white border-t border-slate-100 text-sm animate-in slide-in-from-top-2 duration-200">
              <p className="text-slate-600 mb-5 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">{violation.description}</p>
              
              <div className="space-y-4 mb-5">
                <h5 className="font-semibold text-slate-700 text-xs uppercase tracking-wider flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1" /> Affected Elements Structure
                </h5>
                <div className="grid gap-3">
                  {violation.nodes.map((node, nodeIdx) => (
                    <div key={nodeIdx} className="bg-red-50/50 p-4 rounded-lg border border-red-100 group-hover:border-red-200 transition-colors">
                      <div className="font-mono text-xs overflow-x-auto text-red-800 bg-red-100/50 p-2 rounded mb-2 border border-red-100/50 whitespace-pre-wrap rounded-md break-all">
                        {node.html}
                      </div>
                      <div className="text-red-700/80 text-xs font-medium bg-white px-2 py-1.5 rounded inline-block border border-red-100 mt-1 shadow-sm">
                        Fix: {node.failureSummary || 'Needs review'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <a 
                href={violation.helpUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline bg-indigo-50 px-3 py-1.5 rounded-md transition-colors w-max"
              >
                Learn how to fix this
                <ExternalLink className="w-4 h-4 ml-1.5" />
              </a>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default IssueList;
