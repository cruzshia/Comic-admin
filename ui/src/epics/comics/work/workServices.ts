import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Work from '@src/models/comics/work'
import ImportLog from '@src/models/importLog'
import { mockListData } from './mockData/mockData'
import { mockWork } from './mockData/mockWork'
import { mockLogList } from './mockData/mockImportLogs'

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

export const getCsvLogListAjax = (): Observable<{ status: number; response: ImportLog[] }> => {
  authAjax.get('/work/csv_logs')
  return from([
    {
      status: 200,
      response: mockLogList
    }
  ])
}

export const importWorksAjax = (): Observable<{ status: number; response: any }> => {
  authAjax.post('/work/import')
  return from([
    {
      status: 200,
      response: {}
    }
  ])
}
