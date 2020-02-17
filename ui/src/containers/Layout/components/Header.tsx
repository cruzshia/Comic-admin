import React from 'react'
import { styled, makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import HeaderTabMenu from './HeaderTabMenu'
import { headerHeight, headerMenuHeight } from '@src/common/styles'
import Logo from '@src/assets/logo.svg'

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1,
    minHeight: headerMenuHeight,
    zIndex: theme.zIndex.drawer + 1
  }
}))

const StyledHeader = styled('div')({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  height: headerHeight,
  padding: '13px 30px 13px 20px',
  backgroundColor: '#000'
})

const LogoImg = styled('img')({
  width: 93,
  height: 14
})

interface Props {
  /** show login title or not */
  isLogin: boolean
}

export default function Menu({ isLogin }: Props) {
  const classes = useStyles()
  return (
    <AppBar className={classes.header} data-testid='header_app_bar'>
      <StyledHeader>
        <LogoImg alt='logo' src={Logo} data-testid='logo' />
        <span />
      </StyledHeader>
      <HeaderTabMenu isLogin={isLogin} />
    </AppBar>
  )
}
