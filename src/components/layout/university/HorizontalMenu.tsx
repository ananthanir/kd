'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from '@components/layout/horizontal/VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='ri-arrow-right-s-line' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const UniversityHorizontalMenu = () => {
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuItemStyles={menuItemStyles(theme, 'ri-circle-fill')}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 4 : 14),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='ri-circle-fill' /> }
        }}
      >
        {/* Dashboard — no sub-menu */}
        <MenuItem href='/university/dashboard' icon={<i className='ri-home-smile-line' />}>
          Dashboard
        </MenuItem>

        {/* Colleges */}
        <SubMenu label='Colleges' icon={<i className='ri-building-line' />}>
          <MenuItem href='/university/colleges/affiliated' icon={<i className='ri-building-2-line' />}>
            Affiliated Colleges
          </MenuItem>
          <MenuItem href='/university/colleges/approvals' icon={<i className='ri-checkbox-circle-line' />}>
            Pending Approvals
          </MenuItem>
          <MenuItem href='/university/colleges/registration' icon={<i className='ri-file-add-line' />}>
            College Registration
          </MenuItem>
        </SubMenu>

        {/* Programs */}
        <SubMenu label='Programs' icon={<i className='ri-book-2-line' />}>
          <MenuItem href='/university/programs/ug' icon={<i className='ri-graduation-cap-line' />}>
            UG Programs
          </MenuItem>
          <MenuItem href='/university/programs/pg' icon={<i className='ri-graduation-cap-line' />}>
            PG Programs
          </MenuItem>
          <MenuItem href='/university/programs/phd' icon={<i className='ri-microscope-line' />}>
            PhD Programs
          </MenuItem>
          <MenuItem href='/university/programs/approvals' icon={<i className='ri-shield-check-line' />}>
            Program Approvals
          </MenuItem>
        </SubMenu>

        {/* Examinations */}
        <SubMenu label='Examinations' icon={<i className='ri-pencil-ruler-2-line' />}>
          <MenuItem href='/university/examinations/schedule' icon={<i className='ri-calendar-2-line' />}>
            Exam Schedule
          </MenuItem>
          <MenuItem href='/university/examinations/hall-tickets' icon={<i className='ri-ticket-line' />}>
            Hall Tickets
          </MenuItem>
          <MenuItem href='/university/examinations/results' icon={<i className='ri-bar-chart-box-line' />}>
            Results
          </MenuItem>
          <MenuItem href='/university/examinations/revaluation' icon={<i className='ri-refresh-line' />}>
            Re-valuation
          </MenuItem>
        </SubMenu>

        {/* Reports */}
        <SubMenu label='Reports' icon={<i className='ri-line-chart-line' />}>
          <MenuItem href='/university/reports/attendance' icon={<i className='ri-pie-chart-line' />}>
            Attendance Reports
          </MenuItem>
          <MenuItem href='/university/reports/academic' icon={<i className='ri-book-open-line' />}>
            Academic Reports
          </MenuItem>
          <MenuItem href='/university/reports/financial' icon={<i className='ri-money-rupee-circle-line' />}>
            Financial Reports
          </MenuItem>
          <MenuItem href='/university/reports/analytics' icon={<i className='ri-bar-chart-grouped-line' />}>
            Analytics
          </MenuItem>
        </SubMenu>
      </Menu>
    </HorizontalNav>
  )
}

export default UniversityHorizontalMenu
