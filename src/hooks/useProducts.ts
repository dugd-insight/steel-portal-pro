/**
 * 产品数据 React Query Hooks
 * 用于获取和管理产品列表及详情
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProductList,
  getAllActiveProducts,
  getProductBySlug,
  getProductCategories,
} from '../api/products';
import type {
  Product,
  ProductListResponse,
  ProductListParams,
  ProductCategory,
} from '../api/products';

// Query key 前缀
const PRODUCTS_QUERY_KEY = 'products';

/**
 * 获取产品列表的 Hook（支持分页）
 * @param params - 查询参数
 * @param options - 额外的 query 配置选项
 */
export const useProducts = (params: ProductListParams = {}, options?: object) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: [PRODUCTS_QUERY_KEY, 'list', params],
    queryFn: () => getProductList(params),
    staleTime: 5 * 60 * 1000, // 5 分钟内数据视为新鲜
    gcTime: 15 * 60 * 1000, // 15 分钟后清理缓存
    ...options,
  });
};

/**
 * 获取所有活跃产品的 Hook（不分页）
 * @param options - 额外的 query 配置选项
 */
export const useAllProducts = (options?: object) => {
  return useQuery<Product[], Error>({
    queryKey: [PRODUCTS_QUERY_KEY, 'all-active'],
    queryFn: getAllActiveProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options,
  });
};

/**
 * 获取单个产品详情的 Hook
 * @param slug - 产品标识符
 * @param options - 额外的 query 配置选项
 */
export const useProduct = (slug: string, options?: object) => {
  return useQuery<Product, Error>({
    queryKey: [PRODUCTS_QUERY_KEY, 'slug', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options,
  });
};

/**
 * 获取产品分类列表的 Hook
 * @param options - 额外的 query 配置选项
 */
export const useProductCategories = (options?: object) => {
  return useQuery<ProductCategory[], Error>({
    queryKey: [PRODUCTS_QUERY_KEY, 'categories'],
    queryFn: getProductCategories,
    staleTime: 10 * 60 * 1000, // 分类数据变化较少，缓存时间更长
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};

/**
 * 预取产品列表数据
 * @param params - 查询参数
 */
export const usePrefetchProducts = () => {
  const queryClient = useQueryClient();

  return (params: ProductListParams = {}) => {
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, 'list', params],
      queryFn: () => getProductList(params),
      staleTime: 5 * 60 * 1000,
    });
  };
};

/**
 * 预取单个产品详情
 * @param slug - 产品标识符
 */
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, 'slug', slug],
      queryFn: () => getProductBySlug(slug),
      staleTime: 5 * 60 * 1000,
    });
  };
};
