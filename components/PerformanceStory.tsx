import React, { useState, useRef, useMemo } from 'react';
import { useReferral } from '../hooks/useReferral';
import { Button } from './Button';
import { UPWORK_PROFILE_URL } from '../constants';

// --- DATA & CONSTANTS FOR PERFORMANCE STORY ---
const STORY_DATA = [
  { t: 0.5, conv: 3.20, bounce: 5.0, relConv: 104.9, loss: -4.9, sales: 32.0, bounceVs1s: -20 },
  { t: 1.0, conv: 3.05, bounce: 7.0, relConv: 100.0, loss: 0.0, sales: 30.5, bounceVs1s: 0 },
  { t: 1.5, conv: 2.40, bounce: 8.0, relConv: 78.7, loss: 21.3, sales: 24.0, bounceVs1s: 10 },
  { t: 2.0, conv: 1.68, bounce: 9.0, relConv: 55.1, loss: 44.9, sales: 16.8, bounceVs1s: 20 },
  { t: 3.0, conv: 1.40, bounce: 11.0, relConv: 45.9, loss: 54.1, sales: 14.0, bounceVs1s: 40 },
  { t: 4.0, conv: 1.20, bounce: 20.0, relConv: 39.3, loss: 60.7, sales: 12.0, bounceVs1s: 130 },
  { t: 5.0, conv: 1.08, bounce: 38.0, relConv: 35.4, loss: 64.6, sales: 10.8, bounceVs1s: 310 },
  { t: 7.0, conv: 0.90, bounce: 48.0, relConv: 29.5, loss: 70.5, sales: 9.0, bounceVs1s: 410 },
  { t: 10.0, conv: 0.60, bounce: 60.0, relConv: 19.7, loss: 80.3, sales: 6.0, bounceVs1s: 530 },
];

// Updated templates to consistently show sales metrics
const STORY_RANGES = [
  { 
    id: 'ultra_fast', max: 0.9, 
    title: "Elite Speed",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. {{relConv}}% power.",
    sales: "Your site feels instant. Competitors feel broken. You win."
  },
  { 
    id: 'fast_but_not_elite', max: 1.8,
    title: "Hidden Revenue Loss",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. {{loss}}% lost sales vs 1s.",
    sales: "0.1s improvement = ~8% more conversions. Optimize now."
  },
  { 
    id: 'risk_zone', max: 3.5,
    title: "Visitors Give Up",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. {{bounceVs1s}} extra lost users.",
    sales: "Typical DIY zone. Users leave, ads waste money."
  },
  { 
    id: 'pain_zone', max: 5.5,
    title: "Burning Budget",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. Conv. down {{loss}}%.",
    sales: "Ad budget wasted on clicks that never load. Fix it."
  },
  { 
    id: 'really_slow', max: 8.0,
    title: "Broken Experience",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. Users don't wait.",
    sales: "Users don't wait. Rebuild pays for itself fast."
  },
  { 
    id: 'almost_unusable', max: 999,
    title: "Invisible Online",
    numeric: "{{bounce}}% bounce. ~{{sales}} sales/1k visits. Zero impact.",
    sales: "Performance is survival. You need a rebuild."
  }
];

// Helper to format text
const formatStoryText = (template: string, data: typeof STORY_DATA[0]) => {
  return template
    .replace('{{t}}', data.t.toFixed(1))
    .replace('{{bounce}}', data.bounce.toFixed(1))
    .replace('{{relConv}}', data.relConv.toFixed(0))
    .replace('{{sales}}', data.sales.toFixed(1))
    .replace('{{loss}}', Math.abs(data.loss).toFixed(0))
    .replace('{{bounceVs1s}}', Math.abs(data.bounceVs1s).toFixed(0))
    .replace('{{100_minus_bounce}}', (100 - data.bounce).toFixed(1));
};

const interpolate = (start: number, end: number, ratio: number) => start + (end - start) * ratio;

// --- CURVE SMOOTHING HELPERS ---
const line = (pointA: {x:number, y:number}, pointB: {x:number, y:number}) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

