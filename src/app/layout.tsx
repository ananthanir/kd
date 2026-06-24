// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
// @ts-ignore: Missing CSS module declaration for react-perfect-scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
// @ts-ignore: Missing CSS module declaration for globals.css
import './globals.css'

// Generated Icon CSS Imports
// @ts-ignore: Missing CSS module declaration for generated-icons.css
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'KUHS-ERP Admin',
  description: 'KUHS-ERP Admin'
}

const RootLayout = async (props: ChildrenType) => {
  const { children } = props

  // Type guard to ensure lang is a valid Locale

  // Vars

  const systemMode = await getSystemMode()
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction} suppressHydrationWarning>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout