import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Users, 
  Building2, 
  Wrench, 
  Search, 
  Filter, 
  Eye, 
  MapPin, 
  ShieldAlert, 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  PlusCircle, 
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import IssueDetailsModal from '../../components/common/IssueDetailsModal';
import ReportIssueModal, { CAMPUS_CATEGORIES } from '../../components/common/ReportIssueModal';

export default function AdminDashboard() {
  const { issues, updateIssueStatus } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Dynamic Statistics (Section 9)
  const totalIssues = issues.length;
  const pendingCount = issues.filter(i => i.status === 'Pending').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;
  const criticalCount = issues.filter(i => i.priority === 'Critical').length;

  const pendingPct = totalIssues > 0 ? Math.round((pendingCount / totalIssues) * 100) : 0;
  const inProgressPct = totalIssues > 0 ? Math.round((inProgressCount / totalIssues) * 100) : 0;
  const resolvedPct = totalIssues > 0 ? Math.round((resolvedCount / totalIssues) * 100) : 0;
  const criticalPct = totalIssues > 0 ? Math.round((criticalCount / totalIssues) * 100) : 0;

  // Filter complaints from BOTH Student and Faculty
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All' || issue.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
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

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-800';
      default:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800';
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'Student') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/70 dark:text-cyan-300 border border-blue-200 dark:border-blue-900">
          <GraduationCap size={11} /> Student
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950/70 dark:text-violet-300 border border-violet-200 dark:border-violet-900">
        <BookOpen size={11} /> Faculty
      </span>
    );
  };

  // Helper component for circular stat gauge
  const renderCircularStat = ({
    title,
    value,
    percentage,
    sublabel,
    icon: Icon,
    ringColor,
    iconColor,
    iconBg,
    valueColor,
    isSelected,
    onClick,
    extraCardClass = '',
    borderColor = 'border-slate-200/80 dark:border-slate-800'
  }) => {
    const radius = 33;
    const strokeWidth = 5.5;
    const circumference = 2 * Math.PI * radius; // ~207.35
    const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

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
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon size={14} />
          </div>
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
              {percentage}%
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
  };

  return (
    <div className="space-y-6">
      {/* Management Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2 border border-white/10">
              <ShieldAlert size={14} className="text-cyan-400" />
              <span>CampusFix Central Administrative Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit']">
              Campus Maintenance Overview
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Monitor, assign, and resolve maintenance complaints submitted across all engineering college departments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 active:scale-95 transition"
            >
              <PlusCircle size={16} />
              <span>Log Manual Complaint</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/analytics')}
              className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition"
            >
              <BarChart3 size={15} />
              <span>Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 5 Statistics Cards in Circular Gauge Format */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* TOTAL ISSUES */}
        {renderCircularStat({
          title: 'Total Issues',
          value: totalIssues,
          percentage: 100,
          sublabel: 'Central complaints',
          icon: Layers,
          ringColor: 'text-blue-600 dark:text-cyan-400',
          iconColor: 'text-blue-600 dark:text-cyan-400',
          iconBg: 'bg-blue-50 dark:bg-blue-950/60',
          valueColor: 'text-slate-900 dark:text-white',
          isSelected: statusFilter === 'All' && priorityFilter === 'All',
          onClick: () => {
            setStatusFilter('All');
            setPriorityFilter('All');
          }
        })}

        {/* PENDING */}
        {renderCircularStat({
          title: 'Pending',
          value: pendingCount,
          percentage: pendingPct,
          sublabel: 'Awaiting assignment',
          icon: Clock,
          ringColor: 'text-amber-500 dark:text-amber-400',
          iconColor: 'text-amber-600 dark:text-amber-400',
          iconBg: 'bg-amber-50 dark:bg-amber-950/60',
          valueColor: 'text-amber-600 dark:text-amber-400',
          borderColor: 'border-amber-200/80 dark:border-amber-900/40',
          isSelected: statusFilter === 'Pending',
          onClick: () => {
            setStatusFilter(statusFilter === 'Pending' ? 'All' : 'Pending');
            setPriorityFilter('All');
          }
        })}

        {/* IN PROGRESS */}
        {renderCircularStat({
          title: 'In Progress',
          value: inProgressCount,
          percentage: inProgressPct,
          sublabel: 'Technicians on-site',
          icon: Wrench,
          ringColor: 'text-indigo-600 dark:text-indigo-400',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
          valueColor: 'text-indigo-600 dark:text-indigo-400',
          borderColor: 'border-indigo-200/80 dark:border-indigo-900/40',
          isSelected: statusFilter === 'In Progress',
          onClick: () => {
            setStatusFilter(statusFilter === 'In Progress' ? 'All' : 'In Progress');
            setPriorityFilter('All');
          }
        })}

        {/* RESOLVED */}
        {renderCircularStat({
          title: 'Resolved',
          value: resolvedCount,
          percentage: resolvedPct,
          sublabel: 'Successfully closed',
          icon: CheckCircle2,
          ringColor: 'text-emerald-500 dark:text-emerald-400',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
          valueColor: 'text-emerald-600 dark:text-emerald-400',
          borderColor: 'border-emerald-200/80 dark:border-emerald-900/40',
          isSelected: statusFilter === 'Resolved',
          onClick: () => {
            setStatusFilter(statusFilter === 'Resolved' ? 'All' : 'Resolved');
            setPriorityFilter('All');
          }
        })}

        {/* CRITICAL ISSUES */}
        {renderCircularStat({
          title: 'Critical Issues',
          value: criticalCount,
          percentage: criticalPct,
          sublabel: 'Immediate hazard alert',
          icon: Flame,
          ringColor: 'text-rose-500 dark:text-rose-400',
          iconColor: 'text-rose-600 dark:text-rose-300',
          iconBg: 'bg-rose-100 dark:bg-rose-900/60',
          valueColor: 'text-rose-600 dark:text-rose-400',
          borderColor: 'border-rose-200/80 dark:border-rose-900/50',
          extraCardClass: 'col-span-2 sm:col-span-1',
          isSelected: priorityFilter === 'Critical',
          onClick: () => {
            setPriorityFilter(priorityFilter === 'Critical' ? 'All' : 'Critical');
            setStatusFilter('All');
          }
        })}
      </div>

      {/* ALL MAINTENANCE COMPLAINTS TABLE (Section 10, 11) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
              All Maintenance Complaints
              <span className="text-xs font-normal text-slate-400">
                ({filteredIssues.length} total)
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Centralized complaints table receiving issues from BOTH Student and Faculty accounts
            </p>
          </div>

          {/* Filters & Search Toolbar (Section 17) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, title, room..."
                className="rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-8 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Filter by Role: All, Student, Faculty */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student Reports</option>
              <option value="Faculty">Faculty Reports</option>
            </select>

            {/* Filter by Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Filter by Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Complaints Table (Section 10 Columns: Issue ID, Issue, Category, Location, Reported By, Role, Department, Priority, Status, Date, Action) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Issue ID</th>
                <th className="pb-3">Issue Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Reported By</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Department</th>
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
                    <td className="py-3.5 max-w-[180px]">
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition truncate">
                        {issue.title}
                      </p>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {issue.category}
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {issue.location}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-800 dark:text-white font-medium">
                      {issue.reportedBy}
                    </td>
                    <td className="py-3.5">
                      {getRoleBadge(issue.role)}
                    </td>
                    <td className="py-3.5 text-slate-500 text-[11px] truncate max-w-[120px]">
                      {issue.department}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadge(issue.priority)}`}>
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
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick 1-click status switcher for fast Hackathon demo */}
                        {issue.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => updateIssueStatus(issue.id, 'In Progress', 'Technician dispatched for on-site inspection.')}
                            title="Set In Progress"
                            className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-indigo-950 dark:text-indigo-400 transition"
                          >
                            Assign &amp; Start
                          </button>
                        )}
                        {issue.status === 'In Progress' && (
                          <button
                            type="button"
                            onClick={() => updateIssueStatus(issue.id, 'Resolved', 'Maintenance verified and resolved successfully.')}
                            title="Mark Resolved"
                            className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950 dark:text-emerald-400 transition"
                          >
                            Mark Resolved
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedIssue(issue)}
                          className="rounded-lg bg-slate-100 p-1.5 text-slate-600 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white transition"
                        >
                          <Eye size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    No maintenance complaints match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <IssueDetailsModal
        issue={selectedIssue}
        isOpen={Boolean(selectedIssue)}
        onClose={() => setSelectedIssue(null)}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
