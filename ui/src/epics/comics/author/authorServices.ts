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

export const createAuthorAjax = (author: Author): Observable<{ status: number; response: Author }> => {
  authAjax.post('/author', author)
  return from([
    {
      status: 200,
      response: mockAuthor
    }
  ])
}

export const updateAuthorAjax = (author: Author): Observable<{ status: number; response: Author }> => {
  authAjax.put('/author', author)
  return from([
    {
      status: 200,
      response: mockAuthor
    }
  ])
}
