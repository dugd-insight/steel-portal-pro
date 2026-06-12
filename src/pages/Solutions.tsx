import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { usePage } from '../hooks/usePage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScrollReveal from '../components/common/ScrollReveal';
import ScrollRevealSection from '../components/common/ScrollRevealSection';
import './pages.css';

const Solutions = () => {
  const { t } = useTranslation();

  // 获取解决方案页面数据
  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = usePage('solutions');

  const sections = pageData?.sections;
  const pageMetadata = pageData?.metadata || {};

  // 默认解决方案数据
  const defaultSolutions = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M24 4L4 14v20l20 10 20-10V14L24 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M24 24v20M24 24L4 14M24 24l20-10" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
        </svg>
      ),
      titleKey: 'solutions.items.materialSupply.title',
      descKey: 'solutions.items.materialSupply.description',
      stat: '500+',
      statLabelKey: 'solutions.statLabels.projectsDelivered',
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 40h32M12 40V20l12-8 12 8v20" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 40v-8h8v8" />
          <circle cx="24" cy="16" r="2" fill="currentColor" />
        </svg>
      ),
      titleKey: 'solutions.items.bulkTrade.title',
      descKey: 'solutions.items.bulkTrade.description',
      stat: '50K+',
      statLabelKey: 'solutions.statLabels.tonsMonthly',
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 40h36M8 40V20h32v20" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V12h24v8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 12V8h16v4" />
          <circle cx="24" cy="30" r="4" fill="currentColor" />
        </svg>
      ),
      titleKey: 'solutions.items.warehouse.title',
      descKey: 'solutions.items.warehouse.description',
      stat: '100K',
      statLabelKey: 'solutions.statLabels.storage',
    },
  ];

  // 从 API 获取解决方案数据或使用默认数据
  const solutionsSection = sections?.find(s => s.type === 'solutions');
  const solutions = solutionsSection?.metadata?.items || defaultSolutions;

  // 获取流程步骤数据
  const processSection = sections?.find(s => s.type === 'process');
  const processSteps: { step: string; title: string; desc: string }[] =
    processSection?.metadata?.steps ||
    t('solutions.process.steps', { returnObjects: true }) as { step: string; title: string; desc: string }[];

  if (pageLoading) {
    return (
      <div className="solutions-page">
        <LoadingSpinner />
      </div>
    );
  }

  // 如果 API 失败，使用静态内容作为后备
  if (pageError) {
    console.warn('Failed to load solutions page data from API, using fallback content');
  }

  return (
    <div className="solutions-page">
      {/* Hero Section with Background Image */}
      <ScrollRevealSection>
        <section className="page-hero">
          <div className="page-hero-bg">
            <img src={pageMetadata.heroImage || "/images/solutions-hero.jpg"} alt={pageMetadata.title || t('solutions.title')} />
            <div className="page-hero-overlay" />
          </div>
          <div className="container">
            <div className="page-hero-content">
              <span className="hero-label">{t('nav.solutions')}</span>
              <h1 className="hero-title-xl">{pageMetadata.title || t('solutions.title')}</h1>
              <p className="hero-desc-lg">{pageMetadata.subtitle || t('solutions.subtitle')}</p>
              <div className="hero-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  {pageMetadata.ctaButton || t('solutions.cta.button')}
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  {t('nav.products')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollRevealSection>

      {/* Solutions Grid */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{solutionsSection?.title || t('solutions.title')}</span>
            <h2 className="section-title">{solutionsSection?.content || t('solutions.sectionTitle')}</h2>
            <p className="section-subtitle">{solutionsSection?.metadata?.subtitle || t('solutions.sectionSubtitle')}</p>
          </div>
          <div className="solutions-grid">
            {solutions.map((item: any, i: number) => (
              <ScrollReveal key={i} direction='up' delay={i * 0.1}>
                <div className="solution-card">
                  <div className="solution-card-header">
                    <div className="solution-icon">{item.icon || defaultSolutions[i]?.icon}</div>
                    <div className="solution-stat">
                      <span className="stat-number">{item.stat}</span>
                      <span className="stat-label">{t(item.statLabelKey) || item.statLabel}</span>
                    </div>
                  </div>
                  <h3 className="solution-title">{item.title || t(item.titleKey)}</h3>
                  <p className="solution-desc">{item.description || t(item.descKey)}</p>
                  <Link to="/contact" className="solution-link">
                    {t('solutions.learnMore')}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{processSection?.title || t('solutions.process.label')}</span>
            <h2 className="section-title">{processSection?.content || t('solutions.process.title')}</h2>
            <p className="section-subtitle">{processSection?.metadata?.subtitle || t('solutions.process.subtitle')}</p>
          </div>
          <div className="process-flow">
            {processSteps.map((item, i) => (
              <ScrollReveal key={i} direction='up' delay={i * 0.1}>
                <div className="process-item">
                  <div className="process-step-num">{String(i + 1).padStart(2, '0')}</div>
                  <h4 className="process-item-title">{item.title}</h4>
                  <p className="process-item-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollRevealSection>
        <section className="section cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2 className="cta-title">{pageMetadata.ctaTitle || t('solutions.cta.title')}</h2>
                <p className="cta-desc">{pageMetadata.ctaDescription || t('solutions.cta.description')}</p>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">
                {pageMetadata.ctaButton || t('solutions.cta.button')}
              </Link>
            </div>
          </div>
        </section>
      </ScrollRevealSection>
    </div>
  );
};

export default Solutions;
