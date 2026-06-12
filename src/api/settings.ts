/**
 * 网站设置相关 API
 * 用于获取网站全局配置信息
 */
import { get } from './client';

// 设置数据类型定义
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
  analytics?: {
    googleAnalyticsId?: string;
  };
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  group: string;
  description?: string;
}

/**
 * 获取所有网站设置
 */
export const getSiteSettings = async (): Promise<SiteSettings> => {
  return get<SiteSettings>('/settings');
};

/**
 * 根据 key 获取单个设置项
 * @param key - 设置项键名
 */
export const getSettingByKey = async (key: string): Promise<Setting> => {
  return get<Setting>(`/settings/key/${key}`);
};

/**
 * 根据分组获取设置项
 * @param group - 设置分组名称，如 'general', 'contact', 'seo'
 */
export const getSettingsByGroup = async (group: string): Promise<Setting[]> => {
  return get<Setting[]>(`/settings/group/${group}`);
};
