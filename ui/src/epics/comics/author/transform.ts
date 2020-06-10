import AuthorDetail, { AuthorKey, ListResponse } from '@src/models/comics/author'
import { batchConvertISO8601 } from '@src/utils/functions'

export const toDisplayableList = ({
  authors,
  total_count: total
}: ListResponse): { authors: AuthorDetail[]; total: number } => ({
  authors: authors.map(author => batchConvertISO8601(author, [AuthorKey.CreateAt, AuthorKey.UpdateAt])),
  total
})
