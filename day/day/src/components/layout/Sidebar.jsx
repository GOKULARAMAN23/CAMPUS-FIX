import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Clock,
  Bell,
  UserCircle,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BarChart3,
  LogOut,
  X,
  Wrench,
  Layers,
  Settings,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CampusFixLogo from '../common/CampusFixLogo';

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const { role, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isManagement = role === 'management' || role === 'admin';
  const isFaculty = role === 'faculty';
  const isStudent = role === 'student' || (!isManagement && !isFaculty);

  // 1. Management Nav (Section 13)
  const managementNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'All Complaints', path: '/admin/complaints', icon: Layers },
    { name: 'Student Complaints', path: '/admin/student-complaints', icon: GraduationCap },
    { name: 'Faculty Complaints', path: '/admin/faculty-complaints', icon: BookOpen },
    { name: 'Maintenance Team', path: '/admin/team', icon: Wrench },
    { name: 'Issue Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Student Data', path: '/admin/students', icon: Users },
    { name: 'Faculty Data', path: '/admin/faculty', icon: Building2 },
    { name: 'User Management', path: '/admin/users', icon: ShieldCheck },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Management Profile', path: '/admin/profile', icon: UserCircle },
  ];

  // 2. Faculty Nav (Section 7)
  const facultyNav = [
    { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
    { name: 'Report New Issue', path: '/faculty/report', icon: PlusCircle },
    { name: 'My Reports', path: '/faculty/reports', icon: FileText },
    { name: 'Department Issues', path: '/faculty/department', icon: Building2 },
    { name: 'Track Issues', path: '/faculty/track', icon: Clock },
    { name: 'Notifications', path: '/faculty/notifications', icon: Bell },
    { name: 'My Profile', path: '/faculty/profile', icon: UserCircle },
  ];

  // 3. Student Nav (Section 5)
  const studentNav = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Report New Issue', path: '/student/report', icon: PlusCircle },
    { name: 'My Reports', path: '/student/reports', icon: FileText },
    { name: 'Track Issues', path: '/student/track', icon: Clock },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'My Profile', path: '/student/profile', icon: UserCircle },
  ];

  const currentNav = isManagement ? managementNav : isFaculty ? facultyNav : studentNav;

  const handleNavClick = (path) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col justify-between border-r border-slate-800 bg-slate-950 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="overflow-y-auto flex-1">
          <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-5">
            <div 
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={() => handleNavClick(isManagement ? '/admin' : isFaculty ? '/faculty' : '/student')}
              title="CampusFix Dashboard"
            >
              <CampusFixLogo size="small" iconOnly={true} />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center font-['Outfit'] leading-tight group-hover:text-slate-100 transition-colors">
                  Campus<span className="text-cyan-400 font-extrabold ml-0.5">Fix</span>
                </h1>
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Campus Maintenance
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCloseMobile}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="px-3.5 py-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {isManagement ? 'Central Administration' : isFaculty ? 'Faculty Portal' : 'Student Portal'}
              </p>
              <span className="rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-400 border border-blue-500/20">
                {isManagement ? 'Management' : isFaculty ? 'Faculty' : 'Student'}
              </span>
            </div>

            <div className="space-y-1">
              {currentNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:bg-slate-900/90 hover:text-slate-100'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                      }`}
                    />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          {/* Active User Badge */}
          <div className="mb-3 rounded-2xl bg-slate-900/80 p-3 border border-slate-800/80 flex items-center gap-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'User'}
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-blue-500/30 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {currentUser?.name || 'Campus User'}
              </p>
              <p className="text-[10px] text-cyan-400 font-medium truncate capitalize">
                {currentUser?.designation || (isManagement ? 'Management' : isFaculty ? 'Faculty' : 'Student')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
