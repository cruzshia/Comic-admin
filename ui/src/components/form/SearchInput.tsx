import React from 'react'
import { InputAdornment, OutlinedInput, makeStyles } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import searchImg from '@src/assets/form/search.svg'

interface Props {
  name?: string
  icon?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles(() => ({
  root: ({ icon }: { icon?: boolean }) => ({
    width: 410,
    '& input': {
      padding: icon ? '8px 15px 8px 0' : '8px 15px'
    }
  })
}))

export default function SearchInput({ name, icon, onChange }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ icon })

  return (
    <OutlinedInput
      name={name}
      data-testid='search_input'
      className={classes.root}
      placeholder={formatMessage(messages.search)}
      startAdornment={
        icon && (
          <InputAdornment position='start'>
            <img src={searchImg} alt='search icon' />
          </InputAdornment>
        )
      }
      color='secondary'
      onChange={onChange}
    />
  )
}
