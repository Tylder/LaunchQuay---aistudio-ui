import React from 'react';
import { Button } from '../components/Button';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-white mb-8">About LaunchQuay</h1>
      
      <div className="prose prose-invert prose-lg text-slate-400 mb-12">
        <p className="lead text-xl text-white">
          We are a boutique engineering studio focused exclusively on the React ecosystem. We believe that speed is a feature, not an afterthought.
        </p>
        <p>
          Founded by senior engineers tired of bloated enterprise software, LaunchQuay was built to deliver "clean code" that actually impacts the bottom line. We specialize in Next.js because it provides the best balance of Developer Experience and User Experience available today.
        </p>
        <p>
          We don't outsource. When you hire us, you work directly with engineers who have scaled applications to millions of users.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {['Performance', 'Accessibility', 'Type Safety', 'Scalability'].map((val) => (
          <div key={val} className="bg-brand-900/50 border border-brand-800 rounded-lg p-4 text-center">
            <span className="font-semibold text-white">{val}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-800 pt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Our Stack</h2>
        <div className="flex flex-wrap gap-3">
          {['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'PostgreSQL', 'Prisma', 'Vercel', 'AWS'].map(tech => (
            <span key={tech} className="px-3 py-1 rounded-full bg-brand-800 text-brand-300 text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;