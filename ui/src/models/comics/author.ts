import Paging from '../paging'

export enum AuthorKey {
  Id = 'id',
  Name = 'name',
  NameKana = 'name_kana',
  CreateAt = 'inserted_at',
  UpdateAt = 'updated_at'
}

export interface ListParam extends Paging {
  keyword?: string
}
export interface ListResponse {
  authors: AuthorDetail[]
  total_count: number
}

interface AuthorDetail {
  [AuthorKey.Id]: string
  [AuthorKey.Name]: string
  [AuthorKey.NameKana]: string
  [AuthorKey.CreateAt]: string
  [AuthorKey.UpdateAt]: string
}

export default AuthorDetail
