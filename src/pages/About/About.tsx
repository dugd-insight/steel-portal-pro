import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../components/common/ScrollReveal';
import ScrollRevealSection from '../../components/common/ScrollRevealSection';
import { usePage } from '../../hooks/usePage';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './about.css';

// Image Carousel Component
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: './images/about-building.jpg', alt: '聊城金投控股大楼' },
    { src: './images/about-culture.jpg', alt: '企业文化墙' },
    { src: './images/about-office.jpg', alt: '办公环境' },
    { src: './images/about-reception.jpg', alt: '财信集团前台' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="about-company-image">
      <div className="carousel-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
        <button className="carousel-btn carousel-prev" onClick={goPrev} aria-label="上一张">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="carousel-btn carousel-next" onClick={goNext} aria-label="下一张">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`切换到第${index + 1}张`}
            />
          ))}
        </div>
      </div>
      <div className="about-image-badge">
        <span className="badge-year">2015</span>
        <span className="badge-text">成立于聊城</span>
      </div>
    </div>
  );
};

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

const PhilosophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const SpiritIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CertificateIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
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

  // 如果 API 失败，使用静态内容作为后备，不要一直显示 loading
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

  // 从 sections 获取公司数据
  const companySection = sections?.find(s => s.type === 'company');
  const companyData = companySection?.metadata || {};

  return (
    <ScrollRevealSection id="company" className="about-section-new">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
            <span className="section-label">{t('about.tabs.company')}</span>
            <h2 className="about-section-title">{companyData.intro || t('about.company.intro')}</h2>
          </div>
        </ScrollReveal>

        <div className="about-company-grid-new">
          <ScrollReveal direction="left" delay={0.1}>
            <ImageCarousel />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="about-company-content">
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
          </ScrollReveal>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

// Culture Section Component - 支持动态数据
const CultureSection = ({ sections }: { sections?: any[] }) => {
  const { t } = useTranslation();

  // 从 sections 获取文化数据
  const cultureSection = sections?.find(s => s.type === 'culture');
  const cultureData = cultureSection?.metadata || {};

  return (
    <ScrollRevealSection id="culture" className="about-section-new about-section-alt">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
            <span className="section-label">{t('about.tabs.culture')}</span>
            <h2 className="about-section-title">{cultureData.title || t('about.culture.title')}</h2>
          </div>
        </ScrollReveal>

        {/* 4 Culture Cards: 2x2 Grid */}
        <div className="about-culture-grid-new">
          <ScrollReveal delay={0.1}>
            <div className="about-culture-card-large">
              <div className="culture-card-icon icon-blue"><VisionIcon /></div>
              <span className="culture-label">{t('about.culture.vision.label')}</span>
              <h3>{cultureData.visionTitle || t('about.culture.vision.title')}</h3>
              <p>{cultureData.visionDesc || t('about.culture.vision.desc')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="about-culture-card-large">
              <div className="culture-card-icon icon-emerald"><MissionIcon /></div>
              <span className="culture-label">{t('about.culture.mission.label')}</span>
              <h3>{cultureData.missionTitle || t('about.culture.mission.title')}</h3>
              <p>{cultureData.missionDesc || t('about.culture.mission.desc')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="about-culture-card-large">
              <div className="culture-card-icon icon-teal"><PhilosophyIcon /></div>
              <span className="culture-label">{t('about.culture.philosophy.label')}</span>
              <h3>{cultureData.philosophyTitle || t('about.culture.philosophy.title')}</h3>
              <p>{cultureData.philosophyDesc || t('about.culture.philosophy.desc')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="about-culture-card-large">
              <div className="culture-card-icon icon-orange"><SpiritIcon /></div>
              <span className="culture-label">{t('about.culture.spirit.label')}</span>
              <h3>{cultureData.spiritTitle || t('about.culture.spirit.title')}</h3>
              <p>{cultureData.spiritDesc || t('about.culture.spirit.desc')}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Core Values - Separate Full-Width Section */}
        <ScrollReveal delay={0.2}>
          <div className="about-values-section">
            <div className="about-values-header">
              <div className="culture-card-icon icon-violet values-header-icon"><ValueIcon /></div>
              <span className="culture-label">{t('about.culture.values.label')}</span>
              <h3 className="about-values-title">{t('about.culture.values.title') || t('about.culture.values.label')}</h3>
            </div>
            <div className="about-values-list">
              {(cultureData.values || [
                { key: 'customerFirst', icon: true },
                { key: 'selfDiscipline', icon: true },
                { key: 'dedication', icon: true },
              ]).map((value: any, i: number) => {
                const iconColors = ['icon-violet', 'icon-amber', 'icon-rose'];
                return (
                <div key={i} className="about-value-item">
                  <div className={`value-icon-small ${iconColors[i % iconColors.length]}`}><ValueIcon /></div>
                  <div>
                    <h4>{value.title || t(`about.culture.values.${value.key}.title`)}</h4>
                    <p>{value.desc || t(`about.culture.values.${value.key}.desc`)}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </ScrollRevealSection>
  );
};

// Certificates Section Component - 支持动态数据
const CertificatesSection = ({ certificates }: { certificates: any[] }) => {
  const { t } = useTranslation();

  return (
    <ScrollRevealSection id="certificates" className="about-section-new">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
            <span className="section-label">{t('about.tabs.certificates')}</span>
            <h2 className="about-section-title">{t('about.certificates.title')}</h2>
            <p className="about-section-subtitle">{t('about.certificates.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="about-certs-grid">
          {certificates.map((cert, i) => {
            const certColors = ['icon-blue', 'icon-emerald', 'icon-violet', 'icon-amber', 'icon-rose', 'icon-teal'];
            return (
            <ScrollReveal key={i} delay={0.1 + i * 0.1}>
              <div className="about-cert-card-new">
                <div className={`cert-icon ${certColors[i % certColors.length]}`}><CertificateIcon /></div>
                <h3>{cert.name}</h3>
                <p>{cert.desc}</p>
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
};

// Why Us Section Component - 支持动态数据
const WhyUsSection = ({ items }: { items: any[] }) => {
  const { t } = useTranslation();

  return (
    <ScrollRevealSection id="why-us" className="about-section-new about-section-alt">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
            <span className="section-label">{t('about.tabs.whyUs')}</span>
            <h2 className="about-section-title">{t('about.whyUs.title')}</h2>
            <p className="about-section-subtitle">{t('about.whyUs.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="about-why-grid-new">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.05}>
              <div className="about-why-card-new">
                <span className="why-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default About;
