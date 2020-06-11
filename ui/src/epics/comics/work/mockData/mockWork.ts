import WorkDetail, { WorkKeys, WorkType, EpisodeWorkType } from '@src/models/comics/work'
import { AdPosition, AdSettingKeys, AdType } from '@src/models/comics/advertisement'
import { _uuid } from '@src/utils/functions'
import mockCover1 from './mockCover1.png'
import mockCover2 from './mockCover2.png'
import mockCover3 from './mockCover3.png'
import mockCover4 from './mockCover4.png'
import mockManga from './manga.png'

export const mockWork: WorkDetail = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  [WorkKeys.TitleKana]: 'ドラゴンクエストダイノダイボウケン',
  [WorkKeys.Description]:
    '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
  [WorkKeys.Authors]: [
    { id: '1', name: 'イナダコウジ' },
    { id: '2', name: 'pon yu uen' }
  ],
  [WorkKeys.WorkType]: WorkType.Episode,
  [WorkKeys.App]: [{ id: 1, name: 'アプリ' }],
  [WorkKeys.AppId]: 1,
  [WorkKeys.UpdateFrequency]: '毎週月月金曜日に更新',
  [WorkKeys.ReturnAdRevenue]: true,
  [WorkKeys.FreePeriodicalDay]: '月',
  [WorkKeys.MagazineName]: 'ジャンプ本誌',
  [WorkKeys.Subscription]: { id: '2', name: '週刊少年ジャンプ定期購読' },
  [WorkKeys.CreateAt]: '2019-12-25 00:00',
  [WorkKeys.UpdateAt]: '2019-12-25 00:00',
  [WorkKeys.EpisodeWorkType]: EpisodeWorkType.Original,
  [WorkKeys.Images]: {
    image1: {
      url: mockCover1,
      width: 100,
      height: 100
    },
    image2: {
      url: mockCover2,
      width: 100,
      height: 100
    },
    image3: {
      url: mockCover3,
      width: 100,
      height: 100
    },
    image4: {
      url: mockCover4,
      width: 100,
      height: 100
    }
  },
  [WorkKeys.PublishBeginAt]: '2019-12-25 00:00',
  [WorkKeys.PublishEndAt]: '2019-12-25 00:00',
  [WorkKeys.S3Uploads]: {
    image1: {
      url: 'http://image.upload.com/1',
      path: 'http://work/image/1'
    },
    image2: {
      url: 'http://image.upload.com/2',
      path: 'http://work/image/2'
    },
    image3: {
      url: 'http://image.upload.com/3',
      path: 'http://work/image/3'
    },
    image4: {
      url: 'http://image.upload.com/4',
      path: 'http://work/image/4'
    }
  },
  [WorkKeys.AdSetting]: [
    {
      device: 'ios',
      [AdPosition.Front]: [
        {
          [AdSettingKeys.ID]: _uuid(),
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
          [AdSettingKeys.ID]: _uuid(),
          [AdSettingKeys.Type]: AdType.Fan
        },
        {
          [AdSettingKeys.ID]: _uuid(),
          [AdSettingKeys.Type]: AdType.Map
        },
        {
          [AdSettingKeys.ID]: _uuid(),
          [AdSettingKeys.Type]: AdType.Original,
          [AdSettingKeys.ImageUrl]: mockManga,
          [AdSettingKeys.ActionUrl]: 'https://shonenjumpplus.com/episode/10834108156758729535',
          [AdSettingKeys.Button]: 'サンプルテキスト',
          [AdSettingKeys.BeginAt]: '2020-02-20 19:00',
          [AdSettingKeys.EndAt]: '2020-02-20 19:00'
        }
      ]
    },
    {
      device: 'android',
      [AdPosition.Front]: [
        {
          [AdSettingKeys.ID]: _uuid(),
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
          [AdSettingKeys.ID]: _uuid(),
          [AdSettingKeys.Type]: AdType.Fan
        },
        {
          [AdSettingKeys.ID]: _uuid(),
          [AdSettingKeys.Type]: AdType.Map
        }
      ]
    }
  ]
}
