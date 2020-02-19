import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles, styled } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { routePath } from '@src/common/appConfig'
import { appBarGrey, headerMenuHeight } from '@src/common/styles'
import comicIcon from '@src/assets/header/comic_icon.svg'
import HeaderTabItem, { TabProps } from './HeaderTabItem'
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
    color: '#FFFFFF',
    '&:visited': {
      color: '#FFFFFF'
    }
  }
}))

const StyledToolBar = styled(Toolbar)({
  padding: 0,
  height: headerMenuHeight,
  backgroundColor: appBarGrey
})

interface Props {
  isLogin: boolean
}

export default function HeaderTabMenu({ isLogin }: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const HEADER_TABS: TabProps[] = useMemo(
    () => [
      {
        icon: comicIcon,
        title: formatMessage(messages.comicManagement),
        route: routePath.comic.base,
        selected: true
      }
    ],
    [formatMessage]
  )

  return (
    <StyledToolBar data-testid='header_tab_menu'>
      {HEADER_TABS.map(tab => (
        <Typography key={tab.route} variant='subtitle1'>
          <HeaderTabItem {...tab} />
        </Typography>
      ))}
      <div className={classes.spacer} />
      {isLogin && <div />}
    </StyledToolBar>
  )
}
