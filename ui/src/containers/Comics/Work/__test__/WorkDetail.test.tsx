import React from 'react'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import WorkDetail from '../components/WorkDetail'
import WorkContext from '../context/WorkContext'

describe('WorkDetail test', () => {
  const mockWork = {
    id: 'WORK_SHUNKAN10000006',
    title: 'ドラゴンクエスト ダイの大冒険',
    titleKana: 'ドラゴンクエストダイノダイボウケン',
    introduction:
      '【２０２０年 秋アニメ化決定！】モンスターに育てられた、勇者に憧れる少年・ダイ。師や仲間とともに、世界を救う冒険が今始まる——！',
    author: '原作：三条陸／漫画：稲田浩司／監修：堀井雄二 / イナダコウジ',
    category: 'コミックス',
    updateFrequency: '毎週月月金曜日に更新',
    rensai: 'ジャンプ本誌',
    createDateTime: '2019-12-25 00:01 +0900',
    updateDateTime: '2019-12-25 00:02 +0900',
    images: [],
    deliveryStartDateTime: '2019-12-25 00:03 +0900',
    deliveryEndDateTime: '2019-12-25 00:04 +0900',
    notifyType: 'デバイス共通',
    advertisement: {
      deviceCategory: 'common',
      content: {
        type: 'original',
        image: '',
        link: 'https://shonenjumpplus.com/episode/10834108156758729535',
        buttonName: 'サンプルテキスト',
        deliveryDuration: '2020-02-20 19:00:00　〜　2020-02-20 19:00:00'
      },
      contents: []
    }
  }

  it('Renders correctly', () => {
    const { container } = render(
      withAllProvider(
        <WorkContext.Provider
          value={{ workList: [], currentWork: mockWork, workTotal: 0, importLogList: [], logTotal: 0 }}
        >
          <WorkDetail />
        </WorkContext.Provider>
      )
    )
    expect(container).toBeInTheDocument()
  })

  it('Render work correctly', () => {
    const { queryAllByText } = render(
      withAllProvider(
        <WorkContext.Provider
          value={{ workList: [], currentWork: mockWork, workTotal: 0, importLogList: [], logTotal: 0 }}
        >
          <WorkDetail />
        </WorkContext.Provider>
      )
    )
    Object.values(mockWork).forEach(val => {
      if (typeof val === 'string') {
        expect(() => queryAllByText(val)).not.toThrow()
      }
    })
  })
})
