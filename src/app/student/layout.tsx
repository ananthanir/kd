import type { ChildrenType } from '@core/types'
import Providers from '@components/Providers'
import VerticalLayout from '@layouts/VerticalLayout'
import StudentNavigation from '@components/layout/student/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
import PortalSettingsSync from '@components/PortalSettingsSync'
import SkinWrapper from '@components/SkinWrapper'
import Button from '@mui/material/Button'
import { getMode } from '@core/utils/serverHelpers'
import { portals } from '@configs/themeConfig'
import themeConfig from '@configs/themeConfig'

const StudentLayout = async (props: ChildrenType) => {
  const { children } = props
  const mode = await getMode()

  return (
    <Providers direction='ltr' settingsOverrides={{ primaryColor: portals.student.primaryColor }}>
      <PortalSettingsSync settings={{
        primaryColor:       portals.student.primaryColor,
        skin:               themeConfig.skin,
        semiDark:           themeConfig.semiDark,
        navbarContentWidth: themeConfig.navbar.contentWidth,
        contentWidth:       themeConfig.contentWidth,
        footerContentWidth: themeConfig.footer.contentWidth,
      }} />
      <SkinWrapper>
        <VerticalLayout
          navigation={<StudentNavigation mode={mode} />}
          navbar={<Navbar />}
          footer={<VerticalFooter />}
        >
          {children}
        </VerticalLayout>
        <ScrollToTop className='mui-fixed'>
          <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
            <i className='ri-arrow-up-line' />
          </Button>
        </ScrollToTop>
      </SkinWrapper>
    </Providers>
  )
}

export default StudentLayout
