import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePage } from '../hooks/usePage';
import type { PageSection } from '../api/pages';
import './pages.css';

// Hero Section - 参考 lcjtkg.com 第二个Banner设计
const Hero = ({ sections }: {
  sections?: PageSection[];
}) => {
  const { t } = useTranslation();

  // 从 sections 中提取 hero 区块数据
  const heroSection = sections?.find(s => s.type === 'hero');
  const heroData = heroSection?.metadata || {};

  // 业绩数据
  const stats = [
    { num: '10+', label: t('stats.serviceCompanies') },
    { num: `3000${t('stats.exportUnit')}+`, label: t('stats.exportVolume') },
    { num: `15${t('stats.countryUnit')}`, label: t('stats.countries') },
    { num: '20+', label: t('stats.buyers') },
  ];

  return (
    <section className="hero-immersive">
      {/* 背景图层 - 视频 */}
      <div className="hero-bg-wrapper">
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="./images/hero-banner-new.jpg"
        >
          <source src="./videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-overlay" />
        <div className="hero-bg-vignette" />
      </div>

      <HeroContent heroData={heroData} stats={stats} t={t} />
    </section>
  );
};

// Hero内容组件 - 左右布局：左侧标题+按钮，右侧4个毛玻璃数据卡片
const HeroContent = ({ heroData, stats, t }: { heroData: any; stats: any[]; t: any }) => {
  return (
    <div className="hero-content-wrapper">
      <div className="container">
        <div className="hero-immersive-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '100%',
          width: '100%',
        }}>
          {/* 左侧：标题和CTA */}
          <div style={{ flex: '1 1 auto', maxWidth: '680px', minWidth: 0, paddingRight: '40px' }}>
            <span className="hero-badge hero-animate-1">
              <span className="hero-badge-dot" />
              {heroData.badge || t('hero.badge')}
            </span>

            <h1 className="hero-immersive-title hero-animate-2" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: 1.3 }}>
              {heroData.title || t('hero.title')}{' '}
              <span className="hero-title-highlight">
                {heroData.titleHighlight || t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="hero-immersive-desc hero-animate-3" style={{ fontSize: '16px', maxWidth: '480px' }}>
              {heroData.description || t('hero.description')}
            </p>

            <div className="hero-immersive-cta hero-animate-4" style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
              <a href="#products" className="btn btn-glow" style={{ whiteSpace: 'nowrap' }}>
                {heroData.ctaPrimary || t('hero.exploreProducts')}
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-glass" style={{ whiteSpace: 'nowrap' }}>
                {heroData.ctaSecondary || t('hero.contactSales')}
              </a>
            </div>
          </div>

          {/* 右侧：4个毛玻璃数据卡片 */}
          <div className="hero-animate-5" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            flex: '0 0 auto',
            maxWidth: '440px',
            width: '100%',
          }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '8px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  {stat.num}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Trust Bar - 联系方式栏，始终显示不依赖API
