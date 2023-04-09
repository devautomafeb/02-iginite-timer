import 'styled-components' // Important!!! rewrite just here, not making all thing again

import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

// Here styled-components are been rewrited with the DefaultTheme that already belongs for itself adding ThemeType
