import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import TopContactBar from './TopContactBar';
import ScrollToTop from '../common/ScrollToTop';
import ScrollProgress from '../common/ScrollProgress';
import './layout.css';

// Theme Selector Component (kept here for layout-level state)
const ThemeSelector = ({ currentTheme, onThemeChange }: { currentTheme: string; onThemeChange: (theme: string) => void }) => {
  const { t } = useTranslation();
  const themes = [
    { id: 'professional', name: 'Professional Blue', color: 'theme-btn-professional' },
    { id: 'industrial', name: 'Industrial Orange', color: 'theme-btn-industrial' },
    { id: 'minimal', name: 'Minimal Teal', color: 'theme-btn-minimal' },
  ];

  return (
    <div className="theme-selector">
      {themes.map((theme) => (
        <button
          key={theme.id}
          className={`theme-btn ${theme.color} ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => onThemeChange(theme.id)}
          title={theme.name}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};

const Layout = () => {
  const [theme, setTheme] = useState('professional');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-fade-in-up, .animate-slide-left, .animate-slide-right, .animate-scale-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="layout">
      <TopContactBar />
      <Header theme={theme} onThemeChange={setTheme} ThemeSelector={<ThemeSelector currentTheme={theme} onThemeChange={setTheme} />} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollProgress />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
