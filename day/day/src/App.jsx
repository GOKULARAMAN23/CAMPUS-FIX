import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Management (Admin) Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaints from './pages/admin/AllComplaints';
import StudentComplaints from './pages/admin/StudentComplaints';
import FacultyComplaints from './pages/admin/FacultyComplaints';
import MaintenanceTeams from './pages/admin/MaintenanceTeams';
import IssueAnalytics from './pages/admin/IssueAnalytics';
import StudentData from './pages/admin/StudentData';
import FacultyData from './pages/admin/FacultyData';
import UserManagement from './pages/admin/UserManagement';
import ManagementProfile from './pages/admin/ManagementProfile';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import DepartmentIssues from './pages/faculty/DepartmentIssues';
import FacultyProfile from './pages/faculty/FacultyProfile';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ReportNewIssue from './pages/student/ReportNewIssue';
import MyReports from './pages/student/MyReports';
import TrackIssues from './pages/student/TrackIssues';
import StudentProfile from './pages/student/StudentProfile';

// Common Pages
import NotificationsPage from './pages/common/NotificationsPage';

// Route Guard
function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isManagement = role === 'admin' || role === 'management';

  if (requiredRole === 'management' && !isManagement) {
    return <Navigate to={role === 'faculty' ? '/faculty' : '/student'} replace />;
  }

  return children;
}

function LegacyEmployeeRedirect() {
  const { role } = useAuth();
  if (role === 'management' || role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'faculty') return <Navigate to="/faculty" replace />;
  return <Navigate to="/student" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* MANAGEMENT (ADMIN) ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="management">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="complaints" element={<AllComplaints />} />
        <Route path="student-complaints" element={<StudentComplaints />} />
        <Route path="faculty-complaints" element={<FacultyComplaints />} />
        <Route path="team" element={<MaintenanceTeams />} />
        <Route path="analytics" element={<IssueAnalytics />} />
        <Route path="students" element={<StudentData />} />
        <Route path="faculty" element={<FacultyData />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ManagementProfile />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* FACULTY ROUTES */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="report" element={<ReportNewIssue />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="department" element={<DepartmentIssues />} />
        <Route path="track" element={<TrackIssues />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="*" element={<Navigate to="/faculty" replace />} />
      </Route>

      {/* STUDENT ROUTES */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="report" element={<ReportNewIssue />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="track" element={<TrackIssues />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Route>

      {/* Backward Compatibility Fallbacks */}
      <Route path="/employee/*" element={<LegacyEmployeeRedirect />} />
      <Route path="/dashboard" element={<LegacyEmployeeRedirect />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
