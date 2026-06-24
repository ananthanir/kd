import type { ChildrenType } from '@core/types'
import Providers from '@components/Providers'
import HybridLayout from '@components/layout/hybrid/HybridLayout'
import PortalSettingsSync from '@components/PortalSettingsSync'
import { getSystemMode } from '@core/utils/serverHelpers'
import { portals } from '@configs/themeConfig'
import themeConfig from '@configs/themeConfig'

const CollegeLayout = async (props: ChildrenType) => {
  const { children } = props

  return (
    <Providers direction='ltr'>
      <PortalSettingsSync settings={{
        primaryColor:       portals.college.primaryColor,
        skin:               themeConfig.skin,
        semiDark:           themeConfig.semiDark,
        navbarContentWidth: themeConfig.navbar.contentWidth,
        contentWidth:       themeConfig.contentWidth,
        footerContentWidth: themeConfig.footer.contentWidth,
      }} />
      <HybridLayout>{children}</HybridLayout>
    </Providers>
  )
}

export default CollegeLayout
