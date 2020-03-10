import React, { useState, useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import Box from '@material-ui/core/Box'
import RootRef from '@material-ui/core/RootRef'
import { borderColorLight, topOffset } from '@src/common/styles'

export default function StickyBar({ top, children }: { top: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState<boolean>(false)
  const domRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const displayPos = top + (domRef.current!.clientHeight ?? 0)
    const subscription = fromEvent(document, 'scroll').subscribe(() => {
      if (document.documentElement.scrollTop > displayPos) {
        setVisible(true)
        return
      }
      setVisible(false)
    })
    return () => subscription.unsubscribe()
  }, [top])

  return (
    <RootRef rootRef={domRef}>
      <Box
        data-testid='sticky-bar'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        maxWidth={1180}
        padding='12px 30px'
        position='fixed'
        top={topOffset + top}
        bgcolor='#FFFFFF'
        borderBottom={`1px solid ${borderColorLight}`}
        visibility={visible ? 'visible' : 'hidden'}
      >
        {children}
      </Box>
    </RootRef>
  )
}
