export interface ServiceItem {
  to: string;
  icon: string;
  name: string;
  description: string;
  price: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface WhyItem {
  title: string;
  icon: string;
  landingDescription: string;
  points: string[];
}

export interface PriceCard {
  title: string;
  price: string;
  unit?: string;
  features: string[];
  size?: 'small' | 'medium' | 'large';
}

export interface InfoStat {
  value: string;
  label: string;
}

export interface VideoHighlight {
  icon: string;
  platform: string;
}

export interface VideoProps {
  title?: string;
  description?: string;
  videoUrl?: string;
  highlights?: VideoHighlight[];
}

export interface WhyPageProps {
  title: string;
  points: string[];
  icon?: string;
  landingDescription?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface UseScrollOptions {
  totalItems: number;
  initialIndex?: number;
  throttleDelay?: number;
  fadeDelay?: number;
}

export interface UseScrollReturn {
  activeItem: number;
  containerRef: React.RefObject<HTMLDivElement>;
  progressPercentage: number;
  handleItemClick: (index: number) => void;
  isFading: boolean;
}

// ✅ AJOUT: Types manquants pour What component
export interface WhatItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhatProps {
  items?: WhatItem[];
  heading?: string;
  subheading?: string;
  buttonText?: string;
}
