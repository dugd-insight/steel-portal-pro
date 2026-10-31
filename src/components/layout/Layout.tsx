import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import TopContactBar from './TopContactBar';
import ScrollToTop from '../common/ScrollToTop';
import ScrollProgress from '../common/ScrollProgress';
import './layout.css';

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
      <Header theme={theme} onThemeChange={setTheme} />
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
