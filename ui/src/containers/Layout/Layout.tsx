import React, { PropsWithChildren, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { getProfileAction } from '@src/reducers/user/userActions'
import { StoreState } from '@src/reducers'
import { topOffset, mainColor } from '@src/common/styles'
import LayoutContext from './context'
import Header from './components/Header'
import SideBar from './components/SideBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor
    }
  },
  typography: {
    fontFamily: '"Hiragino Kaku Gothic Pro", "Roboto", "Helvetica", "Arial", "sans-serif"'
  }
})

const Content = styled('main')({
  flexGrow: 1,
  padding: `${topOffset + 15}px 20px 20px 20px`
})

export default function Layout({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state: StoreState) => ({
    isLogin: !!state.user.token
  }))

  const match = useRouteMatch<{ headTab: string }>('/:headTab')
  const headTab = match?.params.headTab

  useEffect(() => {
    isLogin && dispatch(getProfileAction())
  }, [isLogin, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <LayoutContext.Provider value={{ headTab }}>
        <Box display='flex'>
          <Header />
          <SideBar />
          <Content>{children}</Content>
        </Box>
      </LayoutContext.Provider>
    </ThemeProvider>
  )
}
