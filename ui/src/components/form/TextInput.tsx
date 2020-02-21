import React from 'react'
import { withStyles, OutlinedInput } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'

const Input = withStyles({
  root: {
    width: 410,
    '& input': {
      padding: '8px 15px'
    }
  }
})(OutlinedInput)

export default function InputSearch({ name }: { name?: string }) {
  const { formatMessage } = useIntl()

  return (
    <Input placeholder={formatMessage(messages.textInput)} color='secondary' data-testid='text_input' name={name} />
  )
}
