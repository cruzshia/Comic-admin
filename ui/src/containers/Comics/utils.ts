import { useRef } from 'react'

export const IMAGE_NUM = 4
export const IMAGE_MAX_WIDTH = '40%'

export enum ScrollAnchor {
  Delivery = 'delivery',
  AdSetting = 'adSetting',
  EpisodeInfo = 'episodeInfo',
  CampaignTime = 'campaignTime'
}

export const useComicsRef = () => {
  const deliveryRef = useRef<HTMLDivElement>(null)
  const adSettingRef = useRef<HTMLDivElement>(null)
  const episodeInfoRef = useRef<HTMLDivElement>(null)
  const campaignTimeRef = useRef<HTMLDivElement>(null)
  const allAnchorRefs = {
    [ScrollAnchor.Delivery]: deliveryRef,
    [ScrollAnchor.AdSetting]: adSettingRef,
    [ScrollAnchor.EpisodeInfo]: episodeInfoRef,
    [ScrollAnchor.CampaignTime]: campaignTimeRef
  }

  return {
    allAnchorRefs,
    deliveryRef,
    adSettingRef,
    episodeInfoRef,
    campaignTimeRef
  }
}
