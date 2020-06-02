import { _range } from '@src/utils/functions'
import { WorkKeys, Work, WorkType, EpisodeWorkType } from '@src/models/comics/work'
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

export const mockListData: Work[] = _range(0, 4).map(i => ({
  [WorkKeys.Images]: {
    image1_url: mockImg,
    image2_url: mockImg,
    image3_url: mockImg,
    image4_url: mockImg
  },
  [WorkKeys.ID]: `WORK_ROOKIE00001475${i}`,
  [WorkKeys.Title]: 'クラスメイトの田中さんはすごく怖い',
  [WorkKeys.CreateAt]: '2020-01-21 16:34',
  [WorkKeys.WorkType]: WorkType.Comic,
  [WorkKeys.EpisodeWorkType]: EpisodeWorkType.Original,
  [WorkKeys.UpdateFrequency]: '毎週月月金曜日に更新'
}))

export const mockWorkTotal = 1000
