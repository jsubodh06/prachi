import React from 'react';

interface FestiveBorderProps {
  className?: string;
  isDark?: boolean;
}

export const FestiveBorder: React.FC<FestiveBorderProps> = ({ className = '', isDark = false }) => {
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        className="w-full h-4 sm:h-5 block"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="toranGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>

        {/* Traditional Indian Scalloped Floral Toran Border from Nutrosa PDF */}
        <rect width="1200" height="24" fill={isDark ? '#143322' : '#F9F4EB'} />
        {/* Scallops */}
        {[...Array(60)].map((_, i) => (
          <g key={i} transform={`translate(${i * 20}, 0)`}>
            <polygon points="10,0 20,12 10,24 0,12" fill="url(#toranGold)" opacity="0.95" />
            <circle cx="10" cy="12" r="3" fill="#B45309" />
            <line x1="0" y1="0" x2="20" y2="0" stroke="#D4AF37" strokeWidth="2" />
            <line x1="0" y1="24" x2="20" y2="24" stroke="#D4AF37" strokeWidth="2" />
          </g>
        ))}
      </svg>
    </div>
  );
};
