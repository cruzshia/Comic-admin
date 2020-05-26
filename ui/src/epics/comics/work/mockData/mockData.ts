import mockImg from './mockListImg.png'

export const mockDatum = {
  image: mockImg,
  workID: 'WORK_ROOKIE000014751',
  title: 'クラスメイトの田中さんはすごく怖い',
  releaseDate: '2020-01-21 16:34',
  category: 'コミックス',
  episodeCategory: 'オリジナル連載',
  updateFrequency: '毎週月月金曜日に更新'
}

export const mockData = (mockDatum => {
  const arr = []
  for (let i = 0; i < 3; i++) {
    arr.push({ id: `WORK_ROOKIE00001475${i}`, data: mockDatum })
  }
  return arr
})(mockDatum)

export const mockListData = (mockDatum => {
  const arr = []
  for (let i = 0; i <= 3; i++) {
    arr.push({ ...mockDatum, workID: `WORK_ROOKIE00001475${i}`, releaseDate: `2020-01-21 16:3${i}` })
  }
  return arr
})(mockDatum)

export const mockWorkTotal = 1000