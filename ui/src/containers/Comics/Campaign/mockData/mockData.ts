import { _range } from '@src/utils/functions'

export const mockCampaignList = _range(0, 7).map(idx => ({
  campaignId: `campaign-${idx}`,
  name: 'ゴールデンウィークキャンペーン',
  startAt: `2020-01-21 16:3${idx}`,
  endAt: `2020-01-21 16:3${7 - idx}`
}))

export const mockCampaign = {
  campaignId: 'WORK_SHUNKAN10000006',
  name: 'ゴールデンウィークキャンペーン',
  comment:
    'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
  startAt: '2020-04-02 14:00',
  endAt: '2020-04-02 14:00',
  createAt: '2020-04-02 14:00',
  updateAt: '2020-04-02 14:00'
}

export const mockSubCampaignList = _range(0, 7).map(idx => ({
  id: `campaign-${idx}`,
  type: idx % 2 ? 'works' : 'content',
  name: idx % 2 ? 'GW作品キャンペーン' : 'GWコンテンツキャンペーン',
  target: idx % 2 ? 'こち亀' : 'こち亀 ３話',
  startAt: `2020-01-21 16:3${idx}`,
  endAt: `2020-01-21 16:3${7 - idx}`
}))
