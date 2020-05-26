export const mockNotification = {
  id: '0',
  status: 'reserved',
  message: '2020年新年ログインボーナスログインボー',
  applicationId: 'SHJP01',
  timesPushed: 1000,
  scheduledStartTime: `2019-12-20 00:00`,
  detail: ''
}

export const mockNotificationDetail = {
  id: '0',
  title: 'title',
  status: 'reserved',
  message: '2020年新年ログインボーナスログインボー',
  applicationId: 'SHJP01',
  timesPushed: 1000,
  deliveryStartTime: `2019-12-20 00:00`,
  detail: ''
}

export const mockNotificationList = (data => {
  let arr = [mockNotification]
  for (let i = 1; i < 7; i++) {
    arr.push({
      ...data,
      id: `${i}`,
      message: '2020年新年ログインボーナス	',
      status: i < 3 ? 'reserved' : 'closed',
      scheduledStartTime: `2019-12-2${i} 00:0${i}`,
      detail: i === 1 ? '情報の取得に失敗しました' : ''
    })
  }
  return arr
})(mockNotification)