import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage } from '../hooks/usePage';
import { useSettings } from '../hooks/useSettings';
import './pages.css';

// 加载状态组件
const LoadingSpinner = () => (
  <div className="loading-spinner" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--accent-light)',
      borderTop: '3px solid var(--accent-primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // 获取联系页面数据
  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = usePage('contact');

  // 获取网站设置（包含联系信息）
  const {
    data: settingsData,
    isLoading: settingsLoading,
  } = useSettings();

  const pageMetadata = pageData?.metadata || {};
  const contactInfo = settingsData?.contact || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // 联系信息卡片数据
  const contactItems = [
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: t('contact.info.headquarters.title'),
      text: contactInfo.address || t('contact.info.headquarters.address'),
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: t('contact.info.email.title'),
      text: contactInfo.email || t('contact.info.email.addresses'),
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: t('contact.info.phone.title'),
      text: contactInfo.phone || t('contact.info.phone.numbers'),
    },
  ];

  const isLoading = pageLoading || settingsLoading;

  return (
    <div className="contact-page">
      <section className="about-hero">
        <div className="container">
          <span className="section-label">{pageMetadata.sectionLabel || t('contact.sectionLabel')}</span>
          <h1 className="about-hero-title">{pageMetadata.title || t('contact.title')}</h1>
          <p className="about-hero-desc">{pageMetadata.description || t('contact.description')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="contact-info-grid">
                {contactItems.map((item, i) => (
                  <div key={i} className="contact-info-card">
                    <div className="contact-info-icon">{item.icon}</div>
                    <h3 className="contact-info-title">{item.title}</h3>
                    <p className="contact-info-text">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="contact-form-section">
                <div className="contact-form">
                  <h2 style={{ marginBottom: 24 }}>{pageMetadata.formTitle || t('contact.form.title')}</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form.name')}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={t('contact.form.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form.email')}</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form.company')}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={t('contact.form.companyPlaceholder')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form.message')}</label>
                      <textarea
                        className="form-textarea"
                        placeholder={t('contact.form.messagePlaceholder')}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      {submitted ? t('contact.form.sent') : t('contact.form.send')}
                    </button>
                  </form>
                </div>

                <div className="contact-map">
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <svg width="80" height="80" fill="none" stroke="var(--accent-primary)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 style={{ marginTop: 16 }}>{t('contact.info.headquarters.title')}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                      {contactInfo.address || t('contact.info.headquarters.address')}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
