'use client'

// Component Imports
import UniversityNavigation from './Navigation'
import UniversityNavbarContent from './NavbarContent'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

const UniversityHeader = () => {
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <>
      <LayoutHeader>
        <Navbar>
          <UniversityNavbarContent />
        </Navbar>
        {!isBreakpointReached && <UniversityNavigation />}
      </LayoutHeader>
      {isBreakpointReached && <UniversityNavigation />}
    </>
  )
}

export default UniversityHeader
