import { useTranslation } from 'react-i18next';
import './about.css';

// Company Page
const Company = () => {
  const { t } = useTranslation();

  return (
    <div className="about-subpage">
      <section className="section">
        <div className="container">
          <div className="about-company-grid">
            <div className="about-company-left">
              <div className="about-hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                  alt="Steel manufacturing facility"
                />
                <div className="about-image-overlay">
                  <div className="about-overlay-content">
                    <span className="about-established">2021</span>
                    <span className="about-established-text">{t('about.established')}</span>
                  </div>
                </div>
              </div>
              
              <div className="about-factory-stats">
                <div className="about-stat-item">
                  <span className="about-stat-value">{t('about.company.factory.employeesValue')}</span>
                  <span className="about-stat-label">{t('about.company.factory.employees')}</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <span className="about-stat-value">{t('about.company.factory.techniciansValue')}</span>
                  <span className="about-stat-label">{t('about.company.factory.technicians')}</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <span className="about-stat-value">{t('about.company.factory.outputValue')}</span>
                  <span className="about-stat-label">{t('about.company.factory.output')}</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <span className="about-stat-value">{t('about.company.factory.linesValue')}</span>
                  <span className="about-stat-label">{t('about.company.factory.lines')}</span>
                </div>
              </div>
            </div>

            <div className="about-company-right">
              <h2 className="about-section-heading">{t('about.company.intro')}</h2>
              <p className="about-text">{t('about.company.description')}</p>

              <div className="about-content-block">
                <h3 className="about-content-title">{t('about.company.products.title')}</h3>
                <ul className="about-list">
                  {t('about.company.products.items', { returnObjects: true }).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="about-content-block">
                <h3 className="about-content-title">{t('about.company.applications.title')}</h3>
                <ul className="about-list">
                  {t('about.company.applications.items', { returnObjects: true }).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="about-export-grid">
                <div className="about-export-item">
                  <span className="about-export-value">{t('about.company.export.regionsValue')}</span>
                  <span className="about-export-label">{t('about.company.export.regions')}</span>
                </div>
                <div className="about-export-item">
                  <span className="about-export-value">{t('about.company.export.projectsValue')}</span>
                  <span className="about-export-label">{t('about.company.export.projects')}</span>
                </div>
                <div className="about-export-item">
                  <span className="about-export-value">{t('about.company.export.customersValue')}</span>
                  <span className="about-export-label">{t('about.company.export.customers')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
