import React, { useState, useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import Box from '@material-ui/core/Box'
import RootRef from '@material-ui/core/RootRef'
import useBreakpoint from '@src/hooks/useBreakpoint'
import { borderColorLight, topOffset, contentWidth, sidebarWidth, zIndex } from '@src/common/styles'

interface Props {
  top: number
  children: React.ReactNode
  contentOffset?: number
}

const offsetLeft = 30
export default function StickyBar({ top, contentOffset = 0, children }: Props) {
  const [visible, setVisible] = useState<boolean>(false)
  const domRef = useRef<HTMLDivElement>(null)
  const { isResponsive } = useBreakpoint()
  const paddingRight = isResponsive
    ? `${offsetLeft + sidebarWidth}px`
    : `calc(100% - ${offsetLeft}px - ${contentWidth}px)`

  useEffect(() => {
    const displayPos = top + (contentOffset || domRef.current!.clientHeight)
    const subscription = fromEvent(document, 'scroll').subscribe(() => {
      setVisible(document.documentElement.scrollTop > displayPos)
    })
    return () => subscription.unsubscribe()
  }, [top, contentOffset])

  return (
    <RootRef rootRef={domRef}>
      <Box
        data-testid='sticky-bar'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        marginLeft={`-${offsetLeft}px`}
        padding={`12px ${paddingRight} 12px ${offsetLeft}px`}
        position='fixed'
        top={topOffset + top}
        bgcolor='#FFFFFF'
        zIndex={zIndex.stickyBar}
        borderBottom={`1px solid ${borderColorLight}`}
        visibility={visible ? 'visible' : 'hidden'}
      >
        {children}
      </Box>
    </RootRef>
  )
}
