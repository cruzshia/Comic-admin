import { _range } from '@src/utils/functions'
export const mockEventTotal = 7

export const mockEventDetail = {
  id: 'WORK_SHUNKAN1000000',
  eventId: 'WORK_SHUNKAN10000006',
  eventName: 'サンプルテキスト',
  eventType: 'サンプルテキスト',
  eventRewardSetting: 'サンプルテキスト',
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  releaseStartAt: '2020-04-02 14:00',
  releaseEndAt: '2020-04-02 14:00'
}

const type = ['1日1回', '1回限り']
export const mockEventList = _range(0, mockEventTotal).map(num => ({
  eventId: `SHJP01_LGB20200${num}`,
  eventName: '2020年新年ログインボーナス',
  eventType: type[num % 2],
  releaseStartAt: `2020-04-02 14:0${num}`,
  releaseEndAt: `2020-04-02 14:0${mockEventTotal - num}`
}))
