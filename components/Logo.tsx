
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = true }) => {
  return (
    <div className={`flex items-center space-x-4 ltr ${className}`}>
      <div className="relative group">
        <div className="absolute -inset-2 premium-gradient rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(255,106,0,0.6)] flex-shrink-0 relative z-10"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E65100" />
              <stop offset="50%" stopColor="#FF6A00" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
            <filter id="neonGlowLogo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Shape */}
          <circle cx="50" cy="50" r="24" fill="url(#logoGrad)" filter="url(#neonGlowLogo)"/>
          
          {/* Orbital Learning Path */}
          <path
            d="M25,65 C25,35 75,35 75,65 C75,80 62,90 50,90 C38,90 25,80 25,65 Z"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#neonGlowLogo)"
          />
          
          {/* Spark Element */}
          <circle cx="75" cy="40" r="6" fill="white" className="animate-pulse"/>
          <path d="M75,34 L75,28M81,40 L87,40M75,46 L75,52M69,40 L63,40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-row font-black tracking-tighter text-3xl uppercase select-none items-center" style={{ direction: 'ltr' }}>
          <span className="text-white">TALIB</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 via-orange-400 to-amber-300 ml-1 active-glow">SPACE</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
