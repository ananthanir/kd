'use client'

import classnames from 'classnames'

import NavToggle from '@components/layout/horizontal/NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import RoleSwitcher from '@components/RoleSwitcher'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import { universityRoles } from '@/data/roleData'

const UniversityNavbarContent = () => {
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
      </div>
      <div className='flex items-center gap-3'>
        {/* Role switcher — only visible on desktop to avoid clutter on mobile */}
        {!isBreakpointReached && (
          <RoleSwitcher roles={universityRoles} defaultRoleId='registrar' />
        )}
        <ModeDropdown />
        <UserDropdown />
      </div>
    </div>
  )
}

export default UniversityNavbarContent
