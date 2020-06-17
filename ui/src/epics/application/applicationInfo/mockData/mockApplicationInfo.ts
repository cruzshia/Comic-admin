import { _range } from '@src/utils/functions'
import ApplicationInfo, { ApplicationInfoKeys, AppInfoList } from '@src/models/application/applicationInfo'

export const mockInfoTotal = 7

export const mockInfoDetail: ApplicationInfo = {
  [ApplicationInfoKeys.Id]: 123,
  [ApplicationInfoKeys.AppIdToken]: 'SHJP01I',
  [ApplicationInfoKeys.Name]: '少年ジャンプ+ for iOS',
  [ApplicationInfoKeys.CommonKey]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.ApnsAuthKey]: '8f0943d888fddd4098...',
  [ApplicationInfoKeys.ApnsTeamIdToken]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.ApnsKeyIdToken]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.FcmApiKey]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.AndroidPublicKey]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.ItunesSharedSecret]: '8f0943d888fddd4098fae24c090707a3',
  [ApplicationInfoKeys.AdditionalSetting]: `{
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
  [ApplicationInfoKeys.CreateAt]: '2019-12-25 00:00 ',
  [ApplicationInfoKeys.UpdatedAt]: '2019-12-25 00:00'
}

export const mockInfoList: AppInfoList = _range(0, 2).map(num => ({
  [ApplicationInfoKeys.AppIdToken]: `SHJP01I${num}`,
  [ApplicationInfoKeys.Name]: '少年ジャンプ+ for iOS	'
}))
