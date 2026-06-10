import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { usePage } from '../../hooks/usePage';
import './about.css';

// SVG Icons
const VisionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const MissionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const ValueIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CertificateIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

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

const About = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('company');

  // 获取关于页面数据
  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = usePage('about');

  const sections = pageData?.sections;
  const pageMetadata = pageData?.metadata || {};

  // 从 API 数据或翻译文件获取证书和优势数据
  const certificates = pageMetadata.certificates || t('about.certificates.items', { returnObjects: true }) as any[];
  const whyUsItems = pageMetadata.whyUsItems || t('about.whyUs.items', { returnObjects: true }) as any[];

  // Scroll-spy: highlight active section in nav
  useEffect(() => {
    const sectionIds = ['company', 'culture', 'certificates', 'why-us'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sectionsNav = [
    { id: 'company', label: t('about.tabs.company') },
    { id: 'culture', label: t('about.tabs.culture') },
    { id: 'certificates', label: t('about.tabs.certificates') },
    { id: 'why-us', label: t('about.tabs.whyUs') },
  ];

  if (pageLoading) {
    return (
      <div className="about-page-new">
        <LoadingSpinner />
      </div>
    );
  }

  // 如果 API 失败，使用静态内容作为后备
  if (pageError) {
    console.warn('Failed to load about page data from API, using fallback content');
  }

  return (
    <div className="about-page-new">
      {/* Hero Section */}
      <section className="about-hero-new">
        <div className="container">
          <span className="section-label">{pageMetadata.sectionLabel || t('about.sectionLabel')}</span>
          <h1 className="about-hero-title">{pageMetadata.title || t('about.subtitle')}</h1>
          <p className="about-hero-desc">{pageMetadata.description || t('about.description')}</p>
        </div>
      </section>

      {/* Anchor Navigation */}
      <nav className="about-anchor-nav">
        <div className="container">
          <div className="about-anchor-list">
            {sectionsNav.map((section) => (
              <button
                key={section.id}
                className={`about-anchor-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Company Section */}
      <CompanySection sections={sections} />

      {/* Culture Section */}
      <CultureSection sections={sections} />

      {/* Certificates Section */}
      <CertificatesSection certificates={certificates} />

      {/* Why Us Section */}
      <WhyUsSection items={whyUsItems} />
    </div>
  );
};

// Company Section Component - 支持动态数据
const CompanySection = ({ sections }: { sections?: any[] }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  // 从 sections 获取公司数据
  const companySection = sections?.find(s => s.type === 'company');
  const companyData = companySection?.metadata || {};

  return (
    <section id="company" className="about-section-new" ref={ref}>
      <div className="container">
        <div className={`about-section-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-label">{t('about.tabs.company')}</span>
          <h2 className="about-section-title">{companyData.intro || t('about.company.intro')}</h2>
        </div>

        <div className="about-company-grid-new">
          <div className={`about-company-image ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '100ms' }}>
            <img src={companyData.image || "./images/tech-manufacturing.jpg"} alt="Steel manufacturing" />
            <div className="about-image-badge">
              <span className="badge-year">{companyData.badgeYear || '2021'}</span>
              <span className="badge-text">{companyData.badgeText || t('about.established')}</span>
            </div>
          </div>

          <div className={`about-company-content ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '200ms' }}>
            <p className="about-company-desc">{companyData.description || t('about.company.description')}</p>

            <div className="about-stats-row">
              <div className="about-stat-box">
                <span className="stat-value">{companyData.employeesValue || t('about.company.factory.employeesValue')}</span>
                <span className="stat-label">{t('about.company.factory.employees')}</span>
              </div>
              <div className="about-stat-box">
                <span className="stat-value">{companyData.outputValue || t('about.company.factory.outputValue')}</span>
                <span className="stat-label">{t('about.company.factory.output')}</span>
              </div>
              <div className="about-stat-box">
                <span className="stat-value">{companyData.linesValue || t('about.company.factory.linesValue')}</span>
                <span className="stat-label">{t('about.company.factory.lines')}</span>
              </div>
            </div>

            <div className="about-products-apps">
              <div className="about-info-card">
                <h4>{t('about.company.products.title')}</h4>
                <ul>
                  {(companyData.products || t('about.company.products.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="about-info-card">
                <h4>{t('about.company.applications.title')}</h4>
                <ul>
                  {(companyData.applications || t('about.company.applications.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Culture Section Component - 支持动态数据
const CultureSection = ({ sections }: { sections?: any[] }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  // 从 sections 获取文化数据
  const cultureSection = sections?.find(s => s.type === 'culture');
  const cultureData = cultureSection?.metadata || {};

  return (
    <section id="culture" className="about-section-new about-section-alt" ref={ref}>
      <div className="container">
        <div className={`about-section-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-label">{t('about.tabs.culture')}</span>
          <h2 className="about-section-title">{cultureData.title || t('about.culture.title')}</h2>
        </div>

        <div className="about-culture-grid-new">
          {/* Vision & Mission */}
          <div className={`about-culture-card-large ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '100ms' }}>
            <div className="culture-card-icon"><VisionIcon /></div>
            <span className="culture-label">{t('about.culture.vision.label')}</span>
            <h3>{cultureData.visionTitle || t('about.culture.vision.title')}</h3>
            <p>{cultureData.visionDesc || t('about.culture.vision.desc')}</p>
          </div>

          <div className={`about-culture-card-large ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '200ms' }}>
            <div className="culture-card-icon"><MissionIcon /></div>
            <span className="culture-label">{t('about.culture.mission.label')}</span>
            <h3>{cultureData.missionTitle || t('about.culture.mission.title')}</h3>
            <p>{cultureData.missionDesc || t('about.culture.mission.desc')}</p>
          </div>

          {/* Core Values */}
          <div className={`about-values-card ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '300ms' }}>
            <span className="culture-label">{t('about.culture.values.label')}</span>
            <div className="about-values-list">
              {(cultureData.values || [
                { key: 'customerFirst', icon: true },
                { key: 'selfDiscipline', icon: true },
                { key: 'dedication', icon: true },
              ]).map((value: any, i: number) => (
                <div key={i} className="about-value-item">
                  <div className="value-icon-small"><ValueIcon /></div>
                  <div>
                    <h4>{value.title || t(`about.culture.values.${value.key}.title`)}</h4>
                    <p>{value.desc || t(`about.culture.values.${value.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy & Spirit */}
          <div className={`about-culture-card ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '400ms' }}>
            <span className="culture-label">{t('about.culture.philosophy.label')}</span>
            <h3>{cultureData.philosophyTitle || t('about.culture.philosophy.title')}</h3>
            <p>{cultureData.philosophyDesc || t('about.culture.philosophy.desc')}</p>
          </div>

          <div className={`about-culture-card ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '500ms' }}>
            <span className="culture-label">{t('about.culture.spirit.label')}</span>
            <h3>{cultureData.spiritTitle || t('about.culture.spirit.title')}</h3>
            <p>{cultureData.spiritDesc || t('about.culture.spirit.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Certificates Section Component - 支持动态数据
const CertificatesSection = ({ certificates }: { certificates: any[] }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="certificates" className="about-section-new" ref={ref}>
      <div className="container">
        <div className={`about-section-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-label">{t('about.tabs.certificates')}</span>
          <h2 className="about-section-title">{t('about.certificates.title')}</h2>
          <p className="about-section-subtitle">{t('about.certificates.subtitle')}</p>
        </div>

        <div className="about-certs-grid">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className={`about-cert-card-new ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${100 + i * 100}ms` }}
            >
              <div className="cert-icon"><CertificateIcon /></div>
              <h3>{cert.name}</h3>
              <p>{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Us Section Component - 支持动态数据
const WhyUsSection = ({ items }: { items: any[] }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="why-us" className="about-section-new about-section-alt" ref={ref}>
      <div className="container">
        <div className={`about-section-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-label">{t('about.tabs.whyUs')}</span>
          <h2 className="about-section-title">{t('about.whyUs.title')}</h2>
          <p className="about-section-subtitle">{t('about.whyUs.subtitle')}</p>
        </div>

        <div className="about-why-grid-new">
          {items.map((item, i) => (
            <div
              key={i}
              className={`about-why-card-new ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
