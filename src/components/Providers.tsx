// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import LayoutInit from '@components/LayoutInit'

// Config Imports
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import type { Settings } from '@core/contexts/settingsContext'

type Props = ChildrenType & {
  direction: Direction
  settingsOverrides?: Partial<Settings>
}

const Providers = async (props: Props) => {
  // Props
  const { children, direction, settingsOverrides } = props

  // Vars
  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  // Layer order (last wins):
  //   1. cookie         — user's persisted mode preference
  //   2. themeConfig    — shared structural defaults (skin, contentWidth, …)
  //   3. settingsOverrides — portal-specific values (primaryColor per portal)
  const mergedSettings = {
    ...settingsCookie,
    skin:               themeConfig.skin,
    semiDark:           themeConfig.semiDark,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth:       themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor:       primaryColorConfig[0].main,
    ...settingsOverrides,
  }

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={mergedSettings} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          <LayoutInit systemMode={systemMode} />
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
