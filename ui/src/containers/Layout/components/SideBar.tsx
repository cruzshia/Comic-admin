import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core'
import { topOffset } from '@src/common/styles'

const drawerWidth = 200
const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#FFFFFF'
  },
  toolbar: {
    minHeight: `${topOffset + 15}px`
  }
}))

export default function SideBar() {
  const classes = useStyles()
  return (
    <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent'>
      <div data-testid='toolbar_spacer' className={classes.toolbar} />
    </Drawer>
  )
}
