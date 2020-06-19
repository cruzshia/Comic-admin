import { useRef } from 'react'
import { WorkType } from '@src/models/comics/work'
import { SettingType } from '@src/models/comics/advertisement'
import workMessages from './Work/messages'

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

export const daysOfWeekOptions = ['日', '月', '水', '火', '木', '金', '土'].map(day => ({ label: day, value: day }))
export const deviceTypes = Object.values(SettingType)
export const workTypes = Object.values(WorkType).map(type => ({
  label: workMessages[type],
  value: type
}))
