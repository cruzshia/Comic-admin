import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { DisplaySetting } from '@src/models/application/displaySetting'
import { mockSettingList, mockSettingDetail } from './mockData/mockSetting'

export const getDisplaySettingListAjax = (): Observable<{ status: number; response: DisplaySetting[] }> => {
  authAjax.get('/application/display_setting/list')
  return from([
    {
      status: 200,
      response: mockSettingList
    }
  ])
}

export const deleteDisplaySettingAjax = (list: string[]): Observable<{ status: number }> => {
  authAjax.delete('/application/display_setting/list/delete', { list })
  return from([
    {
      status: 200
    }
  ])
}

export const createDisplaySettingAjax = (
  displaySetting: any
): Observable<{ status: number; response: DisplaySetting }> => {
  authAjax.post('/application/display_setting/', displaySetting)
  return from([
    {
      status: 200,
      response: mockSettingDetail
    }
  ])
}
