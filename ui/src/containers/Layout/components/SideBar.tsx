import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { topOffset, backgroundColor } from '@src/common/styles'
import { SIDEBAR_TABS } from './constants'
import layoutContext from '../context'

import clsx from 'clsx'

const drawerWidth = 200
const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E0E0E0'
  },
  toolbar: {
    minHeight: `${topOffset}px`
  },
  list: {
    paddingTop: 0
  },
  listItem: {
    padding: '9px 30px',
    fontSize: 12,
    color: '#212121',
    '&.selected': {
      fontWeight: 'bold',
      backgroundColor: backgroundColor
    }
  }
}))

export default function SideBar() {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const { pathname } = useLocation()
  const { headTab } = useContext(layoutContext)

  return (
    <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent'>
      <div data-testid='toolbar_spacer' className={classes.toolbar} />
      <List className={classes.list}>
        {SIDEBAR_TABS[`/${headTab}`]?.map(({ to, title }) => (
          <Link to={to} key={to}>
            <ListItem
              button
              className={clsx(classes.listItem, {
                selected: pathname === to
              })}
            >
              <ListItemText primary={formatMessage(title)} disableTypography={true} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}
