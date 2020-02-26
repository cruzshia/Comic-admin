import React, { useCallback } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import { createStyles, makeStyles } from '@material-ui/core'
import selectArrowImg from '@src/assets/form/select_arrow.svg'
interface Props {
  list: any[]
  isShort?: boolean
  open?: boolean
  name?: string
}

const useStyles = makeStyles(() =>
  createStyles({
    long: {
      width: 410
    },
    short: {
      width: 205
    },
    input: {
      padding: '8px 0 8px 15px'
    },
    arrow: {
      paddingRight: 15
    },
    placeholder: {
      color: '#BDBDBD'
    }
  })
)

export default function InputSearch({ list, isShort, open, name }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const [value, setValue] = React.useState<string | number>('')
  const ArrowImg = useCallback(() => <img src={selectArrowImg} alt='select' className={classes.arrow} />, [
    classes.arrow
  ])
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string | number)
  }

  return (
    <>
      <Select
        name={name}
        open={open}
        data-testid='select'
        value={value}
        onChange={handleChange}
        inputProps={{ className: classes.input }}
        variant='outlined'
        color='secondary'
        displayEmpty
        className={isShort ? classes.short : classes.long}
        IconComponent={ArrowImg}
        renderValue={(value: any) => {
          if (value === '') {
            return <span className={classes.placeholder}>{formatMessage(messages.select)}</span>
          }
          return <span>{value}</span>
        }}
      >
        {list &&
          list.map(li => (
            <MenuItem value={li} key={li}>
              {li}
            </MenuItem>
          ))}
      </Select>
    </>
  )
}
