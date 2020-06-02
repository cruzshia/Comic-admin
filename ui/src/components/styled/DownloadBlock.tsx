import React from 'react'
import { Grid, IconButton, makeStyles } from '@material-ui/core'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download_circle.svg'

const useStyle = makeStyles({
  icon: {
    marginLeft: '5px'
  }
})

export default function DownloadBlock({ filename, onClick }: { filename: string; onClick?: () => void }) {
  return (
    <Grid container alignItems='center'>
      {filename}
      <IconButton className={useStyle().icon} size='small' onClick={onClick}>
        <DownloadIcon data-testid='download-icon' />
      </IconButton>
    </Grid>
  )
}
