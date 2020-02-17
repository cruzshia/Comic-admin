import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles, styled } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import { appBarGrey, headerMenuHeight } from '@src/common/styles'
import messages from '../messages'

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1,
    minHeight: headerMenuHeight,
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
  height: headerMenuHeight,
  backgroundColor: appBarGrey
})

interface Props {
  /** show login title or not */
  isLogin: boolean
}

interface TabObject {
  icon: string
  title: string
  route: string
}

const HEADER_TABS: TabObject[] = []

export default function HeaderTabMenu({ isLogin }: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  return (
    <StyledToolBar data-testid='header_tab_menu'>
      {HEADER_TABS.map(() => (
        <Typography variant='subtitle1'>
          <Link className={classes.link} to={routePath.root}>
            {formatMessage(messages.title)}
          </Link>
        </Typography>
      ))}
      <div className={classes.spacer} />
      {isLogin && <div />}
    </StyledToolBar>
  )
}
