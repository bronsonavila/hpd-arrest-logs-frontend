'use client'

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LicenseInfo } from '@mui/x-license'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { DATA_GRID_THEME_OVERRIDES } from '@/theme/dataGridTheme'

// See: https://mui.com/x/introduction/licensing/#license-key-security
if (typeof window !== 'undefined') {
  LicenseInfo.setLicenseKey(
    window.atob(
      'YmZmNzk0ZTg0ZTk1MWIyNzMwNGY1YjJiYTQ0NTY2OGZUejA1T1RFM055eEZQVEUzTlRrME16UXpOell3TURBc1V6MXdjbThzVEUwOWNHVnljR1YwZFdGc0xGQldQVkV6TFRJd01qUXNTMVk5TWc9PQ=='
    )
  )
}

type ColorMode = 'light' | 'dark'

interface ColorModeContextType {
  mode: ColorMode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {}
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

function getStoredMode(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('colorMode')
  if (stored === 'dark' || stored === 'light') return stored
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMode(getStoredMode())
    setMounted(true)
  }, [])

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((previousMode) => {
          const newMode = previousMode === 'light' ? 'dark' : 'light'
          localStorage.setItem('colorMode', newMode)
          return newMode
        })
      }
    }),
    [mode]
  )

  const theme = useMemo(
    () =>
      createTheme({
        components: DATA_GRID_THEME_OVERRIDES,
        palette: {
          mode
        }
      }),
    [mode]
  )

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Apply color scheme to all browser elements. See: https://github.com/mui/material-ui/issues/25016 */}
        <GlobalStyles styles={{ html: { colorScheme: mode } }} />

        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
