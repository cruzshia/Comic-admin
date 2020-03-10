import { useEffect, RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import { ANCHOR_QUERY } from '@src/common/appConfig'
import { topOffset } from '@src/common/styles'

export default function ScrollTo({ anchorRef }: { anchorRef: { [key: string]: RefObject<HTMLDivElement> } }) {
  const { search } = useLocation()
  const anchor = new URLSearchParams(search).get(ANCHOR_QUERY)
  useEffect(() => {
    if (anchor && anchorRef.hasOwnProperty(anchor)) {
      const scrollTop = anchorRef[anchor]?.current?.offsetTop || 0
      document.documentElement.scrollTop = scrollTop - topOffset
    }
  }, [anchor, anchorRef])

  return null
}
