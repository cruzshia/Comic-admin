import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import User, { UserExportLog } from '@src/models/user/user'
import { mockUserList, mockUser, mockCsvExportLogs } from './mockData/mockData'

export const getUserListAjax = (): Observable<{ status: number; response: User[] }> => {
  authAjax.get('/user/list')
  return from([
    {
      status: 200,
      response: mockUserList
    }
  ])
}

export const getUserAjax = (id: string): Observable<{ status: number; response: User }> => {
  authAjax.get('/user/' + id)
  return from([
    {
      status: 200,
      response: mockUser
    }
  ])
}

export const getUserExportLogListAjax = (): Observable<{ status: number; response: UserExportLog[] }> => {
  authAjax.get(`/user/list/exportLogs`)
  return from([
    {
      status: 200,
      response: mockCsvExportLogs
    }
  ])
}

export const createUserAjax = (user: User): Observable<{ status: number; response: User }> => {
  authAjax.post('/user')
  return from([
    {
      status: 200,
      response: mockUser
    }
  ])
}

export const importUsersAjax = (data: any): Observable<{ status: number; response: any }> => {
  authAjax.post('/user/import')
  return from([
    {
      status: 200,
      response: {}
    }
  ])
}
