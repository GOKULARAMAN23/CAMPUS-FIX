import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import IssueDetailsModal from '../../components/common/IssueDetailsModal';

export default function StudentComplaints() {
  const { issues } = useData();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const studentIssues = issues.filter(i => i.role === 'Student');

  const filtered = studentIssues.filter(i => {
    const matchesSearch = 
      i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
            <GraduationCap className="text-blue-600 dark:text-cyan-400" />
            Student Maintenance Complaints
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Complaints submitted directly by registered engineering students
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student complaints..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Issue ID</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Reported By</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filtered.map((issue) => (
                <tr 
                  key={issue.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition cursor-pointer"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <td className="py-3.5 pl-3 font-mono font-bold text-blue-600 dark:text-cyan-400">
                    {issue.id}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                    {issue.title}
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-300">
                    {issue.category}
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-300">
                    {issue.location}
                  </td>
                  <td className="py-3.5 text-slate-800 dark:text-white font-medium">
                    {issue.reportedBy}
                  </td>
                  <td className="py-3.5 text-slate-500">
                    {issue.department}
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
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                      issue.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
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
                      className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white transition"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <IssueDetailsModal
        issue={selectedIssue}
        isOpen={Boolean(selectedIssue)}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
}
