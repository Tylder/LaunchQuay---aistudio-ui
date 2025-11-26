import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CASE_STUDIES, UPWORK_PROFILE_URL } from '../constants';
import { useReferral } from '../hooks/useReferral';
import { Button } from '../components/Button';

// Index Component
const CaseStudyIndex: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
    <h1 className="text-4xl font-bold text-white mb-4">Case Studies</h1>
    <p className="text-xl text-slate-400 mb-12 max-w-3xl">
      Deep dives into complex migrations, performance optimizations, and architectural challenges solved.
    </p>

    <div className="grid gap-16">
      {CASE_STUDIES.map((study, idx) => (
        <article key={study.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
          <div className="w-full lg:w-1/2">
             <Link to={`/case-studies/${study.id}`} className="block rounded-2xl overflow-hidden border border-brand-800 hover:border-brand-500/50 transition-colors group">
               <div className="aspect-[16/10] bg-brand-900 relative">
                  <img 
                    src={study.heroImage} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-transparent transition-colors" />
               </div>
             </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex gap-2 mb-4">
              {study.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold tracking-wider text-brand-300 uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              <Link to={`/case-studies/${study.id}`} className="hover:text-brand-400 transition-colors">{study.title}</Link>
            </h2>
            <p className="text-lg text-slate-400 mb-8">{study.summary}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 bg-brand-900/30 p-6 rounded-xl border border-brand-800/50">
              {study.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white">{m.value}</div>
                  <div className="text-sm text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>

            <Button to={`/case-studies/${study.id}`} variant="outline">Read Full Story</Button>
          </div>
        </article>
      ))}
    </div>
  </div>
);

// Detail Component
const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = CASE_STUDIES.find(s => s.id === id);
  const referralSource = useReferral();
  const isUpwork = referralSource === 'upwork';

  if (!study) {
    return <div className="py-20 text-center text-slate-400">Case study not found.</div>;
  }

  return (
    <article className="animate-fade-in">
      {/* Hero */}
      <div className="w-full h-[60vh] relative">
        <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-transparent flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <div className="flex gap-3 mb-6">
              {study.tags.map(tag => (
                 <span key={tag} className="bg-brand-500/20 backdrop-blur-sm border border-brand-500/30 text-brand-300 px-3 py-1 rounded-full text-sm font-medium">
                   {tag}
                 </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{study.title}</h1>
            <p className="text-xl text-slate-300">{study.client}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16 border-y border-brand-800 py-8">
           {study.metrics.map((m, i) => (
             <div key={i} className="text-center">
               <div className="text-4xl font-bold text-brand-400 mb-2">{m.value}</div>
               <div className="font-semibold text-white">{m.label}</div>
               <div className="text-sm text-slate-500 mt-1">{m.description}</div>
             </div>
           ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <h3 className="text-white">The Challenge</h3>
          <p className="text-slate-400">{study.challenge}</p>

          <h3 className="text-white">Our Approach</h3>
          <p className="text-slate-400">{study.approach}</p>

          <h3 className="text-white">The Outcome</h3>
          <p className="text-slate-400">{study.outcome}</p>
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 bg-brand-900/30 border border-brand-800 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Have a similar challenge?</h3>
          <div className="flex justify-center">
            {isUpwork ? (
              <Button href={UPWORK_PROFILE_URL} variant="secondary">Discuss on Upwork</Button>
            ) : (
              <Button to="/contact" variant="primary">Schedule a Consultation</Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const CaseStudies: React.FC = () => {
  const { id } = useParams();
  return id ? <CaseStudyDetail /> : <CaseStudyIndex />;
};