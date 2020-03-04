import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDropzone, DropEvent } from 'react-dropzone'
import { styled, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { backgroundColor } from '@src/common/styles'
import { ReactComponent as PhotoIcon } from '@src/assets/form/photo.svg'
import messages from './messages'

interface Props {
  name?: string
  textContent?: string
  accept?: string
  onDropAccepted: (files: File[], name?: string) => void
  onDropRejected?: (error: any, name?: string) => void
}

const DROP_COLOR = '#757575'
const useStyle = makeStyles({
  icon: {
    display: 'inline-block',
    marginRight: '5px',
    '& svg, path': {
      fill: DROP_COLOR
    }
  }
})

const UploadButton = styled(Button)({
  width: 140,
  backgroundColor: DROP_COLOR,
  color: '#FFFFFF',
  fontSize: 12,
  height: 24,
  padding: 0,
  marginTop: 15,
  '&:hover': {
    backgroundColor: 'rgba(117,117,117, 0.8)'
  }
})

export default function DropZone({ accept, textContent, name, onDropAccepted, onDropRejected }: Props) {
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

  return (
    <Box
      display='flex'
      justifyContent='center'
      flexDirection='column'
      width={410}
      height={126}
      border='1px dashed #BDBDBD'
      borderRadius={4}
      fontWeight={600}
      fontSize={14}
      color={DROP_COLOR}
      bgcolor={backgroundColor}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box display='flex' className='dropZone' flexDirection='column' alignItems='center'>
          <Box display='flex' alignItems='center'>
            <PhotoIcon className={classes.icon} />
            {content}
          </Box>
          <UploadButton>
            <FormattedMessage {...messages.selectFile} />
          </UploadButton>
        </Box>
      </div>
    </Box>
  )
}
