import React from 'react'
import { OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { InputProps } from './inputProps'
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

export default function TimeSpanInput({ name, onChange, onBlur, error }: InputProps) {
  const classes = useStyles()
  return (
    <div data-testid='time_span_input' className={classes.root}>
      <OutlinedInput
        placeholder='YYYY-MM-DD 00:00:00'
        color='secondary'
        data-testid='date_time_input'
        name={`${name}Start`}
        onChange={onChange}
        onBlur={onBlur}
        className={clsx({ error: !!error })}
      />
      <div className={classes.separator}>~</div>
      <OutlinedInput
        placeholder='YYYY-MM-DD 00:00:00'
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
