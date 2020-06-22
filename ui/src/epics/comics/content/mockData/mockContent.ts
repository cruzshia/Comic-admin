import { ContentKeys } from '@src/models/comics/content'
import { AdPosition, AdSettingKeys, AdType } from '@src/models/comics/advertisement'
import { _range, _uuid } from '@src/utils/functions'
import mockManga from './manga.png'
import mockListImage from './mockListImg.png'
import mockCover from './cover.png'
import mockGreyImg from './greyImg.png'

export const mockContent = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  titleKana: 'ドラゴンクエストダイノダイボウケン',
  category: 'episode',
  subtitle: 'ドラゴンクエスト ダイの大冒険',
  description:
    '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
  authors: ['稲田浩司'],
  appId: 'サンプルテキスト',
  workId: 'WORK_SHUNKAN10000006',
  price: 100,
  sort: 9999,
  limitedTimeFree: '期間限定無料である',
  episodeNumber: 100,
  volumeNumber: 100,
  thumbnail: {
    url: mockCover,
    width: 100,
    height: 100
  },
  requestId: 'WORK_SHUNKAN10000006',
  requestSubscriptionId: 'WORK_SHUNKAN10000006',
  tagGroups: ['サンプルテキスト'],
  tags: ['サンプルテキスト'],
  deliveryUrl: 'https://shonenjumpplus.com/episode/10834108156758729535',
  allowComment: 'コメント可能である',
  allowStartWithExtraServer: '外部ブラウザを起動する',
  notDisplayTodayRanking: '表示しない',
  allowPrContent: 'PRコンテンツである',
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
  [ContentKeys.AdSetting]: [
    {
      [AdSettingKeys.AdDevice]: 'ios',
      [AdPosition.Front]: [
        {
          [AdSettingKeys.Type]: AdType.Original,
          [AdSettingKeys.ImageUrl]: mockManga,
          [AdSettingKeys.ActionUrl]: 'https://shonenjumpplus.com/episode/10834108156758729535',
          [AdSettingKeys.Button]: 'サンプルテキスト',
          [AdSettingKeys.BeginAt]: '2020-02-20 19:00',
          [AdSettingKeys.EndAt]: '2020-02-20 19:00'
        }
      ],
      [AdPosition.Back]: [
        {
          [AdSettingKeys.Type]: AdType.Fan
        },
        {
          [AdSettingKeys.Type]: AdType.Map
        },
        {
          [AdSettingKeys.Type]: AdType.Original,
          [AdSettingKeys.ImageUrl]: mockManga,
          [AdSettingKeys.ActionUrl]: 'https://shonenjumpplus.com/episode/10834108156758729535',
          [AdSettingKeys.Button]: 'サンプルテキスト',
          [AdSettingKeys.BeginAt]: '2020-02-20 19:00',
          [AdSettingKeys.EndAt]: '2020-02-20 19:00'
        }
      ]
    }
  ],
  magazineBanner: {
    deviceCategory: 'デバイス共通',
    contents: [
      [
        {
          id: _uuid(),
          condition: '単品購入者（定期購読）',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        }
      ],
      [
        {
          id: _uuid(),
          condition: '全員',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        }
      ],
      [
        {
          id: _uuid(),
          condition: '未購入者',
          image: mockGreyImg,
          url: 'https://shonenjumpplus.com/episode/10834108156758729535'
        },
        {
          id: _uuid(),
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
