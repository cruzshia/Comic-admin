import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { styled, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import expandIco from '@src/assets/common/expand_more.svg'
import { headerHeight, headerMenuHeight, fontWeightBold } from '@src/common/styles'
import Logo from '@src/assets/logo.svg'
import HeaderTabMenu from './HeaderTabMenu'
import { SYSTEM_MENUS } from './constants'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1,
    minHeight: headerMenuHeight,
    zIndex: theme.zIndex.drawer + 1
  }
}))

const SystemMenuItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 40,
  fontSize: 12,
  color: '#FFFFFF',
  '&.selected': {
    fontWeight: fontWeightBold
  }
})

export default function Header() {
  const classes = useStyles()
  const { pathname } = useLocation()
  return (
    <AppBar className={classes.header} data-testid='header_app_bar'>
      <Box
        display='flex'
        alignContent='center'
        justifyContent='space-between'
        height={headerHeight}
        padding='13px 30px 13px 20px'
        bgcolor='#000000'
      >
        <img alt='logo' src={Logo} data-testid='logo' />
        <Box display='flex'>
          {SYSTEM_MENUS.map(({ route, title, subMenu }, idx) => (
            <SystemMenuItem
              key={`${route}-${idx}`}
              to={route}
              className={clsx({
                selected: pathname === route
              })}
            >
              <FormattedMessage {...title} />
              {subMenu && <img src={expandIco} alt='expand' />}
            </SystemMenuItem>
          ))}
        </Box>
      </Box>
      <HeaderTabMenu />
    </AppBar>
  )
}
