import { _range } from '@src/utils/functions'

export const mockSubscriptionList = _range(0, 3).map(num => ({
  createAt: `2020-04-02 14:0${num}`,
  id: `SHSA_JP01WJ029931M001_5${num}`,
  name: '週刊少年ジャンプ定期購読	',
  publicStart: `2020-04-02 14:0${num}`,
  publicEnd: `2020-04-02 14:0${7 - num}`
}))
