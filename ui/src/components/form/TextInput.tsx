import React from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import messages from './messages'
import { InputProps } from './inputProps'

const useStyles = makeStyles(() => ({
  root: {
    width: short => (short ? 205 : 410),
    '& input': {
      padding: '8px 15px'
    }
  }
}))

interface Props extends InputProps {
  short?: boolean
}

export default function TextInput({ name, onChange, onBlur, error, placeholder, value, short }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles(!!short)
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
