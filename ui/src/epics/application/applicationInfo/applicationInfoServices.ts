import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { ApplicationInfo } from '@src/models/application/applicationInfo'
import { mockInfoList, mockInfoDetail } from './mockData/mockApplicationInfo'

export const getApplicationInfoListAjax = (): Observable<{ status: number; response: ApplicationInfo[] }> => {
  authAjax.get('/application/application_info')
  return from([
    {
      status: 200,
      response: mockInfoList
    }
  ])
}

export const getApplicationInfoAjax = (id: string): Observable<{ status: number; response: ApplicationInfo }> => {
  authAjax.get(`/application/application_info/${id}`)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const createApplicationInfoAjax = (
  data: ApplicationInfo
): Observable<{ status: number; response: ApplicationInfo }> => {
  authAjax.post('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const updateApplicationInfoAjax = (
  data: ApplicationInfo
): Observable<{ status: number; response: ApplicationInfo }> => {
  authAjax.put('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}
