/* ─── Shared Data ─── */

export const allRecruiters = [
  { initials: 'EJ', name: 'Emily Johnson',   email: 'emily.johnson@company.com',   dept: 'Engineering', jobs: 8, candidates: 234, status: 'Active',   bg: 'bg-violet-600' },
  { initials: 'MC', name: 'Michael Chen',    email: 'michael.chen@company.com',    dept: 'Product',     jobs: 5, candidates: 167, status: 'Active',   bg: 'bg-violet-500' },
  { initials: 'SW', name: 'Sarah Williams',  email: 'sarah.williams@company.com',  dept: 'Design',      jobs: 3, candidates: 89,  status: 'Active',   bg: 'bg-violet-400' },
  { initials: 'DM', name: 'David Martinez',  email: 'david.martinez@company.com',  dept: 'Marketing',   jobs: 6, candidates: 201, status: 'Active',   bg: 'bg-violet-600' },
  { initials: 'JB', name: 'Jessica Brown',   email: 'jessica.brown@company.com',   dept: 'Sales',       jobs: 4, candidates: 145, status: 'Inactive', bg: 'bg-violet-500' },
  { initials: 'RT', name: 'Robert Taylor',   email: 'robert.taylor@company.com',   dept: 'Engineering', jobs: 7, candidates: 198, status: 'Active',   bg: 'bg-violet-600' },
  { initials: 'AL', name: 'Amanda Lee',      email: 'amanda.lee@company.com',      dept: 'Product',     jobs: 2, candidates: 76,  status: 'Inactive', bg: 'bg-violet-400' },
  { initials: 'JW', name: 'James Wilson',    email: 'james.wilson@company.com',    dept: 'Design',      jobs: 5, candidates: 132, status: 'Active',   bg: 'bg-violet-500' },
  { initials: 'KP', name: 'Karen Patel',     email: 'karen.patel@company.com',     dept: 'HR',          jobs: 3, candidates: 95,  status: 'Active',   bg: 'bg-violet-600' },
  { initials: 'TN', name: 'Tom Nguyen',      email: 'tom.nguyen@company.com',      dept: 'Marketing',   jobs: 4, candidates: 112, status: 'Active',   bg: 'bg-violet-400' },
];

export const statsData = [
  { label: 'Total Recruiters',        value: '24',    change: '+12%', positive: true,  Icon: 'Users' },
  { label: 'Total Candidates',        value: '1,847', change: '+23%', positive: true,  Icon: 'UserCheck' },
  { label: 'Active Job Descriptions', value: '38',    change: '-5%',  positive: false, Icon: 'Briefcase' },
  { label: 'Interviews Scheduled',    value: '156',   change: '+18%', positive: true,  Icon: 'Calendar' },
];

export const pipelineData = [
  { month: 'Jan', Candidates: 150, Hired: 10 },
  { month: 'Feb', Candidates: 200, Hired: 15 },
  { month: 'Mar', Candidates: 300, Hired: 15 },
  { month: 'Apr', Candidates: 320, Hired: 20 },
  { month: 'May', Candidates: 380, Hired: 25 },
  { month: 'Jun', Candidates: 350, Hired: 20 },
];

export const statusData = [
  { name: 'Screening', value: 412, color: '#7C3AED' },
  { name: 'Interview', value: 234, color: '#A78BFA' },
  { name: 'Offer',     value: 89,  color: '#C4B5FD' },
  { name: 'Hired',     value: 145, color: '#EDE9FE' },
];

export const departments = ['Engineering','Product','Design','Marketing','HR','Finance','Operations','Sales'];

export const recruiterRoles = ['Senior Recruiter','Junior Recruiter','Lead Recruiter','Technical Recruiter','HR Specialist'];

// Analytics page data
export const analyticKpis = [
  { label: 'Total recruiters',   value: '42',    sub: 'Active on platform' },
  { label: 'Total JDs',          value: '128',   sub: 'Job descriptions' },
  { label: 'Total candidates',   value: '3,840', sub: 'Profiles indexed' },
  { label: 'Total applications', value: '5,210', sub: 'Received overall' },
  { label: 'Total shortlisted',  value: '1,045', sub: '20% of applications' },
  { label: 'Total interviews',   value: '620',   sub: 'Scheduled' },
  { label: 'Total selected',     value: '120',   sub: 'Offers extended' },
  { label: 'Total rejected',     value: '780',   sub: 'Not progressed' },
  { label: 'Selection rate',     value: '12%',   sub: 'Hiring success' },
  { label: 'Avg AI score',       value: '82%',   sub: 'Match quality' },
];

export const analyticPipelineData = [
  { stage: 'Applied',     count: 5210 },
  { stage: 'Screening',   count: 3200 },
  { stage: 'Shortlisted', count: 1045 },
  { stage: 'Interview',   count: 620 },
  { stage: 'Offered',     count: 130 },
  { stage: 'Selected',    count: 120 },
];

