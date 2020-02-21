import { withStyles } from '@material-ui/core'

export const appBarGrey = '#212121'
export const headerHeight = 40
export const headerMenuHeight = 60
export const topOffset = headerHeight + headerMenuHeight

export const mainColor = '#ED3632'
export const textColor = '#333333'
export const borderColor = '#BDBDBD'
export const backgroundColor = '#F5F5F5'

export const GlobalStyle = withStyles({
  '@global': {
    backgroundColor,
    color: textColor,
    a: {
      textDecoration: 'none'
    }
  }
})(() => null)
