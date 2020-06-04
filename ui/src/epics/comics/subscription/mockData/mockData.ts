import { _range } from '@src/utils/functions'
import mockImg from './mockImg.png'

export const mockSubscriptionList = _range(0, 3).map(num => ({
  createAt: `2020-04-02 14:0${num}`,
  id: `SHSA_JP01WJ029931M001_5${num}`,
  name: '週刊少年ジャンプ定期購読	',
  publicStart: `2020-04-02 14:0${num}`,
  publicEnd: `2020-04-02 14:0${7 - num}`
}))

export const mockSubscriptionDetail = (subscriptionId: string) => ({
  id: subscriptionId,
  name: '週刊少年ジャンプ定期購読	',
  image: mockImg,
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  publicStartTime: '2019-12-25 00:00',
  publicEndTime: '2019-12-25 00:00'
})

export const mockSubscriptionProductList = _range(0, 3).map(num => ({
  appId: `少年ジャンプ+ for iOS ${num}`,
  productId: 'SHSA_JP01WJ029931M001_57',
  publicStartTime: `2020-04-02 14:0${num}`,
  publicEndTime: `2020-04-02 14:0${7 - num}`
}))
