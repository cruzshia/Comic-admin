import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ANCHOR_QUERY } from '@src/common/appConfig'

export default function ScrollTop() {
  const { search, pathname } = useLocation()
  useEffect(() => {
    if (!new URLSearchParams(search).get(ANCHOR_QUERY)) {
      document.documentElement.scrollTop = 0
    }
  }, [search, pathname])

  return null
}
