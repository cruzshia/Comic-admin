import { borderColorLight, fontWeightBold } from '@src/common/styles'

export enum ButtonTheme {
  DARK = 'dark',
  LIGHT = 'light'
}

export const buttonStyleBase = {
  border: `1px solid ${borderColorLight}`,
  borderRadius: 4,
  fontWeight: fontWeightBold,
  alignItems: 'center',
  '&.Mui-disabled': {
    color: 'inherit',
    opacity: 0.6
  }
}
