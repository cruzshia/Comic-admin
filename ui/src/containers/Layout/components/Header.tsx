import React from 'react'
import { Link } from 'react-router-dom'
import { styled, makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import HeaderTabMenu from './HeaderTabMenu'
import { headerHeight, headerMenuHeight } from '@src/common/styles'
import { routePath } from '@src/common/appConfig'
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
  backgroundColor: '#000000'
})

const LogoImg = styled('img')({
  width: 93,
  height: 14
})

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar className={classes.header} data-testid='header_app_bar'>
      <StyledHeader>
        <Link to={routePath.root}>
          <LogoImg alt='logo' src={Logo} data-testid='logo' />
        </Link>
        <span />
      </StyledHeader>
      <HeaderTabMenu />
    </AppBar>
  )
}
