export type NavItem = {
  label: string
  icon: string
  href: string
}

export type UserTypeId = 'student' | 'college' | 'university' | 'other'

export type UserType = {
  id: UserTypeId
  label: string
  icon: string
  redirect?: string
}