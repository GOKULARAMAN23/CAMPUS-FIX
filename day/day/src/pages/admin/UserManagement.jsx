import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Search, 
  Mail, 
  CheckCircle2, 
  Building2, 
  Hash, 
  Phone,
  User,
  Calendar,
  Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function UserManagement() {
  const { students, faculty } = useData();
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.registerNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.facultyId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
            <ShieldCheck className="text-blue-600 dark:text-cyan-400" />
            User Management &amp; Access Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure administrative control over registered Student and Faculty accounts (passwords protected &amp; hidden)
          </p>
        </div>
      </div>

      {/* Tabs Switcher: Students | Faculty */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap size={16} />
          <span>Registered Students ({students.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('faculty')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'faculty'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen size={16} />
          <span>Registered Faculty ({faculty.length})</span>
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'students' ? 'students' : 'faculty'} by name, ID, or email...`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {activeTab === 'students' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                  <th className="pb-3 pl-3">Student Name</th>
                  <th className="pb-3">Register Number</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Year</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Security &amp; Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/20"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{s.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{s.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-blue-600 dark:text-cyan-400">
                      {s.registerNumber}
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {s.department}
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {s.year}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {s.email}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        <CheckCircle2 size={11} /> Verified &bull; Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                  <th className="pb-3 pl-3">Faculty Member</th>
                  <th className="pb-3">Faculty ID</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Designation</th>
                  <th className="pb-3">College Email</th>
                  <th className="pb-3">Security &amp; Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredFaculty.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/20"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{f.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{f.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-blue-600 dark:text-cyan-400">
                      {f.facultyId}
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {f.department}
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {f.designation}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {f.email}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        <CheckCircle2 size={11} /> Verified &bull; Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
