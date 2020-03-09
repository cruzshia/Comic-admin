import React from 'react'
import mockImg from './mockImg.png'

export const mockDatum = {
  image: <img src={mockImg} alt='' />,
  workID: 'WORK_ROOKIE000014751',
  title: 'クラスメイトの田中さんはすごく怖い',
  releaseDate: '2020-01-21 16:34',
  category: 'コミックス',
  property: 'オリジナル連載',
  updateFrequency: '毎週月月金曜日に更新'
}

export const mockData = (mockDatum => {
  const arr = []
  for (let i = 0; i < 3; i++) {
    arr.push({ id: `WORK_ROOKIE00001475${i}`, data: mockDatum })
  }
  return arr
})(mockDatum)

export const mockTitleData = [
  { id: 'image', label: '画像' },
  { id: 'workID', label: '作品ID' },
  { id: 'title', label: '作品タイトル' },
  { id: 'releaseDate', label: '作成日時', onSort: (id: string) => console.log(`sortBy ${id}`) },
  { id: 'category', label: '作品種別', onSort: (id: string) => console.log(`sortBy ${id}`) },
  { id: 'property', label: '話作品種別' },
  { id: 'updateFrequency', label: '更新頻度' }
]
