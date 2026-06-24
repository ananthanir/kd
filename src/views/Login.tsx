'use client'

import { useState } from 'react'
import NavBar from './login/NavBar'
import UserTypeSelector from './login/UserTypeSelector'
import LoginForm from './login/LoginForm'
import Footer from './login/Footer'
import UniversityBranding from './login/UniversityBranding'
import { Mode } from '@/@core/types'
import { useSettings } from '@/@core/hooks/useSettings'
import classNames from 'classnames'

type Props = {
  mode: Mode
}

const LoginV2 = ({ mode }: Props) => {
  const [selectedUserType, setSelectedUserType] = useState<string>('student')
  const isDark = mode === 'dark'
  const { settings } = useSettings()

  return (
    <div
      className={classNames(
        'min-h-screen flex flex-col gap-4 px-4 py-5 lg:h-screen lg:overflow-hidden lg:px-6',
        {
          'bg-kuhs-bg text-kuhs-navy': !isDark,
          'bg-kuhs-bg-dark text-white': isDark
        }
      )}
    >
      {/* 1. Navigation */}
      <NavBar />

      {/* 2. University Branding */}
      <UniversityBranding />

      {/* 3. Main Card */}
      <div className='w-full max-w-6xl mx-auto lg:flex-1 lg:min-h-0'>

        {/* Desktop: two-column grid inside card */}
        <div className='hidden lg:block h-full bg-white rounded-4xl shadow-lg border border-kuhs-border p-6'>
          <div className='grid grid-cols-2 gap-8 h-full'>
            <UserTypeSelector
              selected={selectedUserType}
              onChange={setSelectedUserType}
            />
            <div className='relative'>
              <div className='absolute -left-4 top-0 bottom-0 w-px bg-kuhs-border' />
              <LoginForm userType={selectedUserType} />
            </div>
          </div>
        </div>

        {/* Mobile: single card with form only (user type as dropdown inside form) */}
        <div className='lg:hidden bg-white rounded-4xl shadow-lg border border-kuhs-border p-5'>
          <LoginForm
            userType={selectedUserType}
            onUserTypeChange={setSelectedUserType}
            mobileMode
          />
        </div>

      </div>

      {/* 4. Footer */}
      <Footer />

    </div>
  )
}

export default LoginV2
