import { _range } from '@src/utils/functions'

export const mockCampaignList = _range(0, 7).map(idx => ({
  id: `campaign-${idx}`,
  name: 'ゴールデンウィークキャンペーン',
  startAt: `2020-01-21 16:3${idx}`,
  endAt: `2020-01-21 16:3${7 - idx}`
}))
