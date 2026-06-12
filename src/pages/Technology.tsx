import { useTranslation } from 'react-i18next';
import { usePage } from '../hooks/usePage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScrollReveal from '../components/common/ScrollReveal';
import ScrollRevealSection from '../components/common/ScrollRevealSection';
import './pages.css';

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
    {
      value: '40%',
      labelKey: 'technology.stats.efficiencyGain',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    },
    {
      value: '3,000㎡',
      labelKey: 'technology.stats.rndCenter',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    },
    {
      value: '99.8%',
      labelKey: 'technology.stats.passRate',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    },
    {
      value: '8',
      labelKey: 'technology.stats.autoLines',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.72v-.5a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    },
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
    {
      titleKey: 'technology.capabilities.smartManufacturing.title',
      descKey: 'technology.capabilities.smartManufacturing.description',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>,
    },
    {
      titleKey: 'technology.capabilities.rndCenter.title',
      descKey: 'technology.capabilities.rndCenter.description',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    },
    {
      titleKey: 'technology.capabilities.qualityTesting.title',
      descKey: 'technology.capabilities.qualityTesting.description',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    },
    {
      titleKey: 'technology.capabilities.automation.title',
      descKey: 'technology.capabilities.automation.description',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.72v-.5a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    },
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
      <ScrollRevealSection>
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
      </ScrollRevealSection>

      {/* Stats Bar */}
      <ScrollRevealSection>
        <section className="stats-bar-light">
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
      </ScrollRevealSection>

      {/* Core Capabilities */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{capabilitiesSection?.title || t('technology.capabilities.label')}</span>
            <h2 className="section-title">{capabilitiesSection?.content || t('technology.capabilities.title')}</h2>
            <p className="section-subtitle">{capabilitiesSection?.metadata?.subtitle || t('technology.capabilities.subtitle')}</p>
          </div>
          <div className="tech-grid">
            {capabilities.map((item: any, i: number) => (
              <ScrollReveal key={i} direction='up' delay={i * 0.1}>
                <div className="tech-card">
                  <div className="tech-card-icon">{item.icon}</div>
                  <h3 className="tech-card-title">{item.title || t(item.titleKey)}</h3>
                  <p className="tech-card-desc">{item.description || t(item.descKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{processSection?.title || t('technology.process.label')}</span>
            <h2 className="section-title">{processSection?.content || t('technology.process.title')}</h2>
            <p className="section-subtitle">{processSection?.metadata?.subtitle || t('technology.process.subtitle')}</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <ScrollReveal key={i} direction='up' delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-num">{step.number}</div>
                  <div className="timeline-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
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
              <ScrollReveal key={i} direction='up' delay={i * 0.1}>
                <div className="cert-badge">
                  <div className="cert-badge-name">{cert.name}</div>
                  <div className="cert-badge-desc">{cert.standard}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Table */}
      <ScrollRevealSection>
        <section className="section section-light">
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
      </ScrollRevealSection>
    </div>
  );
};

export default Technology;
