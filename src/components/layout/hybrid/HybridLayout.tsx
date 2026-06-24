'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { useMedia } from 'react-use'
import PerfectScrollbar from 'react-perfect-scrollbar'

// @menu — same components as student vertical layout
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Shared header widgets
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import VerticalFooter from '@components/layout/vertical/Footer'
import RoleSwitcher from '@components/RoleSwitcher'
import MobileMenu from './MobileMenu'

import collegeMenuData, { type CollegeMenuItem } from '@/data/navigation/collegeMenuData'
import { collegeRoles } from '@/data/roleData'

type Props = {
  children: React.ReactNode
}

// Shared height for the horizontal nav bar AND the sidebar section header — keeps them on the same line
const NAV_BAR_H = 48
const SIDEBAR_OPEN_W = 260
const SIDEBAR_CLOSED_W = 52

const HybridLayout = ({ children }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { isBreakpointReached, collapseVerticalNav, hoverVerticalNav } = verticalNavOptions

  // lg breakpoint matches @menu and Tailwind — below 1200px = mobile
  const isMobile = useMedia('(max-width: 1199px)', false)

  const [activeMenu, setActiveMenu] = useState<CollegeMenuItem>(collegeMenuData[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isHoveringCollapsed, setIsHoveringCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const effectiveExpanded = sidebarOpen || isHoveringCollapsed

  useEffect(() => {
    collapseVerticalNav(!sidebarOpen)
    if (sidebarOpen) {
      setIsHoveringCollapsed(false)
      hoverVerticalNav(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOpen])

  const handleTopItemClick = (item: CollegeMenuItem) => {
    if (activeMenu?.id === item.id) {
      setSidebarOpen(o => !o)
    } else {
      setActiveMenu(item)
      setSidebarOpen(true)
    }
  }

  const handleSidebarMouseEnter = () => {
    if (!sidebarOpen) {
      setIsHoveringCollapsed(true)
      hoverVerticalNav(true)
    }
  }

  const handleSidebarMouseLeave = () => {
    if (!sidebarOpen) {
      setIsHoveringCollapsed(false)
      hoverVerticalNav(false)
    }
  }

  // On mobile, use plain div so PerfectScrollbar doesn't break in a Drawer
  const ScrollWrapper = (isBreakpointReached || isMobile) ? 'div' : PerfectScrollbar

  return (
    <div className='flex flex-col h-screen' style={{ backgroundColor: 'var(--mui-palette-background-default)' }}>

      {/* ══════════════════════════════════════════════════════
          TOP HEADER — logo · role switcher · mode · user
          On mobile: shows hamburger instead of logo-only
          ══════════════════════════════════════════════════════ */}
      <header
        className='flex items-center gap-3 px-4 shrink-0'
        style={{
          height: 56,
          backgroundColor: 'var(--mui-palette-background-paper)',
          borderBottom: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-customShadows-sm)',
          zIndex: 20,
          position: 'relative'
        }}
      >
        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(true)}
            aria-label='Open menu'
            className='flex items-center justify-center rounded-lg transition-colors shrink-0'
            style={{ width: 36, height: 36, color: 'var(--mui-palette-text-secondary)' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--mui-palette-action-hover)'
              e.currentTarget.style.color = 'var(--mui-palette-primary-main)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--mui-palette-text-secondary)'
            }}
          >
            <i className='ri-menu-2-line text-xl' aria-hidden='true' />
          </button>
        )}

        {/* Logo + portal name */}
        <Image
          src='/images/logos/kuhs-logo.png'
          alt='KUHS'
          width={32}
          height={32}
          className='object-contain shrink-0'
          priority
        />
        <div className='hidden sm:block leading-none shrink-0'>
          <p className='text-[12px] font-extrabold m-0 leading-tight' style={{ color: 'var(--mui-palette-text-primary)' }}>
            KUHS ERP
          </p>
          <p className='text-[10px] m-0 leading-tight' style={{ color: 'var(--mui-palette-text-secondary)' }}>
            College Portal
          </p>
        </div>

        <div className='flex-1' />

        {/* Role switcher — desktop only */}
        {!isMobile && (
          <RoleSwitcher roles={collegeRoles} defaultRoleId='principal' />
        )}

        <ModeDropdown />
        <UserDropdown />
      </header>

      {/* Mobile drawer — full vertical accordion of all college menus */}
      <MobileMenu open={isMobile && mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════════════════════════════════════════════════
          BODY — hidden on mobile (mobile uses the Drawer above)
          ══════════════════════════════════════════════════════ */}
      {!isMobile && (
        <div className='flex flex-1 overflow-hidden' style={{ position: 'relative' }}>

          {/* ── VERTICAL SIDEBAR — single element, width animates smoothly ── */}
          <aside
            className='flex flex-col shrink-0'
            onMouseEnter={handleSidebarMouseEnter}
            onMouseLeave={handleSidebarMouseLeave}
            style={{
              width: effectiveExpanded ? SIDEBAR_OPEN_W : SIDEBAR_CLOSED_W,
              minWidth: SIDEBAR_CLOSED_W,
              overflow: 'hidden',
              transition: 'width 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
              backgroundColor: 'var(--mui-palette-background-paper)',
              borderRight: '1px solid var(--mui-palette-divider)',
              // Overlay when hover-expanded so right panel doesn't shift
              position: isHoveringCollapsed ? 'absolute' : 'relative',
              height: isHoveringCollapsed ? '100%' : 'auto',
              zIndex: isHoveringCollapsed ? 10 : 'auto',
              boxShadow: isHoveringCollapsed ? 'var(--mui-customShadows-lg)' : 'none'
            }}
          >
            {/* Section header — same height as horizontal nav bar for alignment (feature 3) */}
            <div
              className='flex items-center shrink-0'
              style={{
                height: NAV_BAR_H,
                paddingInline: `${(SIDEBAR_CLOSED_W - 36) / 2}px 8px`,
                gap: '12px',
                borderBottom: '1px solid var(--mui-palette-divider)',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {/* Section icon — always visible */}
              <i
                className={activeMenu?.icon}
                style={{ fontSize: '1.375rem', color: 'var(--mui-palette-primary-main)', flexShrink: 0 }}
                aria-hidden='true'
              />

              {/* Section label — fades in when expanded; styled like @menu section labels */}
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--mui-palette-text-primary)',
                  flex: 1,
                  overflow: 'hidden',
                  opacity: effectiveExpanded ? 1 : 0,
                  maxWidth: effectiveExpanded ? 200 : 0,
                  transition: 'opacity 0.15s ease, max-width 0.25s ease-in-out'
                }}
              >
                {activeMenu?.label}
              </span>

              {/* Collapse / expand toggle */}
              <button
                onClick={() => setSidebarOpen(o => !o)}
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                className='flex items-center justify-center rounded-md transition-colors shrink-0'
                style={{
                  width: 28,
                  height: 28,
                  color: 'var(--mui-palette-text-disabled)',
                  opacity: effectiveExpanded ? 1 : 0,
                  pointerEvents: effectiveExpanded ? 'auto' : 'none',
                  transition: 'opacity 0.15s ease, color 0.15s, background-color 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--mui-palette-action-hover)'
                  e.currentTarget.style.color = 'var(--mui-palette-primary-main)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--mui-palette-text-disabled)'
                }}
              >
                <i
                  style={{ fontSize: '1.375rem' }}
                  className={sidebarOpen ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'}
                  aria-hidden='true'
                />
              </button>
            </div>

            {/* Sub-menu items — @menu Menu + MenuItem, same component stack as student VerticalMenu */}
            <ScrollWrapper
              {...((isBreakpointReached || isMobile)
                ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
                : { options: { wheelPropagation: false, suppressScrollX: true } })}
            >
              <Menu
                menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
                menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
              >
                {activeMenu?.subItems.map(sub =>
                  sub.children && sub.children.length > 0 ? (
                    // Sub-item with nested children → render as collapsible SubMenu
                    <SubMenu key={sub.label} label={sub.label} icon={<i className={sub.icon} />}>
                      {sub.children.map(child => (
                        <MenuItem key={child.href} href={child.href} icon={<i className={child.icon} style={{ fontSize: '1.125rem' }} />}>
                          {child.label}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    // Leaf sub-item → plain MenuItem
                    <MenuItem key={sub.href} href={sub.href} icon={<i className={sub.icon} />}>
                      {sub.label}
                    </MenuItem>
                  )
                )}
              </Menu>
            </ScrollWrapper>
          </aside>

          {/* ── RIGHT PANEL: horizontal nav bar (aligned with sidebar header) + content + footer ── */}
          <div className='flex flex-col flex-1 overflow-hidden'>

            {/* Horizontal menu bar — NAV_BAR_H matches sidebar header height (feature 3) */}
            <div
              className='flex items-center gap-1 px-4 shrink-0 overflow-x-auto no-scrollbar'
              style={{
                height: NAV_BAR_H,
                backgroundColor: 'var(--mui-palette-background-paper)',
                borderBottom: '1px solid var(--mui-palette-divider)'
              }}
            >
              {collegeMenuData.map(item => {
                const isActive = activeMenu?.id === item.id && sidebarOpen
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTopItemClick(item)}
                    className='flex items-center whitespace-nowrap shrink-0 transition-all'
                    style={{
                      paddingInline: '12px',
                      paddingBlock: '6px',
                      gap: '8px',
                      borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      backgroundColor: isActive ? 'var(--mui-palette-primary-main)' : 'transparent',
                      color: isActive
                        ? 'var(--mui-palette-primary-contrastText)'
                        : 'var(--mui-palette-text-primary)',
                      boxShadow: isActive ? 'var(--mui-customShadows-xs)' : 'none'
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--mui-palette-action-hover)'
                        e.currentTarget.style.color = 'var(--mui-palette-primary-main)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--mui-palette-text-primary)'
                      }
                    }}
                  >
                    <i className={item.icon} style={{ fontSize: '1.375rem' }} aria-hidden='true' />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Page content */}
            <main className='flex-1 overflow-auto p-6'>
              {children}
            </main>

            {/* Footer — same as student / university dashboards */}
            <VerticalFooter />
          </div>

        </div>
      )}

      {/* Mobile content — sidebar and horizontal nav are replaced by the Drawer above */}
      {isMobile && (
        <main className='flex-1 overflow-auto p-4'>
          {children}
        </main>
      )}

    </div>
  )
}

export default HybridLayout
