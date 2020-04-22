import mockCover1 from './mockCover1.png'
import mockCover2 from './mockCover2.png'
import mockCover3 from './mockCover3.png'
import mockCover4 from './mockCover4.png'
import mockCover5 from './mockCover5.png'
import mockCover6 from './mockCover6.png'
import mockCover7 from './mockCover7.png'
import mockManga from './manga.png'

export const mockWork = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  titleKana: 'ドラゴンクエストダイノダイボウケン',
  introduction:
    '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
  author: ['イナダコウジ'],
  category: 'コミックス',
  updateFrequency: '毎週月月金曜日に更新',
  rensai: 'ジャンプ本誌',
  reduction: '還元あり',
  createDateTime: '2019-12-25 00:00 +0900',
  updateDateTime: '2019-12-25 00:00 +0900',
  episodeCategory: 'オリジナル連載',
  images: [mockCover1, mockCover2, mockCover3, mockCover4, mockCover5, mockCover6, mockCover7],
  deliveryStartDateTime: '2019-12-25 00:00 +0900',
  deliveryEndDateTime: '2019-12-25 00:00 +0900',
  advertisement: {
    deviceCategory: 'common',
    content: {
      type: 'original',
      image: mockManga,
      link: 'https://shonenjumpplus.com/episode/10834108156758729535',
      buttonName: 'サンプルテキスト',
      deliveryDuration: '2020-02-20 19:00　〜　2020-02-20 19:00'
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
        deliveryDuration: '2020-02-20 19:00　〜　2020-02-20 19:00'
      }
    ]
  }
}
