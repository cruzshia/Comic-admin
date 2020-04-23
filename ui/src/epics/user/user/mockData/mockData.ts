import { _range } from '@src/utils/functions'

export const mockUserUnit = {
  id: 'aqVOrpPIXxVbmddV87fy',
  userId: 'aqVOrpPIXxVbmddV87fy',
  createDateTime: '2019-12-25 00:00',
  lastLoginTime: '2019-12-25 00:00',
  emailAddress: 'サンプル＊＊＊＊＊＊＊＊＊',
  nickName: 'サンプルテキスト',
  status: 'アクティブ'
}
export const mockUserList = _range(0, 6)
  .map((e, idx) => ({
    ...mockUserUnit,
    id: mockUserUnit.id + idx,
    createDateTime: `2019-12-25 00:0${idx + 1}`,
    lastLoginTime: `2019-12-25 00:0${idx + 1}`,
    status: idx % 2 === 0 ? '退会済み' : 'アクティブ'
  }))
  .concat([{ ...mockUserUnit, id: mockUserUnit.id + 7, status: '退会済み' }])
