import { _range } from '@src/utils/functions'

export const mockCampaign = {
  campaignId: 'WORK_SHUNKAN10000006',
  contentId: 'WORK_SHUNKAN10000006',
  appId: '少年ジャンプ+ for iOS	',
  priority: 'サンプルテキスト',
  contentPrice: 'サンプルテキスト',
  completeBonus: 'サンプルテキスト',
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  deliverStart: '2019-12-25 00:00',
  deliverEnd: '2019-12-25 00:00',
  campaignStart: '00:00',
  campaignEnd: '00:00'
}

export const mockCampaignList = _range(1, 7).map(num => ({
  campaignId: 'WORK_SHUNKAN10000006',
  contentId: 'WORK_SHUNKAN10000006',
  priority: 100,
  contentPrice: 100,
  completeBonus: 100,
  deliverStart: `2019-12-25 00:0${num}`,
  deliverEnd: '2019-12-25 00:00'
}))
