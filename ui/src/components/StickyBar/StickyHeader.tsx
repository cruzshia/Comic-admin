import React from 'react'
import { Grid } from '@material-ui/core/'
import Typography from '@material-ui/core/Typography'
import StickBar from './StickyBar'
import { makeStyles } from '@material-ui/core'

interface Props {
  title: string
  button?: JSX.Element | JSX.Element[]
  contentOffset?: number
}

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& button': {
      marginLeft: 10
    }
  }
})

export default function StickyHeader({ title, button, contentOffset = 100 }: Props) {
  const classes = useStyles()
  return (
    <StickBar top={0} contentOffset={contentOffset}>
      <Grid container justify='space-between' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>
        <div className={classes.buttons}>
          {Array.isArray(button)
            ? button.map((btn, idx) => <React.Fragment key={`btn-${idx}`}>{btn}</React.Fragment>)
            : button}
        </div>
      </Grid>
    </StickBar>
  )
}
