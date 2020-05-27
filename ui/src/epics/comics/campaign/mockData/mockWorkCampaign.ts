import mockCover1 from './mockCover1.png'
import mockCover2 from './mockCover2.png'
import mockCover3 from './mockCover3.png'
import mockCover4 from './mockCover4.png'
import mockCover5 from './mockCover5.png'
import mockCover6 from './mockCover6.png'
import mockCover7 from './mockCover7.png'
import mockManga from './manga.png'

export const mockCampaign = {
  campaignName: 'GW作品キャンペーン',
  campaignId: 'WORK_SHUNKAN10000006',
  workId: 'WORK_SHUNKAN10000006',
  workName: 'サンプルテキスト',
  appId: 'サンプルテキスト',
  priority: 'サンプルテキスト',
  freeRange: '1-30',
  freeRangeDisplayString: '1~30話無料',
  startDateTime: '2019-12-25 00:00',
  endDateTime: '2019-12-25 00:00',
  description:
    'サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト',
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  images: [mockCover1, mockCover2, mockCover3, mockCover4, mockCover5, mockCover6, mockCover7],
  advertisement: {
    device: 'ios',
    front: [
      {
        adCategory: 'original',
        imageUrl: mockManga,
        link: 'https://shonenjumpplus.com/episode/10834108156758729535',
        buttonName: 'サンプルテキスト',
        deliveryDuration: '2020-02-20 19:00　〜　2020-02-20 19:00',
        type: 'opening'
      }
    ],
    back: [
      {
        adCategory: 'fan',
        content: '表示位置情報のみ',
        type: 'content'
      },
      {
        adCategory: 'map',
        content: '表示位置情報のみ',
        type: 'content'
      },
      {
        adCategory: 'original',
        imageUrl: mockManga,
        link: 'https://shonenjumpplus.com/episode/10834108156758729535',
        buttonName: 'サンプルテキスト',
        deliveryDuration: '2020-02-20 19:00　〜　2020-02-20 19:00',
        type: 'content'
      }
    ]
  }
}
