import React from 'react'
import { makeStyles, Grid, Typography, Box } from '@material-ui/core'
import { fontWeightBold } from '@src/common/styles'

const useStyle = makeStyles(() => ({
  rowContainer: {
    maxWidth: 655
  },
  row: {
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: 0
    },
    '& .MuiTypography-body1': {
      marginRight: '30px'
    }
  },
  label: {
    width: 65,
    fontSize: 12,
    fontWeight: fontWeightBold
  }
}))

export default function AdDataRow({ title, children }: { title: string | JSX.Element; children: React.ReactNode }) {
  const classes = useStyle()
  return (
    <Grid className={classes.row} container direction='row' alignItems='center' data-testid='input_row'>
      <Typography className={classes.label} variant='body1'>
        {title}
      </Typography>
      <Box fontWeight='normal' display='flex'>
        {children}
      </Box>
    </Grid>
  )
}
