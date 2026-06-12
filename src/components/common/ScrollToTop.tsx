import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 'none',
            background: 'var(--accent-primary, #1a5fb4)',
            color: 'white',
            fontSize: 20,
            cursor: 'pointer',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(26, 95, 180, 0.3)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-primary-dark, #154c8a)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent-primary, #1a5fb4)')}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
