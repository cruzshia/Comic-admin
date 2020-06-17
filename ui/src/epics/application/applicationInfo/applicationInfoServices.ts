import { from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import ApplicationInfo, { AppInfoList } from '@src/models/application/applicationInfo'
import { mockInfoList, mockInfoDetail } from './mockData/mockApplicationInfo'
import { Response } from '../../utils'

export const getApplicationInfoListAjax = (): Response<AppInfoList> => {
  authAjax.get('/application/application_info')
  return from([
    {
      status: 200,
      response: mockInfoList
    }
  ])
}

export const getApplicationInfoAjax = (id: string): Response<ApplicationInfo> => {
  authAjax.get(`/application/application_info/${id}`)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const createApplicationInfoAjax = (data: ApplicationInfo): Response<ApplicationInfo> => {
  authAjax.post('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const updateApplicationInfoAjax = (data: ApplicationInfo): Response<ApplicationInfo> => {
  authAjax.put('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}
