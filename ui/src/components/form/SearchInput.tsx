import React from 'react'
import { InputAdornment, OutlinedInput, createStyles, makeStyles } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import searchImg from '@src/assets/search.svg'

const useStyles = makeStyles(() =>
  createStyles({
    inputIcon: {
      padding: '8px 15px 8px 0'
    },
    input: {
      padding: '8px 15px'
    },
    width: {
      width: 410
    }
  })
)

export default function InputSearch({ name, icon }: { name?: string; icon?: boolean }) {
  const { formatMessage } = useIntl()
  const classes = useStyles()

  return (
    <OutlinedInput
      name={name}
      data-testid='search_input'
      className={classes.width}
      placeholder={formatMessage(messages.search)}
      inputProps={{ className: icon ? classes.inputIcon : classes.input }}
      startAdornment={
        icon && (
          <InputAdornment position='start'>
            <img src={searchImg} alt='search icon' />
          </InputAdornment>
        )
      }
      color='secondary'
    />
  )
}