export const analyticAppStatusData = [
  { name: 'Screening',   value: 40, color: '#6366f1' },
  { name: 'Shortlisted', value: 20, color: '#f59e0b' },
  { name: 'Interview',   value: 12, color: '#10b981' },
  { name: 'Rejected',    value: 10, color: '#ef4444' },
  { name: 'Selected',    value: 8,  color: '#3b82f6' },
  { name: 'Review',      value: 10, color: '#8b5cf6' },
];

export const analyticHiringTrendData = [
  { month: 'Jan', Applications: 400,  Selections: 30 },
  { month: 'Feb', Applications: 600,  Selections: 45 },
  { month: 'Mar', Applications: 800,  Selections: 55 },
  { month: 'Apr', Applications: 1000, Selections: 70 },
  { month: 'May', Applications: 1300, Selections: 90 },
  { month: 'Jun', Applications: 1450, Selections: 110 },
];

export const analyticSelRejData = [
  { month: 'Jan', Selected: 30,  Rejected: 80 },
  { month: 'Feb', Selected: 45,  Rejected: 120 },
  { month: 'Mar', Selected: 55,  Rejected: 150 },
  { month: 'Apr', Selected: 70,  Rejected: 130 },
  { month: 'May', Selected: 90,  Rejected: 160 },
  { month: 'Jun', Selected: 110, Rejected: 140 },
];

export const analyticSkillData = [
  { skill: 'SQL',        count: 210 },
  { skill: 'Python',     count: 190 },
  { skill: 'Java',       count: 160 },
  { skill: 'React',      count: 145 },
  { skill: 'AWS',        count: 120 },
  { skill: 'Docker',     count: 100 },
];

export const analyticRecruiterPerfData = [
  { name: 'Pooja',  count: 320 },
  { name: 'Arjun',  count: 280 },
  { name: 'Sneha',  count: 300 },
  { name: 'Rahul',  count: 260 },
  { name: 'Kavya',  count: 240 },
];

export const analyticAiScoreData = [
  { range: '50-55', count: 120 },
  { range: '55-60', count: 200 },
  { range: '60-65', count: 340 },
  { range: '65-70', count: 480 },
  { range: '70-75', count: 620 },
  { range: '75-80', count: 700 },
  { range: '80-85', count: 580 },
  { range: '85-90', count: 380 },
  { range: '90-95', count: 220 },
  { range: '95-100',count: 80  },
];

export const analyticConversionData = [
  { name: 'Pooja',  rate: 18 },
  { name: 'Sneha',  rate: 15 },
  { name: 'Kavya',  rate: 13 },
  { name: 'Arjun',  rate: 11 },
  { name: 'Rahul',  rate: 9  },
];

export const analyticJdPerfData = [
  { jd: 'Java developer',   count: 145 },
  { jd: 'Data analyst',     count: 128 },
  { jd: 'React developer',  count: 110 },
  { jd: 'Business analyst', count: 95  },
  { jd: 'DevOps engineer',  count: 80  },
];

export const analyticMonthlyRecruiterData = [
  { name: 'Pooja',  count: 45 },
  { name: 'Sneha',  count: 38 },
  { name: 'Arjun',  count: 42 },
  { name: 'Kavya',  count: 30 },
  { name: 'Rahul',  count: 35 },
];

export const analyticCandidateRecords = [
  { id:1, name:'Ravi Kumar',  recruiter:'Pooja', jd:'Java developer',   date:'2024-05-01', status:'Selected',    score:94, statusColor:'bg-blue-500' },
  { id:2, name:'Ananya S',    recruiter:'Arjun', jd:'Data analyst',     date:'2024-05-03', status:'Shortlisted', score:87, statusColor:'bg-amber-400' },
  { id:3, name:'Kiran M',     recruiter:'Sneha', jd:'React developer',  date:'2024-05-04', status:'Selected',    score:92, statusColor:'bg-blue-500' },
  { id:4, name:'Deepa R',     recruiter:'Pooja', jd:'DevOps engineer',  date:'2024-05-05', status:'Under review',score:78, statusColor:'bg-orange-400' },
  { id:5, name:'Vikram N',    recruiter:'Kavya', jd:'Java developer',   date:'2024-05-06', status:'Rejected',    score:55, statusColor:'bg-red-500' },
  { id:6, name:'Priya T',     recruiter:'Rahul', jd:'Business analyst', date:'2024-05-07', status:'Shortlisted', score:83, statusColor:'bg-amber-400' },
];

export const navItems = [
  { label: 'Dashboard',          icon: 'LayoutDashboard' },
  { label: 'Recruiters',         icon: 'Users' },
  { label: 'Platform Analytics', icon: 'BarChart3' },
  { label: 'Settings',           icon: 'Settings' },
];
