import React from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import messages from './messages'
import { InputProps } from './inputProps'

const useStyles = makeStyles({
  root: {
    '& input': {
      padding: '8px 15px'
    }
  }
})

interface Props extends InputProps {
  isShort?: boolean
}

export default function AmountInput({ name, onChange, onBlur, error, placeholder, value, isShort }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  return (
    <div>
      <OutlinedInput
        placeholder={placeholder ?? formatMessage(messages.textInput)}
        color='secondary'
        data-testid='amount_input'
        name={name}
        className={clsx(classes.root, { error: !!error, 'vearth-input-small': !!isShort })}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type='number'
      />
      {error && (
        <FormHelperText className='error' data-testid='error'>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}
