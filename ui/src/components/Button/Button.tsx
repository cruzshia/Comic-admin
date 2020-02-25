import React from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { mainColor } from '@src/common/styles'
import { ButtonTheme } from './buttonTheme'
import clsx from 'clsx'

const useStyles = makeStyles({
  button: {
    width: 130,
    height: 36,
    background: '#FFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: 4,
    fontSize: 14,
    alignItems: 'center',
    color: '#333333',
    '&.dark': {
      border: `1px solid ${mainColor}`,
      color: mainColor
    },
    '& img': {
      marginRight: 6
    }
  }
})

interface Props {
  theme?: ButtonTheme
  buttonText: string
  onClick: () => void
  disabled: boolean
  icon: string
}

export default function Button({ icon, theme, buttonText, onClick, disabled }: Props) {
  const classes = useStyles()

  return (
    <MaterialButton
      data-testid='normal_button'
      className={clsx(classes.button, theme)}
      onClick={onClick}
      disabled={disabled}
    >
      <img data-testid='button_icon' src={icon} alt={`${buttonText}'s icon`} />
      {buttonText}
    </MaterialButton>
  )
}
