import { useState, useEffect } from 'react';

const GlobalTradeMap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '35+', label: 'Countries Served' },
    { value: '50K+', label: 'Tons Delivered' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="trade-map-section">
      <div className="trade-map-wrapper">
        {/* Left: Map */}
        <div className="trade-map-left">
          <div className="trade-map-container-inner">
            <svg
              viewBox="0 0 1000 500"
              className="world-map-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8eef5" />
                  <stop offset="100%" stopColor="#d0dce8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Simplified World Map - Accurate Continent Shapes */}
              <g className="continents" fill="url(#mapGrad)" stroke="#c0d0e0" strokeWidth="0.5">
                {/* North America */}
                <path d="M50,50 L180,30 L250,60 L280,100 L260,160 L220,200 L180,220 L140,240 L100,220 L80,180 L60,140 L40,100 Z" />
                {/* Central America */}
                <path d="M140,240 L160,260 L155,280 L145,270 L140,250 Z" />
                {/* South America */}
                <path d="M180,260 L240,250 L280,280 L300,340 L290,400 L260,460 L220,480 L190,440 L170,380 L160,320 L170,280 Z" />
                {/* Europe */}
                <path d="M420,60 L520,50 L560,70 L580,100 L560,140 L520,160 L480,150 L440,130 L420,100 Z" />
                {/* Africa */}
                <path d="M420,160 L520,150 L560,180 L580,240 L570,300 L540,360 L500,400 L460,380 L440,320 L430,260 L420,200 Z" />
                {/* Asia - Main */}
                <path d="M560,50 L700,40 L800,60 L880,100 L900,160 L880,220 L820,260 L760,280 L700,260 L640,220 L600,180 L560,140 Z" />
                {/* Southeast Asia */}
                <path d="M760,260 L820,250 L860,280 L840,320 L800,340 L760,320 Z" />
                {/* Middle East */}
                <path d="M560,160 L620,150 L660,180 L640,220 L600,230 L560,210 Z" />
                {/* Australia */}
                <path d="M800,340 L900,320 L960,360 L970,420 L940,460 L880,480 L820,460 L790,400 L790,360 Z" />
                {/* New Zealand */}
                <path d="M940,460 L960,450 L970,470 L955,480 Z" />
                {/* Greenland */}
                <path d="M280,20 L360,15 L380,40 L360,70 L320,80 L280,60 Z" />
                {/* Japan */}
                <path d="M880,140 L900,130 L910,160 L900,180 L880,170 Z" />
                {/* UK */}
                <path d="M400,80 L420,75 L425,95 L415,105 L400,100 Z" />
                {/* Madagascar */}
                <path d="M580,360 L600,355 L605,380 L595,390 L580,385 Z" />
              </g>

              {/* Trade Routes - Curved Lines */}
              <g className="routes" fill="none" stroke="#1a365d" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4">
                {/* China to key destinations */}
                <path d="M820,180 Q600,100 780,80" />
                <path d="M820,180 Q500,150 450,100" />
                <path d="M820,180 Q400,200 480,160" />
                <path d="M820,180 Q600,250 300,250" />
                <path d="M820,180 Q700,300 880,380" />
                <path d="M820,180 Q500,300 240,300" />
                <path d="M820,180 Q650,200 620,180" />
              </g>

              {/* Animated Dots along routes */}
              <g className="route-animations">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <circle key={i} r="3" fill="#d97706" filter="url(#glow)" className={`route-pulse route-pulse-${i}`} />
                ))}
              </g>

              {/* Trade Hub Nodes */}
              <g className="nodes">
                {/* China (Main Hub) */}
                <circle cx="820" cy="180" r="12" fill="#1a365d" filter="url(#glow)" />
                <circle cx="820" cy="180" r="6" fill="#d97706" />
                <text x="820" y="210" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a365d">CHINA</text>
                <text x="820" y="225" textAnchor="middle" fontSize="10" fill="#666">HQ</text>

                {/* USA */}
                <circle cx="160" cy="180" r="8" fill="#d97706" />
                <text x="160" y="205" textAnchor="middle" fontSize="11" fill="#333">USA</text>

                {/* Europe */}
                <circle cx="480" cy="120" r="8" fill="#d97706" />
                <text x="480" y="145" textAnchor="middle" fontSize="11" fill="#333">Europe</text>

                {/* Southeast Asia */}
                <circle cx="780" cy="280" r="6" fill="#1a365d" />
                <text x="780" y="300" textAnchor="middle" fontSize="10" fill="#333">SEA</text>

                {/* Australia */}
                <circle cx="880" cy="400" r="6" fill="#d97706" />
                <text x="880" y="420" textAnchor="middle" fontSize="10" fill="#333">Australia</text>

                {/* Africa */}
                <circle cx="500" cy="280" r="5" fill="#1a365d" />
                <text x="500" y="298" textAnchor="middle" fontSize="10" fill="#333">Africa</text>

                {/* South America */}
                <circle cx="240" cy="360" r="5" fill="#1a365d" />
                <text x="240" y="378" textAnchor="middle" fontSize="10" fill="#333">S.America</text>

                {/* Middle East */}
                <circle cx="620" cy="200" r="5" fill="#1a365d" />
                <text x="620" y="218" textAnchor="middle" fontSize="10" fill="#333">ME</text>

                {/* Japan */}
                <circle cx="890" cy="160" r="5" fill="#1a365d" />
                <text x="890" y="178" textAnchor="middle" fontSize="10" fill="#333">Japan</text>
              </g>

              {/* Legend */}
              <g className="map-legend" transform="translate(30, 460)">
                <circle cx="0" cy="0" r="4" fill="#d97706" />
                <text x="10" y="4" fontSize="10" fill="#666">Major Hub</text>
                <circle cx="100" cy="0" r="3" fill="#1a365d" />
                <text x="110" y="4" fontSize="10" fill="#666">Trade Partner</text>
                <line x1="200" y1="0" x2="240" y2="0" stroke="#1a365d" strokeWidth="0.8" strokeDasharray="4 3" />
                <text x="248" y="4" fontSize="10" fill="#666">Trade Route</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="trade-map-right">
          <h2 className="trade-map-title">Global Trade Network</h2>
          <p className="trade-map-desc">Delivering premium steel products to clients worldwide with reliable logistics and quality assurance.</p>
          <div className="trade-map-stats">
            {stats.map((stat, i) => (
              <div key={i} className="trade-stat-item">
                <span className="trade-stat-value">{stat.value}</span>
                <span className="trade-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .trade-map-section {
          background: var(--bg-primary);
          padding: 60px 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .trade-map-wrapper {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .trade-map-container-inner {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
        }
        .world-map-svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .world-map-svg .continents path {
          transition: fill 0.3s ease;
        }
        .world-map-svg .continents path:hover {
          fill: #c5d5e5;
        }
        /* Route pulse animations */
        .route-pulse {
          opacity: 0;
          animation: routeFlow 3s ease-in-out infinite;
        }
        .route-pulse-0 { animation-delay: 0s; }
        .route-pulse-1 { animation-delay: 0.4s; }
        .route-pulse-2 { animation-delay: 0.8s; }
        .route-pulse-3 { animation-delay: 1.2s; }
        .route-pulse-4 { animation-delay: 1.6s; }
        .route-pulse-5 { animation-delay: 2s; }
        .route-pulse-6 { animation-delay: 2.4s; }

        @keyframes routeFlow {
          0% { opacity: 0; transform: translate(0, 0); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translate(-30px, -10px); }
        }
        /* Right side stats */
        .trade-map-right {
          padding: 20px 0;
        }
        .trade-map-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .trade-map-desc {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .trade-map-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .trade-stat-item {
          background: var(--bg-secondary);
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid var(--border-light);
          transition: all 0.3s ease;
        }
        .trade-stat-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: var(--accent-primary);
        }
        .trade-stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
          margin-bottom: 6px;
        }
        .trade-stat-label {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        /* Responsive */
        @media (max-width: 1024px) {
          .trade-map-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 32px;
          }
          .trade-map-right {
            text-align: center;
          }
        }
        @media (max-width: 768px) {
          .trade-map-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .trade-stat-value {
            font-size: 28px;
          }
          .trade-map-title {
            font-size: 26px;
          }
        }
        @media (max-width: 480px) {
          .trade-map-wrapper {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default GlobalTradeMap;
