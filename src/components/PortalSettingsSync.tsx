'use client'

import { useEffect } from 'react'
import { useSettings } from '@core/hooks/useSettings'
import type { Settings } from '@core/contexts/settingsContext'

type Props = {
  settings: Partial<Settings>
}

/**
 * Forces portal-specific settings (skin, semiDark, contentWidth, primaryColor, etc.)
 * via updatePageSettings — overrides in-memory state without touching the user's cookie.
 * Settings revert automatically when the component unmounts (user leaves portal).
 *
 * Mode (light/dark/system) is intentionally excluded so the user's ModeDropdown
 * preference is preserved across portals.
 */
const PortalSettingsSync = ({ settings }: Props) => {
  const { updatePageSettings } = useSettings()

  useEffect(() => {
    return updatePageSettings(settings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default PortalSettingsSync
