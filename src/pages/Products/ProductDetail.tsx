import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductBySlug, getRelatedProducts } from '../../api/products';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        const productData = (data as any).data || data;
        setProduct(productData);
        if (productData.id) {
          const relatedData = await getRelatedProducts(productData.id);
          setRelated((relatedData as any).data || relatedData);
        }
      } catch (err: any) {
        setError('加载产品详情失败');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="page-loading"><div className="loading-spinner"></div><p>加载中...</p></div>;
  if (error || !product) return <div className="page-error"><h2>加载失败</h2><p>{error || '产品不存在'}</p><Link to="/products">返回产品列表</Link></div>;

  return (
    <div className="product-detail-page">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-primary) 100%)' }}>
        <div className="container">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-title">{product.name}</h1>
        </div>
      </div>
      <div className="container">
        <div className="product-detail-content">
          {product.image && <div className="product-detail-image"><img src={product.image} alt={product.name} /></div>}
          <div className="product-detail-description" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
          {product.specs && product.specs.length > 0 && (
            <div className="product-detail-specs">
              <h2>产品规格</h2>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i}><td>{spec.key}</td><td>{spec.value}{spec.unit ? ` ${spec.unit}` : ''}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {related.length > 0 && (
          <div className="product-related">
            <h2>相关产品</h2>
            <div className="product-related-grid">
              {related.map((item) => (
                <Link to={`/products/${item.slug}`} key={item.id} className="product-related-card">
                  {item.image && <img src={item.image} alt={item.name} />}
                  <h3>{item.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
