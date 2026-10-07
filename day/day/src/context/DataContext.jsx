import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Initial Central Campus Maintenance Issues
const INITIAL_ISSUES = [
  {
    id: 'CF-2026-00124',
    title: 'Broken Ceiling Fan',
    category: 'Electrical',
    description: 'Ceiling fan in room 204 making loud noise and not rotating at proper speed. Regulator sparking.',
    location: 'EEE Block – Room 204',
    reportedBy: 'Arun Kumar',
    reportedById: 'CF-STU-2026',
    role: 'Student',
    department: 'Electrical and Electronics Engineering (EEE)',
    priority: 'High',
    status: 'In Progress',
    assignedTeam: 'Electrical Maintenance Crew A',
    assignedStaff: 'K. Selvam (Chief Electrician)',
    date: '05 Oct 2026',
    createdAt: '2026-10-05T09:30:00Z',
    remarks: 'Electrician dispatched. Motor replacement in progress.',
    photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '05 Oct 2026, 09:30 AM', note: 'Issue submitted by Arun Kumar (Student)' },
      { step: 'Acknowledged', date: '05 Oct 2026, 10:15 AM', note: 'Acknowledged by Estate Office' },
      { step: 'Assigned', date: '05 Oct 2026, 11:00 AM', note: 'Assigned to Electrical Maintenance Crew A' },
      { step: 'In Progress', date: '05 Oct 2026, 11:30 AM', note: 'Technician inspecting ceiling fan motor' }
    ]
  },
  {
    id: 'CF-2026-00123',
    title: 'Water Leakage near Electrical Lab',
    category: 'Plumbing',
    description: 'Severe pipe leakage under wash basin adjacent to lab entrance. Water pooling near electrical distribution board.',
    location: 'CSE Block – Lab 2',
    reportedBy: 'Priya Sharma',
    reportedById: 'CF-STU-2027',
    role: 'Student',
    department: 'Computer Science and Engineering (CSE)',
    priority: 'Critical',
    status: 'Pending',
    assignedTeam: 'Plumbing & Water Systems Team',
    assignedStaff: 'M. Ramesh',
    date: '05 Oct 2026',
    createdAt: '2026-10-05T08:15:00Z',
    remarks: 'Urgent plumbing inspection required to prevent electrical hazards.',
    photo: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '05 Oct 2026, 08:15 AM', note: 'Critical issue reported by Priya Sharma (Student)' }
    ]
  },
  {
    id: 'CF-2026-00122',
    title: 'Broken Chair & Desk',
    category: 'Furniture',
    description: 'Arm rest and seat detached on seat row 4, seat 12. May cause student injury.',
    location: 'Seminar Hall',
    reportedBy: 'Dr. Priya Kumar',
    reportedById: 'CF-FAC-1024',
    role: 'Faculty',
    department: 'Electronics and Communication Engineering (ECE)',
    priority: 'Low',
    status: 'Resolved',
    assignedTeam: 'Civil & Carpentry Maintenance',
    assignedStaff: 'S. David (Carpenter)',
    date: '04 Oct 2026',
    createdAt: '2026-10-04T11:00:00Z',
    remarks: 'Replaced wooden armrest and tightened base bolts. Safe for use.',
    photo: 'https://images.unsplash.com/photo-1580481077195-c3a82474c30c?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '04 Oct 2026, 11:00 AM', note: 'Issue submitted by Dr. Priya Kumar (Faculty)' },
      { step: 'Acknowledged', date: '04 Oct 2026, 11:30 AM', note: 'Acknowledged by Campus Maintenance' },
      { step: 'Assigned', date: '04 Oct 2026, 01:00 PM', note: 'Assigned to S. David (Carpenter)' },
      { step: 'In Progress', date: '04 Oct 2026, 02:00 PM', note: 'Repair work ongoing in Seminar Hall' },
      { step: 'Resolved', date: '04 Oct 2026, 04:30 PM', note: 'Chair repaired and tested successfully' }
    ]
  },
  {
    id: 'CF-2026-00121',
    title: 'Projector Not Working',
    category: 'Classroom',
    description: 'Overhead projector bulb flashing amber and HDMI port loose. Unable to conduct slide presentations.',
    location: 'ECE Block – Seminar Hall',
    reportedBy: 'Dr. Arun Kumar',
    reportedById: 'CF-FAC-1082',
    role: 'Faculty',
    department: 'Computer Science and Engineering (CSE)',
    priority: 'Medium',
    status: 'Pending',
    assignedTeam: 'IT Infrastructure & Network Team',
    assignedStaff: 'V. Prakash',
    date: '05 Oct 2026',
    createdAt: '2026-10-05T10:00:00Z',
    remarks: 'Awaiting replacement lamp module.',
    photo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '05 Oct 2026, 10:00 AM', note: 'Issue submitted by Dr. Arun Kumar (Faculty)' }
    ]
  },
  {
    id: 'CF-2026-00120',
    title: 'Network Switch Down in Lab 3',
    category: 'Network / Internet',
    description: '24-port rack switch lost power. All 30 student workstations in Lab 3 disconnected from LAN/Internet.',
    location: 'Computer Lab',
    reportedBy: 'Alex Rivera',
    reportedById: 'CF-STU-2028',
    role: 'Student',
    department: 'Information Technology (IT)',
    priority: 'High',
    status: 'In Progress',
    assignedTeam: 'IT Infrastructure & Network Team',
    assignedStaff: 'T. Karthik',
    date: '03 Oct 2026',
    createdAt: '2026-10-03T14:20:00Z',
    remarks: 'Power adapter replaced. Port diagnostics running.',
    photo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '03 Oct 2026, 02:20 PM', note: 'Reported by Alex Rivera (Student)' },
      { step: 'Acknowledged', date: '03 Oct 2026, 02:30 PM', note: 'IT Cell acknowledged' },
      { step: 'Assigned', date: '03 Oct 2026, 02:45 PM', note: 'Assigned to T. Karthik' },
      { step: 'In Progress', date: '03 Oct 2026, 03:00 PM', note: 'Technician on-site testing switch' }
    ]
  },
  {
    id: 'CF-2026-00119',
    title: 'Washroom Tap Broken & Overflowing',
    category: 'Plumbing',
    description: 'Push tap valve stuck in open position. Water overflowing on 2nd floor corridor.',
    location: 'Main Block',
    reportedBy: 'Dr. Suresh Raina',
    reportedById: 'CF-FAC-1045',
    role: 'Faculty',
    department: 'Mechanical Engineering (MECH)',
    priority: 'Medium',
    status: 'Resolved',
    assignedTeam: 'Plumbing & Water Systems Team',
    assignedStaff: 'M. Ramesh',
    date: '03 Oct 2026',
    createdAt: '2026-10-03T09:10:00Z',
    remarks: 'Main valve isolated and new ceramic washer installed.',
    photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '03 Oct 2026, 09:10 AM', note: 'Reported by Dr. Suresh Raina (Faculty)' },
      { step: 'Acknowledged', date: '03 Oct 2026, 09:20 AM', note: 'Acknowledged' },
      { step: 'Assigned', date: '03 Oct 2026, 09:30 AM', note: 'Assigned to M. Ramesh' },
      { step: 'In Progress', date: '03 Oct 2026, 09:45 AM', note: 'Valve shutoff completed' },
      { step: 'Resolved', date: '03 Oct 2026, 11:00 AM', note: 'Tap replaced and water flow restored' }
    ]
  },
  {
    id: 'CF-2026-00118',
    title: 'AC Not Cooling in Mechanical CAD Lab',
    category: 'Electrical',
    description: 'Split AC unit blowing warm air during heavy lab usage. Thermostat shows error E4.',
    location: 'Mechanical Lab',
    reportedBy: 'Marcus Vance',
    reportedById: 'CF-STU-2029',
    role: 'Student',
    department: 'Mechanical Engineering (MECH)',
    priority: 'Low',
    status: 'Resolved',
    assignedTeam: 'Electrical Maintenance Crew A',
    assignedStaff: 'K. Selvam',
    date: '02 Oct 2026',
    createdAt: '2026-10-02T13:40:00Z',
    remarks: 'Cleaned filters and topped up refrigerant gas.',
    photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    timeline: [
      { step: 'Reported', date: '02 Oct 2026, 01:40 PM', note: 'Reported by Marcus Vance' },
      { step: 'Resolved', date: '02 Oct 2026, 05:00 PM', note: 'AC serviced and cooling effectively' }
    ]
  }
];

