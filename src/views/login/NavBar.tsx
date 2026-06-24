// views/login/NavBar.tsx

'use client'

import { NAV_ITEMS } from '@/constants/login/userTypesConstants'
import { useState } from 'react'


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='w-full max-w-6xl mx-auto relative'>
      {/* Desktop nav */}
      <nav className='hidden lg:flex items-center justify-center bg-white rounded-[20px] shadow-md px-8 h-14 border border-kuhs-border/60'>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className={[
              'flex items-center gap-2 px-8 h-9 no-underline hover:opacity-75 transition-opacity',
              i < NAV_ITEMS.length - 1 ? 'border-r border-kuhs-border' : '',
            ].join(' ')}
          >
            <i className={`${item.icon} text-kuhs-primary text-lg`} aria-hidden='true' />
            <span className='text-sm font-semibold text-kuhs-navy whitespace-nowrap'>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Mobile nav */}
      <div className='lg:hidden bg-white rounded-[20px] shadow-md border border-kuhs-border/60'>
        <div className='flex items-center justify-between px-5 h-14'>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className='text-kuhs-primary p-1'
            aria-label='Toggle menu'
          >
            <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`} />
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className='border-t border-kuhs-border px-4 py-2 flex flex-col'>
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 py-3 border-b border-kuhs-border last:border-0 no-underline hover:opacity-75 transition-opacity'
              >
                <i className={`${item.icon} text-kuhs-primary text-lg`} aria-hidden='true' />
                <span className='text-sm font-semibold text-kuhs-navy'>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
