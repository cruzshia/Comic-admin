import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import DropZone from '@src/components/DropZone'
import { toDataUri } from '@src/utils/functions'

const useStyle = makeStyles(() => ({
  previewBox: {
    maxWidth: (maxWidth: string | number) => (typeof maxWidth === 'object' ? '40%' : maxWidth),
    '& img': {
      width: '100%'
    }
  }
}))

export default function DropZoneAdapter({ input: { name, value, onChange }, maxWidth }: FieldRenderProps<string>) {
  const classes = useStyle(maxWidth)
  return (
    <div className={classes.previewBox}>
      <DropZone
        name={name}
        preview={value && <img src={toDataUri(value)} alt={name} />}
        onDropAccepted={files => onChange(files[0])}
      />
    </div>
  )
}
