import React from 'react';

export default function CampusFixLogo({ 
  size = 'default', 
  showTagline = true, 
  className = '', 
  brandName = 'CampusFix', 
  subtitle = 'Report · Track · Keep Campus Better',
  iconOnly = false,
  inverted = false
}) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';
  const iconSize = isLarge ? 56 : isSmall ? 36 : 46;

  const logoIcon = (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <defs>
          <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="wrenchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="glowCircle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient subtle back glow */}
        <circle cx="32" cy="27" r="24" fill="url(#glowCircle)" />

        {/* Location Pin */}
        <path
          d="M32 4C20.95 4 12 12.95 12 24C12 37.5 32 54 32 54C32 54 52 37.5 52 24C52 12.95 43.05 4 32 4Z"
          fill="url(#pinGrad)"
        />

        {/* Inner White Circle */}
        <circle cx="32" cy="22" r="13" fill="#ffffff" />

        {/* Neoclassical College Building inside pin */}
        <path d="M24 18L32 12L40 18H24Z" fill="#1e40af" />
        <rect x="23.5" y="18" width="17" height="1.8" rx="0.5" fill="#1d4ed8" />
        <rect x="25" y="20.5" width="2" height="6.5" rx="0.6" fill="#2563eb" />
        <rect x="28.5" y="20.5" width="2" height="6.5" rx="0.6" fill="#2563eb" />
        <rect x="33.5" y="20.5" width="2" height="6.5" rx="0.6" fill="#2563eb" />
        <rect x="37" y="20.5" width="2" height="6.5" rx="0.6" fill="#2563eb" />
        <rect x="23" y="27" width="18" height="2" rx="0.6" fill="#1e3a8a" />

        {/* Maintenance Wrench wrapped at lower left of Pin */}
        <path
          d="M11 50C10 51 8 50 6.5 48.5C5 47 4 45 5 44L14 35C13.2 33.5 13.5 31.6 14.8 30.3C16.4 28.7 18.8 28.5 20.6 29.6L17.2 33L19 34.8L22.4 31.4C23.5 33.2 23.3 35.6 21.7 37.2C20.4 38.5 18.5 38.8 17 38L8 47"
          stroke="url(#wrenchGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="18" cy="34" r="1.5" fill="#38bdf8" />
      </svg>
    </div>
  );

  if (iconOnly) {
    return <div className={`inline-flex shrink-0 ${className}`}>{logoIcon}</div>;
  }

  // Split brand name into two parts for stylish gradient coloring
  let part1 = brandName;
  let part2 = '';
  if (brandName.toLowerCase() === 'campusfix') {
    part1 = 'Campus';
    part2 = 'Fix';
  } else if (brandName.toUpperCase() === 'CAMPUS') {
    part1 = 'CAMPUS';
    part2 = '';
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center text-center ${className}`}>
      <div className="flex items-center gap-3">
        {/* Logo Badge */}
        {logoIcon}

        {/* Brand Text */}
        <div className="text-left">
          <div className="flex items-baseline">
            <span className={`${isSmall ? 'text-lg' : isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-slate-900 dark:text-white'} font-['Outfit']`}>
              {part1}
            </span>
            {part2 && (
              <span className={`${isSmall ? 'text-lg' : isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent font-['Outfit']`}>
                {part2}
              </span>
            )}
          </div>
          {showTagline && (
            <p className={`text-[11px] sm:text-xs font-medium ${inverted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'} tracking-wide mt-0.5 whitespace-nowrap`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
