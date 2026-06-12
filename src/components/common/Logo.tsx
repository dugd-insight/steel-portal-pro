import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const dimensions = {
    sm: { icon: 32, font: 18 },
    md: { icon: 44, font: 24 },
    lg: { icon: 56, font: 32 },
  };

  const { icon, font } = dimensions[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* Supply Chain Logo - Hexagonal with interconnected nodes */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer hexagon - represents global network */}
        <path
          d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Inner hexagon - represents core strength */}
        <path
          d="M32 14L48 24V44L32 54L16 44V24L32 14Z"
          fill="url(#logoGradient)"
          fillOpacity="0.15"
        />
        
        {/* Central node - represents hub */}
        <circle cx="32" cy="34" r="6" fill="url(#logoGradient)" />
        
        {/* Connection lines - represent supply chain flow */}
        <path
          d="M32 28V14M32 40V54M26 31L16 24M38 37L48 44M38 31L48 24M26 37L16 44"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Outer nodes - represent distribution points */}
        <circle cx="32" cy="14" r="3" fill="var(--accent-primary)" />
        <circle cx="32" cy="54" r="3" fill="var(--accent-primary)" />
        <circle cx="16" cy="24" r="3" fill="var(--accent-primary)" />
        <circle cx="48" cy="24" r="3" fill="var(--accent-primary)" />
        <circle cx="16" cy="44" r="3" fill="var(--accent-primary)" />
        <circle cx="48" cy="44" r="3" fill="var(--accent-primary)" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: font,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          METALCORE
        </span>
      )}
    </div>
  );
};

export default Logo;
