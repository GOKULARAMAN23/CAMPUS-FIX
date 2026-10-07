import React from 'react';

export default function CircularStatCard({
  title,
  value,
  percentage = 0,
  sublabel,
  icon: Icon,
  ringColor = 'text-blue-600 dark:text-cyan-400',
  iconColor = 'text-blue-600 dark:text-cyan-400',
  iconBg = 'bg-blue-50 dark:bg-blue-950/60',
  valueColor = 'text-slate-900 dark:text-white',
  isSelected = false,
  onClick,
  extraCardClass = '',
  borderColor = 'border-slate-200/80 dark:border-slate-800'
}) {
  const radius = 33;
  const strokeWidth = 5.5;
  const circumference = 2 * Math.PI * radius; // ~207.35
  const clampedPercentage = Math.min(100, Math.max(0, isNaN(percentage) ? 0 : Math.round(percentage)));
  const offset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`group relative flex flex-col items-center justify-between rounded-2xl border bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${
        isSelected
          ? 'ring-2 ring-blue-500 border-transparent shadow-blue-500/10'
          : `${borderColor} hover:border-slate-300 dark:hover:border-slate-700`
      } ${extraCardClass}`}
    >
      {/* Top Header */}
      <div className="flex w-full items-center justify-between mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate pr-1">
          {title}
        </span>
        {Icon && (
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon size={14} />
          </div>
        )}
      </div>

      {/* Circular Gauge Graphic with Value Centered */}
      <div className="relative my-2.5 flex items-center justify-center">
        <svg className="w-[86px] h-[86px] transform -rotate-90 drop-shadow-sm" viewBox="0 0 84 84">
          {/* Track Circle */}
          <circle
            cx="42"
            cy="42"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/80"
          />
          {/* Circular Progress Arc */}
          <circle
            cx="42"
            cy="42"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className={`${ringColor} transition-all duration-700 ease-out`}
          />
        </svg>

        {/* Value and Percentage Centered Inside Ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-2xl font-black font-['Outfit'] leading-none ${valueColor}`}>
            {value}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">
            {clampedPercentage}%
          </span>
        </div>
      </div>

      {/* Sublabel / Footnote */}
      <div className="w-full text-center mt-1">
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
          {sublabel}
        </p>
      </div>
    </div>
  );
}
