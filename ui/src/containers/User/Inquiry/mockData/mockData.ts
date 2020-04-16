import { _range } from '@src/utils/functions'

export const mockInquiryList = _range(0, 5).map(num => ({
  inquiryAt: `2020-01-21 16:3${num}`,
  id: `WORK_SHUNKAN1000000${num}`,
  type: 'サンプル',
  message: '12月の請求が12月1日と12月31日と2回来ているのはなぜですか？ 定期購読は少年ジャンプしかしていないです。',
  appVersion: '2.6.1'
}))

export const mockInquiryData = {
  id: 'WORK_SHUNKAN10000006',
  userId: 'WORK_SHUNKAN10000006',
  inquiryType: 'お問い合わせ種別',
  appVersion: '2.6.1',
  message: '12月の請求が12月1日と12月31日と2回来ているのはなぜですか？ 定期購読は少年ジャンプしかしていないです。',
  inquiryAt: '2020-04-02 14:00'
}
