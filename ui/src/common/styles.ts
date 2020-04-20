import { withStyles, createMuiTheme } from '@material-ui/core'
import errorAlertImg from '@src/assets/form/error_alert.svg'

export const appBarGrey = '#212121'
export const headerHeight = 40
export const headerMenuHeight = 60
export const topOffset = headerHeight + headerMenuHeight
export const stickBarOffset = 75
export const contentWidth = 1180
export const minTableWidth = 920
export const minWidth = 740
export const sidebarWidth = 200
export const breakpoint = 1440
export const breakpointXs = 1000
export const breakpointSearchForm = 1180

export const inputWidth = 410
export const shortInputWidth = 205

export const mainColor = '#ED3632'
export const textColor = '#333333'
export const borderColor = '#BDBDBD'
export const borderColorLight = '#E0E0E0'
export const backgroundColor = '#F5F5F5'
export const backgroundColorGray = '#E0E0E0'
export const backgroundColorLight = '#F8F8F8'
export const backgroundColorLightGray = '#FAFAFA'
export const disableColor = '#E0E0E0'
export const disableColorDark = '#BDBDBD'
export const fontWeightBold = 600
export const hyperlinkColor = '#1A0DAB'

export const errorColor = '#F5A623'
export const errorBackgroundColor = '#FCEFD9'

export const darkColorHover = '#C4322F'
export const lightColorHover = '#FFF4F4'

export const darkBorderShadow = '0px 0px 4px rgba(237, 54, 50, 0.5)'

// https://material-ui.com/customization/z-index/
export const zIndex = {
  header: 1201,
  stickyBar: 1202
}

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
    secondary: { main: textColor },
    text: {
      primary: textColor,
      secondary: textColor
    }
  },
  overrides: {
    MuiSelect: {
      select: {
        maxWidth: inputWidth,
        width: '100%',
        backgroundColor: '#FFFFFF'
      },
      root: {
        maxWidth: inputWidth,
        width: '100%',
        backgroundColor: '#FFFFFF',
        '&.vearth-input-small': {
          width: shortInputWidth
        }
      }
    },
    MuiOutlinedInput: {
      multiline: {
        maxWidth: 'none'
      },
      root: {
        fontSize: 14,
        lineHeight: '24px',
        fontWeight: 'normal',
        maxWidth: inputWidth,
        width: '100%',
        minHeight: 36,
        backgroundColor: '#FFFFFF',
        '&.vearth-input-small': {
          maxWidth: shortInputWidth
        },
        '&.Mui-focused fieldset': {
          borderWidth: '1px!important'
        },
        '& fieldset': {
          borderColor: borderColor
        },
        '& input::placeholder': {
          color: borderColor,
          opacity: 1
        },
        '&.error': {
          backgroundColor: errorBackgroundColor
        }
      }
    },
    MuiFormHelperText: {
      root: {
        '&.error': {
          color: errorColor,
          fontWeight: 600,
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: `url(${errorAlertImg})`,
            marginRight: 7
          }
        }
      }
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: lightColorHover,
          '&.dark': {
            backgroundColor: darkColorHover
          },
          '&.dark_border,&.light': {
            backgroundColor: lightColorHover
          }
        },
        '&.Mui-disabled': {
          color: disableColor,
          '&.dark': {
            backgroundColor: disableColorDark,
            border: 'none'
          },
          '&.dark_border': {
            color: disableColor,
            border: `1px solid ${disableColor}`
          },
          '& svg g path': {
            fill: disableColor
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Hiragino Kaku Gothic Pro", "Roboto", "Helvetica", "Arial", "sans-serif"',
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    h6: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: fontWeightBold
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: fontWeightBold
    }
  }
})
