import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useReferral } from '../hooks/useReferral';
import { Button } from './Button';
import { UPWORK_PROFILE_URL } from '../constants';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-brand-500' : 'text-slate-400 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const referralSource = useReferral();
  const location = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isUpwork = referralSource === 'upwork';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-50 selection:bg-brand-500 selection:text-white">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled || isMobileOpen
            ? 'bg-brand-950/90 backdrop-blur-md border-brand-800 py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center shadow-lg group-hover:shadow-brand-500/50 transition-shadow">
              <span className="text-white font-mono text-sm">LQ</span>
            </div>
            <span>LaunchQuay</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/case-studies">Case Studies</NavItem>
            <NavItem to="/about">About</NavItem>
            
            <div className="pl-4 border-l border-brand-800 ml-4">
              {isUpwork ? (
                <Button href={UPWORK_PROFILE_URL} variant="secondary" className="px-4 py-2 text-xs">
                  Continue on Upwork
                </Button>
              ) : (
                <Button to="/contact" variant="primary" className="px-4 py-2 text-xs">
                  Book a Call
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div className="md:hidden bg-brand-950 border-b border-brand-800 animate-slide-up">
            <nav className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/case-studies">Case Studies</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/contact">Contact</NavItem>
              <div className="pt-4 mt-4 border-t border-brand-800">
                {isUpwork ? (
                   <Button href={UPWORK_PROFILE_URL} variant="secondary" fullWidth>
                    Continue on Upwork
                  </Button>
                ) : (
                  <Button to="/contact" variant="primary" fullWidth>
                    Book a Call
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-950 border-t border-brand-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <span className="text-xl font-bold text-white mb-4 block">LaunchQuay</span>
              <p className="text-slate-400 text-sm">
                Engineering high-performance web experiences with React & Next.js.
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><NavLink to="/services" className="hover:text-brand-400">Services</NavLink></li>
                <li><NavLink to="/case-studies" className="hover:text-brand-400">Work</NavLink></li>
                <li><NavLink to="/about" className="hover:text-brand-400">About</NavLink></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><NavLink to="/privacy" className="hover:text-brand-400">Privacy Policy</NavLink></li>
                <li><NavLink to="/imprint" className="hover:text-brand-400">Imprint</NavLink></li>
                <li><NavLink to="/terms" className="hover:text-brand-400">Terms</NavLink></li>
              </ul>
            </div>
            <div className="col-span-1 flex flex-col items-start md:items-end">
              {isUpwork && (
                <Button href={UPWORK_PROFILE_URL} variant="secondary" className="text-sm">
                  Hire on Upwork
                </Button>
              )}
            </div>
          </div>
          <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} LaunchQuay Studio. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              No cookies. Privacy first.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};