import type { IPItem, NewsPost, NewsPostRow, PaperPatentRow } from '../types';

export function mapNewsPostRow(row: NewsPostRow): NewsPost {
  return {
    id: row.id,
    category: row.category as NewsPost['category'],
    title: row.title,
    date: row.date,
    author: row.author,
    views: row.views,
    content: row.content,
    files: row.files ?? [],
  };
}

export function mapPaperPatentRow(row: PaperPatentRow): IPItem {
  return {
    id: row.id,
    type: row.type as IPItem['type'],
    titleKo: row.title_ko,
    titleEn: row.title_en,
    journalKo: row.journal_ko,
    journalEn: row.journal_en,
    authorsKo: row.authors_ko,
    authorsEn: row.authors_en,
    date: row.date,
    statusKo: row.status_ko,
    statusEn: row.status_en,
    number: row.number ?? undefined,
    summaryKo: row.summary_ko,
    summaryEn: row.summary_en,
    link: row.link ?? undefined,
    tags: row.tags ?? [],
    files: row.files ?? [],
  };
}

export function ipItemToDbPayload(item: Partial<IPItem>) {
  return {
    type: item.type,
    titleKo: item.titleKo,
    titleEn: item.titleEn,
    journalKo: item.journalKo,
    journalEn: item.journalEn,
    authorsKo: item.authorsKo,
    authorsEn: item.authorsEn,
    date: item.date,
    statusKo: item.statusKo,
    statusEn: item.statusEn,
    number: item.number,
    summaryKo: item.summaryKo,
    summaryEn: item.summaryEn,
    link: item.link,
    tags: item.tags,
    files: item.files,
  };
}
