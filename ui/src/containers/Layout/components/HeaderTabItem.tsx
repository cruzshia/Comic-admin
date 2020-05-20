import React, { memo } from 'react'
import { MessageDescriptor } from 'react-intl'
import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import { mainColor, appBarGrey, headerMenuHeight } from '@src/common/styles'

export interface TabProps {
  icon: React.FC
  title: MessageDescriptor | string
  basePath?: string
  route: string
  fontSize?: 'sm' | 'lg'
  selected?: boolean
}

const TabIcon = ({ marginRight, icon }: { marginRight: number; icon: React.FC }) => {
  const Svg = styled(icon)({
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight
  })
  return <Svg />
}

export default memo(function HeaderTabItem({ icon, title, route, fontSize, selected }: TabProps) {
  const isSmallFont = fontSize === 'sm'
  return (
    <Link to={route}>
      <Box
        data-testid='header-tab'
        position='relative'
        display='flex'
        justifyContent='center'
        padding='20px 0'
        fontSize={isSmallFont ? 12 : 14}
        marginRight={isSmallFont ? '40px' : 0}
        fontWeight={600}
        width={isSmallFont ? 'auto' : 200}
        height={headerMenuHeight}
        color='#FFFFFF'
        bgcolor={appBarGrey}
        className={selected ? 'selected' : undefined}
      >
        <TabIcon icon={icon} marginRight={isSmallFont ? 5 : 10} />
        {title}
        {selected && (
          <Box
            data-testid='highlight_bar'
            position='absolute'
            left={0}
            bottom={0}
            height={5}
            width='100%'
            bgcolor={mainColor}
          />
        )}
      </Box>
    </Link>
  )
})
