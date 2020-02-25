import React from 'react'
import { TextField, makeStyles } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'

const useStyle = makeStyles({
  root: {
    width: '100%',
    maxWidth: 800,

    '& textarea': {
      width: '100%',
      minHeight: 108
    }
  },
  inputRoot: {
    padding: '10px 15px'
  }
})

export default function TextArea({ name }: { name?: string }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  return (
    <TextField
      data-testid='text_area'
      multiline
      placeholder={formatMessage(messages.textInput)}
      variant='outlined'
      className={classes.root}
      InputProps={{ className: classes.inputRoot }}
      color='secondary'
      name={name}
    />
  )
}
