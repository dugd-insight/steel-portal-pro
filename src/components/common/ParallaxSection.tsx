import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  speed?: number; // 0.1 to 0.5
  className?: string;
}

const ParallaxSection = ({ 
  children, 
  backgroundImage, 
  speed = 0.3,
  className = '' 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      
      if (scrolled > 0 && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        bgRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-section ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {backgroundImage && (
        <div
          ref={bgRef}
          className="parallax-bg"
          style={{
            position: 'absolute',
            top: '-20%',
            left: 0,
            right: 0,
            bottom: '-20%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
