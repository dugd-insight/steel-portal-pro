/**
 * 页面相关 API
 * 用于获取页面内容数据
 */
import { get } from './client';

// 页面数据类型定义
export interface PageSection {
  id: string;
  type: string;
  title?: string;
  content?: string;
  image?: string;
  order: number;
  metadata?: Record<string, any>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'published' | 'draft' | 'archived';
  sections: PageSection[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 根据 slug 获取单个页面
 * @param slug - 页面标识符，如 'home', 'about', 'solutions'
 */
export const getPageBySlug = async (slug: string): Promise<Page> => {
  return get<Page>(`/pages/slug/${slug}`);
};

/**
 * 获取所有已发布的页面列表
 */
export const getAllPages = async (): Promise<Page[]> => {
  return get<Page[]>('/pages', { status: 'published' });
};

/**
 * 根据 ID 获取页面
 * @param id - 页面 ID
 */
export const getPageById = async (id: string): Promise<Page> => {
  return get<Page>(`/pages/${id}`);
};
