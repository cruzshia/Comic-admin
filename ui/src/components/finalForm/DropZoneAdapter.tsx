import React from 'react'
import { useIntl } from 'react-intl'
import { FieldRenderProps } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import DropZone from '@src/components/DropZone'
import { toDataUri } from '@src/utils/functions'
import commonMessages from '@src/messages'
import { fontWeightBold } from '@src/common/styles'

const useStyle = makeStyles(() => ({
  previewBox: {
    position: 'relative',
    width: 'fit-content',
    maxWidth: (maxWidth: string | number) => (typeof maxWidth === 'object' ? '40%' : maxWidth),
    '& img': {
      display: 'block',
      maxWidth: '100%'
    }
  },
  hoverBg: {
    '&:before': {
      display: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      content: 'attr(data-hover)',
      width: '100%',
      height: '100%',
      color: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: fontWeightBold
    },
    '&:hover::before': {
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
}))

export default function DropZoneAdapter({
  input: { name, value, onChange },
  maxWidth,
  disableHover
}: FieldRenderProps<string>) {
  const classes = useStyle(maxWidth)
  const { formatMessage } = useIntl()

  return (
    <div className={classes.previewBox} data-testid='drop'>
      <DropZone
        name={name}
        preview={
          value && (
            <div
              className={!!disableHover ? '' : classes.hoverBg}
              data-hover={formatMessage(commonMessages.changeImage)}
            >
              <img src={toDataUri(value)} alt={name} />
            </div>
          )
        }
        onDropAccepted={files => onChange(files[0])}
      />
    </div>
  )
}
