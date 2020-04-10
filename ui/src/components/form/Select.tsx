import React, { useCallback } from 'react'
import { MenuItem, Select, FormHelperText } from '@material-ui/core'
import { useIntl } from 'react-intl'
import messages from './messages'
import { makeStyles } from '@material-ui/core'
import selectArrowImg from '@src/assets/common/expand_more_black.svg'
import { InputProps } from './inputProps'
import clsx from 'clsx'

interface Props extends InputProps {
  options: {
    label: number | string | JSX.Element
    value: any
  }[]
  isShort?: boolean
  open?: boolean
  onChange?: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void
}

const useStyles = makeStyles(() => ({
  root: ({ isShort }: { isShort?: boolean }) => ({
    width: isShort ? 205 : 410,
    '& .MuiSelect-select': {
      padding: '8px 0 8px 15px'
    },
    '& .MuiSelect-icon': {
      right: 15
    }
  }),
  placeholder: {
    color: '#BDBDBD'
  }
}))

export default function SelectMenu({
  options,
  isShort,
  open,
  name,
  onChange,
  onBlur,
  error,
  placeholder,
  value: defaultValue
}: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ isShort })
  const [value, setValue] = React.useState<any>(defaultValue ?? '')
  const ArrowImg = useCallback((props: any) => <img {...props} src={selectArrowImg} alt='select' />, [])
  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValue(e.target.value)
    onChange && onChange(e)
  }

  return (
    <div>
      <Select
        name={name}
        open={open}
        data-testid='select'
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        variant='outlined'
        color='secondary'
        displayEmpty
        className={clsx(classes.root, { error: !!error })}
        IconComponent={ArrowImg}
        renderValue={(value: any) => {
          const selected = options.find(option => option.value === value)
          if (!selected) {
            return <span className={classes.placeholder}>{placeholder ?? formatMessage(messages.select)}</span>
          }
          return <span>{selected.label}</span>
        }}
      >
        {options.map((option, idx) => (
          <MenuItem value={option.value} key={`option-${idx}`}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText className='error'>{error}</FormHelperText>}
    </div>
  )
}
