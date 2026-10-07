import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Search, 
  Filter, 
  ArrowRight, 
  MapPin, 
  Eye, 
  Sparkles,
  Wrench,
  Building2,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import CircularStatCard from '../../components/common/CircularStatCard';
import ReportIssueModal from '../../components/common/ReportIssueModal';
import IssueDetailsModal from '../../components/common/IssueDetailsModal';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const { issues } = useData();
  const navigate = useNavigate();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter issues for current student or general student issues
  const studentIssues = issues.filter(i => 
    i.role === 'Student' || i.reportedBy === currentUser?.name || i.reportedById === currentUser?.id
  );

  const myReportsCount = studentIssues.length;
  const pendingCount = studentIssues.filter(i => i.status === 'Pending').length;
  const inProgressCount = studentIssues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = studentIssues.filter(i => i.status === 'Resolved').length;

  const filteredIssues = studentIssues.filter(issue => {
    const matchesSearch = 
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-300 dark:border-rose-800';
      case 'High':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-800';
      default:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2">
              <Sparkles size={14} className="text-cyan-300" />
              <span>Campus Maintenance Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit']">
              Welcome, {currentUser?.name || 'Arun Kumar'}!
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-xl">
              Report campus infrastructure issues, track work progress in real-time, and help keep our engineering college campus better.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-blue-700 shadow-lg shadow-black/10 hover:bg-blue-50 active:scale-95 transition"
            >
              <PlusCircle size={18} />
              <span>+ Report New Issue</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/track')}
              className="flex items-center gap-2 rounded-2xl bg-white/15 border border-white/25 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition"
            >
              <Clock size={17} />
              <span>Track My Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Statistics Cards (Section 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">My Reports</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-cyan-400">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {myReportsCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Total filed complaints</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {pendingCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Awaiting estate review</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Progress</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {inProgressCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Active technician on site</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resolved</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {resolvedCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Successfully fixed</p>
          </div>
        </div>
      </div>

      {/* Recent Maintenance Reports Table (Section 4) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Recent Maintenance Reports
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track status, location, and assigned technicians for your complaints
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, title, room..."
                className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Issues List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Issue ID</th>
                <th className="pb-3">Title & Category</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr 
                    key={issue.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition group cursor-pointer"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <td className="py-3.5 pl-3 font-mono font-bold text-blue-600 dark:text-cyan-400">
                      {issue.id}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">
                        {issue.title}
                      </p>
                      <span className="text-[11px] text-slate-400">
                        {issue.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" />
                        {issue.location}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadge(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400 text-[11px]">
                      {issue.date}
                    </td>
                    <td className="py-3.5 text-right pr-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setSelectedIssue(issue)}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white transition"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No maintenance issues found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <IssueDetailsModal
        issue={selectedIssue}
        isOpen={Boolean(selectedIssue)}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
}
