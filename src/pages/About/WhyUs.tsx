import { useTranslation } from 'react-i18next';
import './about.css';

// Why Us Page
const WhyUs = () => {
  const { t } = useTranslation();
  const whyUsItems = t('about.whyUs.items', { returnObjects: true });

  return (
    <div className="about-subpage">
      <section className="section">
        <div className="container">
          <div className="about-why-grid">
            {(whyUsItems as any[]).map((item: any, i: number) => (
              <div key={i} className="about-why-card">
                <div className="about-why-num">{item.num}</div>
                <h3 className="about-why-title">{item.title}</h3>
                <p className="about-why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
