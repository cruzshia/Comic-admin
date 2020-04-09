import mockManga from './manga.png'
import mockListImage from './mockListImg.png'
import { _range } from '@src/utils/functions'

export const mockContent = {
  id: 'WORK_SHUNKAN10000006',
  title: 'ドラゴンクエスト ダイの大冒険',
  titleKana: 'ドラゴンクエストダイノダイボウケン',
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

export const mockContentList = _range(0, 4).map(num => ({
  image: mockListImage,
  contentId: `WORK_ROOKIE00001475${num}`,
  title: 'クラスメイトの田中さんはすごく怖い',
  category: 'コミックス',
  price: 100 + num,
  campaignPrice: 99,
  sort: 100 + num,
  createAt: `2020-01-21 16:34:0${num}`
}))
