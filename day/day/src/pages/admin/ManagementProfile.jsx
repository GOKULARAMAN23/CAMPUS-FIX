import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Hash, 
  Building2, 
  Phone, 
  Award,
  Layers,
  CheckCircle2,
  Clock,
  Wrench
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ManagementProfile() {
  const { currentUser } = useAuth();
  const { issues, teams, students, faculty } = useData();

  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser?.name}
            className="h-24 w-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                {currentUser?.name || 'R. Kumar'}
              </h1>
              <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-cyan-400 border border-blue-200 dark:border-blue-900">
                Campus Maintenance Administration
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currentUser?.designation || 'Estate & Campus Manager'} &bull; {currentUser?.department || 'Campus Maintenance Office'}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3 max-w-sm">
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{total}</span>
                <p className="text-[10px] text-slate-400">Total Issues</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{resolved}</span>
                <p className="text-[10px] text-slate-400">Resolved</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800">
                <span className="text-lg font-bold text-blue-600 dark:text-cyan-400">{teams.length}</span>
                <p className="text-[10px] text-slate-400">Crews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-4 flex items-center gap-2">
          <ShieldCheck className="text-blue-600 dark:text-cyan-400" size={20} />
          Management Office Credentials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Hash size={14} className="text-blue-500" />
              Management ID
            </span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.managementId || 'MGT-EST-01'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Award size={14} className="text-blue-500" />
              Designation
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.designation || 'Estate & Campus Manager'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Building2 size={14} className="text-blue-500" />
              Department / Office
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.department || 'Campus Maintenance & Estate Administration'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Mail size={14} className="text-blue-500" />
              Official Email
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUser?.email || 'management@college.edu'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 sm:col-span-2">
            <span className="text-slate-400 block font-medium flex items-center gap-1.5 mb-1">
              <Phone size={14} className="text-blue-500" />
              Official Emergency Contact Number
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {currentUser?.contactNumber || '+91 98765 43210 (Estate Helpdesk)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
