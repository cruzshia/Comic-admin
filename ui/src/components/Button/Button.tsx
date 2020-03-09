import React, { SVGProps } from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { mainColor, textColor } from '@src/common/styles'
import { buttonStyleBase, ButtonTheme } from './buttonTheme'
import clsx from 'clsx'

const useStyles = makeStyles({
  button: {
    ...buttonStyleBase,
    padding: 0,
    minWidth: 136,
    height: 36,
    background: '#FFFFF',
    fontSize: 14,
    color: textColor,
    '& .MuiButton-label': {
      margin: '6px 20px 6px 20px'
    },
    '&.dark_border': {
      borderColor: mainColor,
      color: mainColor,
      '& svg, g, path': {
        fill: mainColor
      }
    },
    '& svg, g, path': {
      fill: textColor
    },
    '&.dark': {
      background: mainColor,
      color: '#FFFFFF',
      '& svg, g, path': {
        fill: '#FFFFFF'
      }
    }
  },
  icon: {
    marginRight: 5
  }
})

interface Props {
  theme?: ButtonTheme
  buttonText: string
  onClick?: () => void
  disabled?: boolean
  icon?: React.FC<SVGProps<SVGSVGElement>>
}

export default function Button({ icon: Icon, theme, buttonText, onClick, disabled }: Props) {
  const classes = useStyles()

  return (
    <MaterialButton
      data-testid='normal_button'
      className={clsx(classes.button, theme)}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className={classes.icon} data-testid='button_icon' />}
      {buttonText}
    </MaterialButton>
  )
}
