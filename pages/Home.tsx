import React from 'react';
import { useReferral } from '../hooks/useReferral';
import { Button } from '../components/Button';
import { SERVICES, CASE_STUDIES, UPWORK_PROFILE_URL } from '../constants';
import { Link } from 'react-router-dom';
import { SpeedRevenueChart } from '../components/SpeedRevenueChart';
import { EngineeringChart } from '../components/EngineeringChart';
import { PerformanceStory } from '../components/PerformanceStory';
import { ProcessPipeline } from '../components/ProcessPipeline';
import { Spotlight, SpotlightCard } from '../components/Spotlight';

const Home: React.FC = () => {
  const referralSource = useReferral();
  const isUpwork = referralSource === 'upwork';

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-800 text-brand-300 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Accepting New Projects for Q4
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            The React Studio
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We build lightning-fast Next.js applications that rank better, convert higher, and scale effortlessly. No bloat, just engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isUpwork ? (
              <>
                <Button href={UPWORK_PROFILE_URL} variant="secondary" className="min-w-[200px]">
                  Continue on Upwork
                </Button>
                <Button to="/case-studies" variant="ghost">View Work</Button>
              </>
            ) : (
              <>
                <Button to="/contact" variant="primary" className="min-w-[200px]">
                  Book a Strategy Call
                </Button>
                <Button to="/case-studies" variant="outline">View Case Studies</Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="border-y border-brand-800 bg-brand-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Technologies we master</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Vercel'].map((tech) => (
               <span key={tech} className="text-xl font-bold text-slate-300 flex items-center gap-2">
                 {/* Placeholder for SVG icon */}
                 <div className="h-2 w-2 bg-brand-500 rounded-full"></div> {tech}
               </span>
             ))}
           </div>
        </div>
      </section>

      {/* Services Snapshot (Spotlight) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Technical Capabilities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Specific solutions for complex problems. We don't just "build websites", we engineer revenue-generating platforms.</p>
        </div>
        
        <Spotlight className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 group">
          {SERVICES.map((service) => (
            <SpotlightCard key={service.id} className="p-8">
              <div className="w-12 h-12 rounded-lg bg-brand-950 border border-brand-800 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{service.description}</p>
            </SpotlightCard>
          ))}
        </Spotlight>
      </section>

      {/* PROCESS PIPELINE (New Section) */}
      <ProcessPipeline />

      {/* Case Study Teaser */}
      <section className="py-24 bg-brand-900/20 border-y border-brand-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Work</h2>
              <p className="text-slate-400">Real results from recent engagements.</p>
            </div>
            <Link to="/case-studies" className="hidden md:flex items-center text-brand-400 font-medium hover:text-brand-300 transition-colors mt-4 md:mt-0">
              View all projects <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="group relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-brand-800 mb-6 border border-brand-800 group-hover:border-brand-500/50 transition-colors">
                  <img 
                    src={study.heroImage} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  {study.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-brand-300 bg-brand-900/50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                  <Link to={`/case-studies/${study.id}`}>{study.title}</Link>
                </h3>
                <p className="text-slate-400 mb-4">{study.summary}</p>
                <div className="flex gap-6 border-t border-brand-800 pt-4">
                  {study.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="block text-xl font-bold text-white">{m.value}</span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/case-studies" className="inline-flex items-center text-brand-400 font-medium hover:text-brand-300">
              View all projects <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Speed vs Revenue Chart (Emotional/Broad) */}
      {/*  <SpeedRevenueChart /> */}

      {/* Engineering Log Scale Chart */}
      {/*  <EngineeringChart /> */}
      
      {/* PERFORMANCE STORY (NEW SECTION) */}
      <PerformanceStory />

      {/* CTA Section */}
      <section className="py-32 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scale?</h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          We only take on 2-3 new clients per quarter to ensure focused delivery. Let's discuss if we're a good fit for your performance goals.
        </p>
        <div className="flex justify-center">
          {isUpwork ? (
             <Button href={UPWORK_PROFILE_URL} variant="secondary" className="px-8 py-4 text-lg">
                Start Contract on Upwork
              </Button>
          ) : (
            <Button to="/contact" variant="primary" className="px-8 py-4 text-lg">
              Get in Touch
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;