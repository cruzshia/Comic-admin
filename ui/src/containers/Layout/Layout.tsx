import React, { PropsWithChildren, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { styled } from '@material-ui/core'
import { getProfileAction } from '@src/reducers/user/userActions'
import { StoreState } from '@src/reducers'
import { topOffset, mainColor, textColor, backgroundColor } from '@src/common/styles'
import Header from './components/Header'
import SideBar from './components/SideBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor
    }
  }
})

const LayoutContainer = styled('div')({
  display: 'flex',
  '@global': {
    backgroundColor,
    color: textColor,
    a: {
      color: '#FFFFFF',
      textDecoration: 'none'
    }
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

  useEffect(() => {
    isLogin && dispatch(getProfileAction())
  }, [isLogin, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        <CssBaseline />
        <Header isLogin={isLogin} />
        <SideBar />
        <Content>{children}</Content>
      </LayoutContainer>
    </ThemeProvider>
  )
}
