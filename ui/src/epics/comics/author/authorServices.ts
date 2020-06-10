import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import AuthorDetail, { AuthorKey, ListParam, ListResponse } from '@src/models/comics/author'
import { objToQueryStr } from '@src/utils/functions'
import { Response } from '../../utils'
import { mockAuthorList, mockAuthor } from './mockData/mockData'

const AUTHOR_API_PATH = '/v1/authors'

export const getAuthorListAjax = (param?: ListParam): Response<ListResponse> => {
  authAjax.get(AUTHOR_API_PATH + (param ? '?' + objToQueryStr(param) : ''))
  return from([
    {
      status: 200,
      response: { authors: mockAuthorList, total_count: mockAuthorList.length }
    }
  ])
}

export const getAuthorAjax = (authorId: string): Observable<{ status: number; response: AuthorDetail }> => {
  authAjax.get('/author/' + authorId)
  return from([
    {
      status: 200,
      response: mockAuthor(authorId)
    }
  ])
}

export const createAuthorAjax = (author: AuthorDetail): Observable<{ status: number; response: AuthorDetail }> => {
  authAjax.post('/author', author)
  return from([
    {
      status: 200,
      response: mockAuthor(author[AuthorKey.Id])
    }
  ])
}

export const updateAuthorAjax = (author: AuthorDetail): Observable<{ status: number; response: AuthorDetail }> => {
  authAjax.put('/author', author)
  return from([
    {
      status: 200,
      response: mockAuthor(author.id)
    }
  ])
}
