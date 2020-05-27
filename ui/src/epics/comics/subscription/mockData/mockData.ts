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
  magazineName: '週刊少年ジャンプ定期購読	',
  deviceType: 'common',
  monthlyFee: `[SHJP01A] 891円, 税込 980円
[browser] 891円, 税込 980円
[SHJP01A_EN] 891円, 税込 980円`,
  image: mockImg,
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  deliverStart: '2019-12-25 00:00',
  deliverEnd: '2019-12-25 00:00'
})
