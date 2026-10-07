import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export const DEMO_USERS = {
  student: {
    id: 'CF-STU-2026',
    name: 'Arun Kumar',
    email: 'student@college.edu',
    role: 'student',
    designation: 'Student (CSE - 3rd Year)',
    department: 'Computer Science and Engineering (CSE)',
    year: '3rd Year',
    registerNumber: '710022104045',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  faculty: {
    id: 'CF-FAC-1082',
    name: 'Dr. Arun Kumar',
    email: 'faculty@college.edu',
    role: 'faculty',
    designation: 'Associate Professor',
    department: 'Computer Science and Engineering',
    facultyId: 'FAC-CSE-042',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  management: {
    id: 'CF-MGT-0012',
    name: 'R. Kumar',
    email: 'management@college.edu',
    role: 'management',
    designation: 'Campus Maintenance Manager',
    department: 'Campus Maintenance',
    managementId: 'MGT-EST-01',
    contactNumber: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  // Backward compatibility aliases
  admin: {
    id: 'CF-MGT-0012',
    name: 'R. Kumar',
    email: 'management@college.edu',
    role: 'management',
    designation: 'Campus Maintenance Manager',
    department: 'Campus Maintenance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  employee: {
    id: 'CF-STU-2026',
    name: 'Arun Kumar',
    email: 'student@college.edu',
    role: 'student',
    designation: 'Student (CSE - 3rd Year)',
    department: 'Computer Science and Engineering (CSE)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedRole = localStorage.getItem('campusfix_role') || localStorage.getItem('dayflow_role');
    const savedId = localStorage.getItem('campusfix_user_id') || localStorage.getItem('dayflow_user_id');
    const savedName = localStorage.getItem('campusfix_name') || localStorage.getItem('dayflow_name');
    const savedEmail = localStorage.getItem('campusfix_email') || localStorage.getItem('dayflow_email');
    const savedDesignation = localStorage.getItem('campusfix_designation') || localStorage.getItem('dayflow_designation');
    const savedDepartment = localStorage.getItem('campusfix_department') || localStorage.getItem('dayflow_department');
    const savedAvatar = localStorage.getItem('campusfix_avatar') || localStorage.getItem('dayflow_avatar');
    const savedYear = localStorage.getItem('campusfix_year');
    const savedRegNo = localStorage.getItem('campusfix_regno');
    const savedFacultyId = localStorage.getItem('campusfix_faculty_id');
    const savedMgmtId = localStorage.getItem('campusfix_mgmt_id');

    if (savedRole && savedEmail) {
      const demo = DEMO_USERS[savedRole] || DEMO_USERS.student;
      return {
        id: savedId || demo.id,
        name: savedName || demo.name,
        email: savedEmail,
        role: savedRole,
        designation: savedDesignation || demo.designation,
        department: savedDepartment || demo.department,
        avatar: savedAvatar || demo.avatar,
        year: savedYear || demo.year,
        registerNumber: savedRegNo || demo.registerNumber,
        facultyId: savedFacultyId || demo.facultyId,
        managementId: savedMgmtId || demo.managementId,
      };
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const saveUserSession = (user) => {
    setCurrentUser(user);
    // New CampusFix keys
    localStorage.setItem('campusfix_role', user.role);
    localStorage.setItem('campusfix_user_id', user.id);
    localStorage.setItem('campusfix_name', user.name);
    localStorage.setItem('campusfix_email', user.email);
    localStorage.setItem('campusfix_designation', user.designation || 'Campus Member');
    localStorage.setItem('campusfix_department', user.department || 'General');
    localStorage.setItem('campusfix_avatar', user.avatar || '');
    if (user.year) localStorage.setItem('campusfix_year', user.year);
    if (user.registerNumber) localStorage.setItem('campusfix_regno', user.registerNumber);
    if (user.facultyId) localStorage.setItem('campusfix_faculty_id', user.facultyId);
    if (user.managementId) localStorage.setItem('campusfix_mgmt_id', user.managementId);

    // Backward compatibility for existing dayflow components
    localStorage.setItem('dayflow_role', user.role === 'management' ? 'admin' : 'employee');
    localStorage.setItem('dayflow_user_id', user.id);
    localStorage.setItem('dayflow_name', user.name);
    localStorage.setItem('dayflow_email', user.email);
    localStorage.setItem('dayflow_designation', user.designation || 'Campus Member');
    localStorage.setItem('dayflow_department', user.department || 'General');
    localStorage.setItem('dayflow_avatar', user.avatar || '');
  };

  const login = async (email, password, roleHint = 'student') => {
    setLoading(true);
    try {
      let userObj;
      const lowerEmail = (email || '').toLowerCase();
      
      if (roleHint === 'management' || lowerEmail.includes('management') || lowerEmail.includes('admin')) {
        userObj = { ...DEMO_USERS.management, email };
      } else if (roleHint === 'faculty' || lowerEmail.includes('faculty')) {
        userObj = { ...DEMO_USERS.faculty, email };
      } else {
        userObj = { ...DEMO_USERS.student, email };
      }
      
      saveUserSession(userObj);
      return { success: true, user: userObj };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = (role = 'student') => {
    const userObj = DEMO_USERS[role] || DEMO_USERS.student;
    saveUserSession(userObj);
    return userObj;
  };

  const loginAsUser = (userObj) => {
    saveUserSession(userObj);
    return userObj;
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const role = userData.role || 'student';
      const prefix = role === 'student' ? 'CF-STU' : role === 'faculty' ? 'CF-FAC' : 'CF-MGT';
      const newUser = {
        id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: userData.name,
        email: userData.email,
        role: role,
        department: userData.department || 'Computer Science and Engineering (CSE)',
        designation: userData.designation || (role === 'student' ? `Student (${userData.year || '1st Year'})` : 'Campus Member'),
        year: userData.year,
        registerNumber: userData.registerNumber,
        facultyId: userData.facultyId,
        managementId: userData.managementId,
        contactNumber: userData.contactNumber,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      };
      saveUserSession(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('campusfix_role');
    localStorage.removeItem('campusfix_user_id');
    localStorage.removeItem('campusfix_name');
    localStorage.removeItem('campusfix_email');
    localStorage.removeItem('campusfix_designation');
    localStorage.removeItem('campusfix_department');
    localStorage.removeItem('campusfix_avatar');
    localStorage.removeItem('campusfix_year');
    localStorage.removeItem('campusfix_regno');
    localStorage.removeItem('campusfix_faculty_id');
    localStorage.removeItem('campusfix_mgmt_id');

    localStorage.removeItem('dayflow_role');
    localStorage.removeItem('dayflow_user_id');
    localStorage.removeItem('dayflow_name');
    localStorage.removeItem('dayflow_email');
    localStorage.removeItem('dayflow_designation');
    localStorage.removeItem('dayflow_department');
    localStorage.removeItem('dayflow_avatar');
    setCurrentUser(null);
  };

  const updateUserProfile = (data) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    saveUserSession(updated);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role: currentUser?.role || null,
      isAuthenticated: Boolean(currentUser),
      loading,
      login,
      quickDemoLogin,
      loginAsUser,
      signup,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
