import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Eye, 
  MapPin, 
  Sparkles, 
  Wrench,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ReportIssueModal from '../../components/common/ReportIssueModal';
import IssueDetailsModal from '../../components/common/IssueDetailsModal';

export default function FacultyDashboard() {
  const { currentUser } = useAuth();
  const { issues } = useData();
  const navigate = useNavigate();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Department relevant issues or reported by faculty
  const facultyDept = currentUser?.department || 'Computer Science and Engineering (CSE)';
  
  const deptIssues = issues.filter(i => 
    i.department.toLowerCase().includes('computer') ||
    i.department.toLowerCase().includes('cse') ||
    i.location.toLowerCase().includes('cse') ||
    i.location.toLowerCase().includes('main') ||
    i.location.toLowerCase().includes('seminar') ||
    i.role === 'Faculty'
  );

  const deptReportsCount = deptIssues.length;
  const pendingCount = deptIssues.filter(i => i.status === 'Pending').length;
  const inProgressCount = deptIssues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = deptIssues.filter(i => i.status === 'Resolved').length;

  const filteredIssues = deptIssues.filter(issue => 
    issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-800 via-indigo-800 to-sky-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2">
              <Sparkles size={14} className="text-cyan-300" />
              <span>Engineering Faculty Maintenance Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit']">
              Faculty Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-xl">
              Monitor and report campus maintenance issues across labs, lecture halls, and department facilities.
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
              onClick={() => navigate('/faculty/department')}
              className="flex items-center gap-2 rounded-2xl bg-white/15 border border-white/25 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition"
            >
              <Building2 size={17} />
              <span>Department Issues</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Cards (Section 6: Department Reports, Pending Issues, In Progress, Resolved) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Department Reports</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-cyan-400">
              <Building2 size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {deptReportsCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Lab & classroom issues</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Issues</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {pendingCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Awaiting assignment</p>
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
            <p className="text-[11px] text-slate-400 mt-0.5">Under maintenance</p>
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
            <p className="text-[11px] text-slate-400 mt-0.5">Fixed & inspected</p>
          </div>
        </div>
      </div>

      {/* Recent Department Issues Section (Section 6) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Recent Department Issues
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Maintenance complaints relevant to {facultyDept} facilities
            </p>
          </div>

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search department issues..."
              className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Issue ID</th>
                <th className="pb-3">Issue Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Reported By</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredIssues.map((issue) => (
                <tr 
                  key={issue.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition group cursor-pointer"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <td className="py-3.5 pl-3 font-mono font-bold text-blue-600 dark:text-cyan-400">
                    {issue.id}
                  </td>
                  <td className="py-3.5 max-w-[200px]">
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
                  <td className="py-3.5">
                    <span className="font-medium text-slate-800 dark:text-white">
                      {issue.reportedBy}
                    </span>
                    <span className="ml-1 text-[10px] text-slate-400">
                      ({issue.role})
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.priority === 'Critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' :
                      issue.priority === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                      issue.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {issue.status}
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
