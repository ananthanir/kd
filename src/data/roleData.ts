export type Role = {
  id: string
  label: string
  icon: string
}

export const collegeRoles: Role[] = [
  { id: 'principal',  label: 'Principal',    icon: 'ri-user-star-line' },
  { id: 'hod',        label: 'HOD',          icon: 'ri-team-line' },
  { id: 'faculty',    label: 'Faculty',       icon: 'ri-user-3-line' },
  { id: 'admin',      label: 'College Admin', icon: 'ri-settings-3-line' },
]

export const universityRoles: Role[] = [
  { id: 'registrar',  label: 'Registrar',                  icon: 'ri-user-star-line' },
  { id: 'controller', label: 'Controller of Examinations', icon: 'ri-shield-user-line' },
  { id: 'finance',    label: 'Finance Officer',             icon: 'ri-money-rupee-circle-line' },
  { id: 'academic',   label: 'Academic Director',           icon: 'ri-book-2-line' },
]
