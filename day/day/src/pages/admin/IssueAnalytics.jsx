import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Flame, 
  Layers, 
  Building2,
  PieChart as PieIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function IssueAnalytics() {
  const { issues } = useData();

  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;
  const inProgress = issues.filter(i => i.status === 'In Progress').length;
  const pending = issues.filter(i => i.status === 'Pending').length;
  const critical = issues.filter(i => i.priority === 'Critical').length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Department breakdown
  const deptCounts = {};
  issues.forEach(i => {
    const d = i.department || 'General';
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  // Category breakdown
  const catCounts = {};
  issues.forEach(i => {
    const c = i.category || 'Other';
    catCounts[c] = (catCounts[c] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
          <BarChart3 className="text-blue-600 dark:text-cyan-400" />
          Maintenance Resolution Analytics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Campus infrastructure performance metrics, resolution rates, and department statistics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Resolution Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit']">
              {resolutionRate}%
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp size={13} /> +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{resolved} of {total} complaints resolved</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Resolution Time</span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-cyan-400 font-['Outfit']">
              4.2 hrs
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">From reported to fixed</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Resolved</span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-['Outfit']">
              88%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Hazard emergency response</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Satisfaction</span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              4.8 / 5
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Post-repair feedback</p>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-4 flex items-center justify-between">
            <span>Issues by Category</span>
            <span className="text-xs font-normal text-slate-400">{Object.keys(catCounts).length} Categories</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(catCounts).map(([cat, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Distribution */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-4 flex items-center justify-between">
            <span>Issues by Department</span>
            <span className="text-xs font-normal text-slate-400">{Object.keys(deptCounts).length} Departments</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(deptCounts).map(([dept, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[220px]">{dept}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
