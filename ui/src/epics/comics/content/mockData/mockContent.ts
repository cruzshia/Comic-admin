import { _range } from '@src/utils/functions'
import mockManga from './manga.png'
import mockListImage from './mockListImg.png'
import mockCover from './cover.png'
import mockGreyImg from './greyImg.png'

export const mockContent = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  titleKana: 'ドラゴンクエストダイノダイボウケン',
  category: '連載',
  description:
    '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
  author: '稲田浩司',
  appId: 'サンプルテキスト',
  workId: 'WORK_SHUNKAN10000006',
  price: 100,
  openingAdUrl: 'https://shonenjumpplus.com/episode/10834108156758729535',
  sort: 9999,
  limitedTimeFree: 'サンプルテキスト',
  episodeNumber: 100,
  thumbnail: mockCover,
  adImage: mockCover,
  requestId: 'WORK_SHUNKAN10000006',
  requestName: 'こち亀',
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00',
  deliverStart: '2019-12-25 00:00',
  deliverEnd: '2019-12-25 00:00',
  paidCoinDeliverStart: '2019-12-25 00:00',
  paidCoinDeliverEnd: '2019-12-25 00:00',
  freePPVStart1: '2019-12-25 00:00',
  freePPVEnd1: '2019-12-25 00:00',
  freePPVStart2: '2019-12-25 00:00',
  freePPVEnd2: '2019-12-25 00:00',
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
        adCategory: 'admob',
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
  },
  magazineBanner: {
    deviceCategory: '',
    contents: [
      [
        {
          condition: '単品購入者（定期購読）',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        }
      ],
      [
        {
          condition: '全員',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        }
      ],
      [
        {
          condition: '未購入者',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        },
        {
          condition: '定期購読者',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        }
      ]
    ]
  }
}

export const mockContentList = _range(0, 4).map(num => ({
  image: mockListImage,
  contentId: `WORK_ROOKIE00001475${num}`,
  title: 'クラスメイトの田中さんはすごく怖い',
  category: 'コミックス',
  price: 100 + num,
  campaignPrice: 99,
  sort: 100 + num,
  createAt: `2020-01-21 16:3${num}`
}))
