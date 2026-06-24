'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import collegeMenuData from '@/data/navigation/collegeMenuData'

type Props = {
  open: boolean
  onClose: () => void
}

const MobileMenu = ({ open, onClose }: Props) => {
  const [expandedSection, setExpandedSection] = useState<string>(collegeMenuData[0]?.id ?? '')

  const toggle = (id: string) =>
    setExpandedSection(s => (s === id ? '' : id))

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: 'var(--mui-palette-background-paper)',
          backgroundImage: 'none'
        }
      }}
    >
      {/* Drawer header */}
      <div
        className='flex items-center gap-2 px-4 shrink-0'
        style={{ height: 56, borderBottom: '1px solid var(--mui-palette-divider)' }}
      >
        <Image src='/images/logos/kuhs-logo.png' alt='KUHS' width={30} height={30} className='object-contain' />
        <div className='leading-tight flex-1'>
          <p className='text-[11px] font-extrabold m-0' style={{ color: 'var(--mui-palette-text-primary)' }}>
            KUHS ERP
          </p>
          <p className='text-[9px] m-0' style={{ color: 'var(--mui-palette-text-secondary)' }}>
            College Portal
          </p>
        </div>
        <button
          onClick={onClose}
          className='flex items-center justify-center rounded-lg transition-colors'
          style={{ width: 32, height: 32, color: 'var(--mui-palette-text-secondary)' }}
          aria-label='Close menu'
        >
          <i className='ri-close-line text-xl' />
        </button>
      </div>

      {/* Accordion menu — all sections in vertical form */}
      <nav className='flex-1 overflow-y-auto'>
        {collegeMenuData.map((section, idx) => {
          const isOpen = expandedSection === section.id
          return (
            <div key={section.id}>
              {/* Section button */}
              <button
                onClick={() => toggle(section.id)}
                className='w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors'
                style={{
                  color: isOpen
                    ? 'var(--mui-palette-primary-main)'
                    : 'var(--mui-palette-text-primary)',
                  backgroundColor: isOpen ? 'var(--mui-palette-action-hover)' : 'transparent'
                }}
              >
                <i
                  className={`${section.icon} text-xl shrink-0`}
                  style={{ color: 'var(--mui-palette-primary-main)' }}
                  aria-hidden='true'
                />
                <span className='flex-1 text-sm font-semibold'>{section.label}</span>
                <i
                  className={`text-base ${isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}
                  style={{ color: 'var(--mui-palette-text-disabled)' }}
                  aria-hidden='true'
                />
              </button>

              {/* Sub-items — supports one level of nesting */}
              {isOpen && (
                <div style={{ backgroundColor: 'var(--mui-palette-action-hover)' }}>
                  {section.subItems.map(sub =>
                    sub.children && sub.children.length > 0 ? (
                      // Sub-item group — show label then indent children
                      <div key={sub.label}>
                        <div
                          className='flex items-center gap-3 px-8 py-2.5'
                          style={{ color: 'var(--mui-palette-text-disabled)' }}
                        >
                          <i className={`${sub.icon} text-sm shrink-0`} aria-hidden='true' />
                          <span className='text-xs font-semibold uppercase tracking-wider'>{sub.label}</span>
                        </div>
                        {sub.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className='flex items-center gap-3 pl-14 pr-6 py-2.5 no-underline transition-colors'
                            style={{ color: 'var(--mui-palette-text-secondary)' }}
                          >
                            <i
                              className={`${child.icon} shrink-0`}
                              style={{ fontSize: '1.125rem', color: 'var(--mui-palette-primary-main)' }}
                              aria-hidden='true'
                            />
                            <span className='text-sm'>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Leaf sub-item
                      <Link
                        key={sub.href}
                        href={sub.href ?? '#'}
                        onClick={onClose}
                        className='flex items-center gap-3 px-8 py-3 no-underline transition-colors'
                        style={{ color: 'var(--mui-palette-text-secondary)' }}
                      >
                        <i
                          className={`${sub.icon} text-base shrink-0`}
                          style={{ color: 'var(--mui-palette-primary-main)' }}
                          aria-hidden='true'
                        />
                        <span className='text-sm'>{sub.label}</span>
                      </Link>
                    )
                  )}
                </div>
              )}

              {idx < collegeMenuData.length - 1 && (
                <Divider />
              )}
            </div>
          )
        })}
      </nav>
    </Drawer>
  )
}

export default MobileMenu
