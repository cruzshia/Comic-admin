export const mockNotificationTotal = 7

export const mockNotification = {
  id: '0',
  status: 'reserved',
  message: '2020年新年ログインボーナス	ログインボー',
  applicationId: 'SHJP01',
  timesPushed: 1000,
  deliveryStartTime: `2019-12-20 00:00`,
  detail: ''
}

export const mockNotificationDetail = {}

export const mockNotificationList = (data => {
  let arr = [mockNotification]
  for (let i = 1; i < mockNotificationTotal; i++) {
    arr.push({
      ...data,
      id: `${i}`,
      message: '2020年新年ログインボーナス	',
      status: i < 3 ? 'reserved' : 'closed',
      deliveryStartTime: `2019-12-2${i} 00:00:0${i}`,
      detail: i === 1 ? '情報の取得に失敗しました' : ''
    })
  }
  return arr
})(mockNotification)
