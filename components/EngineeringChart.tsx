import React from 'react';

export const EngineeringChart: React.FC = () => {
  return (
    <section className="bg-brand-950 border-b border-brand-800 pb-16 pt-8 relative">
       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Milliseconds Make Millions</h3>
             <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Detailed Logarithmic Analysis [0.5s - 10s]</p>
          </div>

          <div className="relative w-full aspect-[16/10] md:aspect-[2/1] bg-brand-950 rounded-xl border border-brand-800 p-6 md:p-10 shadow-2xl overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
             
             <svg className="w-full h-full" viewBox="0 0 1000 500">
                {/* Defs */}
                <defs>
                   <pattern id="grid" width="231" height="500" patternUnits="userSpaceOnUse">
                      <path d="M 231 0 L 231 500" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4"/>
                   </pattern>
                   <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                   </marker>
                </defs>

                {/* Log Grid Background */}
                {/* 
                   Log Calculation: x = (log10(t) - log10(0.5)) / (log10(10) - log10(0.5)) * 1000 
                   minLog = -0.301, maxLog = 1, range = 1.301
                   
                   Ticks:
                   0.5s = 0
                   1.0s = 231
                   1.1s = 262 (Delta 31px)
                   2.0s = 462
                   3.0s = 597
                   5.0s = 768
                   10.0s = 1000
                */}
                
                {/* Grid Lines */}
                {[0, 231, 262, 462, 597, 768, 1000].map(x => (
                   <line key={x} x1={x} y1="0" x2={x} y2="450" stroke="#1e293b" strokeWidth="1" />
                ))}
                <line x1="0" y1="450" x2="1000" y2="450" stroke="#334155" strokeWidth="2" /> {/* X Axis */}
                
                {/* Data Points & Curve 
                   Y Scale: 0 to 1.1 (110%)
                   100% = 40 (Top margin)
                   0% = 450
                   Formula: y = 450 - (val/1.1 * 410)
                   
                   0.5s: 1.05 -> y ~ 58
                   1.0s: 1.00 -> y ~ 77
                   1.1s: 0.916 -> y ~ 108
                   2.0s: 0.85 -> y ~ 133
                   3.0s: 0.65 -> y ~ 207
                   5.0s: 0.33 -> y ~ 327
                   10.0s: 0.20 -> y ~ 375
                */}
                <path 
                   d="M0,58 C80,60 180,77 231,77 L262,108 C300,115 400,125 462,133 C520,160 550,180 597,207 C650,250 700,300 768,327 C850,350 920,365 1000,375" 
                   fill="none" 
                   stroke="#22d3ee" 
                   strokeWidth="3" 
                   strokeLinecap="round"
                />

                {/* Points */}
                <g fill="#020617" stroke="#22d3ee" strokeWidth="2">
                   <circle cx="0" cy="58" r="4" />
                   <circle cx="231" cy="77" r="6" fill="#22d3ee" /> {/* 1s Baseline */}
                   <circle cx="262" cy="108" r="4" stroke="#ef4444" /> {/* 1.1s Danger */}
                   <circle cx="462" cy="133" r="4" />
                   <circle cx="597" cy="207" r="4" />
                   <circle cx="768" cy="327" r="4" />
                   <circle cx="1000" cy="375" r="4" />
                </g>

                {/* 0.1s Highlight Annotation */}
                <g>
                   <path d="M231,77 Q246,40 262,77" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                   <line x1="262" y1="77" x2="262" y2="100" stroke="#ef4444" strokeWidth="1" />
                   <text x="246" y="30" fill="#ef4444" textAnchor="start" className="text-[10px] font-mono font-bold">0.1s SLOWER</text>
                   <text x="280" y="30" fill="#ef4444" textAnchor="start" className="text-[10px] font-mono opacity-80">≈ -8.4% Conv. [Deloitte]</text>
                </g>

                {/* X Labels (Rotated for tech feel) */}
                <g className="text-[10px] md:text-xs font-mono fill-slate-400" style={{ textAnchor: 'middle' }}>
                   <text x="0" y="475">0.5s</text>
                   <text x="231" y="475" className="fill-white font-bold">1.0s</text>
                   <text x="262" y="490" className="fill-red-400">1.1s</text>
                   <text x="462" y="475">2.0s</text>
                   <text x="597" y="475">3.0s</text>
                   <text x="768" y="475">5.0s</text>
                   <text x="1000" y="475">10.0s</text>
                </g>

                {/* Tick Context Labels */}
                <g className="text-[8px] md:text-[10px] font-mono fill-slate-500 uppercase">
                   <text x="10" y="40" className="fill-emerald-400">Instant Feel</text>
                   <text x="220" y="65" textAnchor="end" className="fill-white">Baseline (100%)</text>
                   <text x="470" y="120">Ideally &lt;2s [Portent]</text>
                   <text x="610" y="200">+32% Bounce [Google]</text>
                   <text x="780" y="315">3x Drop [Portent]</text>
                   <text x="990" y="365" textAnchor="end">5x Drop</text>
                </g>
             </svg>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] text-slate-500 font-mono border-t border-brand-800 pt-4">
             <span>[1] Portent (2022) Site Speed Study</span>
             <span>[2] Deloitte "Milliseconds Make Millions"</span>
             <span>[3] Google/SOASTA Deep Learning Research</span>
          </div>
       </div>
    </section>
  );
};
