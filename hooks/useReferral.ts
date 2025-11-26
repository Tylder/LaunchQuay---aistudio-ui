import { useState, useEffect } from 'react';
import { ReferralSource } from '../types';

export const useReferral = () => {
  const [source, setSource] = useState<ReferralSource>('direct');

  useEffect(() => {
    // Check URL params for ?src=upwork
    // In HashRouter, this might be before the hash or after.
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);

    const srcParam = searchParams.get('src') || hashParams.get('src');

    if (srcParam) {
      setSource(srcParam);
      // Persist in session storage for navigation
      sessionStorage.setItem('referral_source', srcParam);
    } else {
      const stored = sessionStorage.getItem('referral_source');
      if (stored) {
        setSource(stored);
      }
    }
  }, []);

  return source;
};