const TrustBar = () => {
  const { t } = useTranslation();

  // 硬编码联系方式，确保始终显示
  const contactInfo = {
    phone: '+86 635 2180898',
    mobile: '+86 15063550004',
    email: 'chenxi@lccxtz.com',
    address: '山东省聊城经济技术开发区黄山路1号星光荣富中心17A室',
  };

  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-bar-content">
          <div className="trust-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
              {contactInfo.phone}
            </a>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href={`tel:${contactInfo.mobile.replace(/\s/g, '')}`}>
              {contactInfo.mobile}
            </a>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 首页产品卡片轮播组件
const HomeProductCarousel = ({ product, index }: { product: { key: string; title: string; description: string; images: string[]; badge: string; specs: string[] }; index: number }) => {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx(prev => (prev + 1) % product.images.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [product.images.length]);

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % product.images.length);
    }, 3000);
  };

  return (
    <div
      className={`product-card animate-fade-in-up delay-${index + 1}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-image" style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIdx * 100}%)`,
          height: '100%',
        }}>
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.title} - ${i + 1}`}
              loading="lazy"
              style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }}
            />
          ))}
        </div>
        <span className="product-card-badge">{product.badge}</span>
        {product.images.length > 1 && (
          <span style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: 12,
            fontSize: 12,
          }}>
            {currentIdx + 1} / {product.images.length}
          </span>
        )}
        {product.images.length > 1 && isHovered && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToSlide((currentIdx - 1 + product.images.length) % product.images.length); }}
              style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: '50%', border: 'none',
                background: 'rgba(0,0,0,0.4)', color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}
            >‹</button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToSlide((currentIdx + 1) % product.images.length); }}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: '50%', border: 'none',
                background: 'rgba(0,0,0,0.4)', color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}
            >›</button>
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 5,
            }}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToSlide(i); }}
                  style={{
                    width: 6, height: 6, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                    background: i === currentIdx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.7)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-specs">
          {product.specs.map((spec, j) => (
            <span key={j} className="spec-tag">{spec}</span>
          ))}
        </div>
        <Link to="/products" className="btn btn-ghost" style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: 14 }}>
          {t('products.learnMore')}
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Products Section - 使用真实产品数据
const Products = ({ sections }: { sections?: PageSection[] }) => {
  const { t } = useTranslation();
  const productsSection = sections?.find(s => s.type === 'products');

  // 首页展示6款主打产品（使用真实照片，支持轮播）
  const featuredProducts = [
    {
      key: 'gi-pipe-round',
      titleKey: 'products.featured.giPipeRound.title',
      descKey: 'products.featured.giPipeRound.description',
      images: ['./images/products/gi-pipe-round-1.jpg', './images/products/gi-pipe-round-2.jpg', './images/products/gi-pipe-round-3.png', './images/products/gi-pipe-round-4.jpg'],
      badgeKey: 'products.featured.giPipeRound.badge',
      specs: ['DN15-DN200', '壁厚0.8-12mm', 'Q195/Q235'],
    },
    {
      key: 'seamless-pipe',
      titleKey: 'products.featured.seamlessPipe.title',
      descKey: 'products.featured.seamlessPipe.description',
      images: ['./images/products/seamless-pipe-1.jpg', './images/products/seamless-pipe-2.jpg', './images/products/seamless-pipe-3.jpg', './images/products/seamless-pipe-4.jpg'],
      badgeKey: 'products.featured.seamlessPipe.badge',
      specs: ['OD:10-720mm', '壁厚1-80mm', 'API 5L'],
    },
    {
      key: 'gi-coil',
      titleKey: 'products.featured.giCoil.title',
      descKey: 'products.featured.giCoil.description',
      images: ['./images/products/gi-coil-1.jpg', './images/products/gi-coil-2.jpg', './images/products/gi-coil-3.jpg', './images/products/gi-coil-4.jpg'],
      badgeKey: 'products.featured.giCoil.badge',
      specs: ['厚度0.12-6mm', '宽度600-1500mm', 'Z40-Z275'],
    },
    {
      key: 'ppgi-coil',
      titleKey: 'products.featured.ppgiCoil.title',
      descKey: 'products.featured.ppgiCoil.description',
      images: ['./images/products/ppgi-coil-1.jpg', './images/products/ppgi-coil-2.jpg', './images/products/ppgi-coil-3.jpg', './images/products/ppgi-coil-4.jpg'],
      badgeKey: 'products.featured.ppgiCoil.badge',
      specs: ['厚度0.12-1.5mm', '宽度600-1500mm', '颜色定制'],
    },
    {
      key: 'gi-roofing',
      titleKey: 'products.featured.giRoofing.title',
      descKey: 'products.featured.giRoofing.description',
      images: ['./images/products/gi-roofing-1.jpg', './images/products/gi-roofing-2.jpg', './images/products/gi-roofing-3.jpg', './images/products/gi-roofing-4.jpg'],
      badgeKey: 'products.featured.giRoofing.badge',
      specs: ['厚度0.13-1mm', '宽度600-1100mm', '多种波型'],
    },
    {
      key: 'steel-section',
      titleKey: 'products.featured.steelSection.title',
      descKey: 'products.featured.steelSection.description',
      images: ['./images/products/steel-section-1.jpg', './images/products/steel-section-2.jpg', './images/products/steel-section-3.jpg'],
      badgeKey: 'products.featured.steelSection.badge',
      specs: ['规格齐全', 'Q235B/Q355B', '定尺切割'],
    },
    {
      key: 'hr-coil',
      titleKey: 'products.featured.hrCoil.title',
      descKey: 'products.featured.hrCoil.description',
      images: ['./images/products/hr-coil-1.jpg', './images/products/hr-coil-2.jpg', './images/products/hr-coil-3.jpg', './images/products/hr-coil-4.jpg'],
      badgeKey: 'products.featured.hrCoil.badge',
      specs: ['厚度1.2-25.4mm', '宽度1000-2100mm', 'Q235B/Q345B/SPHC'],
    },
  ];

  // 将翻译键解析为实际文本
  const translatedProducts = featuredProducts.map(p => ({
    ...p,
    title: t(p.titleKey),
    description: t(p.descKey),
    badge: t(p.badgeKey),
  }));

  return (
    <section id="products" className="section reveal">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">{productsSection?.title || t('products.sectionLabel')}</span>
          <h2 className="section-title">{productsSection?.content || t('products.title')}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {productsSection?.metadata?.description || t('products.description')}
          </p>
        </div>

        <div className="products-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {translatedProducts.map((product, i) => (
            <HomeProductCarousel key={i} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section - 支持动态数据
const Features = ({ sections }: { sections?: PageSection[] }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: t('features.quality.title'),
      desc: t('features.quality.desc'),
    },
    {
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: t('features.global.title'),
      desc: t('features.global.desc'),
    },
    {
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
      title: t('features.support.title'),
      desc: t('features.support.desc'),
    },
    {
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      title: t('features.custom.title'),
      desc: t('features.custom.desc'),
    },
  ];

  return (
    <section className="section reveal" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">{t('features.sectionLabel')}</span>
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t('features.description')}
          </p>
        </div>

        <div className="features-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {features.map((feature, i) => (
            <div key={i} className={`feature-card animate-fade-in-up delay-${i + 1}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="feature-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Preview Section
