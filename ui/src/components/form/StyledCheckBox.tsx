import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { ReactComponent as CheckboxIco } from '@src/assets/common/checkbox.svg'

interface Props {
  value: string
  checked?: boolean
  onCheck?: (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const useStyles = makeStyles({
  checkbox: {
    padding: 0
  }
})

export default function StyledCheckBox({ value, checked, onCheck }: Props) {
  const classes = useStyles()

  const handleStopBubble = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])
  return (
    <Checkbox
      data-testid='styled-checkbox'
      className={classes.checkbox}
      icon={<CheckboxIco />}
      color='primary'
      value={value}
      checked={checked}
      onClick={handleStopBubble}
      onChange={onCheck}
    />
  )
}
