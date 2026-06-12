import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface HeaderProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  ThemeSelector: React.ReactNode;
}

const Header = ({ theme, onThemeChange, ThemeSelector }: HeaderProps) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Navigation items - simplified, no dropdown for about
  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'products', path: '/products' },
    { key: 'solutions', path: '/solutions' },
    { key: 'technology', path: '/technology' },
    { key: 'esg', path: '/esg' },
    { key: 'news', path: '/news' },
    { key: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav">
            {navItems.map((item) => (
              <Link 
                key={item.key}
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary">
              {t('nav.getQuote')}
            </Link>
            <LanguageSwitcher />
            {ThemeSelector}
          </div>

          {/* Mobile menu button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link 
            key={item.key}
            to={item.path} 
            className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
          >
            {t(`nav.${item.key}`)}
          </Link>
        ))}
        <div className="mobile-nav-actions">
          <Link to="/contact" className="btn btn-primary btn-full">
            {t('nav.getQuote')}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
