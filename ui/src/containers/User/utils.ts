import { useRef } from 'react'

export const toListTableData = (data: any, theadList: Object) => {
  return Object.values(theadList).reduce(
    (acc, key) => ({
      ...acc,
      [key]: data[key]
    }),
    {} as any
  )
}

export enum ScrollAnchor {
  ReleaseDuration = 'releaseDuration',
  Content = 'content'
}

export const useUserRef = () => {
  const releaseDurationRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const allAnchorRefs = {
    [ScrollAnchor.ReleaseDuration]: releaseDurationRef,
    [ScrollAnchor.Content]: contentRef
  }

  return {
    allAnchorRefs,
    releaseDurationRef,
    contentRef
  }
}
