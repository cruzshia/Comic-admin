import mockCover1 from './mockCover1.png'
import mockCover2 from './mockCover2.png'
import mockCover3 from './mockCover3.png'
import mockCover4 from './mockCover4.png'
import mockCover5 from './mockCover5.png'
import mockCover6 from './mockCover6.png'
import mockCover7 from './mockCover7.png'
import mockManga from './manga.png'
import mockListImg from './mockListImg.png'

export const mockCampaign = {
  id: 'WORK_SHUNKAN10000006',
  workId: 'WORK_SHUNKAN10000006',
  appId: 'サンプルテキスト',
  priority: 'サンプルテキスト',
  freeContentId: `サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト
サンプルテキストサンプルテキスト`,
  startDateTime: '2019-12-25 00:00:00',
  endDateTime: '2019-12-25 00:00:00',
  description:
    'サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト',
  createAt: '2019-12-25 00:00:00',
  updateAt: '2019-12-25 00:00:00',
  images: [mockCover1, mockCover2, mockCover3, mockCover4, mockCover5, mockCover6, mockCover7],
  advertisement: {
    deviceCategory: 'common',
    content: {
      type: 'original',
      image: mockManga,
      link: 'https://shonenjumpplus.com/episode/10834108156758729535',
      buttonName: 'サンプルテキスト',
      deliveryDuration: '2020-02-20 19:00:00　〜　2020-02-20 19:00:00'
    },
    contents: [
      {
        type: 'Admob（FAN）',
        content: '表示位置情報のみ'
      },
      {
        type: 'MAP',
        content: '表示位置情報のみ'
      },
      {
        type: 'original',
        image: mockManga,
        link: 'https://shonenjumpplus.com/episode/10834108156758729535',
        buttonName: 'サンプルテキスト',
        deliveryDuration: '2020-02-20 19:00:00　〜　2020-02-20 19:00:00'
      }
    ]
  }
}

export const mockCampaignList = new Array(4).fill(0).map((_, idx) => ({
  image: mockListImg,
  workId: `WORK_ROOKIE00001475${idx}`,
  campaignId: `WORK_ROOKIE00001475${idx}`,
  createAt: `2020-01-21 16:3${idx}`,
  deliverStart: `2020-01-21 16:3${idx}`,
  priority: 100 + idx
}))
