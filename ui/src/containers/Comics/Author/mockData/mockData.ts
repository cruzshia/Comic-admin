import { _range } from '@src/utils/functions'

export const mockAuthor = {
  id: 'WORK_SHUNKAN10000006',
  name: '秋本治',
  nameKana: 'アキモトオサム',
  createAt: '2019-12-25 00:00',
  updateAt: '2019-12-25 00:00'
}

export const mockAuthorList = _range(0, 7).map(num => ({
  ...mockAuthor,
  id: `WORK_SHUNKAN10000006${num}`,
  createAt: `2019-12-25 00:0${num}`
}))
