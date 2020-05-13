import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { errorColor, fontWeightBold } from '@src/common/styles'
import { ReactComponent as AlertIcon } from '@src/assets/form/error_alert.svg'

const useStyle = makeStyles({
  error: {
    color: errorColor,
    fontWeight: fontWeightBold
  },
  icon: {
    marginRight: '6px'
  }
})

export default function FailedMsg({ msg }: { msg: string }) {
  const classes = useStyle()
  return (
    <Grid container alignItems='center' className={classes.error}>
      <AlertIcon className={classes.icon} />
      {msg}
    </Grid>
  )
}
