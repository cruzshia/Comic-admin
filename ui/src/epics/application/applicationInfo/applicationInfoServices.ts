import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { ApplicationInfo } from '@src/models/application/applicationInfo'
import { mockInfoList } from './mockData/mockApplicationInfo'

export const getApplicationInfoListAjax = (): Observable<{ status: number; response: ApplicationInfo[] }> => {
  authAjax.get('/application/application_info')
  return from([
    {
      status: 200,
      response: mockInfoList
    }
  ])
}
