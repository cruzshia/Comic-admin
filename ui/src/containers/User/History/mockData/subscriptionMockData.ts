import { _range } from '@src/utils/functions'

export const mockSubscriptionList = _range(0, 5).map(num => ({
  id: num,
  createdAt: `2020-01-21 16:3${num}`,
  subscriptionId: 'WORK_SHUNKAN10000006',
  applicationId: '少年ジャンプ+ for iOS',
  price: 900,
  currency: 'JPY',
  startAt: '2020-01-21 16:34',
  updatedAt: '2020-01-21 16:34',
  validityPeriod: '2020-01-21 16:34'
}))

export const mockSubscriptionDetail = {
  createdAt: '2020-04-02 14:00',
  userId: 'WORK_SHUNKAN10000006',
  subscriptionId: 'WORK_SHUNKAN10000006',
  applicationId: '少年ジャンプ+ for iOS',
  price: 900,
  currency: 'JPY',
  startAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  validityPeriod: '2020-04-02 14:00'
}
