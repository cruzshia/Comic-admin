import React, { useCallback } from 'react'
import { makeStyles, FormHelperText } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { ReactComponent as CheckboxIco } from '@src/assets/common/checkbox.svg'
import clsx from 'clsx'
import { InputProps } from './inputProps'

interface Props extends InputProps {
  id?: string
  onCheck?: (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const useStyles = makeStyles({
  root: {
    padding: 0
  }
})

export default function StyledCheckBox({ id, value, checked, onCheck, onChange, error }: Props) {
  const classes = useStyles()

  const handleStopBubble = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])
  return (
    <>
      <Checkbox
        data-testid='styled-checkbox'
        id={id}
        className={clsx(classes.root, { error: !!error })}
        icon={<CheckboxIco />}
        color='primary'
        value={value}
        checked={checked}
        onClick={handleStopBubble}
        onChange={onCheck || onChange}
      />
      {error && <FormHelperText className='error'>{error}</FormHelperText>}
    </>
  )
}
