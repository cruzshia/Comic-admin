import mockManga from './manga.png'

export const mockCampaign = {
  startDateTime: '2019-12-25 00:00:00',
  endDateTime: '2019-12-25 00:00:00',
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
