export type CollegeLeafItem = {
  label: string
  href: string
  icon: string
}

export type CollegeSubMenuItem = {
  label: string
  icon: string
  href?: string            // present when the item itself is a link (no children)
  children?: CollegeLeafItem[]  // present when the item is a sub-menu group
}

export type CollegeMenuItem = {
  id: string
  label: string
  icon: string
  subItems: CollegeSubMenuItem[]
}

const collegeMenuData: CollegeMenuItem[] = [
  {
    id: 'academic',
    label: 'Academic',
    icon: 'ri-book-2-line',
    subItems: [
      {
        label: 'Course Offer',
        icon: 'ri-file-list-3-line',
        children: [
          { label: 'Add Course',         href: '/college/academic/course-offer/add',      icon: 'ri-add-circle-line' },
          { label: 'Course List',        href: '/college/academic/course-offer/list',     icon: 'ri-list-check-3' },
          { label: 'Pending Approvals',  href: '/college/academic/course-offer/pending',  icon: 'ri-time-line' },
        ],
      },
      {
        label: 'Timetable',
        icon: 'ri-calendar-schedule-line',
        children: [
          { label: 'View Timetable',   href: '/college/academic/timetable/view',   icon: 'ri-eye-line' },
          { label: 'Manage Schedule',  href: '/college/academic/timetable/manage', icon: 'ri-edit-line' },
        ],
      },
      {
        label: 'Departments',
        icon: 'ri-building-4-line',
        children: [
          { label: 'Department List', href: '/college/academic/departments/list', icon: 'ri-list-unordered' },
          { label: 'Add Department',  href: '/college/academic/departments/add',  icon: 'ri-add-circle-line' },
        ],
      },
    ],
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'ri-graduation-cap-line',
    subItems: [
      {
        label: 'Admissions',
        icon: 'ri-user-add-line',
        children: [
          { label: 'New Applications',  href: '/college/students/admissions/applications', icon: 'ri-file-add-line' },
          { label: 'Enrolled Students', href: '/college/students/admissions/enrolled',     icon: 'ri-user-check-line' },
          { label: 'Transfer Requests', href: '/college/students/admissions/transfers',    icon: 'ri-exchange-line' },
        ],
      },
      {
        label: 'Attendance',
        icon: 'ri-checkbox-circle-line',
        children: [
          { label: 'Daily Attendance',  href: '/college/students/attendance/daily',   icon: 'ri-calendar-check-line' },
          { label: 'Monthly Report',    href: '/college/students/attendance/monthly', icon: 'ri-bar-chart-2-line' },
        ],
      },
      {
        label: 'Records',
        icon: 'ri-file-user-line',
        children: [
          { label: 'Student Profile', href: '/college/students/records/profile',   icon: 'ri-user-3-line' },
          { label: 'Documents',       href: '/college/students/records/documents', icon: 'ri-folder-line' },
        ],
      },
    ],
  },
  {
    id: 'examinations',
    label: 'Examinations',
    icon: 'ri-pencil-ruler-2-line',
    subItems: [
      {
        label: 'Schedule',
        icon: 'ri-calendar-2-line',
        children: [
          { label: 'Upcoming Exams',  href: '/college/examinations/schedule/upcoming', icon: 'ri-calendar-event-line' },
          { label: 'Past Schedules',  href: '/college/examinations/schedule/past',     icon: 'ri-history-line' },
        ],
      },
      {
        label: 'Results',
        icon: 'ri-bar-chart-box-line',
        children: [
          { label: 'Published Results', href: '/college/examinations/results/published', icon: 'ri-trophy-line' },
          { label: 'Upload Results',    href: '/college/examinations/results/upload',    icon: 'ri-upload-line' },
        ],
      },
      {
        label: 'Hall Tickets',
        icon: 'ri-ticket-line',
        children: [
          { label: 'Generate', href: '/college/examinations/hall-tickets/generate', icon: 'ri-file-add-line' },
          { label: 'Download', href: '/college/examinations/hall-tickets/download', icon: 'ri-download-line' },
        ],
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'ri-money-rupee-circle-line',
    subItems: [
      {
        label: 'Fee Structure',
        icon: 'ri-price-tag-3-line',
        children: [
          { label: 'View Structure', href: '/college/finance/fee-structure/view', icon: 'ri-eye-line' },
          { label: 'Edit Structure', href: '/college/finance/fee-structure/edit', icon: 'ri-edit-line' },
        ],
      },
      {
        label: 'Payments',
        icon: 'ri-bank-card-line',
        children: [
          { label: 'Collect Payment',  href: '/college/finance/payments/collect', icon: 'ri-hand-coin-line' },
          { label: 'Payment History',  href: '/college/finance/payments/history', icon: 'ri-history-line' },
        ],
      },
      {
        label: 'Receipts',
        icon: 'ri-receipt-line',
        children: [
          { label: 'Generate Receipt', href: '/college/finance/receipts/generate', icon: 'ri-file-add-line' },
          { label: 'Receipt History',  href: '/college/finance/receipts/history',  icon: 'ri-history-line' },
        ],
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'ri-line-chart-line',
    subItems: [
      {
        label: 'Attendance Report',
        icon: 'ri-pie-chart-line',
        children: [
          { label: 'Daily',   href: '/college/reports/attendance/daily',   icon: 'ri-calendar-day-view' },
          { label: 'Monthly', href: '/college/reports/attendance/monthly', icon: 'ri-calendar-view' },
          { label: 'Annual',  href: '/college/reports/attendance/annual',  icon: 'ri-calendar-line' },
        ],
      },
      {
        label: 'Analytics',
        icon: 'ri-bar-chart-grouped-line',
        children: [
          { label: 'Student Analytics',   href: '/college/reports/analytics/student',   icon: 'ri-user-chart-line' },
          { label: 'Financial Analytics', href: '/college/reports/analytics/financial', icon: 'ri-funds-line' },
        ],
      },
    ],
  },
]

export default collegeMenuData
