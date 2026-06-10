import { useTranslation } from 'react-i18next';
import './about.css';

// Certificates Page
const Certificates = () => {
  const { t } = useTranslation();
  const certificates = t('about.certificates.items', { returnObjects: true });

  return (
    <div className="about-subpage">
      <section className="section">
        <div className="container">
          <div className="about-cert-grid">
            {(certificates as any[]).map((cert: any, i: number) => (
              <div key={i} className="about-cert-card">
                <div className="about-cert-badge">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="about-cert-name">{cert.name}</h3>
                <p className="about-cert-desc">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;
