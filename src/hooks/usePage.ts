/**
 * 页面数据 React Query Hooks
 * 使用 React Query 管理页面数据获取和缓存
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPageBySlug, getAllPages } from '../api/pages';
import type { Page } from '../api/pages';

// Query key 前缀
const PAGE_QUERY_KEY = 'pages';

/**
 * 获取单个页面数据的 Hook
 * @param slug - 页面标识符
 * @param options - 额外的 query 配置选项
 */
export const usePage = (slug: string, options?: object) => {
  return useQuery<Page, Error>({
    queryKey: [PAGE_QUERY_KEY, 'slug', slug],
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug, // 只有当 slug 存在时才发起请求
    staleTime: 5 * 60 * 1000, // 5 分钟内数据视为新鲜
    gcTime: 10 * 60 * 1000, // 10 分钟后清理缓存
    ...options,
  });
};

/**
 * 获取所有页面列表的 Hook
 * @param options - 额外的 query 配置选项
 */
export const usePages = (options?: object) => {
  return useQuery<Page[], Error>({
    queryKey: [PAGE_QUERY_KEY, 'list'],
    queryFn: getAllPages,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * 预取页面数据（用于优化导航体验）
 * @param slug - 页面标识符
 */
export const usePrefetchPage = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: [PAGE_QUERY_KEY, 'slug', slug],
      queryFn: () => getPageBySlug(slug),
      staleTime: 5 * 60 * 1000,
    });
  };
};
