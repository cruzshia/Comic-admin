import React from 'react'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { borderColor } from '@src/common/styles'
import { InputProps } from './inputProps'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    '& span': {
      margin: 8,
      color: borderColor
    },
    '& .MuiOutlinedInput-root': {
      width: 190,
      '& input': {
        padding: '8px 15px'
      }
    }
  }
})

export default function TimeSpanInput({ name, onChange, onBlur, error }: InputProps) {
  const classes = useStyles()
  return (
    <div data-testid='time_span_input' className={classes.root}>
      <OutlinedInput
        placeholder='YYYY-MM-DD-0000'
        color='secondary'
        data-testid='date_time_input'
        name={`${name}Start`}
        onChange={onChange}
        onBlur={onBlur}
        className={clsx({ error: !!error })}
      />
      <span>~</span>
      <OutlinedInput
        placeholder='YYYY-MM-DD-0000'
        color='secondary'
        data-testid='date_time_input'
        name={`${name}End`}
        onChange={onChange}
        onBlur={onBlur}
        className={clsx({ error: !!error })}
      />
      {error && <FormHelperText className='error'>{error}</FormHelperText>}
    </div>
  )
}
