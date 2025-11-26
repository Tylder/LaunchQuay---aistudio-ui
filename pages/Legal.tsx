import React from 'react';
import { useParams } from 'react-router-dom';

const LegalContent: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
    <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
    <div className="prose prose-invert text-slate-400">
      {children}
    </div>
  </div>
);

export const Privacy: React.FC = () => (
  <LegalContent title="Privacy Policy">
    <p>We do not collect personal data via cookies. We do not use third-party analytics trackers. Any data submitted via the contact form is used solely for communication regarding potential business engagements.</p>
  </LegalContent>
);

export const Imprint: React.FC = () => (
  <LegalContent title="Imprint">
    <p>LaunchQuay Studio<br />123 Tech Boulevard<br />San Francisco, CA 94105</p>
    <p>Contact: hello@launchquay.com</p>
  </LegalContent>
);

export const Terms: React.FC = () => (
  <LegalContent title="Terms of Service">
    <p>By using this website, you agree to... (Standard boilerplate terms would go here).</p>
  </LegalContent>
);

export const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-9xl font-bold text-brand-800 mb-4">404</h1>
    <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
    <p className="text-slate-400 mb-8">The page you are looking for has been moved or deleted.</p>
    <div className="flex gap-4">
      <a href="/" className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-400 transition-colors">Home</a>
    </div>
  </div>
);