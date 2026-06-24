import { brand } from '@configs/themeConfig'
import { NavItem, UserType } from '@/types/login/userTypes'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: 'ri-home-5-line', href: '#' },
  { label: 'Programs', icon: 'ri-book-open-line', href: '#' },
  { label: 'Contact Us', icon: 'ri-phone-line', href: '#' },
  { label: 'Help Desk', icon: 'ri-customer-service-2-line', href: '#' },
]

export const USER_TYPES: UserType[] = [
  {
    id: 'student',
    label: 'Student',
    icon: 'ri-graduation-cap-line',
    redirect: '/student/dashboard',
  },
  {
    id: 'college',
    label: 'College',
    icon: 'ri-building-line',
    redirect: '/college/dashboard',
  },
  {
    id: 'university',
    label: 'University',
    icon: 'ri-bank-line',
    redirect: '/university/dashboard',
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'ri-group-line',
    redirect: '/dashboard',
  },
]

export const INSTRUCTIONS: string[] = [
  'Select your user type.',
  'Enter your User ID and Password.',
  'Enter the Captcha code as shown.',
  'Click on Login to access your account.',
]

export const CAPTCHA_CHARS =
  'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export const COLORS = {
  teal:      brand.primary,
  tealLight: brand.primarySubtle,
  tealHover: brand.primaryDark,
  navy:      brand.navy,
  cream:     '#F2EFE7',
  border:    brand.border,
} as const