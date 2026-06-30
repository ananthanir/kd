'use client'

import { useSettings } from '@core/hooks/useSettings'

type Props = { children: React.ReactNode }

const SkinWrapper = ({ children }: Props) => {
  const { settings } = useSettings()
  return (
    <div data-skin={settings.skin} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}

export default SkinWrapper
