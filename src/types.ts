export type PageType = 'home' | 'company' | 'rnd' | 'papers' | 'products' | 'news';

export interface NavItem {
  id: PageType;
  label: string;
  enLabel: string;
}

export interface TimelineEvent {
  year: string;
  milestones: string[];
}

export interface StatItem {
  value: string;
  label: string;
  enLabel: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  category: 'diagnostics' | 'nutraceuticals' | 'pipeline';
  title: string;
  subTitle: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
  relatedPaper?: {
    titleKo: string;
    titleEn: string;
    link: string;
  };
  purchaseLink?: string;
  purchaseLinks?: {
    platform: 'naver' | 'coupang';
    url: string;
  }[];
}

export interface NewsPost {
  id: number;
  category: 'notice' | 'press' | 'disclosure' | 'ir';
  title: string;
  date: string;
  author: string;
  views: number;
  content: string;
  files?: { name: string; size: number; url: string }[];
}
