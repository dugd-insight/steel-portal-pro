/**
 * 新闻相关 API
 * 用于获取新闻列表和详情
 */
import { get } from './client';

// 新闻数据类型定义
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author?: string;
  publishedAt: string;
  status: 'published' | 'draft' | 'archived';
  viewCount: number;
}

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface NewsListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 获取新闻列表（支持分页和筛选）
 * @param params - 查询参数
 */
export const getNewsList = async (params: NewsListParams = {}): Promise<NewsListResponse> => {
  const defaultParams: NewsListParams = {
    page: 1,
    pageSize: 10,
    status: 'published',
    sortBy: 'publishedAt',
    sortOrder: 'desc',
    ...params,
  };
  return get<NewsListResponse>('/news', defaultParams);
};

/**
 * 根据 slug 获取单条新闻详情
 * @param slug - 新闻标识符
 */
export const getNewsBySlug = async (slug: string): Promise<NewsItem> => {
  return get<NewsItem>(`/news/slug/${slug}`);
};

/**
 * 根据 ID 获取单条新闻详情
 * @param id - 新闻 ID
 */
export const getNewsById = async (id: string): Promise<NewsItem> => {
  return get<NewsItem>(`/news/${id}`);
};

/**
 * 获取新闻分类列表
 */
export const getNewsCategories = async (): Promise<string[]> => {
  return get<string[]>('/news/categories');
};

/**
 * 获取相关新闻推荐
 * @param id - 当前新闻 ID
 * @param limit - 推荐数量
 */
export const getRelatedNews = async (id: string, limit: number = 3): Promise<NewsItem[]> => {
  return get<NewsItem[]>(`/news/${id}/related`, { limit });
};
