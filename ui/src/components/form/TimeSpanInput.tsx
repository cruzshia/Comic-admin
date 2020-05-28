import React from 'react'
import { Field, useField } from 'react-final-form'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { checkError } from '@src/utils/validation'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    '& .MuiOutlinedInput-root': {
      maxWidth: 190,
      width: 'calc(50% - 15px)',
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

interface Props {
  name?: string
  nameStart?: string
  nameEnd?: string
}

export default function TimeSpanInput({ name = '', nameStart, nameEnd }: Props) {
  const classes = useStyles()

  const start = nameStart || `${name}Start`
  const end = nameEnd || `${name}End`
  const errorStart = checkError(useField(start).meta)
  const errorEnd = checkError(useField(end).meta)

  return (
    <div data-testid='time_span_input' className={classes.root}>
      <Field name={start}>
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
      <span className={classes.separator}>～</span>
      <Field name={end}>
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
