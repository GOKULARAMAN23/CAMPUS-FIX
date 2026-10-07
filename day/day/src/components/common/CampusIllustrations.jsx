import React from 'react';

/**
 * CollegeBuildingIllustration:
 * Neoclassical Engineering College campus with pillars, dome, pediment, windows, green trees and soft clouds.
 * Exactly matches the aesthetic in the reference login screen.
 */
export function CollegeBuildingIllustration({ className = 'w-48 h-28 sm:w-56 sm:h-32' }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none mx-auto ${className}`}>
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="skyGrad" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="160" y1="36" x2="160" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="facadeGrad" x1="160" y1="70" x2="160" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ambient Sky Backdrop */}
        <ellipse cx="160" cy="110" rx="145" ry="65" fill="url(#skyGrad)" />

        {/* Clouds */}
        <g opacity="0.75">
          <ellipse cx="65" cy="50" rx="22" ry="10" fill="url(#cloudGrad)" />
          <ellipse cx="80" cy="46" rx="15" ry="12" fill="url(#cloudGrad)" />
          <ellipse cx="255" cy="48" rx="25" ry="11" fill="url(#cloudGrad)" />
          <ellipse cx="270" cy="44" rx="16" ry="13" fill="url(#cloudGrad)" />
        </g>

        {/* Trees: Left Group */}
        <g>
          {/* Back Tree */}
          <circle cx="58" cy="112" r="18" fill="#10b981" opacity="0.8" />
          {/* Main Front Trees */}
          <circle cx="44" cy="120" r="16" fill="#059669" />
          <rect x="42" y="132" width="4" height="18" rx="1" fill="#047857" />
          <circle cx="68" cy="124" r="15" fill="#10b981" />
          <rect x="66" y="134" width="4" height="16" rx="1" fill="#059669" />
          {/* Bush accent */}
          <ellipse cx="55" cy="140" rx="18" ry="8" fill="#34d399" />
        </g>

        {/* Trees: Right Group */}
        <g>
          {/* Back Tree */}
          <circle cx="262" cy="112" r="18" fill="#10b981" opacity="0.8" />
          {/* Main Front Trees */}
          <circle cx="276" cy="120" r="16" fill="#059669" />
          <rect x="274" y="132" width="4" height="18" rx="1" fill="#047857" />
          <circle cx="252" cy="124" r="15" fill="#10b981" />
          <rect x="250" y="134" width="4" height="16" rx="1" fill="#059669" />
          {/* Bush accent */}
          <ellipse cx="265" cy="140" rx="18" ry="8" fill="#34d399" />
        </g>

        {/* College Building Wings (Left & Right Wings) */}
        {/* Left Wing */}
        <rect x="80" y="86" width="55" height="58" rx="2" fill="url(#facadeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
        {/* Left Wing Cornice / Roof Trim */}
        <rect x="78" y="82" width="59" height="5" rx="1.5" fill="#93c5fd" />
        {/* Left Wing Windows (Row 1) */}
        <rect x="87" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="103" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="119" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        {/* Left Wing Windows (Row 2) */}
        <rect x="87" y="112" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="103" y="112" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="119" y="112" width="8" height="12" rx="2" fill="#38bdf8" />

        {/* Right Wing */}
        <rect x="185" y="86" width="55" height="58" rx="2" fill="url(#facadeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
        {/* Right Wing Cornice / Roof Trim */}
        <rect x="183" y="82" width="59" height="5" rx="1.5" fill="#93c5fd" />
        {/* Right Wing Windows (Row 1) */}
        <rect x="193" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="209" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="225" y="93" width="8" height="12" rx="2" fill="#38bdf8" />
        {/* Right Wing Windows (Row 2) */}
        <rect x="193" y="112" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="209" y="112" width="8" height="12" rx="2" fill="#38bdf8" />
        <rect x="225" y="112" width="8" height="12" rx="2" fill="#38bdf8" />

        {/* Main Central Block */}
        <rect x="126" y="68" width="68" height="76" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />

        {/* Central Pediment (Triangular Gable Roof) */}
        <path d="M122 68L160 38L198 68H122Z" fill="url(#roofGrad)" />
        <path d="M125 68L160 42L195 68H125Z" fill="#dbeafe" />

        {/* Dome / Bell Tower / Clock on Top */}
        <rect x="154" y="24" width="12" height="15" rx="1" fill="#60a5fa" />
        {/* Dome top */}
        <path d="M152 24C152 19 156 16 160 16C164 16 168 19 168 24H152Z" fill="#2563eb" />
        {/* Flagpole & Flag */}
        <line x1="160" y1="16" x2="160" y2="8" stroke="#1e40af" strokeWidth="1.5" />
        <path d="M160 8L168 11L160 14V8Z" fill="#ef4444" />

        {/* Clock inside Gable */}
        <circle cx="160" cy="56" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
        <line x1="160" y1="56" x2="160" y2="53" stroke="#1e40af" strokeWidth="1" />
        <line x1="160" y1="56" x2="162" y2="56" stroke="#1e40af" strokeWidth="1" />

        {/* Portico Architrave / Top Trim */}
        <rect x="124" y="68" width="72" height="6" rx="1" fill="#3b82f6" />

        {/* Neoclassical Columns (4 pillars) */}
        <rect x="132" y="74" width="6" height="54" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.8" />
        <rect x="146" y="74" width="6" height="54" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.8" />
        <rect x="168" y="74" width="6" height="54" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.8" />
        <rect x="182" y="74" width="6" height="54" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.8" />

        {/* Grand Entrance Doorway */}
        <rect x="154" y="104" width="12" height="24" rx="2" fill="#1e3a8a" />
        <path d="M154 106C154 102 157 99 160 99C163 99 166 102 166 106H154Z" fill="#3b82f6" />

        {/* Upper Center Arched Window */}
        <path d="M156 82H164V89H156V82Z" fill="#38bdf8" />
        <path d="M156 82C156 79 158 77 160 77C162 77 164 79 164 82H156Z" fill="#38bdf8" />

        {/* Grand Flight of Steps / Plinth */}
        <rect x="122" y="128" width="76" height="4" rx="1" fill="#cbd5e1" />
        <rect x="118" y="132" width="84" height="4" rx="1" fill="#e2e8f0" />
        <rect x="114" y="136" width="92" height="5" rx="1" fill="#cbd5e1" />

        {/* Ground Green / Pathway */}
        <line x1="30" y1="144" x2="290" y2="144" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * MaintenanceGearIllustration:
 * Gear, crossed maintenance wrench, foliage and sparkles.
 * Matches the register illustration in the reference image.
 */
export function MaintenanceGearIllustration({ className = 'w-48 h-28 sm:w-56 sm:h-32' }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none mx-auto ${className}`}>
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="gearGrad" x1="160" y1="20" x2="160" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="toolGrad" x1="120" y1="40" x2="200" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sunburst background glow */}
        <circle cx="160" cy="90" r="75" fill="url(#sunburst)" />

        {/* Floating Clouds */}
        <g opacity="0.7">
          <ellipse cx="60" cy="55" rx="20" ry="9" fill="#ffffff" />
          <ellipse cx="75" cy="52" rx="14" ry="11" fill="#ffffff" />
          <ellipse cx="260" cy="55" rx="20" ry="9" fill="#ffffff" />
          <ellipse cx="245" cy="52" rx="14" ry="11" fill="#ffffff" />
        </g>

        {/* Left Foliage / Green Leaves */}
        <g>
          <path d="M100 115C85 105 75 120 70 135C85 138 98 128 100 115Z" fill="#10b981" />
          <path d="M110 95C95 85 85 98 80 112C95 116 108 107 110 95Z" fill="#059669" />
          <path d="M118 120C108 125 102 136 102 145C114 146 122 135 118 120Z" fill="#34d399" />
        </g>

        {/* Right Foliage / Green Leaves */}
        <g>
          <path d="M220 115C235 105 245 120 250 135C235 138 222 128 220 115Z" fill="#10b981" />
          <path d="M210 95C225 85 235 98 240 112C225 116 212 107 210 95Z" fill="#059669" />
          <path d="M202 120C212 125 218 136 218 145C206 146 198 135 202 120Z" fill="#34d399" />
        </g>

        {/* Big Cog / Gear in Center */}
        <g>
          {/* Gear Body with teeth */}
          <path
            d="M160 40 L166 40 L168 50 C173 51 177 53 181 56 L190 51 L195 56 L190 65 C193 69 195 73 196 78 L206 80 L206 86 L196 88 C195 93 193 97 190 101 L195 110 L190 115 L181 110 C177 113 173 115 168 116 L166 126 L160 126 L158 116 C153 115 149 113 145 110 L136 115 L131 110 L136 101 C133 97 131 93 130 88 L120 86 L120 80 L130 78 C131 73 133 69 136 65 L131 56 L136 51 L145 56 C149 53 153 51 158 50 L160 40Z"
            fill="url(#gearGrad)"
            stroke="#1e40af"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Inner ring */}
          <circle cx="163" cy="83" r="28" fill="#1d4ed8" />
          <circle cx="163" cy="83" r="21" fill="#0284c7" />
        </g>

        {/* Large White Maintenance Wrench in Center (angled) */}
        <g transform="translate(163,83) rotate(-35) translate(-163,-83)">
          {/* Wrench Shadow */}
          <path
            d="M138 78L184 78C189 74 196 74 200 78C204 82 204 89 200 93L191 88L186 93L191 98C187 101 180 101 176 97L138 97C133 101 126 101 122 97C118 93 118 86 122 82L131 87L136 82L131 77C135 74 142 74 146 78Z"
            fill="#0f172a"
            opacity="0.15"
            transform="translate(2, 4)"
          />
          {/* Wrench Body */}
          <path
            d="M138 78L184 78C189 74 196 74 200 78C204 82 204 89 200 93L191 88L186 93L191 98C187 101 180 101 176 97L138 97C133 101 126 101 122 97C118 93 118 86 122 82L131 87L136 82L131 77C135 74 142 74 146 78Z"
            fill="url(#toolGrad)"
            stroke="#93c5fd"
            strokeWidth="1.2"
          />
          {/* Handle Grip Detail */}
          <rect x="146" y="85" width="30" height="4" rx="2" fill="#cbd5e1" />
        </g>

        {/* Sparkles / Stars */}
        <g fill="#38bdf8">
          {/* Top Left Sparkle */}
          <path d="M125 36L126.5 40L130.5 41.5L126.5 43L125 47L123.5 43L119.5 41.5L123.5 40L125 36Z" />
          {/* Top Right Sparkle */}
          <path d="M198 32L199.5 36L203.5 37.5L199.5 39L198 43L196.5 39L192.5 37.5L196.5 36L198 32Z" />
          {/* Small Star */}
          <circle cx="218" cy="62" r="2.5" fill="#38bdf8" />
          <circle cx="106" cy="66" r="2" fill="#60a5fa" />
        </g>
      </svg>
    </div>
  );
}
