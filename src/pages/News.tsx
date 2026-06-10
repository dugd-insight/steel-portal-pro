import { useTranslation } from 'react-i18next';
import { useNews } from '../hooks/useNews';
import './pages.css';

// 加载状态组件
const LoadingSpinner = () => (
  <div className="loading-spinner" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--accent-light)',
      borderTop: '3px solid var(--accent-primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const News = () => {
  const { t } = useTranslation();

  // 获取新闻列表数据
  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useNews({ pageSize: 12 });

  // 从 API 获取新闻列表
  const newsItems = newsData?.items || [];

  // 如果 API 失败，使用静态内容作为后备
  const fallbackNewsItems: { date: string; title: string; desc: string; category: string }[] =
    t('news.items', { returnObjects: true }) as { date: string; title: string; desc: string; category: string }[];

  const displayNewsItems = newsItems.length > 0
    ? newsItems.map(item => ({
        date: item.publishedAt,
        title: item.title,
        desc: item.summary,
        category: item.category,
      }))
    : fallbackNewsItems;

  return (
    <div className="products-page">
      <section className="about-hero">
        <div className="container">
          <span className="section-label">{t('nav.news')}</span>
          <h1 className="about-hero-title">{t('news.title')}</h1>
          <p className="about-hero-desc">{t('news.description')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {newsLoading ? (
            <LoadingSpinner />
          ) : newsError ? (
            // 显示错误提示但继续使用后备数据
            <div style={{
              padding: '20px',
              marginBottom: '20px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}>
              <p>无法从服务器加载最新新闻，显示缓存内容</p>
            </div>
          ) : null}

          <div className="testimonials-grid">
            {displayNewsItems.map((item, i) => (
              <div key={i} className="testimonial-card">
                <span className="product-badge">{item.category}</span>
                <p className="testimonial-quote" style={{ marginTop: 16 }}>{item.desc}</p>
                <div className="testimonial-author" style={{ marginTop: 24 }}>
                  <div className="testimonial-avatar" style={{ background: 'var(--accent-secondary)' }}>
                    {i + 1}
                  </div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{item.title}</div>
                    <div className="testimonial-role">{item.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
