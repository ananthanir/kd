import type { ChildrenType } from '@core/types'
import Providers from '@components/Providers'
import HorizontalLayout from '@layouts/HorizontalLayout'
import UniversityHeader from '@components/layout/university/Header'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
import PortalSettingsSync from '@components/PortalSettingsSync'
import SkinWrapper from '@components/SkinWrapper'
import Button from '@mui/material/Button'
import { portals } from '@configs/themeConfig'
import themeConfig from '@configs/themeConfig'

const UniversityLayout = async (props: ChildrenType) => {
  const { children } = props

  return (
    <Providers direction='ltr' settingsOverrides={{ primaryColor: portals.university.primaryColor }}>
      <PortalSettingsSync settings={{
        primaryColor:       portals.university.primaryColor,
        skin:               themeConfig.skin,
        semiDark:           themeConfig.semiDark,
        navbarContentWidth: themeConfig.navbar.contentWidth,
        contentWidth:       themeConfig.contentWidth,
        footerContentWidth: themeConfig.footer.contentWidth,
      }} />
      <SkinWrapper>
        <HorizontalLayout header={<UniversityHeader />} footer={<HorizontalFooter />}>
          {children}
        </HorizontalLayout>
        <ScrollToTop className='mui-fixed'>
          <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
            <i className='ri-arrow-up-line' />
          </Button>
        </ScrollToTop>
      </SkinWrapper>
    </Providers>
  )
}

export default UniversityLayout
