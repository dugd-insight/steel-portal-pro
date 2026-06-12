import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './pages.css';

// 11类真实产品数据
const productsData = [
  {
    key: 'gi-pipe-round',
    images: ['/images/products/gi-pipe-round-1.jpg', '/images/products/gi-pipe-round-2.jpg', '/images/products/gi-pipe-round-3.png', '/images/products/gi-pipe-round-4.jpg'],
    specsKey: 'gi-pipe-round',
  },
  {
    key: 'gi-pipe-square',
    images: ['/images/products/gi-pipe-square-1.jpg', '/images/products/gi-pipe-square-2.jpg', '/images/products/gi-pipe-square-3.jpg', '/images/products/gi-pipe-square-4.jpg'],
    specsKey: 'gi-pipe-square',
  },
  {
    key: 'erw-pipe',
    images: ['/images/products/erw-pipe-1.png', '/images/products/erw-pipe-2.jpg', '/images/products/erw-pipe-3.jpg', '/images/products/erw-pipe-4.jpg'],
    specsKey: 'erw-pipe',
  },
  {
    key: 'seamless-pipe',
    images: ['/images/products/seamless-pipe-1.jpg', '/images/products/seamless-pipe-2.jpg', '/images/products/seamless-pipe-3.jpg', '/images/products/seamless-pipe-4.jpg'],
    specsKey: 'seamless-pipe',
  },
  {
    key: 'square-tube',
    images: ['/images/products/square-tube-1.jpg', '/images/products/square-tube-2.jpg', '/images/products/square-tube-3.png', '/images/products/square-tube-4.jpg'],
    specsKey: 'square-tube',
  },
  {
    key: 'steel-section',
    images: ['/images/products/steel-section-1.jpg', '/images/products/steel-section-2.jpg', '/images/products/steel-section-3.jpg'],
    specsKey: 'steel-section',
  },
  {
    key: 'gi-coil',
    images: ['/images/products/gi-coil-1.jpg', '/images/products/gi-coil-2.jpg', '/images/products/gi-coil-3.jpg', '/images/products/gi-coil-4.jpg'],
    specsKey: 'gi-coil',
  },
  {
    key: 'gi-sheet',
    images: ['/images/products/gi-sheet-1.jpg', '/images/products/gi-sheet-2.jpg', '/images/products/gi-sheet-3.jpg', '/images/products/gi-sheet-4.jpg'],
    specsKey: 'gi-sheet',
  },
  {
    key: 'gi-roofing',
    images: ['/images/products/gi-roofing-1.jpg', '/images/products/gi-roofing-2.jpg', '/images/products/gi-roofing-3.jpg', '/images/products/gi-roofing-4.jpg'],
    specsKey: 'gi-roofing',
  },
  {
    key: 'ppgi-coil',
    images: ['/images/products/ppgi-coil-1.jpg', '/images/products/ppgi-coil-2.jpg', '/images/products/ppgi-coil-3.jpg', '/images/products/ppgi-coil-4.jpg'],
    specsKey: 'ppgi-coil',
  },
  {
    key: 'ppgi-roofing',
    images: ['/images/products/ppgi-roofing-1.jpg', '/images/products/ppgi-roofing-2.jpg', '/images/products/ppgi-roofing-3.jpg', '/images/products/ppgi-roofing-4.jpg'],
    specsKey: 'ppgi-roofing',
  },
];

// 产品卡片轮播组件
const ProductCardCarousel = ({ product, onClick, t }: { product: typeof productsData[0]; onClick: () => void; t: any }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx(prev => (prev + 1) % product.images.length);
      }, 2500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [product.images.length]);

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % product.images.length);
    }, 2500);
  };

  const name = t(`productList.${product.key}.name`);
  const desc = t(`productList.${product.key}.desc`);
  const category = t(`productList.${product.key}.category`);
  const specs = t(`productList.${product.key}.specs`, { returnObjects: true }) as string[];

  return (
    <div
      className="product-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image" style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>
        {/* 图片轮播 */}
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
              alt={`${name} - ${i + 1}`}
              loading="lazy"
              style={{
                minWidth: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>

        {/* 分类标签 */}
        <span className="product-badge">{category}</span>

        {/* 图片数量指示 */}
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

        {/* 轮播指示点 - 悬停时显示 */}
        {product.images.length > 1 && isHovered && (
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 6,
          }}>
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToSlide(i, e)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === currentIdx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.7)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        )}

        {/* 左右箭头 - 悬停时显示 */}
        {product.images.length > 1 && isHovered && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToSlide((currentIdx - 1 + product.images.length) % product.images.length, e);
              }}
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToSlide((currentIdx + 1) % product.images.length, e);
              }}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
      <div className="product-content">
        <h3 className="product-title">{name}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
          {desc.substring(0, 40)}...
        </p>
        <div className="product-specs">
          {specs.map((spec, i) => (
            <span key={i} className="product-spec-tag">{spec}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['all', 'pipe', 'section', 'plate'];

  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => {
        const cat = t(`productList.${p.key}.categoryKey`);
        return cat === activeCategory;
      });

  const selectedProductData = selectedProduct
    ? productsData.find(p => p.key === selectedProduct)
    : null;

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">{t('products.sectionLabel')}</span>
          <h1 className="about-hero-title">{t('products.title')}</h1>
          <p className="about-hero-desc">{t('products.description')}</p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ background: 'var(--bg-secondary)', padding: '24px 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 24,
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: activeCategory === cat ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(26, 95, 180, 0.3)' : 'var(--shadow-sm)',
                }}
              >
                {t(`productCategories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {filteredProducts.map((product) => (
              <ProductCardCarousel
                key={product.key}
                product={product}
                onClick={() => {
                  setSelectedProduct(product.key);
                  setCurrentImageIndex(0);
                }}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProductData && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: 'var(--bg-primary)',
              borderRadius: 20,
              maxWidth: 900,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                fontSize: 20,
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ×
            </button>

            {/* Image Gallery */}
            <div style={{ position: 'relative' }}>
              <img
                src={selectedProductData.images[currentImageIndex]}
                alt={t(`productList.${selectedProductData.key}.name`)}
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  objectFit: 'cover',
                  borderRadius: '20px 20px 0 0',
                }}
              />
              {selectedProductData.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === 0 ? selectedProductData.images.length - 1 : prev - 1
                    )}
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === selectedProductData.images.length - 1 ? 0 : prev + 1
                    )}
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProductData.images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: 8,
                padding: '12px 24px',
                overflowX: 'auto',
              }}>
                {selectedProductData.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    style={{
                      width: 80,
                      height: 60,
                      borderRadius: 8,
                      border: i === currentImageIndex ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Info */}
            <div style={{ padding: '24px 32px 32px' }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 12,
              }}>
                {t(`productList.${selectedProductData.key}.category`)}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                {t(`productList.${selectedProductData.key}.name`)}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                {t(`productList.${selectedProductData.key}.desc`)}
              </p>

              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t('productDetail.specsTitle')}</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {(t(`productList.${selectedProductData.key}.specs`, { returnObjects: true }) as string[]).map((spec, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 8,
                      fontSize: 14,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <Link
                to="/contact"
                className="btn btn-primary"
                style={{ display: 'inline-flex' }}
              >
                {t('nav.getQuote')}
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 8 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
