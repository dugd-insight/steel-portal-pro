/**
 * 新闻数据 React Query Hooks
 * 用于获取和管理新闻列表及详情
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNewsList, getNewsBySlug } from '../api/news';
import type { NewsItem, NewsListResponse, NewsListParams } from '../api/news';

// Query key 前缀
const NEWS_QUERY_KEY = 'news';

/**
 * 获取新闻列表的 Hook
 * @param params - 查询参数（分页、筛选等）
 * @param options - 额外的 query 配置选项
 */
export const useNews = (params: NewsListParams = {}, options?: object) => {
  return useQuery<NewsListResponse, Error>({
    queryKey: [NEWS_QUERY_KEY, 'list', params],
    queryFn: () => getNewsList(params),
    staleTime: 3 * 60 * 1000, // 3 分钟内数据视为新鲜
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * 获取单条新闻详情的 Hook
 * @param slug - 新闻标识符
 * @param options - 额外的 query 配置选项
 */
export const useNewsItem = (slug: string, options?: object) => {
  return useQuery<NewsItem, Error>({
    queryKey: [NEWS_QUERY_KEY, 'slug', slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * 预取新闻列表数据
 * @param params - 查询参数
 */
export const usePrefetchNews = () => {
  const queryClient = useQueryClient();

  return (params: NewsListParams = {}) => {
    queryClient.prefetchQuery({
      queryKey: [NEWS_QUERY_KEY, 'list', params],
      queryFn: () => getNewsList(params),
      staleTime: 3 * 60 * 1000,
    });
  };
};

/**
 * 预取单条新闻详情
 * @param slug - 新闻标识符
 */
export const usePrefetchNewsItem = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: [NEWS_QUERY_KEY, 'slug', slug],
      queryFn: () => getNewsBySlug(slug),
      staleTime: 5 * 60 * 1000,
    });
  };
};
