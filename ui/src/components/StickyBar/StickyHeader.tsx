import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import StickBar from './StickyBar'

interface Props {
  title: string
  button?: JSX.Element | JSX.Element[]
  contentOffset?: number
}

export default function StickyHeader({ title, button, contentOffset = 100 }: Props) {
  return (
    <StickBar top={0} contentOffset={contentOffset}>
      <Grid container justify='space-between' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>
        {button}
      </Grid>
    </StickBar>
  )
}
