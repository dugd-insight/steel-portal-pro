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

const Technology = () => {
  const { t } = useTranslation();

  // 获取技术页面数据
  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = usePage('technology');

  const sections = pageData?.sections;
  const pageMetadata = pageData?.metadata || {};

  // 默认统计数据
  const defaultStats = [
    { value: '40%', labelKey: 'technology.stats.efficiencyGain', icon: '⚡' },
    { value: '3,000㎡', labelKey: 'technology.stats.rndCenter', icon: '🔬' },
    { value: '99.8%', labelKey: 'technology.stats.passRate', icon: '✓' },
    { value: '8', labelKey: 'technology.stats.autoLines', icon: '⚙️' },
  ];

  // 从 API 获取统计数据
  const statsSection = sections?.find(s => s.type === 'stats');
  const stats = statsSection?.metadata?.items || defaultStats;

  // 获取流程步骤数据
  const processSection = sections?.find(s => s.type === 'process');
  const processSteps: { number: string; title: string; description: string }[] =
    processSection?.metadata?.steps ||
    t('technology.process.steps', { returnObjects: true }) as { number: string; title: string; description: string }[];

  // 获取认证数据
  const certSection = sections?.find(s => s.type === 'certifications');
  const certItems: { name: string; standard: string }[] =
    certSection?.metadata?.items ||
    t('technology.certifications.items', { returnObjects: true }) as { name: string; standard: string }[];

  // 获取设备数据
  const equipSection = sections?.find(s => s.type === 'equipment');
  const equipItems: { name: string; model: string; origin: string }[] =
    equipSection?.metadata?.items ||
    t('technology.equipment.items', { returnObjects: true }) as { name: string; model: string; origin: string }[];

  // 获取核心能力数据
  const capabilitiesSection = sections?.find(s => s.type === 'capabilities');
  const capabilities = capabilitiesSection?.metadata?.items || [
    { titleKey: 'technology.capabilities.smartManufacturing.title', descKey: 'technology.capabilities.smartManufacturing.description', icon: '🏭' },
    { titleKey: 'technology.capabilities.rndCenter.title', descKey: 'technology.capabilities.rndCenter.description', icon: '🔬' },
    { titleKey: 'technology.capabilities.qualityTesting.title', descKey: 'technology.capabilities.qualityTesting.description', icon: '✓' },
    { titleKey: 'technology.capabilities.automation.title', descKey: 'technology.capabilities.automation.description', icon: '⚙️' },
  ];

  if (pageLoading) {
    return (
      <div className="technology-page">
        <LoadingSpinner />
      </div>
    );
  }

  // 如果 API 失败，使用静态内容作为后备
  if (pageError) {
    console.warn('Failed to load technology page data from API, using fallback content');
  }

  return (
    <div className="technology-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src={pageMetadata.heroImage || "/images/technology-hero.jpg"} alt={pageMetadata.title || t('technology.title')} />
          <div className="page-hero-overlay" />
        </div>
        <div className="container">
          <div className="page-hero-content">
            <span className="hero-label">{t('nav.technology')}</span>
            <h1 className="hero-title-xl">{pageMetadata.title || t('technology.title')}</h1>
            <p className="hero-desc-lg">{pageMetadata.subtitle || t('technology.subtitle')}</p>
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

      {/* Core Capabilities */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{capabilitiesSection?.title || t('technology.capabilities.label')}</span>
            <h2 className="section-title">{capabilitiesSection?.content || t('technology.capabilities.title')}</h2>
            <p className="section-subtitle">{capabilitiesSection?.metadata?.subtitle || t('technology.capabilities.subtitle')}</p>
          </div>
          <div className="tech-grid">
            {capabilities.map((item: any, i: number) => (
              <div key={i} className="tech-card">
                <div className="tech-card-icon">{item.icon}</div>
                <h3 className="tech-card-title">{item.title || t(item.titleKey)}</h3>
                <p className="tech-card-desc">{item.description || t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section section-gradient">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{processSection?.title || t('technology.process.label')}</span>
            <h2 className="section-title">{processSection?.content || t('technology.process.title')}</h2>
            <p className="section-subtitle">{processSection?.metadata?.subtitle || t('technology.process.subtitle')}</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-num">{step.number}</div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{certSection?.title || t('technology.certifications.label')}</span>
            <h2 className="section-title">{certSection?.content || t('technology.certifications.title')}</h2>
            <p className="section-subtitle">{certSection?.metadata?.subtitle || t('technology.certifications.subtitle')}</p>
          </div>
          <div className="cert-grid">
            {certItems.map((cert, i) => (
              <div key={i} className="cert-badge">
                <div className="cert-badge-name">{cert.name}</div>
                <div className="cert-badge-desc">{cert.standard}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Table */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{equipSection?.title || t('technology.equipment.label')}</span>
            <h2 className="section-title">{equipSection?.content || t('technology.equipment.title')}</h2>
            <p className="section-subtitle">{equipSection?.metadata?.subtitle || t('technology.equipment.subtitle')}</p>
          </div>
          <div className="equipment-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('technology.equipment.tableHeaders.name')}</th>
                  <th>{t('technology.equipment.tableHeaders.model')}</th>
                  <th>{t('technology.equipment.tableHeaders.origin')}</th>
                </tr>
              </thead>
              <tbody>
                {equipItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.model}</td>
                    <td>{item.origin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
