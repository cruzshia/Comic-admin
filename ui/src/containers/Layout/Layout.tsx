import React, { PropsWithChildren, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { styled } from '@material-ui/core'
import { getProfileAction } from '@src/reducers/user/userActions'
import { StoreState } from '@src/reducers'
import { headerHeight, mainColor, textColor } from '@src/common/styles'
import Header from '@src/components/Header'
import SideBar from '@src/components/SideBar'

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
    color: textColor,
    a: {
      textDecoration: 'none'
    }
  }
})

const Content = styled('main')({
  flexGrow: 1,
  padding: `${headerHeight + 15}px 20px 20px 20px`
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
