import React, { useState } from 'react';
import { useReferral } from '../hooks/useReferral';
import { Button } from '../components/Button';
import { UPWORK_PROFILE_URL } from '../constants';
import { ContactFormValues } from '../types';

const Contact: React.FC = () => {
  const referralSource = useReferral();
  const isUpwork = referralSource === 'upwork';
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data: ContactFormValues = Object.fromEntries(formData.entries()) as unknown as ContactFormValues;

    // Honeypot check
    if (data.honey) {
      // Silently fail for bots
      setTimeout(() => setStatus('success'), 500);
      return;
    }

    // Mock Submission
    setTimeout(() => {
      console.log('Form Submitted:', data);
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Let's talk engineering.</h1>
        <p className="text-xl text-slate-400">
          Tell us about your project constraints and performance goals.
        </p>
      </div>

      <div className="bg-brand-900/30 border border-brand-800 rounded-2xl p-6 sm:p-10">
        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
            <p className="text-slate-400 mb-8">We'll review your brief and get back to you within 24 hours.</p>
            <Button to="/" variant="outline">Back Home</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            {/* Honeypot - Hidden from users */}
            <div className="hidden" aria-hidden="true">
              <input type="text" name="honey" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label htmlFor="projectScope" className="block text-sm font-medium text-slate-300 mb-2">Project Type</label>
                <select
                  id="projectScope"
                  name="projectScope"
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option>Migration to Next.js</option>
                  <option>Performance Optimization</option>
                  <option>Greenfield Development</option>
                  <option>Staff Augmentation</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Project Details</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
                placeholder="Tell us about your current stack, pain points, and goals..."
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
               <Button 
                type="submit" 
                variant="primary" 
                className="w-full md:w-auto min-w-[160px]"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
              
              {isUpwork && (
                <div className="text-sm text-slate-500 flex items-center">
                  <span>or</span>
                  <a href={UPWORK_PROFILE_URL} target="_blank" rel="nofollow noopener" className="ml-2 text-brand-400 hover:text-brand-300 underline">
                    Hire via Upwork
                  </a>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;