import React from 'react';
import { CaseStudy, Service } from './types';

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~example";

export const SERVICES: Service[] = [
  {
    id: 'perf',
    title: 'Core Web Vitals Optimization',
    description: 'Diagnosis and remediation of INP, LCP, and CLS issues. We consistently achieve 95+ Lighthouse scores.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'arch',
    title: 'Next.js Architecture',
    description: 'Scalable pattern implementation using App Router, Server Components, and edge middleware strategies.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 'migrate',
    title: 'Legacy Migration',
    description: 'Safe, incremental migration from CRA/Gatsby or legacy monoliths to modern Next.js stacks.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'fintech-dashboard-scale',
    title: 'Real-time Fintech Dashboard',
    client: 'FinScale Inc.',
    summary: 'Reducing re-renders by 80% and implementing streaming hydration for a high-frequency trading view.',
    heroImage: 'https://picsum.photos/800/400?grayscale',
    tags: ['Next.js', 'WebSockets', 'Performance'],
    metrics: [
      { label: 'LCP Reduction', value: '1.2s', description: 'Down from 4.5s' },
      { label: 'Data Latency', value: '<50ms', description: 'Global edge distribution' },
    ],
    challenge: 'The legacy React SPA suffered from massive layout shifts (CLS 0.45) and UI freezing during high-volume market events due to unoptimized context updates.',
    approach: 'We migrated to Next.js App Router, moved heavy data processing to Server Components, and utilized a worker thread for WebSocket aggregation to keep the main thread free.',
    outcome: 'A "butter smooth" 60fps experience even during market opens, with a 40% increase in user session duration.'
  },
  {
    id: '2',
    slug: 'ecommerce-headless',
    title: 'Headless E-commerce Replatform',
    client: 'Nordic Wear',
    summary: 'Incremental migration from Shopify Liquid to a headless Next.js frontend with Shopify Plus backend.',
    heroImage: 'https://picsum.photos/800/400?blur',
    tags: ['Shopify', 'ISR', 'Tailwind'],
    metrics: [
      { label: 'Conversion Rate', value: '+24%', description: 'Post-launch uplift' },
      { label: 'SEO Traffic', value: '+110%', description: 'Year over year' },
    ],
    challenge: 'The client needed complete design freedom that Liquid themes could not provide, without sacrificing the SEO benefits of server-side rendering.',
    approach: 'Implemented Incremental Static Regeneration (ISR) for 10,000+ SKU pages, ensuring instant page loads while keeping inventory data fresh via on-demand revalidation.',
    outcome: 'Top-tier Core Web Vitals across all device types and a significant boost in organic search ranking.'
  }
];
