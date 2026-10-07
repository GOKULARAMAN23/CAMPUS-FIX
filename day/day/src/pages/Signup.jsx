import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Building2, 
  ArrowRight, 
  Briefcase, 
  Calendar,
  Hash,
  Phone,
  Wrench,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import CampusFixLogo from '../components/common/CampusFixLogo';
import { MaintenanceGearIllustration } from '../components/common/CampusIllustrations';

const STUDENT_DEPARTMENTS = [
  'Computer Science and Engineering (CSE)',
  'Electronics and Communication Engineering (ECE)',
  'Electrical and Electronics Engineering (EEE)',
  'Mechanical Engineering (MECH)',
  'Civil Engineering (CIVIL)',
  'Information Technology (IT)',
  'Artificial Intelligence and Data Science (AIDS)',
  'Artificial Intelligence and Machine Learning (AIML)',
];

const FACULTY_DEPARTMENTS = [
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Artificial Intelligence and Data Science',
  'Artificial Intelligence and Machine Learning',
];

const FACULTY_DESIGNATIONS = [
  'Assistant Professor',
  'Associate Professor',
  'Professor',
  'Head of Department',
  'Lab Instructor',
  'Technical Staff',
  'Other',
];

const MANAGEMENT_DESIGNATIONS = [
  'Principal',
  'Vice Principal',
  'Dean',
  'Administrative Officer',
  'Campus Manager',
  'Maintenance Manager',
  'Estate Manager',
  'Other',
];

const MANAGEMENT_OFFICES = [
  'Administration',
  'Campus Maintenance',
  'Electrical Maintenance',
  'Civil Maintenance',
  'Hostel Administration',
  'Infrastructure',
  'IT Administration',
  'General Administration',
];

