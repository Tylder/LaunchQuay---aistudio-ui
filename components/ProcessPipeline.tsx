import React, { useRef } from 'react';

const STAGES = [
  {
    id: 1,
    title: 'Discover',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    line: "Questionnaire promised ≤1h; no pricing yet—pure signal gathering.",
    trust: "We don't quote until we understand. Zero financial commitment to start."
  },
  {
    id: 2,
    title: 'Plan & Commit',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    line: "Opportunity Map + Scope Sketch + option matrix → review call + payment link.",
    trust: "Decision window set. All add-ons and levers are priced before you commit."
  },
  {
    id: 3,
    title: 'Product Direction',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    line: "Mini PRD, IA/flows, UI manifest, vertical slice prototype, risk log, and build SOW.",
    trust: "Everything approved before code. Risks logged transparently. Sprint credit applied."
  },
  {
    id: 4,
    title: 'Skeleton & CI',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    line: "Repo skeleton, lint/typecheck setup, performance/observability budgets, per-PR previews.",
    trust: "CI blocks bad merges. Lighthouse performance gates wired in from Day 1."
  },
  {
    id: 5,
    title: 'UI Build',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    line: "First UI pass → integration → replace preview with production shell under feature flags.",
    trust: "Design tokens enforced. Feature-flagged shell. Upwork params preserved. Zero cookies."
  },
  {
    id: 6,
    title: 'Hardening & Launch',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    line: "Backend/data contracts green → audits/budgets met → launch checklist + handover.",
    trust: "Contracts and staging e2e green. Perf/A11y/Security audits cleared. 7-day watch."
  }
];

export const ProcessPipeline: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Approx card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-brand-950 border-t border-brand-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Controls */}
        <div className="px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">How We Build Trust</h2>
            <p className="text-slate-400">Transparent inputs. Predictable outputs. No black boxes.</p>
          </div>
          
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-brand-800 text-slate-400 hover:text-white hover:bg-brand-900 hover:border-brand-500 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-brand-800 text-slate-400 hover:text-white hover:bg-brand-900 hover:border-brand-500 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        {/* 'snap-x' enables CSS scroll snapping. 'uncontained' look created by padding and gap. */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 px-4 sm:px-6 lg:px-8 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {STAGES.map((stage) => (
            <div 
              key={stage.id}
              className="relative flex-shrink-0 w-[85vw] sm:w-[400px] snap-center group"
            >
              <div className="h-full bg-brand-900/30 border border-brand-800 backdrop-blur-sm rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-600 hover:bg-brand-900/50 hover:shadow-2xl hover:shadow-brand-900/50">
                
                {/* Background Number */}
                <div className="absolute top-4 right-6 text-8xl font-bold text-brand-950/80 select-none transition-colors group-hover:text-brand-950/40 pointer-events-none">
                  {stage.id}
                </div>

                {/* Content Header */}
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-950 border border-brand-800 flex items-center justify-center text-brand-400 mb-4 shadow-lg group-hover:scale-110 group-hover:border-brand-500 transition-all duration-300">
                    {stage.icon}
                  </div>
                  <div className="inline-block px-2 py-1 rounded bg-brand-800/50 text-brand-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    Stage 0{stage.id}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
                </div>

                {/* Body */}
                <div className="relative z-10 mb-8 flex-grow">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {stage.line}
                  </p>
                </div>

                {/* Trust Anchor Footer */}
                <div className="relative z-10 mt-auto pt-6 border-t border-brand-800 group-hover:border-brand-700 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-500 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-emerald-500 uppercase tracking-wide mb-1">
                        Trust Anchor
                      </span>
                      <p className="text-sm text-slate-400 group-hover:text-emerald-100/90 transition-colors">
                        {stage.trust}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          {/* Spacer to ensure the last card can be snapped to center comfortably if needed, 
              though px-8 usually handles it. Adding a small invisible div ensures margin. */}
          <div className="w-4 flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
