import { SubscriptionKeys } from '@src/models/comics/subscription'
import { _range } from '@src/utils/functions'
import mockImg from './mockImg.png'

export const mockSubscriptionList = _range(0, 3).map(num => ({
  [SubscriptionKeys.InsertedAt]: `2020-04-02 14:0${num}`,
  [SubscriptionKeys.ID]: `SHSA_JP01WJ029931M001_5${num}`,
  [SubscriptionKeys.Name]: '週刊少年ジャンプ定期購読	',
  [SubscriptionKeys.PublishBegin]: `2020-04-02 14:0${num}`,
  [SubscriptionKeys.PublishEnd]: `2020-04-02 14:0${7 - num}`
}))

export const mockSubscriptionDetail = (subscriptionId: string) => ({
  [SubscriptionKeys.ID]: subscriptionId,
  [SubscriptionKeys.Name]: '週刊少年ジャンプ定期購読	',
  [SubscriptionKeys.Image]: {
    url: mockImg,
    width: 100,
    height: 100
  },
  [SubscriptionKeys.InsertedAt]: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  [SubscriptionKeys.PublishBegin]: '2019-12-25 00:00',
  [SubscriptionKeys.PublishEnd]: '2019-12-25 00:00'
})

export const mockSubscriptionProductList = _range(0, 3).map(num => ({
  appId: `少年ジャンプ+ for iOS ${num}`,
  productId: 'SHSA_JP01WJ029931M001_57',
  publicStartTime: `2020-04-02 14:0${num}`,
  publicEndTime: `2020-04-02 14:0${7 - num}`
}))

export const mockSubscriptionProductDetail = (id: string) => ({
  id: id,
  app: '少年ジャンプ+ for iOS',
  productId: 'WORK_SHUNKAN10000006',
  status: 'アクティブ',
  monthlyFee: '900',
  createAt: '2020-04-02 14:00',
  updateAt: '2020-04-02 14:00',
  publicStartTime: '2020-04-02 14:00',
  publicEndTime: '2020-04-02 14:00'
})
