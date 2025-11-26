import React from 'react';
import { SERVICES } from '../constants';
import { Button } from '../components/Button';

const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Our Expertise</h1>
        <p className="text-xl text-slate-400">Specialized engineering for modern web challenges.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-brand-900/20 border border-brand-800 p-8 rounded-2xl flex flex-col">
            <div className="mb-6 text-brand-400">{service.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-slate-400 mb-8 flex-grow">{service.description}</p>
            <ul className="space-y-2 mb-8 text-sm text-slate-500">
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                 Audit & Strategy
               </li>
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                 Implementation
               </li>
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                 Knowledge Transfer
               </li>
            </ul>
            <Button to="/contact" variant="outline" className="w-full justify-center">Inquire</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;