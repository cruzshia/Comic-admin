import React, { memo } from 'react'
import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import { mainColor } from '@src/common/styles'

export interface TabProps {
  icon: string
  title: string
  route: string
  fontSize?: 'sm' | 'lg'
  selected?: boolean
}

const TabIcon = ({ marginRight, src, alt }: { marginRight: number; src: string; alt: string }) => {
  const Img = styled('img')({
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight
  })
  return <Img src={src} alt={alt} />
}

export default memo(function HeaderTabItem({ icon, title, route, fontSize, selected }: TabProps) {
  const isSmallFont = fontSize === 'sm'
  return (
    <Link to={route}>
      <Box
        position='relative'
        display='flex'
        justifyContent='center'
        fontSize={isSmallFont ? 12 : 14}
        fontWeight={600}
        width={200}
      >
        <TabIcon src={icon} alt={title} marginRight={isSmallFont ? 5 : 10} />
        {title}
        {selected && (
          <Box
            data-testid='highlight_bar'
            position='absolute'
            left={0}
            bottom={-20}
            height={5}
            width='100%'
            bgcolor={mainColor}
          />
        )}
      </Box>
    </Link>
  )
})
