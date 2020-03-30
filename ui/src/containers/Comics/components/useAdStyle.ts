import { makeStyles } from '@material-ui/core'
import { fontWeightBold, borderColor } from '@src/common/styles'

export default makeStyles(() => ({
  root: {
    position: 'relative',
    width: 920,
    padding: '20px 40px 21px 15px',
    backgroundColor: '#FAFAFA',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    '& .min_height': {
      minHeight: 230
    }
  },
  menu: {
    marginRight: '30px'
  },
  delete: {
    position: 'absolute',
    right: '-12px',
    top: '-12px',
    cursor: 'pointer'
  },
  rowContainer: {
    maxWidth: 655
  },
  button: {
    marginLeft: '10px'
  },
  preview: {
    position: 'absolute',
    top: 20,
    right: 40,
    width: 126,
    height: 189,
    border: `1px dashed ${borderColor}`,
    '&.no_border': {
      border: 'none'
    },
    '& img': {
      maxWidth: '100%'
    }
  },
  lastRow: {
    marginBottom: 0
  },
  row: {
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: 0
    },
    '& .MuiTypography-body1': {
      marginRight: '30px'
    }
  },
  label: {
    width: 65,
    fontSize: 12,
    fontWeight: fontWeightBold
  }
}))
