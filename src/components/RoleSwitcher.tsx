'use client'

import { useState, useRef } from 'react'
import Chip from '@mui/material/Chip'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import type { Role } from '@/data/roleData'

type Props = {
  roles: Role[]
  defaultRoleId?: string
}

const RoleSwitcher = ({ roles, defaultRoleId }: Props) => {
  const [currentRole, setCurrentRole] = useState<Role>(
    roles.find(r => r.id === defaultRoleId) ?? roles[0]
  )
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={anchorRef}>
        <Chip
          icon={<i className={currentRole.icon} style={{ fontSize: '0.875rem' }} />}
          label={currentRole.label}
          onClick={() => setOpen(o => !o)}
          size='small'
          variant='outlined'
          sx={{
            cursor: 'pointer',
            borderColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-main)',
            fontWeight: 500,
            '& .MuiChip-icon': { color: 'var(--mui-palette-primary-main)' }
          }}
        />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement='bottom-end'
        className='min-is-[200px] !mbs-3 z-[1]'
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={8}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList disablePadding>
                  <div className='plb-2 pli-4'>
                    <Typography variant='caption' color='text.disabled' className='font-semibold uppercase tracking-wider'>
                      Switch Role
                    </Typography>
                  </div>
                  <Divider />
                  {roles.map(role => (
                    <MenuItem
                      key={role.id}
                      selected={role.id === currentRole.id}
                      onClick={() => { setCurrentRole(role); setOpen(false) }}
                      className='gap-3 pli-4'
                    >
                      <i className={`${role.icon} text-lg`} />
                      <Typography variant='body2'>{role.label}</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default RoleSwitcher
