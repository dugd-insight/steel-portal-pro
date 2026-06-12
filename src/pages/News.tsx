import { useTranslation } from 'react-i18next';
import { useNews } from '../hooks/useNews';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScrollReveal from '../components/common/ScrollReveal';
import ScrollRevealSection from '../components/common/ScrollRevealSection';
import './pages.css';

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

  // 渐变色占位列表，用于新闻卡片图片区域
  const gradients = [
    'linear-gradient(135deg, #1a5fb4 0%, #2b6cb0 50%, #1a5fb4 100%)',
    'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    'linear-gradient(135deg, #0a0f1a 0%, #1a365d 50%, #0a0f1a 100%)',
    'linear-gradient(135deg, #1e3a5f 0%, #2b6cb0 50%, #1e3a5f 100%)',
  ];

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/images/news-hero.jpg" alt={t('news.title')} />
          <div className="page-hero-overlay" />
        </div>
        <div className="container">
          <div className="page-hero-content">
            <ScrollReveal direction="up" delay={0}>
              <span className="hero-label">{t('nav.news')}</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="hero-title-xl">{t('news.title')}</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="hero-desc-lg">{t('news.description')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* News List Section */}
      <ScrollRevealSection className="section section-dark">
        <div className="container">
          {newsLoading ? (
            <LoadingSpinner />
          ) : newsError ? (
            <div style={{
              padding: '20px',
              marginBottom: '20px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}>
              <p>{t('news.loadError', '无法从服务器加载最新新闻，显示缓存内容')}</p>
            </div>
          ) : null}

          <div className="news-grid">
            {displayNewsItems.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className="news-card">
                  <div
                    className="news-card-image"
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    <span className="news-card-category">{item.category}</span>
                  </div>
                  <div className="news-card-body">
                    <span className="news-card-date">{item.date}</span>
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-desc">{item.desc}</p>
                    <div className="news-card-footer">
                      <a href="#" className="news-card-link">
                        {t('news.readMore', '阅读更多')}
                        <span className="news-card-arrow">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealSection>
    </div>
  );
};

export default News;
