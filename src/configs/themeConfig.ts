/*
 * If you change the following items in the config object, you will not see any effect in the local development server
 * as these are stored in the cookie (cookie has the highest priority over the themeConfig):
 * 1. mode
 * 2. skin
 * 3. semiDark
 * 4. layout
 * 5. navbar.contentWidth
 * 6. contentWidth
 * 7. footer.contentWidth
 *
 * To see the effect of the above items, you can click on the reset button from the Customizer
 * which is on the top-right corner of the customizer besides the close button.
 * This will reset the cookie to the values provided in the config object below.
 *
 * Another way is to clear the cookie from the browser's Application/Storage tab and then reload the page.
 */

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentPosition, LayoutComponentWidth } from '@core/types'

// ─────────────────────────────────────────────────────────────────────────────
// KUHS Brand tokens — single source of truth for all colors used across the app.
// These feed into: colorSchemes.ts (MUI palette), primaryColorConfig.ts,
// globals.css (@theme tokens → Tailwind utilities), login components, and portal layouts.
// ─────────────────────────────────────────────────────────────────────────────
export const brand = {
  // Primary teal
  primary:       '#5948a7',
  primaryLight:  '#6dbcbd',
  primaryDark:   '#3d9394',
  primarySubtle: '#f0fafa',   // very light teal for hover/panel backgrounds

  // Navy (headings, labels, strong text)
  navy: '#2D336B',

  // Page backgrounds
  background:     '#f8f7f3', // light mode page bg (cream)
  backgroundDark: '#1f2937', // dark mode page bg

  // Borders / dividers
  border: '#E0DDD6',

  // Instruction panel backgrounds
  tealSubtle:       '#F0FBFB',
  tealSubtleBorder: '#B9E7E7',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Per-portal settings — controls which MUI primary color each portal locks to.
// Used by PortalSettingsSync (client component) via updatePageSettings so the
// setting overrides the user's cookie without modifying it.
// ─────────────────────────────────────────────────────────────────────────────
export type PortalConfig = {
  primaryColor: string
}

export const portals = {
  college:    { primaryColor: '#6fda18' } satisfies PortalConfig,  // purple  — Hybrid layout
  student:    { primaryColor: '#b9062d' } satisfies PortalConfig,  // teal    — Vertical layout
  university: { primaryColor: '#FF891D' } satisfies PortalConfig,  // orange  — Horizontal layout
  other:      { primaryColor: brand.primary } satisfies PortalConfig,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Layout / structural config
// ─────────────────────────────────────────────────────────────────────────────
type Navbar = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  floating: boolean
  detached: boolean
  blur: boolean
}

type Footer = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  detached: boolean
}

export type Config = {
  templateName: string
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  skin: Skin
  semiDark: boolean
  layout: Layout
  layoutPadding: number
  navbar: Navbar
  contentWidth: LayoutComponentWidth
  compactContentWidth: number
  footer: Footer
  disableRipple: boolean
}

const themeConfig: Config = {
  templateName: 'Materialize',
  homePageUrl: '/home',
  settingsCookieName: 'materialize-mui-next-demo-1',
  mode: 'system',      // 'system', 'light', 'dark'
  skin: 'bordered',   // 'default', 'bordered'
  semiDark: false,
  // NOTE: layout is unused in KUHS portals — each portal's layout is determined by
  // the user's role at login (college→hybrid, student→vertical, university→horizontal).
  // Keep the field so the template's LayoutWrapper and SettingsProvider don't break.
  layout: 'vertical',
  layoutPadding: 24,
  compactContentWidth: 1440,
  navbar: {
    type: 'fixed',
    contentWidth: 'compact',
    floating: false,
    detached: true,
    blur: true
  },
  contentWidth: 'compact',
  footer: {
    type: 'static',
    contentWidth: 'compact',
    detached: true
  },
  disableRipple: false
}

export default themeConfig
