import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  MapPin, 
  Eye, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ReportIssueModal, { CAMPUS_CATEGORIES } from '../../components/common/ReportIssueModal';
import IssueDetailsModal from '../../components/common/IssueDetailsModal';

export default function MyReports() {
  const { issues } = useData();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Student's reports
  const myIssues = issues.filter(i => 
    i.role === 'Student' || i.reportedBy === currentUser?.name || i.reportedById === currentUser?.id
  );

  const filtered = myIssues.filter(issue => {
    const matchesSearch = 
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            My Maintenance Reports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View, track, and monitor all campus maintenance issues submitted by you
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 transition"
        >
          <PlusCircle size={16} />
          <span>+ Report New Issue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, room, ID..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Categories</option>
              {CAMPUS_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Issue ID</th>
                <th className="pb-3">Title & Details</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Assigned Team</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filtered.length > 0 ? (
                filtered.map((issue) => (
                  <tr 
                    key={issue.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition cursor-pointer"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <td className="py-3.5 pl-3 font-mono font-bold text-blue-600 dark:text-cyan-400">
                      {issue.id}
                    </td>
                    <td className="py-3.5 max-w-[200px]">
                      <p className="font-bold text-slate-900 dark:text-white truncate">
                        {issue.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {issue.description}
                      </p>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {issue.location}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {issue.category}
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
                    <td className="py-3.5 text-slate-500 text-[11px] truncate max-w-[140px]">
                      {issue.assignedTeam || 'Pending Assignment'}
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
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No reports match your filters.
                  </td>
                </tr>
              )}
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
