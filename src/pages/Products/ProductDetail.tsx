import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductBySlug, getRelatedProducts, type Product, type ProductSpec } from '../../api/products';
import ScrollReveal from '../../components/common/ScrollReveal';
import '../pages.css';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProductBySlug(slug);
        const productData = (data as any).data || data;
        setProduct(productData);
        setActiveImage(0);
        if (productData.id) {
          const relatedData = await getRelatedProducts(productData.id);
          setRelated((relatedData as any).data || relatedData);
        }
      } catch (err: any) {
        setError(t('productDetail.loadError', '加载产品详情失败'));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // 从翻译文件获取产品名称、描述、规格，不存在则 fallback 到 API 数据
  const productName = slug
    ? t(`productList.${slug}.name`, { defaultValue: product?.name || '' })
    : product?.name || '';

  const productDesc = slug
    ? t(`productList.${slug}.desc`, { defaultValue: product?.description || '' })
    : product?.description || '';

  const productCategory = slug
    ? t(`productList.${slug}.category`, { defaultValue: product?.category || '' })
    : product?.category || '';

  // 从翻译文件获取规格标签数组，不存在则从 API specs 生成
  const specsFromI18n = slug
    ? t(`productList.${slug}.specs`, { returnObjects: true, defaultValue: null })
    : null;

  const specTags: string[] = (() => {
    if (Array.isArray(specsFromI18n) && specsFromI18n.length > 0) {
      return specsFromI18n;
    }
    if (product?.specs && product.specs.length > 0) {
      return product.specs.map((spec: ProductSpec) =>
        spec.unit ? `${spec.key}: ${spec.value} ${spec.unit}` : `${spec.key}: ${spec.value}`
      );
    }
    return [];
  })();

  // 画廊图片：优先用 gallery，否则用单张 image
  const galleryImages: string[] = (() => {
    if (product?.gallery && product.gallery.length > 0) return product.gallery;
    if (product?.image) return [product.image];
    return [];
  })();

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>{t('productDetail.loading', '加载中...')}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-error">
        <h2>{t('productDetail.loadFailed', '加载失败')}</h2>
        <p>{error || t('productDetail.notFound', '产品不存在')}</p>
        <Link to="/products" className="product-detail-back">
          &larr; {t('productDetail.backToList', '返回产品列表')}
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Hero 区域 */}
      <section className="product-detail-hero">
        <div className="container">
          <div className="page-hero-content">
            <ScrollReveal direction="up" delay={0}>
              <Link to="/products" className="product-detail-back">
                &larr; {t('productDetail.backToList', '返回产品列表')}
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <span className="hero-label">{productCategory}</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="hero-title-xl">{productName}</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="hero-desc-lg">{productDesc}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 产品图片 + 描述 双栏 */}
      <section className="product-detail-grid-section">
        <div className="container">
          <div className="product-detail-grid">
            {/* 左侧：图片画廊 */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="product-detail-gallery">
                {galleryImages.length > 0 && (
                  <>
                    <div className="product-detail-gallery-main">
                      <img
                        src={galleryImages[activeImage]}
                        alt={productName}
                      />
                    </div>
                    {galleryImages.length > 1 && (
                      <div className="product-detail-gallery-thumbs">
                        {galleryImages.map((img, idx) => (
                          <div
                            key={idx}
                            className={`product-detail-gallery-thumb ${idx === activeImage ? 'active' : ''}`}
                            onClick={() => setActiveImage(idx)}
                          >
                            <img src={img} alt={`${productName} ${idx + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* 右侧：产品信息 */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="product-detail-info">
                <h2 className="product-detail-info-title">{productName}</h2>
                <p className="product-detail-info-category">{productCategory}</p>
                <div
                  className="product-detail-info-desc"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || productDesc,
                  }}
                />

                {/* 特性列表 */}
                {product?.features && product.features.length > 0 && (
                  <div className="product-detail-features">
                    <h3>{t('productDetail.features', '产品特性')}</h3>
                    <ul>
                      {product.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 应用领域 */}
                {product?.applications && product.applications.length > 0 && (
                  <div className="product-detail-applications">
                    <h3>{t('productDetail.applications', '应用领域')}</h3>
                    <ul>
                      {product.applications.map((app, i) => (
                        <li key={i}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 规格标签 */}
      {specTags.length > 0 && (
        <section className="product-detail-specs-section">
          <div className="container">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="section-title">
                {t('productDetail.specsTitle', '产品规格')}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="product-detail-specs">
                {specTags.map((spec, i) => (
                  <span className="product-detail-spec-tag" key={i}>
                    {spec}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 相关产品 */}
      {related.length > 0 && (
        <section className="product-detail-related">
          <div className="container">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="section-title">
                {t('productDetail.relatedProducts', '相关产品')}
              </h2>
            </ScrollReveal>
            <div className="product-detail-related-grid">
              {related.map((item, idx) => {
                const relatedName = item.slug
                  ? t(`productList.${item.slug}.name`, { defaultValue: item.name })
                  : item.name;
                const relatedDesc = item.slug
                  ? t(`productList.${item.slug}.desc`, { defaultValue: item.shortDescription || '' })
                  : item.shortDescription || '';

                return (
                  <ScrollReveal key={item.id} direction="up" delay={0.1 * idx}>
                    <Link
                      to={`/products/${item.slug}`}
                      className="product-detail-related-card"
                    >
                      {item.image && (
                        <div className="product-detail-related-card-image">
                          <img src={item.image} alt={relatedName} />
                        </div>
                      )}
                      <div className="product-detail-related-card-content">
                        <h3>{relatedName}</h3>
                        <p>{relatedDesc}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
