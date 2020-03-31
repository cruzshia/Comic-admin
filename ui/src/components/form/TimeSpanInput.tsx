import React from 'react'
import { Field, useField } from 'react-final-form'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { checkError, required } from '@src/utils/validation'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    '& .MuiOutlinedInput-root': {
      width: 190,
      '& input': {
        padding: '8px 15px'
      }
    }
  },
  separator: {
    display: 'inline-block',
    minWidth: 14,
    margin: '8px',
    color: '#BDBDBD',
    textAlign: 'center'
  }
})

export default function TimeSpanInput({ name = '', isRequired }: { name?: string; isRequired?: boolean }) {
  const classes = useStyles()

  const nameStart = `${name}Start`
  const nameEnd = `${name}End`
  const errorStart = checkError(useField(nameStart).meta)
  const errorEnd = checkError(useField(nameEnd).meta)

  return (
    <div data-testid='time_span_input' className={classes.root}>
      <Field name={nameStart} validate={isRequired ? required : undefined}>
        {({ input }) => (
          <OutlinedInput
            {...input}
            placeholder={DATE_TIME_PLACEHOLDER}
            color='secondary'
            data-testid='date_time_input'
            className={clsx({ error: !!errorStart })}
          />
        )}
      </Field>
      <span className={classes.separator}>~</span>
      <Field name={nameEnd} validate={isRequired ? required : undefined}>
        {({ input }) => (
          <OutlinedInput
            {...input}
            placeholder={DATE_TIME_PLACEHOLDER}
            color='secondary'
            data-testid='date_time_input'
            className={clsx({ error: !!errorEnd })}
          />
        )}
      </Field>
      {(errorStart || errorEnd) && (
        <FormHelperText data-testid='error' className='error'>
          {errorStart ?? errorEnd}
        </FormHelperText>
      )}
    </div>
  )
}
