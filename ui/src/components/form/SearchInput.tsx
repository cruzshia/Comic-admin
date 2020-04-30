import React from 'react'
import { InputAdornment, OutlinedInput, makeStyles, FormHelperText } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import { mainColor, darkBorderShadow } from '@src/common/styles'
import searchImg from '@src/assets/form/search.svg'
import { InputProps } from './inputProps'
import clsx from 'clsx'

interface Props extends InputProps {
  noIcon?: boolean
}

const useStyles = makeStyles(() => ({
  root: ({ noIcon }: { noIcon?: boolean }) => ({
    '& input': {
      padding: noIcon ? '8px 15px' : '8px 15px 8px 0'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${mainColor}`,
      boxShadow: darkBorderShadow
    }
  })
}))

export default function SearchInput({ name, noIcon, onChange, onBlur, error, placeholder, value }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ noIcon })

  return (
    <>
      <OutlinedInput
        name={name}
        data-testid='search_input'
        className={clsx(classes.root, { error: !!error })}
        placeholder={placeholder ?? formatMessage(messages.search)}
        color='secondary'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        startAdornment={
          !noIcon && (
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
    </>
  )
}
