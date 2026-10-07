import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Hash, 
  Calendar, 
  Building2, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function StudentProfile() {
  const { currentUser } = useAuth();
  const { issues } = useData();

  const myIssues = issues.filter(i => 
    i.role === 'Student' || i.reportedBy === currentUser?.name || i.reportedById === currentUser?.id
  );

  const resolved = myIssues.filter(i => i.status === 'Resolved').length;
  const inProgress = myIssues.filter(i => i.status === 'In Progress').length;
  const pending = myIssues.filter(i => i.status === 'Pending').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser?.name}
            className="h-24 w-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                {currentUser?.name || 'Arun Kumar'}
              </h1>
              <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-cyan-400 border border-blue-200 dark:border-blue-900">
                Registered Student
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currentUser?.department || 'Electrical and Electronics Engineering (EEE)'} &bull; {currentUser?.year || '3rd Year'}
            </p>

            {/* Quick Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3 max-w-sm">
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{myIssues.length}</span>
                <p className="text-[10px] text-slate-400">Total Reports</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{inProgress}</span>
                <p className="text-[10px] text-slate-400">In Progress</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{resolved}</span>
                <p className="text-[10px] text-slate-400">Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Details Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-4 flex items-center gap-2">
          <GraduationCap className="text-blue-600 dark:text-cyan-400" size={20} />
          Academic & Identity Credentials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Hash size={14} className="text-blue-500" />
              Register Number
            </span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.registerNumber || '23EEE104'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Building2 size={14} className="text-blue-500" />
              Engineering Department
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.department || 'Electrical and Electronics Engineering (EEE)'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Calendar size={14} className="text-blue-500" />
              Year of Study
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.year || '3rd Year'} (Undergraduate)
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Mail size={14} className="text-blue-500" />
              College Email
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.email || 'student@college.edu'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
