import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  User, 
  Building2, 
  Tag, 
  ShieldAlert, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  ArrowRight,
  Send
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function IssueDetailsModal({ issue, isOpen, onClose }) {
  const { updateIssueStatus, updateIssue, assignIssueTeam, teams } = useData();
  const { role } = useAuth();
  const isManagement = role === 'management' || role === 'admin';

  const [selectedStatus, setSelectedStatus] = useState(issue?.status || 'Pending');
  const [selectedPriority, setSelectedPriority] = useState(issue?.priority || 'Medium');
  const [selectedTeam, setSelectedTeam] = useState(issue?.assignedTeam || 'Unassigned');
  const [remarks, setRemarks] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !issue) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedStatus !== issue.status) {
      updateIssueStatus(issue.id, selectedStatus, remarks);
    }
    if (selectedPriority !== issue.priority) {
      updateIssue(issue.id, { priority: selectedPriority });
    }
    if (selectedTeam !== issue.assignedTeam) {
      assignIssueTeam(issue.id, selectedTeam);
    }
    if (remarks && selectedStatus === issue.status) {
      updateIssue(issue.id, { remarks });
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900">
                {issue.id}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getStatusBadge(issue.status)}`}>
                {issue.status}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getPriorityBadge(issue.priority)}`}>
                {issue.priority} Priority
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {issue.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Category</span>
              <span className="font-bold text-slate-800 dark:text-white mt-0.5 block">{issue.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-bold text-slate-800 dark:text-white mt-0.5 block truncate">{issue.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Reported By</span>
              <span className="font-bold text-slate-800 dark:text-white mt-0.5 block">
                {issue.reportedBy} ({issue.role})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Date Filed</span>
              <span className="font-bold text-slate-800 dark:text-white mt-0.5 block">{issue.date}</span>
            </div>
          </div>

          {/* Description & Photo */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Description</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 dark:bg-slate-800/30 dark:border-slate-800">
              {issue.description}
            </p>

            {issue.photo && (
              <div className="mt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Attached Photo Evidence</span>
                <img
                  src={issue.photo}
                  alt={issue.title}
                  className="h-44 w-full rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Issue Resolution Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Resolution Progress Timeline
            </h4>
            <div className="relative pl-6 space-y-4 border-l-2 border-blue-200 dark:border-blue-900 ml-2">
              {issue.timeline?.map((step, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[31px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{step.step}</span>
                    <span className="ml-2 text-[10px] text-slate-400">{step.date}</span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Management Action Controls */}
          {isManagement && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert size={16} className="text-blue-600 dark:text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200">
                  Management Resolution Controls
                </h4>
              </div>

              <form onSubmit={handleUpdate} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Update Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Change Priority
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Assign Team
                    </label>
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {teams.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Management Remarks / Resolution Note
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="e.g. Technician dispatched / Motor replaced / Verified on-site"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition"
                  >
                    <CheckCircle2 size={15} />
                    <span>{isSaved ? 'Updated!' : 'Save & Update Complaint'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
