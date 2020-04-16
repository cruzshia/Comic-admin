import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { borderColorLight, fontWeightBold, backgroundColorLightGray } from '@src/common/styles'
import clsx from 'clsx'

export const LABEL_WIDTH = 200

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 0,
    '& .MuiGrid-item': {
      padding: '20px'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: LABEL_WIDTH,
    borderRight: `1px solid ${borderColorLight}`,
    fontSize: 12,
    fontWeight: fontWeightBold,
    backgroundColor: backgroundColorLightGray
  },
  content: {
    flexGrow: 1,
    flexBasis: 1,
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
      <Grid item className={classes.content}>
        {content}
      </Grid>
    </Grid>
  )
}
