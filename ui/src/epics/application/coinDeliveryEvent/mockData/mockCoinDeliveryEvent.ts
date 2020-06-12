import { CoinDeliveryEventKeys, EventType } from '@src/models/application/coinDeliveryEvent'
import { _range } from '@src/utils/functions'
export const mockEventTotal = 7

export const mockEventDetail = {
  id: 'WORK_SHUNKAN10000006',
  eventId: 'WORK_SHUNKAN10000006',
  eventName: 'サンプルテキスト',
  eventType: 'サンプルテキスト',
  eventRewardSetting: 'サンプルテキスト',
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  releaseStartAt: '2020-04-02 14:00',
  releaseEndAt: '2020-04-02 14:00'
}

export const mockEventList = _range(0, mockEventTotal).map(num => ({
  [CoinDeliveryEventKeys.ID]: `SHJP01_LGB20200${num}`,
  [CoinDeliveryEventKeys.CustomEventIdToken]: '',
  [CoinDeliveryEventKeys.Name]: '2020年新年ログインボーナス',
  [CoinDeliveryEventKeys.EventType]: num % 2 === 0 ? EventType.Daily : EventType.OneTime,
  [CoinDeliveryEventKeys.PublishBeginAt]: `2020-04-02 14:0${num}`,
  [CoinDeliveryEventKeys.PublishEndAt]: `2020-04-02 14:0${mockEventTotal - num}`
}))
