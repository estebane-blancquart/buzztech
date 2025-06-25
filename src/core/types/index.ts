// Types partagés pour tous les modules
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
  unit: string;
  features: string[];
}

export interface InfoStat {
  value: string;
  label: string;
}
