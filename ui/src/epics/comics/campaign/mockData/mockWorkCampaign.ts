import { AdPosition, AdSettingKeys, AdType } from '@src/models/comics/advertisement'
import { WorksCampaignKeys } from '@src/models/comics/worksCampaign'
import { _uuid } from '@src/utils/functions'
import mockCover1 from './mockCover1.png'
import mockCover2 from './mockCover2.png'
import mockCover3 from './mockCover3.png'
import mockCover4 from './mockCover4.png'
import mockManga from './manga.png'

export const mockCampaign = {
  [WorksCampaignKeys.Name]: 'GW作品キャンペーン',
  [WorksCampaignKeys.ID]: 'WORK_SHUNKAN10000006',
  [WorksCampaignKeys.WorkId]: 'WORK_SHUNKAN10000006',
  [WorksCampaignKeys.WorkName]: '作品キャンペ',
  [WorksCampaignKeys.Apps]: 'サンプルテキスト',
  [WorksCampaignKeys.Priority]: 'サンプルテキスト',
  [WorksCampaignKeys.FreeRange]: '1-30',
  [WorksCampaignKeys.FreeRangeDisplay]: '1~30話無料',
  [WorksCampaignKeys.BeginAt]: '2019-12-25 00:00',
  [WorksCampaignKeys.EndAt]: '2019-12-25 00:00',
  [WorksCampaignKeys.Description]:
    'サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト サンプルテキストサンプルテキスト',
  [WorksCampaignKeys.InsertedAt]: '2019-12-25 00:00',
  [WorksCampaignKeys.UpdatedAt]: '2019-12-25 00:00',
  [WorksCampaignKeys.Images]: {
    image1: {
      url: mockCover1,
      width: 100,
      height: 200
    },
    image2: {
      url: mockCover2,
      width: 100,
      height: 200
    },
    image3: {
      url: mockCover3,
      width: 100,
      height: 200
    },
    image4: {
      url: mockCover4,
      width: 100,
      height: 200
    }
  },
  [WorksCampaignKeys.AdSetting]: {
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
  }
}
