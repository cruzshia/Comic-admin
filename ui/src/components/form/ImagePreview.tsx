import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { borderColor } from '@src/common/styles'

interface Style {
  width?: number
  height?: number
}
const useStyle = makeStyles(() => ({
  root: ({ width = 126, height = 189 }: Style) => ({
    position: 'absolute',
    top: 20,
    right: 40,
    width,
    height,
    border: `1px dashed ${borderColor}`,
    '&.no_border': {
      border: 'none'
    },
    '& img': {
      maxWidth: '100%'
    }
  })
}))

export default function ImagePreview({
  imageUrl,
  ...style
}: {
  imageUrl?: string
} & Style) {
  const classes = useStyle(style)

  return (
    <div className={clsx(classes.root, { no_border: !!imageUrl })} data-testid='preview-block'>
      {imageUrl && <img src={imageUrl} alt='preview' data-testid='preview-image' />}
    </div>
  )
}
