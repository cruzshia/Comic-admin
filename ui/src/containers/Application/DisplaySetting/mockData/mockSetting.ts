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
      deliveryStartTime: `2019-12-2${i} 00:0${i}`,
      creationTime: `2019-12-2${i} 00:0${i}`
    })
  }
  return arr
})(mockSetting)

export const mockSettingData = [
  {
    id: '1',
    value: `//【TOPバナー_毎日更新】//
  {
          "@type": "grid_banners",`,
    children: [
      {
        id: '2',
        value: `//【枠1_週1更新】初めての方はこちらから！//
      {
        "@type": "grid_works",
        "@section_id": "todays_ranking",
        "@url": "com-access-store://rensai-top",
      "@url": "com-access-store://rensai-top",`
      }
    ]
  },
  {
    id: '3',
    value: `//【タイムライン】今日の更新//
    {
            "@type": "grid_banners",`,
    children: [
      {
        id: '4',
        value: `//だる魔ーさんが！//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '5',
        value: `//うちの家族にはケモミミとしっぽがついています。//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '6',
        value: `//物ノ怪番外地//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '7',
        value: `//結月さんはお湯が好き//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      }
    ]
  },
  {
    id: '8',
    value: `//【タイムライン】ルーキー今日の更新//
    {
            "@type": "grid_banners",`,
    children: [
      {
        id: '9',
        value: `{
          "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
          "@image_width": "750",
          "@image_height": "400",
          "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
        }`,
        children: [
          {
            id: '10',
            value: `{
          "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
          "@image_width": "750",
          "@image_height": "400",
          "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
        }`,
            children: [
              {
                id: '11',
                value: `{
              "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
              "@image_width": "750",
              "@image_height": "400",
              "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
            }`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '12',
    value: `//【タイムライン】ルーキー今日の更新//
  {
          "@type": "grid_banners",`,
    children: [{ id: '13', value: '' }]
  },
  {
    id: '14',
    value: `//【タイムライン】ルーキー今日の更新//
  {
          "@type": "grid_banners",`,
    children: [{ id: '15', value: '' }]
  }
]
