import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Author from '@src/models/comics/author'
import { mockAuthorList, mockAuthor } from './mockData/mockData'

export const getAuthorListAjax = (): Observable<{ status: number; response: Author[] }> => {
  authAjax.get('/author/list')
  return from([
    {
      status: 200,
      response: mockAuthorList
    }
  ])
}

export const getAuthorAjax = (authorId: string): Observable<{ status: number; response: Author }> => {
  authAjax.get('/author/' + authorId)
  return from([
    {
      status: 200,
      response: mockAuthor
    }
  ])
}