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
        // ── Example of a 3-level nested SubMenu ──
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
        href: '/college/academic/timetable',
      },
      {
        label: 'Departments',
        icon: 'ri-building-4-line',
        href: '/college/academic/departments',
      },
    ],
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'ri-graduation-cap-line',
    subItems: [
      { label: 'Admissions', icon: 'ri-user-add-line',       href: '/college/students/admissions' },
      { label: 'Attendance', icon: 'ri-checkbox-circle-line', href: '/college/students/attendance' },
      { label: 'Records',    icon: 'ri-file-user-line',       href: '/college/students/records' },
    ],
  },
  {
    id: 'examinations',
    label: 'Examinations',
    icon: 'ri-pencil-ruler-2-line',
    subItems: [
      { label: 'Schedule',     icon: 'ri-calendar-2-line',      href: '/college/examinations/schedule' },
      { label: 'Results',      icon: 'ri-bar-chart-box-line',   href: '/college/examinations/results' },
      { label: 'Hall Tickets', icon: 'ri-ticket-line',          href: '/college/examinations/hall-tickets' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'ri-money-rupee-circle-line',
    subItems: [
      { label: 'Fee Structure', icon: 'ri-price-tag-3-line', href: '/college/finance/fee-structure' },
      { label: 'Payments',      icon: 'ri-bank-card-line',   href: '/college/finance/payments' },
      { label: 'Receipts',      icon: 'ri-receipt-line',     href: '/college/finance/receipts' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'ri-line-chart-line',
    subItems: [
      { label: 'Attendance Report', icon: 'ri-pie-chart-line',         href: '/college/reports/attendance' },
      { label: 'Analytics',         icon: 'ri-bar-chart-grouped-line', href: '/college/reports/analytics' },
    ],
  },
]

export default collegeMenuData
