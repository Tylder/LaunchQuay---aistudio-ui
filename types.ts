import React from 'react';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  heroImage: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  challenge: string;
  approach: string;
  outcome: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  path: string;
}

export type ReferralSource = 'upwork' | 'direct' | string;

export interface ContactFormValues {
  name: string;
  email: string;
  projectScope: string;
  budget: string;
  message: string;
  timeline?: string;
  honey?: string; // Honeypot field
}