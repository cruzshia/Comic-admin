import React, { SVGProps } from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { mainColor } from '@src/common/styles'
import { buttonStyleBase, ButtonTheme } from './buttonTheme'
import clsx from 'clsx'

const useStyles = makeStyles({
  button: {
    ...buttonStyleBase,
    width: 130,
    height: 36,
    '&.dark': {
      border: `1px solid ${mainColor}`,
      color: mainColor,
      '& svg, g, path': {
        fill: mainColor
      }
    },
    '& svg, g, path': {
      fill: '#333333'
    }
  },
  icon: {
    marginRight: '5px'
  }
})

interface Props {
  theme?: ButtonTheme
  buttonText: string
  onClick: () => void
  disabled: boolean
  icon: React.FC<SVGProps<SVGSVGElement>>
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
      <Icon className={classes.icon} data-testid='button_icon' />
      {buttonText}
    </MaterialButton>
  )
}
