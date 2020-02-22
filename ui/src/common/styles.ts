import { withStyles, createMuiTheme } from '@material-ui/core'

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

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: { main: textColor }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused fieldset': {
          borderWidth: '1px!important'
        },
        '& fieldset': {
          borderColor: borderColor
        },
        '& input::placeholder': {
          color: borderColor,
          opacity: 1
        }
      }
    }
  },
  typography: {
    fontFamily: '"Hiragino Kaku Gothic Pro", "Roboto", "Helvetica", "Arial", "sans-serif"'
  }
})
