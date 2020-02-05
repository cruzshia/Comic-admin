import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { styled } from '@material-ui/core'
import { StoreState } from '../../reducers'
import { headerHeight } from '../../common/styles'
import Header from '@src/components/Header'
import SideBar from '@src/components/SideBar'

const LayoutContainer = styled('div')({
  display: 'flex',
  '@global': {
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
  const { isLogin } = useSelector((state: StoreState) => ({
    isLogin: state.user.isLogin
  }))
  return (
    <LayoutContainer>
      <CssBaseline />
      <Header isLogin={isLogin} />
      <SideBar />
      <Content>{children}</Content>
    </LayoutContainer>
  )
}
