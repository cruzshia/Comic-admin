import { _range } from '@src/utils/functions'

export const mockInfoTotal = 7

export const mockInfoDetail = {
  applicationId: 'SHJP01I',
  applicationName: '少年ジャンプ+ for iOS',
  commonKey: '8f0943d888fddd4098fae24c090707a3',
  apnsValidityPeriod: ' 2020-03-18 13:58:51 〜 2021-04-17 13:58:51',
  apnsCertificate: '8f0943d888fddd4098...',
  fcnmApiKey: '8f0943d888fddd4098fae24c090707a3',
  androidPublicKey: '8f0943d888fddd4098fae24c090707a3',
  iTunesPublicKey: '8f0943d888fddd4098fae24c090707a3',
  supplementSetting: `{
    "account_popup_frequency" : 3,
    "store_review_popup_frequency" : 10,
    "ranking_category_for_man" : "男性",
    "ranking_category_for_woman" : "女性",
    "ranking_category_for_oneshot" : "読切",
    "advertising_campaign_start_time" : "2019-09-26T00:00",
    "advertising_campaign_end_time" : "2099-09-26T00:00",
    "advertising_campaign_rate" : [
      {
        "type" : "adstir",
        "rate" : "50"
      },
      {
        "type" : "fluct",
        "rate" : "50"
      }
    ]
  }`,
  createdAt: '2019-12-25 00:00 '
}

export const mockInfoList = _range(0, 2).map(num => ({
  applicationId: `SHJP01I${num}`,
  applicationName: '少年ジャンプ+ for iOS	',
  commonKey: '8f0943d888fddd4098fae24c090707a3	'
}))