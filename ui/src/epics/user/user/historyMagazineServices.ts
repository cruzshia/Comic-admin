import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import HistoryMagazine from '@src/models/user/historyMagazine'
import { mockMagazineList, mockMagazineDetail } from './mockData/magazineMockData'

export const getHistoryMagazineListAjax = (): Observable<{ status: number; response: HistoryMagazine[] }> => {
  authAjax.get('/user/history/magazine/list')
  return from([
    {
      status: 200,
      response: mockMagazineList
    }
  ])
}

export const getHistoryMagazineAjax = (id: string): Observable<{ status: number; response: HistoryMagazine }> => {
  authAjax.get('/user/history/magazine' + id)
  return from([
    {
      status: 200,
      response: mockMagazineDetail
    }
  ])
}

export const deleteHistoryMagazineAjax = (id: string): Observable<{ status: number }> => {
  authAjax.delete('/user/history/magazine' + id)
  return from([
    {
      status: 200
    }
  ])
}
