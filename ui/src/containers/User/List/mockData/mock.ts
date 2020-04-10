export const mockUser = {
  id: 'WORK_SHUNKAN10000006',
  nickName: 'サンプルテキスト',
  email: 'サンプルテキスト@gmail.com',
  birthDate: '1983-05',
  gender: '男性',
  favorite: 10,
  lastLoginTime: '2019-12-25 00:00',
  hashPassword: 'サンプルテキスト',
  failedLoginTimes: 100,
  loginLockedTime: '2019-12-25 00:00',
  createDateTime: '2019-12-25 00:00',
  updateDateTime: '2019-12-25 00:00',
  status: 'アクティブ',
  unsubscribeDateTime: '2019-12-25 00:00',
  ios: {
    paidCoins: 100,
    paidBonusCoins: 100,
    paidGiftCoins: 100,
    freeBonusCoin: 100,
    freeAdCoin: 100,
    freeVideoAdCoin: 100
  },
  android: {
    paidCoins: 100,
    paidBonusCoins: 100,
    paidGiftCoins: 100,
    freeBonusCoin: 100,
    freeAdCoin: 100,
    freeVideoAdCoin: 100
  },
  commentAuthorType: '一般ユーザー',
  comments: 10,
  commentAuthority: '投稿可能',
  commentLimitedTermination: null,
  epicsPurchaseLogs: 10,
  subscriptionLogs: 10,
  storePurchaseLogs: 10,
  bonusCoinsChargeLogs: 10,
  paidCoinsChargeLogs: 10,
  device1: 'サンプルテキストのiPhone',
  device2: 'サンプルテキストのiPad '
}

export const mockUserUnit = {
  id: 'aqVOrpPIXxVbmddV87fy',
  userId: 'aqVOrpPIXxVbmddV87fy',
  createDateTime: '2019-12-25 00:00',
  lastLoginTime: '2019-12-25 00:00',
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
