import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDropzone } from 'react-dropzone'

import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { backgroundColor } from '@src/common/styles'
import photoIcon from '@src/assets/photo.svg'
import messages from './messages'

interface Props {
  icon?: string
  textContent?: string
  accept?: string
  onDrop?: (event: React.DragEvent<HTMLElement>) => void
  onDropAccepted: (files: File[]) => void
  onDropRejected?: (error: any) => void
}

const THEME_COLOR = '#757575'
const ImgIcon = styled('img')({
  display: 'inline-block',
  marginRight: 5
})
const UploadButton = styled(Button)({
  width: 140,
  backgroundColor: THEME_COLOR,
  color: '#FFFFFF',
  fontSize: 12,
  height: 24,
  padding: 0,
  marginTop: 15,
  '&:hover': {
    backgroundColor: 'rgba(117,117,117, 0.8)'
  }
})

export default function DropZone({ accept, icon, textContent, onDropAccepted, onDropRejected, onDrop }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept ?? 'image/png',
    onDropAccepted,
    onDropRejected
  })
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
      color={THEME_COLOR}
      bgcolor={backgroundColor}
    >
      <div {...getRootProps({ onDrop })}>
        <input {...getInputProps()} />
        <Box display='flex' className='dropZone' flexDirection='column' alignItems='center'>
          <Box display='flex' alignItems='center'>
            <ImgIcon src={icon || photoIcon} />
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
