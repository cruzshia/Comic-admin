import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles, styled } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import messages from './messages'
import { headerHeight } from '@src/common/styles'
import { appBarGrey } from '@src/common/styles'

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1,
    height: headerHeight,
    backgroundColor: appBarGrey,
    zIndex: theme.zIndex.drawer + 1
  },
  spacer: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:visited': {
      color: '#fff'
    }
  }
}))

const StyledToolBar = styled(Toolbar)({
  minHeight: headerHeight
})

interface Props {
  /** show login title or not */
  isLogin: boolean
}

export default function Header({ isLogin }: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  return (
    <AppBar className={classes.header}>
      <StyledToolBar>
        <Typography variant='subtitle1'>
          <Link className={classes.link} to='/'>
            {formatMessage(messages.title)}
          </Link>
        </Typography>
        <div className={classes.spacer} />
        <div>
          {isLogin ? (
            'Welcome'
          ) : (
            <Link className={classes.link} to='login'>
              Login
            </Link>
          )}
        </div>
      </StyledToolBar>
    </AppBar>
  )
}
