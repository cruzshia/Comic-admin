import React, { useCallback } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import { makeStyles } from '@material-ui/core'
import selectArrowImg from '@src/assets/form/select_arrow.svg'
interface Props {
  list: any[]
  isShort?: boolean
  open?: boolean
  name?: string
  onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void
}

const useStyles = makeStyles(() => ({
  root: ({ isShort }: { isShort?: boolean }) => ({
    width: isShort ? 205 : 410,
    '& 	.MuiSelect-select': {
      padding: '8px 0 8px 15px'
    },
    '& img': {
      paddingRight: 15
    }
  }),
  placeholder: {
    color: '#BDBDBD'
  }
}))

export default function SelectMenu({ list, isShort, open, name, onChange }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ isShort })
  const [value, setValue] = React.useState<string | number>('')
  const ArrowImg = useCallback(() => <img src={selectArrowImg} alt='select' />, [])
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValue(event.target.value as string | number)
    onChange && onChange(event)
  }

  return (
    <>
      <Select
        name={name}
        open={open}
        data-testid='select'
        value={value}
        onChange={handleChange}
        variant='outlined'
        color='secondary'
        displayEmpty
        className={classes.root}
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
