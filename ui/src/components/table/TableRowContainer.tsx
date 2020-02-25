import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { borderColorLight } from '@src/common/styles'

const useStyles = makeStyles({
  root: {
    '& .MuiGrid-item': {
      padding: '15px 20px'
    }
  },

  title: {
    borderRight: `1px solid ${borderColorLight}`,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600
  }
})

export default function TableRowContainer({ title, content }: { title: string; content: string | JSX.Element }) {
  const classes = useStyles()
  return (
    <Grid container spacing={3} className={classes.root} data-testid='table_row_container'>
      <Grid item xs={2} className={classes.title}>
        {title}
      </Grid>
      <Grid item xs={10}>
        {content}
      </Grid>
    </Grid>
  )
}
