import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.displaySetting }
]

export const toTreeData = (_: any) => [
  {
    id: '1',
    value: `//【TOPバナー_毎日更新】//
  {
          "@type": "grid_banners",`,
    children: [
      {
        id: '2',
        value: `//【枠1_週1更新】初めての方はこちらから！//
      {
        "@type": "grid_works",
        "@section_id": "todays_ranking",
        "@url": "com-access-store://rensai-top",
      "@url": "com-access-store://rensai-top",`
      }
    ]
  },
  {
    id: '3',
    value: `//【タイムライン】今日の更新//
    {
            "@type": "grid_banners",`,
    children: [
      {
        id: '4',
        value: `//だる魔ーさんが！//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '5',
        value: `//うちの家族にはケモミミとしっぽがついています。//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '6',
        value: `//物ノ怪番外地//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      },
      {
        id: '7',
        value: `//結月さんはお湯が好き//
        {
                    "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
                    "@image_width": "750",
                    "@image_height": "400",
                              }`
      }
    ]
  },
  {
    id: '8',
    value: `//【タイムライン】ルーキー今日の更新//
    {
            "@type": "grid_banners",`,
    children: [
      {
        id: '9',
        value: `{
          "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
          "@image_width": "750",
          "@image_height": "400",
          "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
        }`,
        children: [
          {
            id: '10',
            value: `{
          "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
          "@image_width": "750",
          "@image_height": "400",
          "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
        }`,
            children: [
              {
                id: '11',
                value: `{
              "@image_url": "https://webview.shonenjump.com/fmc/200225/top/top1.jpg?timestamp=200225",
              "@image_width": "750",
              "@image_height": "400",
              "@url": "com-access-store://works?work_id=WORK_0000000000001053&ga=200225_top1"
            }`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '12',
    value: `//【タイムライン】ルーキー今日の更新//
  {
          "@type": "grid_banners",`,
    children: [{ id: '13', value: '' }]
  },
  {
    id: '14',
    value: `//【タイムライン】ルーキー今日の更新//
  {
          "@type": "grid_banners",`,
    children: [{ id: '15', value: '' }]
  }
]
