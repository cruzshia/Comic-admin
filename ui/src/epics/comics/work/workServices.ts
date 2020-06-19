import { from } from 'rxjs'
import authAjax, { JSON_CONTENT } from '@src/utils/ajaxUtil'
import WorkDetail from '@src/models/comics/work'
import { ListParams } from '@src/reducers/comics/work/workActions'
import ImportLog from '@src/models/importLog'
import { objToQueryStr } from '@src/utils/functions'
import { Response } from '../../utils'
import { mockLogList } from './mockData/mockImportLogs'

const WORK_API_PATH = '/v1/works'

export const getWorkListAjax = (params?: Object): Response<ListParams> => {
  return authAjax.get(WORK_API_PATH + (params ? '?' + objToQueryStr(params) : ''))
}

export const getWorkAjax = (workId: string): Response<WorkDetail> => {
  return authAjax.get(`${WORK_API_PATH}/${workId}`)
}

export const createWorkAjax = (work: WorkDetail): Response<WorkDetail> => {
  return authAjax.post(WORK_API_PATH, work, JSON_CONTENT)
}

export const updateWorkAjax = (work: WorkDetail): Response<WorkDetail> => {
  return authAjax.put(`${WORK_API_PATH}/${work.id}`, work, JSON_CONTENT)
}

export const getCsvLogListAjax = (): Response<ImportLog[]> => {
  authAjax.get(`${WORK_API_PATH}/csv_logs`)
  return from([
    {
      status: 200,
      response: mockLogList
    }
  ])
}

export const importWorksAjax = (): Response<any> => {
  authAjax.post(`${WORK_API_PATH}/import`)
  return from([
    {
      status: 200,
      response: {}
    }
  ])
}
