import React, { useState, useEffect } from 'react'
import { makeStyles, Backdrop, CircularProgress } from '@material-ui/core'
import { Subject } from 'rxjs'

const spinnerSubject = new Subject<boolean>()

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
}))

const GlobalSpinner = () => {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const sub = spinnerSubject.subscribe((isOpen: boolean) => setOpen(isOpen))
    return () => sub.unsubscribe()
  }, [])

  return open ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color='inherit' disableShrink />
    </Backdrop>
  ) : null
}

GlobalSpinner.open = () => spinnerSubject.next(true)
GlobalSpinner.close = () => spinnerSubject.next(false)

export default GlobalSpinner
