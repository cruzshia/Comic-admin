import React, { useContext, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { topOffset, backgroundColor, borderColorLight, sidebarWidth } from '@src/common/styles'
import { SIDEBAR_TABS } from './constants'
import layoutContext from '../context'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: sidebarWidth,
    backgroundColor: '#FFFFFF',
    borderRight: 0
  },
  toolbar: {
    minHeight: `${topOffset}px`
  },
  list: {
    padding: 0
  },
  filler: {
    flexGrow: 1,
    borderRight: `1px solid ${borderColorLight}`
  },
  listItem: {
    padding: '12.5px 20px',
    fontSize: 12,
    color: '#212121',
    borderRight: `1px solid ${borderColorLight}`,
    '&.selected': {
      fontWeight: 'bold',
      backgroundColor,
      borderRight: 0
    }
  }
}))

export default function SideBar() {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const { pathname } = useLocation()
  const { headTab } = useContext(layoutContext)

  const matchTab = useMemo(() => {
    const matchRoute = pathname.match(/\/\w+\/\w+/gi)
    return matchRoute ? matchRoute![0] : ''
  }, [pathname])

  return (
    <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent'>
      <div data-testid='toolbar_spacer' className={classes.toolbar} />
      <List className={classes.list}>
        {SIDEBAR_TABS[`/${headTab}`]?.map(({ to, title }) => (
          <Link to={to} key={to}>
            <ListItem
              button
              className={clsx(classes.listItem, {
                selected: matchTab === to.match(/\/\w+\/\w+/gi)![0]
              })}
            >
              <ListItemText primary={formatMessage(title)} disableTypography={true} />
            </ListItem>
          </Link>
        ))}
      </List>
      <div className={classes.filler} />
    </Drawer>
  )
}
