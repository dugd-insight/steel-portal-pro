import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import i18n from './i18n'  // Import i18n configuration first
import router from './router'
import './styles.css'

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 全局默认配置
      staleTime: 5 * 60 * 1000, // 5 分钟后数据视为过期
      gcTime: 10 * 60 * 1000, // 10 分钟后清理缓存
      retry: 1, // 失败时重试 1 次
      refetchOnWindowFocus: false, // 窗口聚焦时不自动重新获取
      refetchOnReconnect: true, // 重新连接时重新获取
    },
    mutations: {
      // 全局 mutation 配置
      retry: 1,
    },
  },
});

// Render function
const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* React Query Devtools - 仅在开发环境显示 */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

// Wait for i18n to initialize before rendering
if (i18n.isInitialized) {
  renderApp()
} else {
  i18n.on('initialized', renderApp)
}
