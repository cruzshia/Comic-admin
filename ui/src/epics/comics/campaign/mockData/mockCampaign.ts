import { _range } from '@src/utils/functions'
import { CampaignType } from '@src/models/comics/campaign'

export const mockCampaignList = _range(0, 7).map(idx => ({
  id: idx,
  name: 'ゴールデンウィークキャンペーン',
  begin_at: `2020-01-21 16:3${idx}`,
  end_at: `2020-01-21 16:3${7 - idx}`,
  inserted_at: '2020-04-02 14:00',
  update_at: '2020-04-02 14:00',
  note:
    'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト'
}))

export const mockListResponse = {
  total_count: 100,
  campaigns: mockCampaignList
}

export const mockCampaign = {
  id: 0,
  name: 'ゴールデンウィークキャンペーン',
  begin_at: '2020-04-02 14:00',
  end_at: '2020-04-02 14:00',
  inserted_at: '2020-04-02 14:00',
  update_at: '2020-04-02 14:00',
  note:
    'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト'
}

export const mockAssociatedCampaignList = _range(0, 7).map(idx => ({
  id: idx,
  campaign_type: idx % 2 ? ('work_campaign' as CampaignType) : ('content_campaign' as CampaignType),
  name: idx % 2 ? 'GW作品キャンペーン' : 'GWコンテンツキャンペーン',
  campaign_target: idx % 2 ? 'こち亀' : 'こち亀 ３話',
  begin_at: `2020-01-21 16:3${idx}`,
  end_at: `2020-01-21 16:3${7 - idx}`
}))

export const mockSubListResponse = {
  total_count: 100,
  associated_campaigns: mockAssociatedCampaignList
}
