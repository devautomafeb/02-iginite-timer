import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesContentProvider } from './contexts/CyclesContext'
import { GlobalStyle } from './global'
import Router from './Router'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <CyclesContentProvider >
          <Router />
        </CyclesContentProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
