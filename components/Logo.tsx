
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = true }) => {
  return (
    <div className={`flex items-center space-x-3 ltr ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(255,106,0,0.5)] flex-shrink-0"
      >
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E65100" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Planet Core */}
        <circle cx="50" cy="50" r="22" fill="url(#orangeGradient)" />
        
        {/* Orbit Ring transforming into a Cap */}
        <path
          d="M20,60 C20,30 80,30 80,60 C80,75 65,85 50,85 C35,85 20,75 20,60 Z"
          stroke="url(#orangeGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />
        
        {/* Graduation Cap Top (integrated into orbit) */}
        <path
          d="M40,30 L60,30 L70,40 L50,50 L30,40 Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Tassel */}
        <path d="M70,40 L70,55" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="70" cy="55" r="2" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-row font-black tracking-tighter text-2xl uppercase select-none" style={{ direction: 'ltr' }}>
          <span className="text-white">TALIB</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 via-orange-400 to-amber-300 active-glow">SPACE</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
