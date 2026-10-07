import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Tag, 
  AlertTriangle, 
  ChevronRight, 
  Search, 
  ArrowRight,
  ShieldCheck,
  User,
  Wrench
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function TrackIssues() {
  const { issues } = useData();
  const [selectedIssueId, setSelectedIssueId] = useState(issues[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const activeIssue = issues.find(i => i.id === selectedIssueId) || issues[0];

  const filteredIssues = issues.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const timelineSteps = ['Reported', 'Acknowledged', 'Assigned', 'In Progress', 'Resolved'];

  const getStepStatus = (stepName) => {
    if (!activeIssue) return 'pending';
    const timeline = activeIssue.timeline || [];
    const isStepDone = timeline.some(t => t.step === stepName);
    if (isStepDone) return 'completed';

    // Current active step
    if (activeIssue.status === stepName) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Track Maintenance Issues
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Monitor the live resolution progress of campus infrastructure complaints
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Issues List */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <div className="relative mb-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or title..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs ${
                  issue.id === activeIssue?.id
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm dark:border-blue-500/80 dark:bg-blue-950/40'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                    {issue.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                    issue.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {issue.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-0.5 truncate">
                    <MapPin size={11} /> {issue.location}
                  </span>
                  <span>&bull;</span>
                  <span>{issue.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Timeline Tracker */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          {activeIssue ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900">
                      {activeIssue.id}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {activeIssue.category}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      activeIssue.priority === 'Critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {activeIssue.priority} Priority
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                    {activeIssue.title}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Reported On</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">{activeIssue.date}</span>
                </div>
              </div>

              {/* Progress Flow Steps Bar */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Campus Resolution Stage
                </p>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {timelineSteps.map((step, idx) => {
                    const status = getStepStatus(step);
                    return (
                      <div key={step} className="text-center">
                        <div className={`h-2.5 rounded-full mb-2 transition-all ${
                          status === 'completed'
                            ? 'bg-emerald-500'
                            : status === 'current'
                            ? 'bg-blue-600 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800'
                        }`} />
                        <span className={`text-[10px] sm:text-xs font-semibold block ${
                          status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' :
                          status === 'current' ? 'text-blue-600 dark:text-cyan-400 font-bold' :
                          'text-slate-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Activity Timeline */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Progress Log
                </p>

                <div className="relative pl-6 space-y-5 border-l-2 border-blue-200 dark:border-blue-900 ml-3">
                  {activeIssue.timeline?.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[31px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{step.step}</span>
                          <span className="text-[10px] text-slate-400">{step.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Evidence if present */}
              {activeIssue.photo && (
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Attached Photo Evidence
                  </p>
                  <img
                    src={activeIssue.photo}
                    alt={activeIssue.title}
                    className="h-44 w-full rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                  />
                </div>
              )}

              {/* Assigned Technician & Location Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/50">
                  <span className="text-slate-400 block font-medium">Location</span>
                  <p className="font-bold text-slate-800 dark:text-white mt-1 flex items-center gap-1.5">
                    <MapPin size={14} className="text-blue-500" />
                    {activeIssue.location}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/50">
                  <span className="text-slate-400 block font-medium">Assigned Maintenance Team</span>
                  <p className="font-bold text-slate-800 dark:text-white mt-1 flex items-center gap-1.5">
                    <Wrench size={14} className="text-cyan-500" />
                    {activeIssue.assignedTeam || 'Pending Team Assignment'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-12 text-slate-400">Select an issue to track progress.</p>
          )}
        </div>
      </div>
    </div>
  );
}
