/**
 * 网站设置 React Query Hooks
 * 用于获取和管理网站全局设置
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSiteSettings, getSettingByKey } from '../api/settings';
import type { SiteSettings, Setting } from '../api/settings';

// Query key 前缀
const SETTINGS_QUERY_KEY = 'settings';

/**
 * 获取所有网站设置的 Hook
 * @param options - 额外的 query 配置选项
 */
export const useSettings = (options?: object) => {
  return useQuery<SiteSettings, Error>({
    queryKey: [SETTINGS_QUERY_KEY, 'all'],
    queryFn: getSiteSettings,
    staleTime: 10 * 60 * 1000, // 10 分钟内设置数据视为新鲜（设置不常变化）
    gcTime: 30 * 60 * 1000, // 30 分钟后清理缓存
    ...options,
  });
};

/**
 * 获取单个设置项的 Hook
 * @param key - 设置项键名
 * @param options - 额外的 query 配置选项
 */
export const useSetting = (key: string, options?: object) => {
  return useQuery<Setting, Error>({
    queryKey: [SETTINGS_QUERY_KEY, 'key', key],
    queryFn: () => getSettingByKey(key),
    enabled: !!key,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};

/**
 * 预取网站设置数据
 */
export const usePrefetchSettings = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: [SETTINGS_QUERY_KEY, 'all'],
      queryFn: getSiteSettings,
      staleTime: 10 * 60 * 1000,
    });
  };
};
