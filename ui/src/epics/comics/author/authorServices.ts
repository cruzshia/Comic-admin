import { from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import AuthorDetail, { AuthorKey, ListParam, ListResponse } from '@src/models/comics/author'
import { objToQueryStr } from '@src/utils/functions'
import { Response } from '../../utils'
import { mockAuthor } from './mockData/mockData'

const AUTHOR_API_PATH = '/v1/authors'

export const getAuthorListAjax = (param?: ListParam): Response<ListResponse> => {
  return authAjax.get(AUTHOR_API_PATH + (param ? '?' + objToQueryStr(param) : ''))
}

export const getAuthorAjax = (authorId: string): Response<AuthorDetail> => {
  return authAjax.get(AUTHOR_API_PATH + `/${authorId}`)
}

export const createAuthorAjax = (author: Partial<AuthorDetail>): Response<AuthorDetail> => {
  authAjax.post(AUTHOR_API_PATH, author)
  return from([
    {
      status: 200,
      response: mockAuthor()
    }
  ])
}

export const updateAuthorAjax = ({ [AuthorKey.Id]: id, ...author }: Partial<AuthorDetail>): Response<AuthorDetail> => {
  authAjax.put(AUTHOR_API_PATH + `/${id}`, author)
  return from([
    {
      status: 200,
      response: mockAuthor(id)
    }
  ])
}
