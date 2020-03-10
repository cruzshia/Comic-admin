import React from 'react'
import { InputAdornment, OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import searchImg from '@src/assets/form/search.svg'
import { InputProps } from './inputProps'
import clsx from 'clsx'

interface Props extends InputProps {
  icon?: boolean
}

const useStyles = makeStyles(() => ({
  root: ({ icon }: { icon?: boolean }) => ({
    width: 410,
    '& input': {
      padding: icon ? '8px 15px 8px 0' : '8px 15px'
    }
  })
}))

export default function SearchInput({ name, icon, onChange, onBlur, error, placeholder }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ icon })

  return (
    <div>
      <OutlinedInput
        name={name}
        data-testid='search_input'
        className={clsx(classes.root, { error: !!error })}
        placeholder={placeholder ?? formatMessage(messages.search)}
        color='secondary'
        onChange={onChange}
        onBlur={onBlur}
        startAdornment={
          icon && (
            <InputAdornment position='start' data-testid='search_icon'>
              <img src={searchImg} alt='search icon' />
            </InputAdornment>
          )
        }
      />
      {error && (
        <FormHelperText className='error' data-testid='error'>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}
