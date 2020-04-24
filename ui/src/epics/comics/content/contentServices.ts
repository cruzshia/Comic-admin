import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Content from '@src/models/comics/content'
import { mockContentList, mockContent } from './mockData/mockContent'

export const getContentListAjax = (): Observable<{ status: number; response: Content[] }> => {
  authAjax.get('/content/list')
  return from([
    {
      status: 200,
      response: mockContentList
    }
  ])
}

export const getContentAjax = (contentId: string): Observable<{ status: number; response: Content }> => {
  authAjax.get('/content/' + contentId)
  return from([
    {
      status: 200,
      response: mockContent
    }
  ])
}

export const createContentAjax = (content: Content): Observable<{ status: number; response: Content }> => {
  authAjax.post('/content', content)
  return from([
    {
      status: 200,
      response: mockContent
    }
  ])
}

export const updateContentAjax = (content: Content): Observable<{ status: number; response: Content }> => {
  authAjax.put('/content', content)
  return from([
    {
      status: 200,
      response: mockContent
    }
  ])
}
