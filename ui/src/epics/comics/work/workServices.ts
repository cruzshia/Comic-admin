import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Work from '@src/models/comics/work'
import { mockListData } from './mockData/mockData'
import { mockWork } from './mockData/mockWork'

export const getWorkListAjax = (): Observable<{ status: number; response: Work[] }> => {
  authAjax.get('/work/list')
  return from([
    {
      status: 200,
      response: mockListData
    }
  ])
}

export const getWorkAjax = (workId: string): Observable<{ status: number; response: Work }> => {
  authAjax.get('/work/' + workId)
  return from([
    {
      status: 200,
      response: mockWork
    }
  ])
}

export const createWorkAjax = (work: Work): Observable<{ status: number; response: Work }> => {
  authAjax.post('/work/', work)
  return from([
    {
      status: 200,
      response: mockListData[0]
    }
  ])
}

export const updateWorkAjax = (work: Work): Observable<{ status: number; response: Work }> => {
  authAjax.put('/work/', work)
  return from([
    {
      status: 200,
      response: mockWork
    }
  ])
}