const AboutPreview = ({ sections }: { sections?: PageSection[] }) => {
  const { t } = useTranslation();

  return (
    <section className="section reveal">
      <div className="container">
        <div className="about-preview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="section-label">{t('about.sectionLabel')}</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t('about.title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: '16px' }}>
              {t('about.description')}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-primary">
                {t('products.learnMore')}
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/about" className="btn btn-outline">
                {t('about.tabs.culture')}
              </Link>
              <Link to="/about" className="btn btn-outline">
                {t('about.tabs.certificates')}
              </Link>
              <Link to="/about" className="btn btn-outline">
                {t('about.tabs.whyUs')}
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="./images/about-building.jpg"
              alt="聊城金投控股大楼"
              style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 20, boxShadow: 'var(--shadow-lg)' }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: -24,
              left: -24,
              background: 'var(--accent-primary)',
              color: 'white',
              padding: '24px 32px',
              borderRadius: 16,
              boxShadow: 'var(--shadow-lg)',
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>{t('stats.years')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Warehouse Section
const WarehouseSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section reveal" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">{t('warehouse.sectionLabel')}</span>
          <h2 className="section-title">{t('warehouse.title')}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t('warehouse.description')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80', title: t('warehouse.items.storage.title'), desc: t('warehouse.items.storage.desc') },
            { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', title: t('warehouse.items.processing.title'), desc: t('warehouse.items.processing.desc') },
            { img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80', title: t('warehouse.items.logistics.title'), desc: t('warehouse.items.logistics.desc') },
          ].map((item, i) => (
            <div key={i} className={`animate-fade-in-up delay-${i + 1}`} style={{ animationDelay: `${i * 100}ms` }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginBottom: 16 }} loading="lazy" />
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    { quote: t('testimonials.items.michael.quote'), author: t('testimonials.items.michael.author'), company: t('testimonials.items.michael.company') },
    { quote: t('testimonials.items.sarah.quote'), author: t('testimonials.items.sarah.author'), company: t('testimonials.items.sarah.company') },
    { quote: t('testimonials.items.ahmed.quote'), author: t('testimonials.items.ahmed.author'), company: t('testimonials.items.ahmed.company') },
  ];

  return (
    <section className="section reveal">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">{t('testimonials.sectionLabel')}</span>
          <h2 className="section-title">{t('testimonials.title')}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {testimonials.map((item, i) => (
            <div key={i} className={`testimonial-card animate-fade-in-up delay-${i + 1}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div style={{ fontSize: 48, color: 'var(--accent-primary)', opacity: 0.3, lineHeight: 1, marginBottom: 16 }}>"</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>{item.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {item.author[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.author}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="section reveal" style={{ background: 'var(--accent-primary)', color: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, marginBottom: 16 }}>{t('cta.title')}</h2>
          <p style={{ opacity: 0.9, marginBottom: 32, fontSize: 16 }}>{t('cta.description')}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn" style={{ background: 'white', color: 'var(--accent-primary)' }}>
              {t('cta.primary')}
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link to="/products" className="btn btn-glass">
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Preview Section
const ContactPreview = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <span className="section-label">{t('contact.sectionLabel')}</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t('contact.title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
              {t('contact.description')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{t('contact.info.headquarters.title')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t('contact.info.headquarters.address')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{t('contact.info.email.title')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>chenxi@lccxtz.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{t('contact.info.phone.title')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                    {t('contact.info.phone.numbers')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: 40, borderRadius: 20, border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{t('contact.form.title')}</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" placeholder={t('contact.form.name')} className="form-input" />
              <input type="email" placeholder={t('contact.form.email')} className="form-input" />
              <input type="text" placeholder={t('contact.form.company')} className="form-input" />
              <textarea placeholder={t('contact.form.message')} rows={4} className="form-input" style={{ resize: 'vertical' }} />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Home Page
const Home = () => {
  useScrollReveal();
  const { t } = useTranslation();

  // 尝试加载 CMS 数据（后端不可用时使用默认数据，不影响页面显示）
  const { data: pageData } = usePage('home');

  const sections = pageData?.sections || [];

  return (
    <div>
      <Hero sections={sections} />
      <TrustBar />
      <Products sections={sections} />
      <Features sections={sections} />
      <AboutPreview sections={sections} />
      <WarehouseSection />
      <Testimonials />
      <CTASection />
      <ContactPreview />
    </div>
  );
};

export default Home;
