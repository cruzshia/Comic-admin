import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import StickBar from '@src/components/StickyBar'

interface Props {
  title: string
  button: JSX.Element
}

export default function StickyHeader({ title, button }: Props) {
  return (
    <StickBar top={0} contentOffset={100}>
      <Grid container justify='space-between' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>
        {button}
      </Grid>
    </StickBar>
  )
}
