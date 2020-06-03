import React from 'react'
import { Box, Grid, Typography, GridItemsAlignment, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { fontWeightBold } from '@src/common/styles'

interface Prop {
  title: string | JSX.Element
  classnames?: string
  alignItems?: GridItemsAlignment
  children: React.ReactNode
}

const useStyle = makeStyles({
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
    fontWeight: fontWeightBold,
    whiteSpace: 'pre-wrap'
  }
})

export default function InputRow({ title, classnames, alignItems, children }: Prop) {
  const classes = useStyle()
  return (
    <Grid
      className={clsx(classes.row, classnames)}
      container
      direction='row'
      alignItems={alignItems || 'center'}
      data-testid='input-row'
    >
      <Typography className={classes.label} variant='body1' data-testid='input-row-label'>
        {title}
      </Typography>
      <Box fontWeight='normal' flexGrow={1}>
        {children}
      </Box>
    </Grid>
  )
}
