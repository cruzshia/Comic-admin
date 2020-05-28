import { useRef } from 'react'

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
