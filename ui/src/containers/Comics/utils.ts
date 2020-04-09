import { useRef } from 'react'

export const IMAGE_NUM = 7
export const IMAGE_MAX_WIDTH = '40%'

export enum ScrollAnchor {
  Delivery = 'delivery',
  AdSetting = 'adSetting',
  EpisodeInfo = 'episodeInfo'
}

export const useComicsRef = () => {
  const deliveryRef = useRef<HTMLDivElement>(null)
  const adSettingRef = useRef<HTMLDivElement>(null)
  const episodeInfoRef = useRef<HTMLDivElement>(null)
  const anchorRefs = {
    [ScrollAnchor.Delivery]: deliveryRef,
    [ScrollAnchor.AdSetting]: adSettingRef,
    [ScrollAnchor.EpisodeInfo]: episodeInfoRef
  }

  return {
    anchorRefs,
    deliveryRef,
    adSettingRef,
    episodeInfoRef
  }
}
