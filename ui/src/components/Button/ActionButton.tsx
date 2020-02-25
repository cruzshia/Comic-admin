import React from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { mainColor } from '@src/common/styles'
import { ButtonTheme } from './buttonTheme'
import clsx from 'clsx'
const useStyles = makeStyles({
  button: {
    background: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: 4,
    width: 180,
    height: 42,
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
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
  disabled: boolean
}

export default function ActionButton({ theme, buttonText, onClick, disabled }: Props) {
  const classes = useStyles()
  return (
    <MaterialButton
      data-testid='action_button'
      disabled={disabled}
      className={clsx(classes.button, theme)}
      onClick={onClick}
    >
      {buttonText}
    </MaterialButton>
  )
}
