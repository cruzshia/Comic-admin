import React from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { TextField, makeStyles, FormHelperText } from '@material-ui/core'
import { TEXT_AREA_DEFAULT_ROWS } from '@src/common/constants'
import messages from './messages'
import { InputProps } from './inputProps'

const useStyle = makeStyles({
  root: {
    width: '100%',
    maxWidth: 800,
    '& textarea': {
      width: '100%'
    }
  },
  inputRoot: {
    padding: '10px 15px'
  }
})

interface Props extends InputProps {
  rows?: number
  classnames?: string
}

export default function TextArea({ name, onChange, onBlur, error, placeholder, value, rows, classnames }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  return (
    <div>
      <TextField
        data-testid='text-area'
        multiline
        rows={rows ?? TEXT_AREA_DEFAULT_ROWS}
        placeholder={placeholder ?? formatMessage(messages.textInput)}
        variant='outlined'
        className={clsx(classes.root, classnames)}
        InputProps={{ className: clsx(classes.inputRoot, { error: !!error }) }}
        color='secondary'
        name={name}
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
