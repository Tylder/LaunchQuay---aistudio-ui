import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';

export const SpeedRevenueChart: React.FC = () => {
  // Chart Interaction State
  const [activeZone, setActiveZone] = useState<'fast' | 'risky' | 'slow' | null>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleInteraction = (clientX: number) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    
    // Map pixel width to SVG ViewBox width (1000 units)
    const svgX = (x / width) * 1000;
    setCursorX(x); // Keep pixel value for the HTML cursor line

    // Boundaries based on SVG paths: 
    // Fast ends at ~157 (2s)
    // Risky ends at ~368 (4s)
    if (svgX < 157) {
      setActiveZone('fast');
    } else if (svgX < 368) {
      setActiveZone('risky');
    } else {
      setActiveZone('slow');
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleInteraction(e.clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    // Prevent scroll if needed, but for now just track
    handleInteraction(e.touches[0].clientX);
  };

  const onLeave = () => {
    setActiveZone(null);
    setCursorX(null);
  };

  // Helper to determine opacity based on active state
  const getOpacity = (zone: 'fast' | 'risky' | 'slow') => {
    if (!activeZone) return 1; // Default state
    return activeZone === zone ? 1 : 0.2;
  };

  const getCardStyle = (zone: 'fast' | 'risky' | 'slow') => {
    const isActive = activeZone === zone;
    const isDimmed = activeZone && !isActive;
    
    return `transition-all duration-300 transform ${
      isActive 
        ? 'scale-105 opacity-100 z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-opacity-100 bg-brand-900' 
        : isDimmed 
          ? 'opacity-30 scale-95 blur-[1px]' 
          : 'opacity-90 hover:opacity-100'
    }`;
  };

  return (
    <section className="bg-brand-950 border-t border-brand-800 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Speed = Revenue</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             The correlation between page load time and conversion rate is well-documented. 
             <span className="hidden md:inline"> Hover over the chart to explore the data.</span>
             <span className="md:hidden"> Tap the chart to explore.</span>
           </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto bg-brand-900/20 rounded-xl border border-brand-800 p-4 md:p-8">
          
          {/* Tech Context Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div 
              className={`flex items-center gap-3 p-3 rounded bg-emerald-500/10 border border-emerald-500/20 transition-opacity duration-300 ${activeZone && activeZone !== 'fast' ? 'opacity-30' : 'opacity-100'}`}
            >
              <div className="text-xl">⚡</div>
              <div>
                <div className="text-emerald-400 font-bold text-sm">0.5s – 2.0s</div>
                <div className="text-slate-400 text-xs">Lean images, minimal JS, static shell</div>
              </div>
            </div>
            <div 
              className={`flex items-center gap-3 p-3 rounded bg-amber-500/10 border border-amber-500/20 transition-opacity duration-300 ${activeZone && activeZone !== 'risky' ? 'opacity-30' : 'opacity-100'}`}
            >
              <div className="text-xl">⚠️</div>
              <div>
                <div className="text-amber-400 font-bold text-sm">2.0s – 4.0s</div>
                <div className="text-slate-400 text-xs">Heavy hero media, layout thrash</div>
              </div>
            </div>
            <div 
              className={`flex items-center gap-3 p-3 rounded bg-red-500/10 border border-red-500/20 transition-opacity duration-300 ${activeZone && activeZone !== 'slow' ? 'opacity-30' : 'opacity-100'}`}
            >
              <div className="text-xl">🛑</div>
              <div>
                <div className="text-red-400 font-bold text-sm">4.0s+</div>
                <div className="text-slate-400 text-xs">Bloated bundles, blocking tags</div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div 
            ref={chartRef}
            className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-brand-950/50 rounded-lg border border-brand-800/50 overflow-hidden cursor-crosshair select-none touch-none"
            onMouseMove={onMouseMove}
            onMouseLeave={onLeave}
            onTouchStart={onTouchMove}
            onTouchMove={onTouchMove}
            onTouchEnd={onLeave}
          >
             <svg className="w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
                {/* Grid & Axis */}
                <line x1="0" y1="350" x2="1000" y2="350" stroke="#1e293b" strokeWidth="2" />
                
                {/* X Axis Labels */}
                <text x="10" y="380" className="text-xs fill-slate-500 font-mono">0.5s</text>
                <text x="52" y="380" className="text-xs fill-slate-500 font-mono">1s</text>
                <text x="157" y="380" className="text-xs fill-slate-500 font-mono">2s</text>
                <text x="368" y="380" className="text-xs fill-slate-500 font-mono">4s</text>
                <text x="473" y="380" className="text-xs fill-slate-500 font-mono">5s</text>
                <text x="960" y="380" className="text-xs fill-slate-500 font-mono">10s</text>

                {/* Y Axis Label */}
                <text x="-200" y="20" className="text-xs fill-slate-600 font-mono tracking-widest uppercase" transform="rotate(-90)" textAnchor="middle">Relative Conversion Rate</text>

                {/* Gradients */}
                <defs>
                   <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                   </linearGradient>
                   <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                   </linearGradient>
                   <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                   </linearGradient>
                </defs>

                {/* Paths with transitions */}
                {/* Green Segment */}
                <g style={{ opacity: getOpacity('fast'), transition: 'opacity 0.3s ease' }}>
                  <path d="M0,20 Q52,50 157,110" fill="none" stroke="#10b981" strokeWidth={activeZone === 'fast' ? 5 : 3} />
                  <path d="M0,20 Q52,50 157,110 V350 H0 Z" fill="url(#gradGreen)" stroke="none" />
                  <circle cx="52" cy="50" r={activeZone === 'fast' ? 6 : 4} fill="#10b981" stroke="white" strokeWidth="1.5" />
                </g>
                
                {/* Amber Segment */}
                <g style={{ opacity: getOpacity('risky'), transition: 'opacity 0.3s ease' }}>
                  <path d="M157,110 Q262,165 368,215" fill="none" stroke="#f59e0b" strokeWidth={activeZone === 'risky' ? 5 : 3} />
                  <path d="M157,110 Q262,165 368,215 V350 H157 Z" fill="url(#gradAmber)" stroke="none" />
                  <circle cx="262" cy="162" r={activeZone === 'risky' ? 6 : 4} fill="#f59e0b" stroke="white" strokeWidth="1.5" />
                </g>

                {/* Red Segment */}
                <g style={{ opacity: getOpacity('slow'), transition: 'opacity 0.3s ease' }}>
                  <path d="M368,215 Q473,260 1000,320" fill="none" stroke="#ef4444" strokeWidth={activeZone === 'slow' ? 5 : 3} />
                  <path d="M368,215 Q473,260 1000,320 V350 H368 Z" fill="url(#gradRed)" stroke="none" />
                  <circle cx="473" cy="251" r={activeZone === 'slow' ? 6 : 4} fill="#ef4444" stroke="white" strokeWidth="1.5" />
                </g>
             </svg>
              
             {/* Vertical Cursor Line */}
             {cursorX !== null && (
               <div 
                 className="absolute top-0 bottom-0 w-px bg-white/50 border-r border-dashed border-slate-300 pointer-events-none z-10"
                 style={{ left: cursorX }}
               >
                 <div className="absolute top-2 -translate-x-1/2 bg-slate-800 text-[10px] text-white px-1.5 py-0.5 rounded border border-slate-600 whitespace-nowrap">
                   {activeZone === 'fast' ? 'Good' : activeZone === 'risky' ? 'Needs Work' : 'Critical'}
                 </div>
               </div>
             )}

             {/* HTML Annotations with dynamic styles */}
             <div className={`absolute top-[8%] left-[8%] md:left-[6%] max-w-[140px] md:max-w-[200px] pointer-events-none ${getCardStyle('fast')}`}>
                <div className="bg-brand-950/90 border border-emerald-500/30 p-2 rounded text-[10px] md:text-xs text-emerald-200 shadow-xl backdrop-blur-sm">
                  <strong>Benchmark:</strong> 1s pages convert ≈3× better than 5s pages (Portent).
                </div>
             </div>

             <div className={`absolute top-[28%] left-[25%] md:left-[28%] max-w-[140px] md:max-w-[200px] pointer-events-none ${getCardStyle('risky')}`}>
                 <div className="bg-brand-900/95 border border-amber-500/30 p-2 rounded text-[10px] md:text-xs text-amber-200 shadow-xl backdrop-blur-sm">
                  Every extra second (0–5s) drops conversion by ≈4.4%.
                </div>
             </div>

             <div className={`absolute top-[50%] left-[48%] md:left-[48%] max-w-[140px] md:max-w-[200px] pointer-events-none ${getCardStyle('slow')}`}>
                 <div className="bg-brand-900/95 border border-red-500/30 p-2 rounded text-[10px] md:text-xs text-red-200 shadow-xl backdrop-blur-sm">
                  Bounce probability increases ~90% vs 1s (Google).
                </div>
             </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Illustrative curve fitted from Portent and Google/Deloitte case studies. Actual values vary by site and vertical.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
