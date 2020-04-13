import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { borderColorLight, fontWeightBold, backgroundColorLightGray } from '@src/common/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 0,
    '& .MuiGrid-item': {
      padding: '20px',
      maxWidth: '75%'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 200,
    borderRight: `1px solid ${borderColorLight}`,
    fontSize: 12,
    fontWeight: fontWeightBold,
    backgroundColor: backgroundColorLightGray
  },
  content: {
    flexGrow: 1,
    fontWeight: 'normal',
    backgroundColor: '#FFFFFF'
  }
})

interface Props {
  title: string
  content: string | JSX.Element
  classnames?: string
}

export default function DataTableRow({ title, content, classnames }: Props) {
  const classes = useStyles()
  return (
    <Grid container spacing={3} className={clsx(classes.root, classnames)} data-testid='table-row-container'>
      <Grid item xs={3} className={classes.title}>
        {title}
      </Grid>
      <Grid item xs={9} className={classes.content}>
        {content}
      </Grid>
    </Grid>
  )
}
