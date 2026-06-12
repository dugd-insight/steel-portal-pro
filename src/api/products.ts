/**
 * 产品相关 API
 * 用于获取产品列表和详情
 */
import { get } from './client';

// 产品数据类型定义
export interface ProductSpec {
  key: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery?: string[];
  specs: ProductSpec[];
  features: string[];
  applications: string[];
  status: 'active' | 'inactive' | 'discontinued';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 获取产品列表（支持分页和筛选）
 * @param params - 查询参数
 */
export const getProductList = async (params: ProductListParams = {}): Promise<ProductListResponse> => {
  const defaultParams: ProductListParams = {
    page: 1,
    pageSize: 100,
    status: 'active',
    sortBy: 'sortOrder',
    sortOrder: 'asc',
    ...params,
  };
  return get<ProductListResponse>('/products', defaultParams);
};

/**
 * 获取所有活跃产品（不分页）
 */
export const getAllActiveProducts = async (): Promise<Product[]> => {
  const response = await getProductList({
    pageSize: 1000,
    status: 'active',
  });
  return response.items;
};

/**
 * 根据 slug 获取单个产品详情
 * @param slug - 产品标识符
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  return get<Product>(`/products/slug/${slug}`);
};

/**
 * 根据 ID 获取单个产品详情
 * @param id - 产品 ID
 */
export const getProductById = async (id: string): Promise<Product> => {
  return get<Product>(`/products/${id}`);
};

/**
 * 获取产品分类列表
 */
export const getProductCategories = async (): Promise<ProductCategory[]> => {
  return get<ProductCategory[]>('/products/categories');
};

/**
 * 获取相关产品推荐
 * @param id - 当前产品 ID
 * @param limit - 推荐数量
 */
export const getRelatedProducts = async (id: string, limit: number = 4): Promise<Product[]> => {
  return get<Product[]>(`/products/${id}/related`, { limit });
};
