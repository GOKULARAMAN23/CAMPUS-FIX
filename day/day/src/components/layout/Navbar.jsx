import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  LogOut, 
  UserCircle, 
  Check, 
  Layers, 
  Menu,
  Sparkles,
  ShieldAlert,
  GraduationCap,
  BookOpen,
  Wrench,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import ReportIssueModal from '../common/ReportIssueModal';

export default function Navbar({ onOpenMobileSidebar, onOpenSearch }) {
  const { currentUser, role, quickDemoLogin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const p = location.pathname;
    // Management routes
    if (p === '/admin') return { title: 'Campus Maintenance Overview', subtitle: 'Monitor, assign and resolve campus maintenance issues' };
    if (p === '/admin/complaints') return { title: 'All Maintenance Complaints', subtitle: 'Centralized registry of student and faculty reports' };
    if (p === '/admin/student-complaints') return { title: 'Student Maintenance Reports', subtitle: 'Issues reported by engineering students' };
    if (p === '/admin/faculty-complaints') return { title: 'Faculty Maintenance Reports', subtitle: 'Issues reported by engineering faculty and department staff' };
    if (p === '/admin/team') return { title: 'Maintenance Teams & Staff', subtitle: 'Workload distribution and assignment directory' };
    if (p === '/admin/analytics') return { title: 'Issue Resolution Analytics', subtitle: 'Category metrics, resolution times & SLA performance' };
    if (p === '/admin/students') return { title: 'Registered Student Directory', subtitle: 'Student identity, departments, and report records' };
    if (p === '/admin/faculty') return { title: 'Registered Faculty Directory', subtitle: 'Faculty members, designations and report records' };
    if (p === '/admin/users') return { title: 'User Management', subtitle: 'Administrative view of registered student and faculty accounts' };
    if (p === '/admin/notifications') return { title: 'System Notifications', subtitle: 'Maintenance alert dispatches and status updates' };
    if (p === '/admin/profile') return { title: 'Management Profile', subtitle: 'Official administrative estate credentials' };

    // Faculty routes
    if (p === '/faculty') return { title: 'Faculty Dashboard', subtitle: 'Monitor and report campus maintenance issues' };
    if (p === '/faculty/report') return { title: 'Report New Campus Issue', subtitle: 'File an infrastructure maintenance request' };
    if (p === '/faculty/reports') return { title: 'My Submitted Reports', subtitle: 'Track resolution status of your filed complaints' };
    if (p === '/faculty/department') return { title: 'Department Maintenance Issues', subtitle: 'Live infrastructure tracking for your department' };
    if (p === '/faculty/track') return { title: 'Issue Status Tracker', subtitle: 'Step-by-step resolution timeline for campus complaints' };
    if (p === '/faculty/notifications') return { title: 'Maintenance Notifications', subtitle: 'Real-time alerts on your department complaints' };
    if (p === '/faculty/profile') return { title: 'Faculty Profile', subtitle: 'Department and academic identity credentials' };

    // Student routes
    if (p === '/student') return { title: 'Student Dashboard', subtitle: 'Report and track campus maintenance issues' };
    if (p === '/student/report') return { title: 'Report New Issue', subtitle: 'Quickly report damaged campus infrastructure' };
    if (p === '/student/reports') return { title: 'My Maintenance Reports', subtitle: 'All maintenance requests submitted by you' };
    if (p === '/student/track') return { title: 'Track My Reports', subtitle: 'Real-time issue status and resolution updates' };
    if (p === '/student/notifications') return { title: 'Notifications', subtitle: 'Updates on your reported campus issues' };
    if (p === '/student/profile') return { title: 'Student Profile', subtitle: 'Academic registration and identity information' };

    return { title: 'CampusFix', subtitle: 'Report · Track · Keep Campus Better' };
  };

  const { title, subtitle } = getPageTitle();

  const handleSwitchRole = (targetRole) => {
    quickDemoLogin(targetRole);
    if (targetRole === 'management' || targetRole === 'admin') {
      navigate('/admin');
    } else if (targetRole === 'faculty') {
      navigate('/faculty');
    } else {
      navigate('/student');
    }
    setShowProfileMenu(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const isManagement = role === 'management' || role === 'admin';
  const isFaculty = role === 'faculty';
  const isStudent = role === 'student' || (!isManagement && !isFaculty);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      {/* Left Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            {title}
          </h2>
          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* "+ Report Issue" Quick Button (for Student/Faculty) */}
        {!isManagement && (
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 transition"
          >
            <PlusCircle size={15} />
            <span>Report Issue</span>
          </button>
        )}

        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-500 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80 transition"
        >
          <Search size={15} />
          <span className="hidden md:inline">Search issues, rooms...</span>
          <kbd className="hidden md:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Management Quick Complaint Filter: Only visible for Management */}
        {isManagement && (
          <div className="hidden xl:flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => navigate('/admin/complaints')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                location.pathname === '/admin' || location.pathname === '/admin/complaints'
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>All</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/student-complaints')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                location.pathname === '/admin/student-complaints'
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={13} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/faculty-complaints')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                location.pathname === '/admin/faculty-complaints'
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>Faculty</span>
            </button>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
        >
          {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-slide-up z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Campus Maintenance Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-cyan-400">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-xs font-medium text-blue-600 hover:underline dark:text-cyan-400"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 max-h-72 overflow-y-auto space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`cursor-pointer rounded-xl p-3 text-xs transition ${
                        n.read 
                          ? 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50' 
                          : 'bg-blue-50/70 font-medium text-slate-800 dark:bg-blue-950/40 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${n.type === 'success' ? 'bg-emerald-500' : n.type === 'progress' ? 'bg-indigo-500' : 'bg-blue-500'}`} />
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400">No active maintenance notifications</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-1.5 pr-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 transition"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'User'}
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-blue-500/20"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                {currentUser?.name || 'Campus User'}
              </p>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 capitalize">
                {currentUser?.designation || (isManagement ? 'Management' : isFaculty ? 'Faculty' : 'Student')}
              </p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-slide-up z-50">
              <div className="border-b border-slate-100 p-3 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser?.email}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950 dark:text-cyan-400 uppercase tracking-wider">
                    {currentUser?.role}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    {currentUser?.department}
                  </span>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    navigate(isManagement ? '/admin/profile' : isFaculty ? '/faculty/profile' : '/student/profile');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                >
                  <UserCircle size={16} /> My Campus Profile
                </button>

                {/* Role Switchers inside Profile menu (Only for Management) */}
                {isManagement && (
                  <div className="border-t border-slate-100 my-1 pt-1 dark:border-slate-800">
                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active View
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSwitchRole('student')}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                    >
                      <GraduationCap size={15} /> Student View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchRole('faculty')}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                    >
                      <BookOpen size={15} /> Faculty View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchRole('management')}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                    >
                      <ShieldAlert size={15} /> Management View
                    </button>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Report Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </header>
  );
}
