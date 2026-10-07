import React, { useState } from 'react';
import { 
  Wrench, 
  Users, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  Search,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function MaintenanceTeams() {
  const { teams, issues } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
            <Wrench className="text-blue-600 dark:text-cyan-400" />
            Campus Maintenance Teams &amp; Crews
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Internal technician teams, team leaders, and active maintenance workloads
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => {
          const teamIssues = issues.filter(i => i.assignedTeam === team.name);
          const inProgCount = teamIssues.filter(i => i.status === 'In Progress').length;
          const resolvedCount = teamIssues.filter(i => i.status === 'Resolved').length;

          return (
            <div
              key={team.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-cyan-400">
                    <Wrench size={22} />
                  </div>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                    {team.id}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  {team.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {team.specialization}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                  <p className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Team Lead:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{team.lead}</span>
                  </p>
                  <p className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Internal Extension:</span>
                    <span className="font-mono font-semibold">{team.contact}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                  <Clock size={13} /> {inProgCount} Active
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={13} /> {resolvedCount} Resolved
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
