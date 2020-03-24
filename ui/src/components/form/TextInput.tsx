import React from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import messages from './messages'
import { InputProps } from './inputProps'

const useStyles = makeStyles({
  root: {
    width: 410,
    '& input': {
      padding: '8px 15px'
    }
  }
})

export default function TextInput({ name, onChange, onBlur, error, placeholder, value }: InputProps) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  return (
    <div>
      <OutlinedInput
        placeholder={placeholder ?? formatMessage(messages.textInput)}
        color='secondary'
        data-testid='text_input'
        name={name}
        className={clsx(classes.root, { error: !!error })}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <FormHelperText className='error' data-testid='error'>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}
