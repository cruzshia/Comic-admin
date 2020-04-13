import { useEffect, RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import { ANCHOR_QUERY } from '@src/common/appConfig'
import { topOffset, stickBarOffset } from '@src/common/styles'

interface Props {
  anchorRef: { [key: string]: RefObject<HTMLDivElement> }
  withStickHeader?: boolean
}

export default function ScrollTo({ anchorRef, withStickHeader }: Props) {
  const { search } = useLocation()
  const anchor = new URLSearchParams(search).get(ANCHOR_QUERY)
  useEffect(() => {
    if (anchor && anchorRef.hasOwnProperty(anchor)) {
      const scrollTop = anchorRef[anchor]?.current?.offsetTop || 0
      document.documentElement.scrollTop = withStickHeader
        ? scrollTop - topOffset - stickBarOffset
        : scrollTop - topOffset
    }
  }, [anchor, anchorRef, withStickHeader])

  return null
}
