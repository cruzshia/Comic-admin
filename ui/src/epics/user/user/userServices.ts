import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import User from '@src/models/user/user'
import { mockUserList } from './mockData/mockData'

export const getUserListAjax = (): Observable<{ status: number; response: User[] }> => {
  authAjax.get('/user/list')
  return from([
    {
      status: 200,
      response: mockUserList
    }
  ])
}
