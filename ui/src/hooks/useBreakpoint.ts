import { useMediaQuery } from '@material-ui/core'
import { breakpoint, breakpointXs, breakpointSearchForm } from '@src/common/styles'

export default function useBreakpoint() {
  const isResponsive = useMediaQuery(`(max-width: ${breakpoint}px)`)
  const isXs = useMediaQuery(`(max-width: ${breakpointXs}px)`)
  const isSearchResponsive = useMediaQuery(`(max-width: ${breakpointSearchForm}px)`)

  return {
    isResponsive,
    isXs,
    isSearchResponsive
  }
}