// Initial Registered Students
const INITIAL_STUDENTS = [
  {
    id: 'CF-STU-2026',
    name: 'Arun Kumar',
    registerNumber: '23EEE104',
    department: 'Electrical and Electronics Engineering (EEE)',
    year: '3rd Year',
    email: 'arun@college.edu',
    reportsCount: 5,
    status: 'Active',
    phone: '+91 98765 12345',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-STU-2027',
    name: 'Priya Sharma',
    registerNumber: '22CSE089',
    department: 'Computer Science and Engineering (CSE)',
    year: '4th Year',
    email: 'priya.sharma@college.edu',
    reportsCount: 3,
    status: 'Active',
    phone: '+91 98765 23456',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-STU-2028',
    name: 'Alex Rivera',
    registerNumber: '24IT045',
    department: 'Information Technology (IT)',
    year: '2nd Year',
    email: 'alex.rivera@college.edu',
    reportsCount: 4,
    status: 'Active',
    phone: '+91 98765 34567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-STU-2029',
    name: 'Marcus Vance',
    registerNumber: '23MECH071',
    department: 'Mechanical Engineering (MECH)',
    year: '3rd Year',
    email: 'marcus.vance@college.edu',
    reportsCount: 2,
    status: 'Active',
    phone: '+91 98765 45678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-STU-2030',
    name: 'Elena Rostova',
    registerNumber: '25AIDS012',
    department: 'Artificial Intelligence and Data Science (AIDS)',
    year: '1st Year',
    email: 'elena.rostova@college.edu',
    reportsCount: 1,
    status: 'Active',
    phone: '+91 98765 56789',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
];

// Initial Registered Faculty
const INITIAL_FACULTY = [
  {
    id: 'CF-FAC-1024',
    name: 'Dr. Priya Kumar',
    facultyId: 'FAC-1024',
    department: 'Electronics and Communication Engineering (ECE)',
    designation: 'Associate Professor',
    email: 'priya@college.edu',
    reportsCount: 3,
    status: 'Active',
    phone: '+91 98765 67890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-FAC-1082',
    name: 'Dr. Arun Kumar',
    facultyId: 'FAC-CSE-042',
    department: 'Computer Science and Engineering (CSE)',
    designation: 'Professor & Head',
    email: 'faculty@college.edu',
    reportsCount: 4,
    status: 'Active',
    phone: '+91 98765 78901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-FAC-1045',
    name: 'Dr. Suresh Raina',
    facultyId: 'FAC-MECH-019',
    department: 'Mechanical Engineering (MECH)',
    designation: 'Assistant Professor',
    email: 'suresh.raina@college.edu',
    reportsCount: 2,
    status: 'Active',
    phone: '+91 98765 89012',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CF-FAC-1011',
    name: 'Prof. Ananya Sen',
    facultyId: 'FAC-EEE-008',
    department: 'Electrical and Electronics Engineering (EEE)',
    designation: 'Associate Professor',
    email: 'ananya.sen@college.edu',
    reportsCount: 1,
    status: 'Active',
    phone: '+91 98765 90123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

// Initial Maintenance Teams
const INITIAL_TEAMS = [
  { id: 'TEAM-1', name: 'Electrical Maintenance Crew A', lead: 'K. Selvam (Chief Electrician)', contact: 'ext-401', activeIssues: 3, specialization: 'Electrical, Lighting, Fans & Motors' },
  { id: 'TEAM-2', name: 'Plumbing & Water Systems Team', lead: 'M. Ramesh (Senior Plumber)', contact: 'ext-402', activeIssues: 2, specialization: 'Pipes, Washrooms, Pumps & Overhead Tanks' },
  { id: 'TEAM-3', name: 'Civil & Carpentry Maintenance', lead: 'S. David (Head Carpenter)', contact: 'ext-403', activeIssues: 1, specialization: 'Furniture, Desks, Doors & Windows' },
  { id: 'TEAM-4', name: 'IT Infrastructure & Network Team', lead: 'V. Prakash (Network Specialist)', contact: 'ext-404', activeIssues: 2, specialization: 'Switches, Wi-Fi Access Points, Projectors' },
  { id: 'TEAM-5', name: 'Campus Housekeeping & Sanitation', lead: 'R. Lakshmi (Supervisor)', contact: 'ext-405', activeIssues: 1, specialization: 'Sanitation, Cleaning & Waste Management' }
];

// Initial Notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    title: 'Issue In Progress',
    message: 'Your maintenance issue CF-2026-00124 (Broken Ceiling Fan) is now In Progress.',
    time: '25m ago',
    read: false,
    type: 'progress',
    issueId: 'CF-2026-00124'
  },
  {
    id: 'NOTIF-2',
    title: 'Issue Acknowledged',
    message: 'Your report CF-2026-00123 (Water Leakage) was acknowledged by the Estate Office.',
    time: '1h ago',
    read: false,
    type: 'info',
    issueId: 'CF-2026-00123'
  },
  {
    id: 'NOTIF-3',
    title: 'Issue Resolved',
    message: 'Your issue CF-2026-00122 (Broken Chair) has been resolved by Civil Maintenance.',
    time: 'Yesterday',
    read: true,
    type: 'success',
    issueId: 'CF-2026-00122'
  }
];

export function DataProvider({ children }) {
  // State: Issues
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('campusfix_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  // State: Students
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('campusfix_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // State: Faculty
  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('campusfix_faculty');
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  // State: Teams
  const [teams, setTeams] = useState(INITIAL_TEAMS);

  // State: Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('campusfix_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // State: Recent Activity
  const [activities, setActivities] = useState([
    { id: 'ACT-1', title: 'Issue Assigned', user: 'Management Office', desc: 'Assigned CF-2026-00124 to Electrical Crew A', time: '1h ago' },
    { id: 'ACT-2', title: 'New Report Filed', user: 'Priya Sharma (Student)', desc: 'Filed critical plumbing issue in CSE Block', time: '2h ago' },
    { id: 'ACT-3', title: 'Issue Resolved', user: 'S. David (Civil Team)', desc: 'Completed furniture repair in Seminar Hall', time: 'Yesterday' }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('campusfix_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('campusfix_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('campusfix_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('campusfix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Backward compatibility alias for any existing reference
  const employees = [...students, ...faculty];

  // Helper to add activity
  const addActivity = (act) => {
    const newAct = {
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      ...act
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // Helper to add notification
  const addNotification = (notif) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // 1. Report New Issue (Used by BOTH Student and Faculty)
  const reportIssue = ({
    title,
    category,
    description,
    location,
    priority = 'Medium',
    photo = null,
    reportedBy = 'Campus User',
    reportedById = '',
    role = 'Student',
    department = 'General'
  }) => {
    // Generate sequential ID like CF-2026-00125
    const nextNum = 125 + (issues.length - INITIAL_ISSUES.length);
    const newId = `CF-2026-00${nextNum < 100 ? '0' + nextNum : nextNum}`;

    const newIssue = {
      id: newId,
      title,
      category,
      description: description || 'No detailed description provided.',
      location,
      reportedBy,
      reportedById,
      role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(), // 'Student' | 'Faculty'
      department,
      priority,
      status: 'Pending',
      assignedTeam: 'Unassigned',
      assignedStaff: 'Pending Assignment',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      remarks: 'Pending initial review by campus maintenance office.',
      photo: photo || (
        category === 'Electrical' ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80' :
        category === 'Plumbing' ? 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80' :
        category === 'Classroom' ? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80' :
        'https://images.unsplash.com/photo-1580481077195-c3a82474c30c?w=500&auto=format&fit=crop&q=80'
      ),
      timeline: [
        {
          step: 'Reported',
          date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          note: `Issue submitted by ${reportedBy} (${role})`
        }
      ]
    };

    setIssues((prev) => [newIssue, ...prev]);

    // Update student or faculty report count
    if (role.toLowerCase() === 'student') {
      setStudents((prev) => prev.map(s => s.name === reportedBy || s.id === reportedById ? { ...s, reportsCount: (s.reportsCount || 0) + 1 } : s));
    } else {
      setFaculty((prev) => prev.map(f => f.name === reportedBy || f.id === reportedById ? { ...f, reportsCount: (f.reportsCount || 0) + 1 } : f));
    }

    // Add user notification
    addNotification({
      title: 'Issue Submitted',
      message: `Your maintenance issue ${newId} has been submitted.`,
      type: 'info',
      issueId: newId
    });

    // Add activity
    addActivity({
      title: 'New Complaint Filed',
      user: `${reportedBy} (${role})`,
      desc: `${title} at ${location}`,
      time: 'Just now'
    });

    return newIssue;
  };

  // 2. Update Issue Status (Management Action)
  const updateIssueStatus = (id, newStatus, remarks = '') => {
    setIssues((prev) => prev.map((issue) => {
      if (issue.id !== id) return issue;

      const dateStr = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      
      const updatedTimeline = [...(issue.timeline || [])];
      
      // If setting to In Progress, ensure Acknowledged and In Progress exist
      if (newStatus === 'In Progress' && !updatedTimeline.some(t => t.step === 'In Progress')) {
        if (!updatedTimeline.some(t => t.step === 'Acknowledged')) {
          updatedTimeline.push({ step: 'Acknowledged', date: dateStr, note: 'Reviewed by Management Office' });
        }
        updatedTimeline.push({
          step: 'In Progress',
          date: dateStr,
          note: remarks || `Maintenance team dispatched for ${issue.category} repair.`
        });
      }

      // If setting to Resolved
      if (newStatus === 'Resolved' && !updatedTimeline.some(t => t.step === 'Resolved')) {
        updatedTimeline.push({
          step: 'Resolved',
          date: dateStr,
          note: remarks || 'Maintenance issue inspected and resolved successfully.'
        });
      }

      return {
        ...issue,
        status: newStatus,
        remarks: remarks || (newStatus === 'Resolved' ? 'Work completed and verified by management.' : issue.remarks),
        timeline: updatedTimeline
      };
    }));

    // Trigger notification
    const targetIssue = issues.find(i => i.id === id);
    if (targetIssue) {
      if (newStatus === 'Resolved') {
        addNotification({
          title: 'Issue Resolved',
          message: `Your issue ${id} has been resolved.`,
          type: 'success',
          issueId: id
        });
      } else {
        addNotification({
          title: `Issue ${newStatus}`,
          message: `Your issue ${id} is now ${newStatus}.`,
          type: 'progress',
          issueId: id
        });
      }
    }

    addActivity({
      title: `Issue ${newStatus}`,
      user: 'Management',
      desc: `Updated status of ${id} to ${newStatus}`,
      time: 'Just now'
    });
  };

  // 3. Update Issue Details (Priority, Assignment, Remarks)
  const updateIssue = (id, fields) => {
    setIssues((prev) => prev.map(i => i.id === id ? { ...i, ...fields } : i));
    addActivity({
      title: 'Issue Updated',
      user: 'Management',
      desc: `Modified details for ${id}`,
      time: 'Just now'
    });
  };

  // 4. Assign Maintenance Staff / Team
  const assignIssueTeam = (id, teamName, staffName = '') => {
    setIssues((prev) => prev.map((issue) => {
      if (issue.id !== id) return issue;

      const dateStr = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const updatedTimeline = [...(issue.timeline || [])];
      
      if (!updatedTimeline.some(t => t.step === 'Acknowledged')) {
        updatedTimeline.push({ step: 'Acknowledged', date: dateStr, note: 'Reviewed by Management Office' });
      }
      
      updatedTimeline.push({
        step: 'Assigned',
        date: dateStr,
        note: `Assigned to ${teamName} ${staffName ? `(${staffName})` : ''}`
      });

      return {
        ...issue,
        assignedTeam: teamName,
        assignedStaff: staffName || teamName,
        timeline: updatedTimeline
      };
    }));

    addActivity({
      title: 'Team Assigned',
      user: 'Management',
      desc: `Assigned ${id} to ${teamName}`,
      time: 'Just now'
    });
  };

  // 5. Delete Issue
  const deleteIssue = (id) => {
    setIssues(prev => prev.filter(i => i.id !== id));
    addActivity({
      title: 'Issue Removed',
      user: 'Management',
      desc: `Archived complaint ${id}`,
      time: 'Just now'
    });
  };

  // 6. User Directory Management
  const addStudent = (studentData) => {
    const newStudent = {
      id: `CF-STU-${2031 + students.length}`,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + students.length}?w=150&auto=format&fit=crop&q=80`,
      reportsCount: 0,
      status: 'Active',
      ...studentData
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const addFaculty = (facultyData) => {
    const newFaculty = {
      id: `CF-FAC-${1090 + faculty.length}`,
      avatar: `https://images.unsplash.com/photo-${1507003211169 + faculty.length}?w=150&auto=format&fit=crop&q=80`,
      reportsCount: 0,
      status: 'Active',
      ...facultyData
    };
    setFaculty(prev => [...prev, newFaculty]);
    return newFaculty;
  };

  // Backwards compatibility for signup page addEmployee call
  const addEmployee = (payload) => {
    if (payload.role === 'faculty') {
      return addFaculty(payload);
    } else {
      return addStudent(payload);
    }
  };

  // Reset to default dataset for demo reset
  const resetToDefaultData = () => {
    localStorage.removeItem('campusfix_issues');
    localStorage.removeItem('campusfix_students');
    localStorage.removeItem('campusfix_faculty');
    localStorage.removeItem('campusfix_notifications');
    setIssues(INITIAL_ISSUES);
    setStudents(INITIAL_STUDENTS);
    setFaculty(INITIAL_FACULTY);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <DataContext.Provider value={{
      issues,
      students,
      faculty,
      teams,
      notifications,
      activities,
      employees,
      reportIssue,
      updateIssueStatus,
      updateIssue,
      assignIssueTeam,
      deleteIssue,
      addStudent,
      addFaculty,
      addEmployee,
      addActivity,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      resetToDefaultData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
