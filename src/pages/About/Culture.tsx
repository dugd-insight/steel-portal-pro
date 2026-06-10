import React from 'react';
import { useTranslation } from 'react-i18next';
import './about.css';

// SVG Icons for Culture
const VisionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const GrowthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9M12 17V5M6 17v-4" />
  </svg>
);

const TargetIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Culture Page
const Culture = () => {
  const { t } = useTranslation();

  return (
    <div className="about-subpage">
      <section className="section">
        <div className="container">
          <div className="about-culture-grid">
            <div className="about-culture-card about-culture-highlight">
              <div className="about-culture-label">{t('about.culture.vision.label')}</div>
              <h3 className="about-culture-card-title">{t('about.culture.vision.title')}</h3>
              <p className="about-culture-card-desc">{t('about.culture.vision.desc')}</p>
            </div>
            
            <div className="about-culture-card">
              <div className="about-culture-label">{t('about.culture.mission.label')}</div>
              <h3 className="about-culture-card-title">{t('about.culture.mission.title')}</h3>
              <p className="about-culture-card-desc">{t('about.culture.mission.desc')}</p>
            </div>

            <div className="about-values-section">
              <div className="about-culture-label">{t('about.culture.values.label')}</div>
              <div className="about-values-grid">
                <div className="about-value-card">
                  <div className="about-value-icon"><VisionIcon /></div>
                  <h4 className="about-value-title">{t('about.culture.values.customerFirst.title')}</h4>
                  <p className="about-value-desc">{t('about.culture.values.customerFirst.desc')}</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon"><GrowthIcon /></div>
                  <h4 className="about-value-title">{t('about.culture.values.selfDiscipline.title')}</h4>
                  <p className="about-value-desc">{t('about.culture.values.selfDiscipline.desc')}</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon"><TargetIcon /></div>
                  <h4 className="about-value-title">{t('about.culture.values.dedication.title')}</h4>
                  <p className="about-value-desc">{t('about.culture.values.dedication.desc')}</p>
                </div>
              </div>
            </div>

            <div className="about-culture-card">
              <div className="about-culture-label">{t('about.culture.philosophy.label')}</div>
              <h3 className="about-culture-card-title">{t('about.culture.philosophy.title')}</h3>
              <p className="about-culture-card-desc">{t('about.culture.philosophy.desc')}</p>
            </div>
            
            <div className="about-culture-card">
              <div className="about-culture-label">{t('about.culture.spirit.label')}</div>
              <h3 className="about-culture-card-title">{t('about.culture.spirit.title')}</h3>
              <p className="about-culture-card-desc">{t('about.culture.spirit.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Culture;
