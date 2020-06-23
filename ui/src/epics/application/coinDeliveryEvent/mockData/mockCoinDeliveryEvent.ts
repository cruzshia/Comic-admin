import {
  CoinEventKeys,
  EventType,
  CoinEventRewardType,
  CoinEventRewardRestriction,
  CoinEventRewardKeys
} from '@src/models/application/coinDeliveryEvent'
import { _range } from '@src/utils/functions'

export const mockEventTotal = 7

export const mockEventDetail = {
  [CoinEventKeys.ID]: 'WORK_SHUNKAN10000006',
  [CoinEventKeys.CustomEventIdToken]: 'WORK_SHUNKAN10000006',
  [CoinEventKeys.Name]: 'サンプルテキスト',
  [CoinEventKeys.EventType]: EventType.OneTime,
  [CoinEventKeys.Rewards]: _range(0, 4).map(num => ({
    [CoinEventRewardKeys.ResultCode]: `win${num}`,
    [CoinEventRewardKeys.Type]: num % 2 === 0 ? CoinEventRewardType.BonusCoin : CoinEventRewardType.PayGiftCoin,
    [CoinEventRewardKeys.Amount]: num + 1,
    [CoinEventRewardKeys.Restriction]:
      num % 3 === 0 ? CoinEventRewardRestriction.OneTime : CoinEventRewardRestriction.NoneRestriction
  })),
  [CoinEventKeys.InsertedAt]: '2020-04-02 14:00',
  [CoinEventKeys.UpdatedAt]: '2020-04-02 14:00',
  [CoinEventKeys.PublishBeginAt]: '2020-04-02 14:00',
  [CoinEventKeys.PublishEndAt]: '2020-04-02 14:00'
}

export const mockEventList = _range(0, mockEventTotal).map(num => ({
  [CoinEventKeys.ID]: `SHJP01_LGB20200${num}`,
  [CoinEventKeys.CustomEventIdToken]: '',
  [CoinEventKeys.Name]: '2020年新年ログインボーナス',
  [CoinEventKeys.EventType]: num % 2 === 0 ? EventType.Daily : EventType.OneTime,
  [CoinEventKeys.PublishBeginAt]: `2020-04-02 14:0${num}`,
  [CoinEventKeys.PublishEndAt]: `2020-04-02 14:0${mockEventTotal - num}`
}))
