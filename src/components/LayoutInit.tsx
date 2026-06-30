'use client'

import useLayoutInit from '@core/hooks/useLayoutInit'
import type { SystemMode } from '@core/types'

type Props = { systemMode: SystemMode }

// Mirrors what LayoutWrapper does in the default template path.
// Needed so `muiSystemMode` is correctly initialized in all three portal layouts,
// which makes the `semiDark && !isDark` guard in VerticalNav work as expected.
const LayoutInit = ({ systemMode }: Props) => {
  useLayoutInit(systemMode)
  return null
}

export default LayoutInit
