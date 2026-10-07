import React, { useState, useEffect } from 'react';
import { Search, X, Layers, Wrench, GraduationCap, BookOpen, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { issues } = useData();
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const isManagement = role === 'management' || role === 'admin';
  const isFaculty = role === 'faculty';

  const quickNav = isManagement ? [
    { title: 'All Complaints', path: '/admin/complaints', icon: <Layers size={16} />, desc: 'View all student and faculty issues' },
    { title: 'Student Complaints', path: '/admin/student-complaints', icon: <GraduationCap size={16} />, desc: 'Student reported issues' },
    { title: 'Faculty Complaints', path: '/admin/faculty-complaints', icon: <BookOpen size={16} />, desc: 'Faculty department issues' },
    { title: 'Maintenance Teams', path: '/admin/team', icon: <Wrench size={16} />, desc: 'Crews and technician assignments' },
  ] : isFaculty ? [
    { title: 'Faculty Dashboard', path: '/faculty', icon: <Layers size={16} />, desc: 'Department maintenance overview' },
    { title: 'Report New Issue', path: '/faculty/report', icon: <Wrench size={16} />, desc: 'Log a new complaint' },
    { title: 'Department Issues', path: '/faculty/department', icon: <Layers size={16} />, desc: 'View department problems' },
    { title: 'Track Issues', path: '/faculty/track', icon: <Clock size={16} />, desc: 'Live resolution status' },
  ] : [
    { title: 'Student Dashboard', path: '/student', icon: <Layers size={16} />, desc: 'Overview of campus maintenance' },
    { title: 'Report New Issue', path: '/student/report', icon: <Wrench size={16} />, desc: 'Log a new complaint' },
    { title: 'My Reports', path: '/student/reports', icon: <Layers size={16} />, desc: 'View your submitted issues' },
    { title: 'Track My Reports', path: '/student/track', icon: <Clock size={16} />, desc: 'Timeline and live progress' },
  ];

  const filteredIssues = query.trim()
    ? issues.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.id.toLowerCase().includes(query.toLowerCase()) ||
        i.location.toLowerCase().includes(query.toLowerCase()) ||
        i.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-slide-up z-10">
        <div className="flex items-center border-b border-slate-100 px-4 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search maintenance issues, locations, categories (e.g. fan, EEE Block)..."
            className="w-full bg-transparent px-3.5 py-4 text-xs sm:text-sm text-slate-800 outline-none dark:text-slate-200 placeholder:text-slate-400"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Quick Navigation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickNav.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelect(item.path)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-left transition hover:border-blue-500/30 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-cyan-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredIssues.length > 0 ? (
            <div className="space-y-2">
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Found Issues ({filteredIssues.length})
              </p>
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => handleSelect(isManagement ? '/admin/complaints' : '/student/track')}
                  className="flex items-center justify-between rounded-2xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400">
                      {issue.id}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{issue.title}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {issue.location} &bull; {issue.category} &bull; {issue.status}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No campus issues found matching "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