const YEARS_OF_STUDY = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';
  const [activeRole, setActiveRole] = useState(
    ['student', 'faculty', 'management'].includes(initialRole) ? initialRole : 'student'
  );

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    department: 'Computer Science and Engineering (CSE)',
    year: '1st Year',
    registerNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Faculty Form State
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    email: '',
    department: 'Computer Science and Engineering',
    facultyId: '',
    designation: 'Assistant Professor',
    password: '',
    confirmPassword: '',
  });

  // Management Form State
  const [managementForm, setManagementForm] = useState({
    name: '',
    email: '',
    managementId: '',
    designation: 'Campus Manager',
    office: 'Campus Maintenance',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Validation Errors state
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const { signup, loading } = useAuth();
  const { addEmployee } = useData();
  const navigate = useNavigate();

  // Reset errors when switching role
  const handleRoleChange = (role) => {
    setActiveRole(role);
    setErrors({});
    setGeneralError('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeRole === 'student') {
      if (!studentForm.name.trim()) newErrors.name = 'Full Name is required.';
      if (!studentForm.email.trim()) {
        newErrors.email = 'College email is required.';
      } else if (!validateEmail(studentForm.email)) {
        newErrors.email = 'Please enter a valid college email.';
      }
      if (!studentForm.department) newErrors.department = 'Department is required.';
      if (!studentForm.year) newErrors.year = 'Year of study is required.';
      if (!studentForm.registerNumber.trim()) {
        newErrors.registerNumber = 'Register number is required.';
      }
      if (!studentForm.password) {
        newErrors.password = 'Password is required.';
      } else if (studentForm.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
      if (!studentForm.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required.';
      } else if (studentForm.password !== studentForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    } else if (activeRole === 'faculty') {
      if (!facultyForm.name.trim()) newErrors.name = 'Full Name is required.';
      if (!facultyForm.email.trim()) {
        newErrors.email = 'College email is required.';
      } else if (!validateEmail(facultyForm.email)) {
        newErrors.email = 'Please enter a valid college email.';
      }
      if (!facultyForm.department) newErrors.department = 'Department is required.';
      if (!facultyForm.facultyId.trim()) newErrors.facultyId = 'Faculty ID is required.';
      if (!facultyForm.designation) newErrors.designation = 'Designation is required.';
      if (!facultyForm.password) {
        newErrors.password = 'Password is required.';
      } else if (facultyForm.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
      if (!facultyForm.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required.';
      } else if (facultyForm.password !== facultyForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    } else if (activeRole === 'management') {
      if (!managementForm.name.trim()) newErrors.name = 'Full Name is required.';
      if (!managementForm.email.trim()) {
        newErrors.email = 'Official email is required.';
      } else if (!validateEmail(managementForm.email)) {
        newErrors.email = 'Please enter a valid official email.';
      }
      if (!managementForm.managementId.trim()) {
        newErrors.managementId = 'Management ID is required.';
      }
      if (!managementForm.designation) newErrors.designation = 'Designation is required.';
      if (!managementForm.office) newErrors.office = 'Department / Office is required.';
      if (!managementForm.contactNumber.trim()) {
        newErrors.contactNumber = 'Contact number is required.';
      }
      if (!managementForm.password) {
        newErrors.password = 'Password is required.';
      } else if (managementForm.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
      if (!managementForm.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required.';
      } else if (managementForm.password !== managementForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      setGeneralError('Please correct the highlighted errors before submitting.');
      return;
    }

    let payload = {};
    if (activeRole === 'student') {
      payload = {
        name: studentForm.name,
        email: studentForm.email,
        password: studentForm.password,
        role: 'student',
        department: studentForm.department,
        year: studentForm.year,
        registerNumber: studentForm.registerNumber,
        designation: `Student (${studentForm.year})`,
      };
    } else if (activeRole === 'faculty') {
      payload = {
        name: facultyForm.name,
        email: facultyForm.email,
        password: facultyForm.password,
        role: 'faculty',
        department: facultyForm.department,
        facultyId: facultyForm.facultyId,
        designation: facultyForm.designation,
      };
    } else if (activeRole === 'management') {
      payload = {
        name: managementForm.name,
        email: managementForm.email,
        password: managementForm.password,
        role: 'management',
        department: managementForm.office,
        managementId: managementForm.managementId,
        designation: managementForm.designation,
        contactNumber: managementForm.contactNumber,
      };
    }

    const res = await signup(payload);
    if (res.success) {
      if (addEmployee) {
        addEmployee({
          name: payload.name,
          email: payload.email,
          role: payload.role === 'management' ? 'admin' : 'employee',
          department: payload.department,
          designation: payload.designation,
          salary: 75000,
          location: 'Main Engineering Campus',
        });
      }

      if (payload.role === 'management') {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } else {
      setGeneralError(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 mesh-bg">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        {/* Brand Header */}
        <div className="mb-3 text-center">
          <CampusFixLogo size="large" showTagline={true} />
        </div>

        {/* Maintenance Gear & Foliage Illustration matching reference image */}
        <div className="mb-2">
          <MaintenanceGearIllustration className="w-full h-28 sm:h-32" />
        </div>

        {/* Registration Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 transition-all">
          {/* Dynamic Card Heading & Subtitle */}
          <div className="mb-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              {activeRole === 'student' && 'Create Your Student Account'}
              {activeRole === 'faculty' && 'Create Faculty Account'}
              {activeRole === 'management' && 'Create Management Account'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activeRole === 'student' && 'Register to report and track campus maintenance issues.'}
              {activeRole === 'faculty' && 'Join CampusFix to report and monitor campus maintenance issues.'}
              {activeRole === 'management' && 'Manage campus maintenance and monitor issue resolution.'}
            </p>
          </div>

          {/* "Register As" Role Selector */}
          <div className="mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 text-center">
              Register As
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-xs font-bold transition-all duration-200 ${
                  activeRole === 'student'
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
                  activeRole === 'faculty'
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
                  activeRole === 'management'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
              >
                <ShieldCheck size={15} />
                <span>Management</span>
              </button>
            </div>
          </div>

          {generalError && (
            <div className="mb-4 flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
              <AlertCircle size={16} className="shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ==================== 1. STUDENT REGISTRATION FIELDS ==================== */}
            {activeRole === 'student' && (
              <div className="space-y-4 animate-fade-in">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={studentForm.name}
                      onChange={(e) => {
                        setStudentForm({ ...studentForm, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder="e.g. Arun Kumar"
                      className={`w-full rounded-2xl border ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>}
                </div>

                {/* 2. College Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    College Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={studentForm.email}
                      onChange={(e) => {
                        setStudentForm({ ...studentForm, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="student@college.edu"
                      className={`w-full rounded-2xl border ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
                </div>

                {/* 3. Department */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={studentForm.department}
                      onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                    >
                      {STUDENT_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Year of Study & 5. Register Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Year of Study
                    </label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={studentForm.year}
                        onChange={(e) => setStudentForm({ ...studentForm, year: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                      >
                        {YEARS_OF_STUDY.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Register Number
                    </label>
                    <div className="relative">
                      <Hash size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={studentForm.registerNumber}
                        onChange={(e) => {
                          setStudentForm({ ...studentForm, registerNumber: e.target.value });
                          if (errors.registerNumber) setErrors({ ...errors, registerNumber: null });
                        }}
                        placeholder="Enter your register number"
                        className={`w-full rounded-2xl border ${
                          errors.registerNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.registerNumber && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.registerNumber}</p>
                    )}
                  </div>
                </div>

                {/* 6. Password & 7. Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={studentForm.password}
                        onChange={(e) => {
                          setStudentForm({ ...studentForm, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: null });
                        }}
                        placeholder="Create a strong password"
                        className={`w-full rounded-2xl border ${
                          errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={studentForm.confirmPassword}
                        onChange={(e) => {
                          setStudentForm({ ...studentForm, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                        }}
                        placeholder="Confirm your password"
                        className={`w-full rounded-2xl border ${
                          errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 2. FACULTY REGISTRATION FIELDS ==================== */}
            {activeRole === 'faculty' && (
              <div className="space-y-4 animate-fade-in">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={facultyForm.name}
                      onChange={(e) => {
                        setFacultyForm({ ...facultyForm, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder="e.g. Dr. Arun Kumar"
                      className={`w-full rounded-2xl border ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>}
                </div>

                {/* 2. College Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    College Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={facultyForm.email}
                      onChange={(e) => {
                        setFacultyForm({ ...facultyForm, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="faculty@college.edu"
                      className={`w-full rounded-2xl border ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
                </div>

                {/* 3. Department */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={facultyForm.department}
                      onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                    >
                      {FACULTY_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Faculty ID & 5. Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Faculty ID
                    </label>
                    <div className="relative">
                      <Hash size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={facultyForm.facultyId}
                        onChange={(e) => {
                          setFacultyForm({ ...facultyForm, facultyId: e.target.value });
                          if (errors.facultyId) setErrors({ ...errors, facultyId: null });
                        }}
                        placeholder="Enter faculty ID"
                        className={`w-full rounded-2xl border ${
                          errors.facultyId ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.facultyId && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.facultyId}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Designation
                    </label>
                    <div className="relative">
                      <Briefcase size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={facultyForm.designation}
                        onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                      >
                        {FACULTY_DESIGNATIONS.map((des) => (
                          <option key={des} value={des}>
                            {des}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 6. Password & 7. Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={facultyForm.password}
                        onChange={(e) => {
                          setFacultyForm({ ...facultyForm, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: null });
                        }}
                        placeholder="Create a strong password"
                        className={`w-full rounded-2xl border ${
                          errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={facultyForm.confirmPassword}
                        onChange={(e) => {
                          setFacultyForm({ ...facultyForm, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                        }}
                        placeholder="Confirm your password"
                        className={`w-full rounded-2xl border ${
                          errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 3. MANAGEMENT REGISTRATION FIELDS ==================== */}
            {activeRole === 'management' && (
              <div className="space-y-4 animate-fade-in">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={managementForm.name}
                      onChange={(e) => {
                        setManagementForm({ ...managementForm, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder="e.g. R. Kumar"
                      className={`w-full rounded-2xl border ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>}
                </div>

                {/* 2. Official Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Official Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={managementForm.email}
                      onChange={(e) => {
                        setManagementForm({ ...managementForm, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="management@college.edu"
                      className={`w-full rounded-2xl border ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                      } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
                </div>

                {/* 3. Management ID & 4. Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Employee / Management ID
                    </label>
                    <div className="relative">
                      <Hash size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={managementForm.managementId}
                        onChange={(e) => {
                          setManagementForm({ ...managementForm, managementId: e.target.value });
                          if (errors.managementId) setErrors({ ...errors, managementId: null });
                        }}
                        placeholder="Enter management ID"
                        className={`w-full rounded-2xl border ${
                          errors.managementId ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.managementId && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.managementId}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Designation
                    </label>
                    <div className="relative">
                      <Briefcase size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={managementForm.designation}
                        onChange={(e) => setManagementForm({ ...managementForm, designation: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                      >
                        {MANAGEMENT_DESIGNATIONS.map((des) => (
                          <option key={des} value={des}>
                            {des}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Department / Office & 6. Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Department / Office
                    </label>
                    <div className="relative">
                      <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={managementForm.office}
                        onChange={(e) => setManagementForm({ ...managementForm, office: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-8 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                      >
                        {MANAGEMENT_OFFICES.map((off) => (
                          <option key={off} value={off}>
                            {off}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={managementForm.contactNumber}
                        onChange={(e) => {
                          setManagementForm({ ...managementForm, contactNumber: e.target.value });
                          if (errors.contactNumber) setErrors({ ...errors, contactNumber: null });
                        }}
                        placeholder="Enter official contact number"
                        className={`w-full rounded-2xl border ${
                          errors.contactNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.contactNumber && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.contactNumber}</p>
                    )}
                  </div>
                </div>

                {/* 7. Password & 8. Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={managementForm.password}
                        onChange={(e) => {
                          setManagementForm({ ...managementForm, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: null });
                        }}
                        placeholder="Create a strong password"
                        className={`w-full rounded-2xl border ${
                          errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={managementForm.confirmPassword}
                        onChange={(e) => {
                          setManagementForm({ ...managementForm, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                        }}
                        placeholder="Confirm your password"
                        className={`w-full rounded-2xl border ${
                          errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                        } py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>
                {loading
                  ? 'Creating Account...'
                  : activeRole === 'student'
                  ? 'Create Student Account →'
                  : activeRole === 'faculty'
                  ? 'Create Faculty Account →'
                  : 'Create Management Account →'}
              </span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Already have an account link */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-cyan-400">
              Sign In
            </Link>
          </div>
        </div>

        {/* Reference Image Slogan Footer */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Wrench size={14} className="text-blue-600 dark:text-cyan-400" />
            Build a better campus together
          </span>
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
