import React from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, Sparkles, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
            <Bell className="text-blue-600 dark:text-cyan-400" />
            Campus Maintenance Notifications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time status updates and progress alerts for reported campus complaints
          </p>
        </div>

        {notifications.some(n => !n.read) && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
          >
            <Check size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all text-xs flex items-start gap-3.5 ${
                n.read 
                  ? 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-800/40' 
                  : 'border-blue-200 bg-blue-50/60 shadow-sm dark:border-blue-900 dark:bg-blue-950/40'
              }`}
            >
              <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                n.type === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' :
                n.type === 'progress' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' :
                'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-cyan-400'
              }`}>
                {n.type === 'success' ? <CheckCircle2 size={18} /> :
                 n.type === 'progress' ? <Clock size={18} /> :
                 <Bell size={18} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>
                {n.issueId && (
                  <span className="mt-2 inline-block font-mono text-[10px] font-bold text-blue-600 dark:text-cyan-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    ID: {n.issueId}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="py-12 text-center text-slate-400 text-xs">
            No maintenance notifications right now.
          </p>
        )}
      </div>
    </div>
  );
}
