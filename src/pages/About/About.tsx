import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../components/common/ScrollReveal';
import ScrollRevealSection from '../../components/common/ScrollRevealSection';
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
const CertificateIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const About = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('company');

  // 纯静态页面（无后端 API），直接使用内置内容
  const sections = undefined;
  const pageMetadata: Record<string, any> = {};

  // 从 API 数据或翻译文件获取证书和优势数据
  const certificates = pageMetadata.certificates || t('about.certificates.items', { returnObjects: true }) as any[];
  const whyUsItems = pageMetadata.whyUsItems || t('about.whyUs.items', { returnObjects: true }) as any[];

  // Scroll-spy: highlight active section in nav
  useEffect(() => {
    const sectionIds = ['company', 'certificates', 'why-us'];
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
    { id: 'certificates', label: t('about.tabs.certificates') },
    { id: 'why-us', label: t('about.tabs.whyUs') },
  ];

  return (
    <div className="about-page-new">
      {/* Hero Section */}
      <section className="about-hero-new">
        <div className="container">
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

// Certificates Section Component - 支持动态数据
const CertificatesSection = ({ certificates }: { certificates: any[] }) => {
  const { t } = useTranslation();

  return (
    <ScrollRevealSection id="certificates" className="about-section-new about-section-alt">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
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
    <ScrollRevealSection id="why-us" className="about-section-new">
      <div className="container">
        <ScrollReveal>
          <div className="about-section-header">
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
