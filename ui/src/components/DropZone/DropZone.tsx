import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDropzone, DropEvent } from 'react-dropzone'
import { styled, makeStyles, Box, Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { backgroundColor, borderColor } from '@src/common/styles'
import { ReactComponent as PhotoIcon } from '@src/assets/form/photo.svg'
import messages from '@src/messages'

interface Props {
  classnames?: string
  name?: string
  textContent?: string
  accept?: string
  preview?: string | JSX.Element
  onDropAccepted: (files: File[], name?: string) => void
  onDropRejected?: (error: any, name?: string) => void
}

const DROP_COLOR = '#757575'
const ZONE_HEIGHT = 126

const useStyle = makeStyles({
  icon: {
    display: 'inline-block',
    marginRight: '5px',
    '& svg, path': {
      fill: DROP_COLOR
    }
  },
  dropZone: {
    height: ZONE_HEIGHT
  },
  inputZone: {
    outline: 'none',
    cursor: 'pointer'
  }
})

const UploadButton = styled(Button)({
  width: 140,
  backgroundColor: DROP_COLOR,
  color: '#FFFFFF',
  fontSize: 12,
  height: 24,
  padding: 0,
  marginTop: '15px',
  '&:hover': {
    backgroundColor: 'rgba(117,117,117, 0.8)'
  }
})

export default function DropZone({
  classnames,
  preview,
  accept,
  textContent,
  name,
  onDropAccepted,
  onDropRejected
}: Props) {
  const handleDropAccepted = useCallback(
    (files: File[], _: DropEvent) => {
      onDropAccepted && onDropAccepted(files, name)
    },
    [onDropAccepted, name]
  )

  const handleDropRejected = useCallback(
    (files: File[], _: DropEvent) => {
      onDropRejected && onDropRejected(files, name)
    },
    [onDropRejected, name]
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept ?? 'image/png',
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected
  })

  const classes = useStyle()
  const content = textContent || <FormattedMessage {...messages.dragDropUpload} />

  if (preview) {
    return (
      <div className={clsx(classnames, classes.inputZone)} {...getRootProps()}>
        <input {...getInputProps()} />
        {preview}
      </div>
    )
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      flexDirection='column'
      width={410}
      height={ZONE_HEIGHT}
      border={`1px dashed ${borderColor}`}
      borderRadius={4}
      color={DROP_COLOR}
      bgcolor={backgroundColor}
    >
      <Typography variant='subtitle2'>
        <div className={classes.inputZone} {...getRootProps()}>
          <input {...getInputProps()} />
          <Box display='flex' height={ZONE_HEIGHT} flexDirection='column' justifyContent='center' alignItems='center'>
            <Box display='flex' alignItems='center'>
              <PhotoIcon className={classes.icon} />
              {content}
            </Box>
            <UploadButton>
              <FormattedMessage {...messages.selectFile} />
            </UploadButton>
          </Box>
        </div>
      </Typography>
    </Box>
  )
}
