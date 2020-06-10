import { _range } from '@src/utils/functions'
import { AuthorKey } from '@src/models/comics/author'

export const mockAuthor = (authorId: string) => ({
  [AuthorKey.Id]: authorId,
  [AuthorKey.Name]: '秋本治',
  [AuthorKey.NameKana]: 'アキモトオサム',
  [AuthorKey.CreateAt]: '2020-04-02T14:00:00Z',
  [AuthorKey.UpdateAt]: '2020-04-02T14:00:00Z'
})

export const mockAuthorList = _range(0, 7).map(num => ({
  ...mockAuthor(`WORK_SHUNKAN10000006${num}`),
  [AuthorKey.CreateAt]: `2020-04-02T14:0${num}:00Z`
}))
