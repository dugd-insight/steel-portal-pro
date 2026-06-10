import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import SocialIcons from '../common/SocialIcons';
import './layout.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Logo size="md" />
            </Link>
            <p className="footer-desc">{t('footer.description')}</p>
            <SocialIcons />
          </div>

          {/* Products Column */}
          <div className="footer-links">
            <h4 className="footer-title">{t('footer.links.products')}</h4>
            <ul className="footer-list">
              {(t('footer.productLinks', { returnObjects: true }) as string[] || []).map((link, i) => (
                <li key={i}>
                  <Link to="/products" className="footer-link">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-links">
            <h4 className="footer-title">{t('footer.links.company')}</h4>
            <ul className="footer-list">
              {(t('footer.companyLinks', { returnObjects: true }) as string[] || []).map((link, i) => (
                <li key={i}>
                  <Link to="/about" className="footer-link">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-links">
            <h4 className="footer-title">{t('footer.links.support')}</h4>
            <ul className="footer-list">
              {(t('footer.supportLinks', { returnObjects: true }) as string[] || []).map((link, i) => (
                <li key={i}>
                  <Link to="/contact" className="footer-link">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h4 className="footer-title">{t('contact.sectionLabel')}</h4>
            <div className="footer-contact-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{t('contact.info.headquarters.address')}</span>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>sales@luxi-supply.com</span>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>+86 635 2180898</span>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>+86 15063550004</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
          <div className="footer-certifications">
            <span className="footer-cert">{t('footer.certifications.iso9001')}</span>
            <span className="footer-cert">{t('footer.certifications.iso14001')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
