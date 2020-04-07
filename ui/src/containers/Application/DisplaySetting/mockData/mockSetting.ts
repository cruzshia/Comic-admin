export const mockSettingTotal = 6

export const mockSetting = {
  id: '0',
  status: 'reserved',
  display: 'home',
  deliveryStartTime: '2019-12-20 00:00:00',
  creationTime: '2019-12-20 00:00:00'
}

export const mockSettingList = (data => {
  let arr = [mockSetting]
  for (let i = 1; i < mockSettingTotal; i++) {
    arr.push({
      ...data,
      id: `${i}`,
      status: i === 1 ? 'opened' : 'closed',
      deliveryStartTime: `2019-12-2${i} 00:00:0${i}`,
      creationTime: `2019-12-2${i} 00:00:0${i}`
    })
  }
  return arr
})(mockSetting)
