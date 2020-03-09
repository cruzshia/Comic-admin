import React from 'react'
import { TextField, makeStyles, FormHelperText } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import { InputProps } from './inputProps'
import clsx from 'clsx'

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

export default function TextArea({ name, onChange, onBlur, error, placeholder }: InputProps) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  return (
    <div>
      <TextField
        data-testid='text_area'
        multiline
        placeholder={placeholder ?? formatMessage(messages.textInput)}
        variant='outlined'
        className={classes.root}
        InputProps={{ className: clsx(classes.inputRoot, { error: !!error }) }}
        color='secondary'
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <FormHelperText className='error'>{error}</FormHelperText>}
    </div>
  )
}
