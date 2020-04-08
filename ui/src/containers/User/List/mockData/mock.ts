export const mockUserUnit = {
  id: 'aqVOrpPIXxVbmddV87fy',
  userId: 'aqVOrpPIXxVbmddV87fy',
  createDateTime: '2019-12-25 00:00:00',
  lastLoginTime: '2019-12-25 00:00:00',
  emailAddress: 'サンプル＊＊＊＊＊＊＊＊＊',
  nickName: 'サンプルテキスト',
  status: 'アクティブ'
}
export const mockUserList = new Array(6)
  .fill(0)
  .map((e, idx) => ({
    ...mockUserUnit,
    id: mockUserUnit.id + idx,
    status: idx % 2 === 0 ? 'アクティブ' : '退会済み'
  }))
  .concat([{ ...mockUserUnit, status: '退会済み' }])
