import mockCover from './cover.png'
import mockCoverSm from './cover_sm.png'
import mockManga from './manga.png'

export const mockWork = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  titleKana: 'ドラゴンクエストダイノダイボウケン',
  // titleShort: 'ダイ',
  introduction:
    '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
  author: '原作：三条陸／漫画：稲田浩司／監修：堀井雄二 / イナダコウジ',
  category: 'コミックス',
  updateFrequency: '毎週月月金曜日に更新',
  rensai: 'ジャンプ本誌',
  createDateTime: '2019-12-25 00:00:00 +0900',
  updateDateTime: '2019-12-25 00:00:00 +0900',
  images: [mockCover, mockCoverSm, mockCover, mockCover],
  deliveryStartDateTime: '2019-12-25 00:00:00 +0900',
  deliveryEndDateTime: '2019-12-25 00:00:00 +0900',
  notifyType: 'デバイス共通',
  notifications: [
    {
      type: 'opening_notice',
      image: mockManga,
      link: 'https://shonenjumpplus.com/episode/10834108156758729535',
      deliveryDateTime: '2020/02/20/19:00'
    },
    {
      type: 'page_end_notice',
      image: mockManga,
      link: 'https://shonenjumpplus.com/episode/10834108156758729535',
      deliveryDateTime: '2020/02/20/19:00'
    }
  ]
}
