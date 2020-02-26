import React from 'react'
import { OutlinedInput, makeStyles } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'

const useStyles = makeStyles({
  root: {
    width: 410,
    '& input': {
      padding: '8px 15px'
    }
  }
})

export default function TextInput({
  name,
  onChange
}: {
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  return (
    <OutlinedInput
      placeholder={formatMessage(messages.textInput)}
      color='secondary'
      data-testid='text_input'
      name={name}
      className={classes.root}
      onChange={onChange}
    />
  )
}
