import { from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import InfoModel, { ApplicationInfo } from '@src/models/application/applicationInfo'
import { Response } from '../../utils'
import { mockInfoList, mockInfoDetail } from './mockData/mockApplicationInfo'

const API_PATH = '/v1/app'

export const getApplicationInfoListAjax = (): Response<ApplicationInfo[]> => {
  authAjax.get(API_PATH)
  return from([
    {
      status: 200,
      response: mockInfoList
    }
  ])
}

export const getApplicationInfoAjax = (id: string): Response<InfoModel> => {
  authAjax.get(`/application/application_info/${id}`)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const createApplicationInfoAjax = (data: ApplicationInfo): Response<InfoModel> => {
  authAjax.post('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}

export const updateApplicationInfoAjax = (data: ApplicationInfo): Response<InfoModel> => {
  authAjax.put('/application/application_info', data)
  return from([
    {
      status: 200,
      response: mockInfoDetail
    }
  ])
}
