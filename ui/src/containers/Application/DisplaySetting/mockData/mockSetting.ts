export const mockSettingTotal = 6

export const mockSetting = {
  id: '0',
  status: 'reserved',
  screen: 'home',
  deliveryStartTime: '2019-12-20 00:00',
  creationTime: '2019-12-20 00:00'
}

export const mockSettingDetail = {
  id: '0',
  status: 'reserved',
  screen: 'home',
  applicationId: 'SHST01_CATEGORY_TOP_IOS',
  deliveryStartTime: '2019-12-20 00:00',
  creationTime: '2019-12-20 00:00',
  setting: `"navigation": {
    "#comment": [],
    "section": [
      {
        "@type": "grid_banners",
        "@banner_width_size": "medium",
        "banner": {
          "@image_url": "https://webview.shonenjump.com/top/simple/search.jpg",
          "@image_width": "960",
          "@image_height": "156",
          "@url": "com-access-store://ppv?initial=a&ga=200225_kensaku"
        }
      },
      {
        "@type": "top_banners",
        "banner": [
          {
            "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
            "@image_width": "750",
            "@image_height": "400",
            "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
          },
          
          {
            "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top4.jpg?timestamp=200225",
            "@image_width": "750",
            "@image_height": "400",
            "@url": "com-access-browser://?url=https://www.shonenjump.com/p/re/shunkan/&ga=200225_top4"
          },
          {
            "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top5.jpg?timestamp=200225",
            "@image_width": "750",
            "@image_height": "400",
            "@url": "com-access-store://works?work_id=WORK_0000000000001221&ga=200225_top5"
          },
          {
            "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top6.jpg?timestamp=200225",
            "@image_width": "750",
            "@image_height": "400",
            "@url": "com-access-enquete://?id=PLUSENQ_2002&ga=200225_top6"
          }
        ],
        "#comment": []
      },`
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
