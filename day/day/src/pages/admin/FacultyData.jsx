import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  BookOpen, 
  Eye, 
  FileText, 
  Award, 
  Mail, 
  X,
  MapPin
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function FacultyData() {
  const { faculty, issues } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'All' || f.department.toLowerCase().includes(deptFilter.toLowerCase());

    return matchesSearch && matchesDept;
  });

  const getFacultyHistory = (f) => {
    if (!f) return [];
    return issues.filter(i => 
      i.reportedBy === f.name || i.reportedById === f.id
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
            <Building2 className="text-blue-600 dark:text-cyan-400" />
            Registered Faculty Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Faculty credentials, department allocations, and submitted maintenance requests
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by faculty name, ID, email..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Departments</option>
              <option value="ECE">ECE</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="EEE">EEE</option>
            </select>
          </div>
        </div>

        {/* Table (Section 15: Name, Faculty ID, Department, Designation, College Email, Number of Reports) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3 pl-3">Faculty Name</th>
                <th className="pb-3">Faculty ID</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Designation</th>
                <th className="pb-3">College Email</th>
                <th className="pb-3">Number of Reports</th>
                <th className="pb-3 text-right pr-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredFaculty.map((f) => {
                const history = getFacultyHistory(f);
                const count = history.length || f.reportsCount || 0;

                return (
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-400">
                        <FileText size={12} />
                        {count} {count === 1 ? 'Report' : 'Reports'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFaculty(f);
                          setShowHistoryModal(true);
                        }}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white transition"
                      >
                        View Reports
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Faculty History Modal */}
      {showHistoryModal && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFaculty.avatar}
                  alt={selectedFaculty.name}
                  className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                    {selectedFaculty.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    ID: {selectedFaculty.facultyId} &bull; {selectedFaculty.designation} &bull; {selectedFaculty.department}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Department Complaints Logged
              </h4>

              <div className="space-y-2.5">
                {getFacultyHistory(selectedFaculty).length > 0 ? (
                  getFacultyHistory(selectedFaculty).map((issue) => (
                    <div
                      key={issue.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                            {issue.id}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                            {issue.category}
                          </span>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white">{issue.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={11} /> {issue.location} &bull; Filed on {issue.date}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                          issue.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        }`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400">
                    No reports filed by this faculty member yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
