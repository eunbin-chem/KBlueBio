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

export interface NewsPostFile {
  name: string;
  size: number;
  url: string;
}

export interface NewsPost {
  id: string;
  category: 'notice' | 'press' | 'disclosure' | 'ir';
  title: string;
  date: string;
  author: string;
  views: number;
  content: string;
  files?: NewsPostFile[];
}

export interface NewsPostRow {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  views: number;
  content: string;
  files: NewsPostFile[] | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPItem {
  id: string;
  type: 'paper' | 'patent';
  titleKo: string;
  titleEn: string;
  journalKo: string;
  journalEn: string;
  authorsKo: string;
  authorsEn: string;
  date: string;
  statusKo: string;
  statusEn: string;
  number?: string;
  summaryKo: string;
  summaryEn: string;
  link?: string;
  tags: string[];
  files?: NewsPostFile[];
}

export interface PaperPatentRow {
  id: string;
  type: string;
  title_ko: string;
  title_en: string;
  journal_ko: string;
  journal_en: string;
  authors_ko: string;
  authors_en: string;
  date: string;
  status_ko: string;
  status_en: string;
  number: string | null;
  summary_ko: string;
  summary_en: string;
  link: string | null;
  tags: string[] | null;
  files: NewsPostFile[] | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
