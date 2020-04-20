import React, { useContext } from 'react'
import { useIntl, MessageDescriptor } from 'react-intl'
import { styled } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { appBarGrey, headerMenuHeight, disableColorDark } from '@src/common/styles'
import HeaderTabItem from './HeaderTabItem'
import { HEADER_TABS, HEADER_TABS_RIGHT } from './constants'
import layoutContext from '../context'

const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  height: headerMenuHeight,
  minHeight: headerMenuHeight,
  backgroundColor: appBarGrey,
  '& .MuiBox-root:first-child .MuiBox-root': {
    color: disableColorDark,
    '& svg path': {
      fill: disableColorDark
    },
    '&:hover,&.selected': {
      color: '#FFFFFF',
      '& svg path': {
        fill: '#FFFFFF'
      }
    }
  }
})

export default function HeaderTabMenu() {
  const { formatMessage } = useIntl()
  const { headTab } = useContext(layoutContext)

  return (
    <StyledToolBar data-testid='header_tab_menu'>
      <Box display='flex'>
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
      </Box>
      <Box display='flex'>
        {HEADER_TABS_RIGHT.map(tab => (
          <Typography key={tab.route} variant='subtitle1'>
            <HeaderTabItem
              fontSize='sm'
              {...{
                ...tab,
                title: formatMessage(tab.title as MessageDescriptor),
                selected: tab.basePath === `/${headTab}`
              }}
            />
          </Typography>
        ))}
      </Box>
    </StyledToolBar>
  )
}
