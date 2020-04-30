import React from 'react'
import { useIntl } from 'react-intl'
import { styled } from '@material-ui/core'
import { fontWeightBold } from '@src/common/styles'
import { ReactComponent as PhotoLibraryIcon } from '@src/assets/common/photo_library.svg'
import commonMessages from '@src/messages'

const Label = styled('div')({
  backgroundColor: '#BDBDBD',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 205,
  color: '#FFFFFF',
  margin: '10px 0',
  padding: '8px 0',
  fontWeight: fontWeightBold,
  '& svg': {
    marginRight: '5px'
  }
})

export default function ContentLabel() {
  const { formatMessage } = useIntl()

  return (
    <Label>
      <PhotoLibraryIcon />
      {formatMessage(commonMessages.contents)}
    </Label>
  )
}
