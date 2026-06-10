import { useTranslation } from 'react-i18next';
import { usePage } from '../hooks/usePage';
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

const ESG = () => {
  const { t } = useTranslation();

  // 获取 ESG 页面数据
  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = usePage('esg');

  const sections = pageData?.sections;
  const pageMetadata = pageData?.metadata || {};

  // 默认统计数据
  const defaultStats = [
    { value: '30%', labelKey: 'esg.stats.renewableEnergy.label', icon: '☀️' },
    { value: '95%', labelKey: 'esg.stats.waterRecycling.label', icon: '💧' },
    { value: '90%', labelKey: 'esg.stats.scrapRecycling.label', icon: '♻️' },
    { value: '40h', labelKey: 'esg.stats.trainingHours.label', icon: '📚' },
  ];

  // 从 API 获取统计数据
  const statsSection = sections?.find(s => s.type === 'stats');
  const stats = statsSection?.metadata?.items || defaultStats;

  // 默认 ESG 支柱数据
  const defaultPillars = [
    {
      titleKey: 'esg.pillars.environmental.title',
      subtitleKey: 'esg.pillars.environmental.subtitle',
      itemsKey: 'esg.pillars.environmental.items',
      color: '#22c55e',
    },
    {
      titleKey: 'esg.pillars.social.title',
      subtitleKey: 'esg.pillars.social.subtitle',
      itemsKey: 'esg.pillars.social.items',
      color: '#3b82f6',
    },
    {
      titleKey: 'esg.pillars.governance.title',
      subtitleKey: 'esg.pillars.governance.subtitle',
      itemsKey: 'esg.pillars.governance.items',
      color: '#f59e0b',
    },
  ];

  // 从 API 获取支柱数据
  const pillarsSection = sections?.find(s => s.type === 'pillars');
  const pillars = pillarsSection?.metadata?.items || defaultPillars;

  // 获取目标数据
  const goalsSection = sections?.find(s => s.type === 'goals');
  const goalItems: { year: string; goal: string; status: string }[] =
    goalsSection?.metadata?.items ||
    t('esg.goals.items', { returnObjects: true }) as { year: string; goal: string; status: string }[];

  const statusClassMap: Record<string, string> = {
    'In Progress': 'goal-status-in-progress',
    'Planned': 'goal-status-planned',
    'Target': 'goal-status-target',
    'Vision': 'goal-status-vision',
    '进行中': 'goal-status-in-progress',
    '已规划': 'goal-status-planned',
    '目标': 'goal-status-target',
    '愿景': 'goal-status-vision',
  };

  if (pageLoading) {
    return (
      <div className="esg-page">
        <LoadingSpinner />
      </div>
    );
  }

  // 如果 API 失败，使用静态内容作为后备
  if (pageError) {
    console.warn('Failed to load ESG page data from API, using fallback content');
  }

  return (
    <div className="esg-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src={pageMetadata.heroImage || "/images/esg-hero.jpg"} alt={pageMetadata.title || t('esg.title')} />
          <div className="page-hero-overlay" />
        </div>
        <div className="container">
          <div className="page-hero-content">
            <span className="hero-label">{t('nav.esg')}</span>
            <h1 className="hero-title-xl">{pageMetadata.title || t('esg.title')}</h1>
            <p className="hero-desc-lg">{pageMetadata.subtitle || t('esg.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-row">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value-lg">{stat.value}</span>
                <span className="stat-label">{t(stat.labelKey) || stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{pillarsSection?.title || t('esg.pillars.label')}</span>
            <h2 className="section-title">{pillarsSection?.content || t('esg.pillars.title')}</h2>
            <p className="section-subtitle">{pillarsSection?.metadata?.subtitle || t('esg.pillars.subtitle')}</p>
          </div>
          <div className="pillars-grid">
            {pillars.map((pillar: any, i: number) => {
              const items: string[] = pillar.items || t(pillar.itemsKey, { returnObjects: true }) as string[];
              return (
                <div key={i} className="pillar-card" style={{ '--pillar-color': pillar.color } as React.CSSProperties}>
                  <div className="pillar-header">
                    <h3 className="pillar-title">{pillar.title || t(pillar.titleKey)}</h3>
                    <p className="pillar-subtitle">{pillar.subtitle || t(pillar.subtitleKey)}</p>
                  </div>
                  <ul className="pillar-list">
                    {items.map((item, j) => (
                      <li key={j} className="pillar-item">
                        <span className="pillar-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="section section-gradient">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{goalsSection?.title || t('esg.goals.label')}</span>
            <h2 className="section-title">{goalsSection?.content || t('esg.goals.title')}</h2>
            <p className="section-subtitle">{goalsSection?.metadata?.subtitle || t('esg.goals.subtitle')}</p>
          </div>
          <div className="goals-timeline">
            {goalItems.map((goal, i) => (
              <div key={i} className="goal-item">
                <div className="goal-year">{goal.year}</div>
                <div className="goal-content">
                  <p className="goal-text">{goal.goal}</p>
                  <span className={`goal-status ${statusClassMap[goal.status] || 'goal-status-planned'}`}>
                    {goal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Download */}
      <section className="section">
        <div className="container">
          <div className="report-box">
            <div className="report-content">
              <h2 className="report-title">{pageMetadata.reportTitle || t('esg.report.title')}</h2>
              <p className="report-desc">{pageMetadata.reportDescription || t('esg.report.description')}</p>
            </div>
            <div className="report-actions">
              <button className="btn btn-primary">{pageMetadata.reportButton2023 || t('esg.report.buttons.2023')}</button>
              <button className="btn btn-outline">{pageMetadata.reportButton2022 || t('esg.report.buttons.2022')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESG;
