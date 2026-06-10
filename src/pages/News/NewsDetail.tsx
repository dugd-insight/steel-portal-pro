import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getNewsBySlug, getRelatedNews } from '../../api/news';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNewsBySlug(slug);
        // API returns { success, data, message }, extract data
        const newsData = (data as any).data || data;
        setNews(newsData);
        if (newsData.id) {
          const relatedData = await getRelatedNews(newsData.id);
          setRelated((relatedData as any).data || relatedData);
        }
      } catch (err: any) {
        setError('加载新闻详情失败');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  if (loading) return <div className="page-loading"><div className="loading-spinner"></div><p>加载中...</p></div>;
  if (error || !news) return <div className="page-error"><h2>加载失败</h2><p>{error || '新闻不存在'}</p><Link to="/news">返回新闻列表</Link></div>;

  return (
    <div className="news-detail-page">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-primary) 100%)' }}>
        <div className="container">
          <span className="news-detail-category">{news.category}</span>
          <h1 className="news-detail-title">{news.title}</h1>
          <div className="news-detail-meta">
            {news.publishedAt && <span>{new Date(news.publishedAt).toLocaleDateString('zh-CN')}</span>}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: news.content || '' }} />
        {related.length > 0 && (
          <div className="news-related">
            <h2>相关新闻</h2>
            <div className="news-related-grid">
              {related.map((item) => (
                <Link to={`/news/${item.slug}`} key={item.id} className="news-related-card">
                  {item.image && <img src={item.image} alt={item.title} />}
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
