import React from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { mainColor } from '@src/common/styles'
import { buttonStyleBase, ButtonTheme } from './buttonTheme'
import clsx from 'clsx'

const useStyles = makeStyles({
  button: {
    ...buttonStyleBase,
    width: 180,
    height: 42,
    fontSize: 16,
    color: '#333333',
    '&.dark': {
      background: mainColor,
      color: '#FFFFFF'
    }
  }
})

interface Props {
  theme?: ButtonTheme
  buttonText: string
  onClick: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Theme = ButtonTheme
export default function ActionButton({ theme, buttonText, onClick, disabled, type }: Props) {
  const classes = useStyles()
  return (
    <MaterialButton
      data-testid='action_button'
      disabled={disabled}
      className={clsx(classes.button, theme)}
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </MaterialButton>
  )
}