const controlPoint = (current: {x:number, y:number}, previous: {x:number, y:number}, next: {x:number, y:number}, reverse?: boolean) => {
  const p = previous || current;
  const n = next || current;
  const o = line(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * 0.2;
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return { x, y };
};

const bezierCommand = (point: {x:number, y:number}, i: number, a: {x:number, y:number}[]) => {
  const cps = controlPoint(a[i - 1], a[i - 2], point);
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cps.x.toFixed(2)},${cps.y.toFixed(2)} ${cpe.x.toFixed(2)},${cpe.y.toFixed(2)} ${point.x.toFixed(2)},${point.y.toFixed(2)}`;
};

const getSmoothPath = (points: {x:number, y:number}[]) => {
  return points.reduce((acc, point, i, a) => 
    i === 0 
      ? `M ${point.x.toFixed(2)},${point.y.toFixed(2)}` 
      : `${acc} ${bezierCommand(point, i, a)}`
  , '');
};

export const PerformanceStory: React.FC = () => {
  const referralSource = useReferral();
  const isUpwork = referralSource === 'upwork';
  
  // Initialize with the data point around 3.0s (index 4 in STORY_DATA)
  const [activeData, setActiveData] = useState<typeof STORY_DATA[0]>(STORY_DATA[4]);
  const chartRef = useRef<HTMLDivElement>(null);
  const activeRange = STORY_RANGES.find(r => activeData.t <= r.max) || STORY_RANGES[STORY_RANGES.length - 1];

  // Log Scale X Helpers
  const minLog = Math.log10(0.5);
  const maxLog = Math.log10(10);
  const logRange = maxLog - minLog;
  
  const getX = (t: number) => {
    return ((Math.log10(t) - minLog) / logRange) * 1000;
  };

  const getYConv = (val: number) => {
    return 480 - (val / 3.5) * 460;
  };

  const getYBounce = (val: number) => {
    return 480 - (val / 65) * 460;
  };

  const getCTALabel = (id: string) => {
    if (['ultra_fast', 'fast_but_not_elite'].includes(id)) return "Secure This Speed";
    if (id === 'risk_zone') return "Get a Speed-First Build";
    return "Fix My Site Speed";
  };

  // Pre-calculate smooth paths
  const pathConv = useMemo(() => {
    const points = STORY_DATA.map(d => ({ x: getX(d.t), y: getYConv(d.conv) }));
    return getSmoothPath(points);
  }, []);

  const pathBounce = useMemo(() => {
    const points = STORY_DATA.map(d => ({ x: getX(d.t), y: getYBounce(d.bounce) }));
    return getSmoothPath(points);
  }, []);

  const handleInteraction = (clientX: number) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    
    // Clamp x to within the chart area
    const clampedX = Math.max(0, Math.min(width, x));
    
    // Calculate SVG X (0-1000 domain)
    const svgX = (clampedX / width) * 1000;

    // 1. Calculate t from svgX (Inverse Log)
    const logT = (svgX / 1000) * logRange + minLog;
    let t = Math.pow(10, logT);

    // Clamp t to data bounds
    t = Math.max(0.5, Math.min(10, t));

    // 2. Find surrounding data points for interpolation
    let idx = 0;
    while(idx < STORY_DATA.length - 1 && STORY_DATA[idx + 1].t < t) {
      idx++;
    }
    
    if (idx >= STORY_DATA.length - 1) idx = STORY_DATA.length - 2;

    const p0 = STORY_DATA[idx];
    const p1 = STORY_DATA[idx + 1];

    // 3. Calculate interpolation ratio
    const x0 = getX(p0.t);
    const x1 = getX(p1.t);
    const ratio = x1 === x0 ? 0 : (svgX - x0) / (x1 - x0);
    const clampedRatio = Math.max(0, Math.min(1, ratio));

    // 4. Interpolate all values
    const interpolated: typeof STORY_DATA[0] = {
      t: t,
      conv: interpolate(p0.conv, p1.conv, clampedRatio),
      bounce: interpolate(p0.bounce, p1.bounce, clampedRatio),
      relConv: interpolate(p0.relConv, p1.relConv, clampedRatio),
      loss: interpolate(p0.loss, p1.loss, clampedRatio),
      sales: interpolate(p0.sales, p1.sales, clampedRatio),
      bounceVs1s: interpolate(p0.bounceVs1s, p1.bounceVs1s, clampedRatio)
    };

    setActiveData(interpolated);
  };

  return (
    <section className="bg-brand-950 border-t border-brand-800 py-12 md:py-24 animate-fade-in relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
       </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-brand-500 font-mono text-xs uppercase tracking-widest mb-2 block">Interactive Analysis</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">The Performance Story</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Drag across the chart to see the impact.
          </p>
        </div>

        {/* Layout: Graph Top / Text Bottom on Mobile. Text Top / Graph Bottom on Desktop. */}
        <div className="flex flex-col-reverse md:flex-col gap-6">
          
          {/* Story Panel */}
          <div className="bg-brand-900 border border-brand-800 rounded-xl p-5 shadow-lg transition-all duration-300 relative overflow-hidden md:h-44 flex flex-col justify-center">
            {/* Ambient Background Glow based on zone */}
            <div className={`absolute top-0 right-0 w-96 h-96 blur-[100px] opacity-10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none transition-colors duration-500 ${
                activeRange.id === 'ultra_fast' ? 'bg-emerald-500' :
                activeRange.id === 'risk_zone' ? 'bg-amber-500' :
                'bg-red-500'
            }`}></div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="w-full text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    activeRange.id === 'ultra_fast' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    activeRange.id === 'risk_zone' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                    'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}>
                    Load Time: {activeData.t.toFixed(2)}s
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {activeRange.title}
                </h3>
                
                <p className="text-sm font-mono text-brand-300 mb-1">
                  {formatStoryText(activeRange.numeric, activeData)}
                </p>
                 <p className="text-slate-400 text-sm">
                  {formatStoryText(activeRange.sales, activeData)}
                </p>
                
                {/* Mobile CTA Button - Hidden on Desktop */}
                <div className="mt-4 md:hidden flex justify-center">
                  {isUpwork ? (
                    <Button href={UPWORK_PROFILE_URL} variant="secondary" className="px-6 py-2 text-sm shadow-lg shadow-brand-900/50">
                      {getCTALabel(activeRange.id)}
                    </Button>
                  ) : (
                    <Button to="/contact" variant="primary" className="px-6 py-2 text-sm shadow-lg shadow-brand-900/50">
                      {getCTALabel(activeRange.id)}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Column */}
          <div className="w-full">
            <div 
              className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl border border-brand-800 shadow-2xl overflow-hidden select-none"
              style={{
                background: `linear-gradient(to right, 
                  rgba(16,185,129, 0.1) 0%, 
                  rgba(16,185,129, 0.1) 35%, 
                  rgba(245,158,11, 0.1) 50%, 
                  rgba(239,68,68, 0.1) 75%, 
                  rgba(239,68,68, 0.2) 100%
                )`
              }}
            >
              
              {/* Interaction Overlay */}
              <div 
                ref={chartRef}
                className="absolute inset-0 z-20 cursor-crosshair touch-none"
                onMouseMove={(e) => handleInteraction(e.clientX)}
                onTouchMove={(e) => handleInteraction(e.touches[0].clientX)}
                onTouchStart={(e) => handleInteraction(e.touches[0].clientX)}
              ></div>

              <svg className="w-full h-full pointer-events-none" viewBox="0 0 1000 500">
                {/* Axes Lines */}
                <line x1="0" y1="480" x2="1000" y2="480" stroke="#334155" strokeWidth="2" />
                <line x1="0" y1="20" x2="0" y2="480" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>
                <line x1="1000" y1="20" x2="1000" y2="480" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>

                {/* Vertical Grid (Log) */}
                {STORY_DATA.map((pt) => (
                  <line 
                    key={pt.t} 
                    x1={getX(pt.t)} y1="20" x2={getX(pt.t)} y2="480" 
                    stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2"
                  />
                ))}

                {/* Conversion Path (Green) */}
                <path d={pathConv} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                
                {/* Bounce Path (Red) */}
                <path d={pathBounce} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" />

                {/* Active Cursor */}
                <line 
                  x1={getX(activeData.t)} y1="20" x2={getX(activeData.t)} y2="480" 
                  stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
                />

                {/* Active Dots */}
                <circle cx={getX(activeData.t)} cy={getYConv(activeData.conv)} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx={getX(activeData.t)} cy={getYBounce(activeData.bounce)} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />

                {/* Axis Labels */}
                {STORY_DATA.map((pt) => (
                  <text 
                    key={pt.t} 
                    x={getX(pt.t)} y="495" 
                    fill="#64748b" 
                    fontSize="10"
                    textAnchor="middle"
                    className="font-mono transition-all"
                  >
                    {pt.t}s
                  </text>
                ))}
              </svg>

              {/* In-chart Legends */}
              <div className="absolute top-4 left-4 flex gap-4 md:gap-6 pointer-events-none bg-brand-950/80 backdrop-blur px-3 py-1 rounded-full border border-brand-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-1 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-400 text-[10px] md:text-xs font-bold uppercase">Conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-1 bg-red-500 rounded-full"></div>
                  <span className="text-red-400 text-[10px] md:text-xs font-bold uppercase">Bounce</span>
                </div>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="md:hidden text-center mt-3 text-slate-500 text-xs animate-pulse">
              ← Drag graph to simulate load time →
            </div>
            
            {/* References Footer */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-slate-500 font-mono">
               <span>[1] Portent (2022) Site Speed Study</span>
               <span>[2] Google/SOASTA Deep Learning Research</span>
               <span>[3] Deloitte "Milliseconds Make Millions"</span>
               <span>[4] Akamai Online Retail Performance</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
