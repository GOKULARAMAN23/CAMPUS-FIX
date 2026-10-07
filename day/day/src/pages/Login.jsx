import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CampusFixLogo from '../components/common/CampusFixLogo';
import { CollegeBuildingIllustration } from '../components/common/CampusIllustrations';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, quickDemoLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError('');
    if (role === 'student') {
      setEmail('student@college.edu');
      setPassword('password123');
    } else if (role === 'faculty') {
      setEmail('faculty@college.edu');
      setPassword('password123');
    } else if (role === 'management') {
      setEmail('management@college.edu');
      setPassword('password123');
    }
  };

  const getDestination = (role) => {
    if (role === 'management' || role === 'admin') return '/admin';
    if (role === 'faculty') return '/faculty';
    return '/student';
  };

  const handleStandardSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your college email and password.');
      return;
    }

    const res = await login(email, password, selectedRole);
    if (res.success) {
      navigate(getDestination(res.user.role));
    } else {
      setError(res.error || 'Login failed. Please verify your credentials.');
    }
  };

  const handleQuickDemo = (role) => {
    quickDemoLogin(role);
    navigate(getDestination(role));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 mesh-bg">
      {/* Decorative ambient gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Brand Header: CAMPUS - Engineering College Campus Portal */}
        <div className="mb-4 text-center">
          <CampusFixLogo 
            size="large" 
            brandName="CAMPUS" 
            subtitle="Engineering College Campus Portal"
            showTagline={true} 
          />
        </div>

        {/* Neoclassical Engineering College Campus Illustration */}
        <div className="mb-2">
          <CollegeBuildingIllustration className="w-full h-32 sm:h-36" />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 transition-all">
          {/* Card Title & Subtitle */}
          <div className="mb-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Welcome Back!
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Sign in to your CampusFix account
            </p>
          </div>

          {/* Role selector tabs: STUDENT, FACULTY, MANAGEMENT */}
          <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-slate-100 p-1.5 mb-5 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-xs font-bold transition-all duration-200 ${
                selectedRole === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap size={15} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('faculty')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-xs font-bold transition-all duration-200 ${
                selectedRole === 'faculty'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
              }`}
            >
              <BookOpen size={15} />
              <span>Faculty</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('management')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-xs font-bold transition-all duration-200 ${
                selectedRole === 'management'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck size={15} />
              <span>Management</span>
            </button>
          </div>

          {/* Quick 1-Click Demo Login Banner */}
          <div className="mb-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 p-3.5 border border-blue-100 dark:from-blue-950/40 dark:to-cyan-950/30 dark:border-blue-900/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">
                <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
                <span>Instant 1-Click Demo Access</span>
              </div>
              <span className="text-[10px] text-blue-500 font-medium dark:text-cyan-400">Hackathon Ready</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="flex items-center justify-center gap-1 rounded-xl bg-white border border-blue-200/80 px-2 py-2 text-[11px] font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition dark:bg-slate-800 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-700"
              >
                <GraduationCap size={13} />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('faculty')}
                className="flex items-center justify-center gap-1 rounded-xl bg-white border border-blue-200/80 px-2 py-2 text-[11px] font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition dark:bg-slate-800 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-700"
              >
                <BookOpen size={13} />
                <span>Faculty Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('management')}
                className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-2 py-2 text-[11px] font-semibold text-white shadow-sm hover:opacity-95 active:scale-95 transition"
              >
                <ShieldCheck size={13} />
                <span>Management Demo</span>
              </button>
            </div>
          </div>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 dark:bg-slate-900 font-medium">
              Or sign in with college credentials
            </span>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleStandardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                College Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your college email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:focus:bg-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('A password reset instruction link has been sent to your college email address.');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline dark:text-cyan-400 font-medium"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:focus:bg-slate-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In →'}</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Footer note: Register link */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link
              to={`/signup?role=${selectedRole}`}
              className="font-semibold text-blue-600 hover:underline dark:text-cyan-400"
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Reference Image Slogan Footer */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Wrench size={14} className="text-blue-600 dark:text-cyan-400" />
            A safer, cleaner and better campus
          </span>
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
