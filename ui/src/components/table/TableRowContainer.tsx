import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { borderColorLight } from '@src/common/styles'
import clsx from 'clsx'

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
    borderRight: `1px solid ${borderColorLight}`,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: '#FAFAFA'
  },
  content: {
    fontWeight: 'normal',
    backgroundColor: '#FFFFFF'
  }
})

interface Props {
  title: string
  content: string | JSX.Element
  classnames?: string
}

export default function TableRowContainer({ title, content, classnames }: Props) {
  const classes = useStyles()
  return (
    <Grid container spacing={3} className={clsx(classes.root, classnames)} data-testid='table_row_container'>
      <Grid item xs={2} className={classes.title}>
        {title}
      </Grid>
      <Grid item xs={10} className={classes.content}>
        {content}
      </Grid>
    </Grid>
  )
}
