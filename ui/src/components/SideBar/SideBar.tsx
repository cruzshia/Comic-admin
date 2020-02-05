import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core'
import { headerHeight, sideBarGrey } from '@src/common/styles'

const drawerWidth = 200
const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: sideBarGrey
  },
  toolbar: {
    minHeight: `${headerHeight + 15}px`
  }
}))

export default function SideBar() {
  const classes = useStyles()
  return (
    <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent'>
      <div className={classes.toolbar} />
    </Drawer>
  )
}
