export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  image: string;
  content: string;
  publishedAt: string;
}

export interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}

export interface CategoryType {
  value: string;
  label: string;
}

export interface NewsApiParams {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}
