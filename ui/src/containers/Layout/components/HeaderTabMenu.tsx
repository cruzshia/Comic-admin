import React, { useContext } from 'react'
import { useIntl, MessageDescriptor } from 'react-intl'
import { makeStyles, styled } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { appBarGrey, headerMenuHeight } from '@src/common/styles'
import HeaderTabItem from './HeaderTabItem'
import { HEADER_TABS } from './constants'
import layoutContext from '../context'

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
  minHeight: headerMenuHeight,
  backgroundColor: appBarGrey
})

export default function HeaderTabMenu() {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const { headTab } = useContext(layoutContext)

  return (
    <StyledToolBar data-testid='header_tab_menu'>
      {HEADER_TABS.map(tab => (
        <Typography key={tab.route} variant='subtitle1'>
          <HeaderTabItem
            {...{
              ...tab,
              title: formatMessage(tab.title as MessageDescriptor),
              selected: tab.basePath === `/${headTab}`
            }}
          />
        </Typography>
      ))}
      <div className={classes.spacer} />
    </StyledToolBar>
  )
}
