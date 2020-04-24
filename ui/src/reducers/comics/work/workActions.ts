import Work, { CsvLog } from '@src/models/comics/work'

export enum WorkActionType {
  GET_LIST = '@ComicsWork/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsWork/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsWork/GET_LIST_ERROR',

  GET_WORK = '@ComicsWork/GET_WORK',
  GET_WORK_SUCCESS = '@ComicsWork/GET_WORK_SUCCESS',
  GET_WORK_ERROR = '@ComicsWork/GET_WORK_ERROR',

  CREATE = '@ComicsWork/CREATE',
  CREATE_SUCCESS = '@ComicsWork/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsWork/CREATE_ERROR',

  UPDATE = '@ComicsWork/UPDATE',
  UPDATE_SUCCESS = '@ComicsWork/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsWork/UPDATE_ERROR',

  GET_CSV_LOG_LIST = '@ComicsWork/GET_CSV_LOGS',
  GET_CSV_LOG_LIST_SUCCESS = '@ComicsWork/GET_CSV_LOG_LIST_SUCCESS',
  GET_CSV_LOG_LIST_ERROR = '@ComicsWork/GET_CSV_LOG_LIST_ERROR',

  IMPORT_WORKS = '@ComicsWork/IMPORT_WORKS',
  IMPORT_WORKS_SUCCESS = '@ComicsWork/IMPORT_WORKS_SUCCESS',
  IMPORT_WORKS_ERROR = '@ComicsWork/IMPORT_WORKS_ERROR'
}

export const getWorkListAction = () => ({
  type: WorkActionType.GET_LIST
})

export const getWorkListSuccessAction = (payload: Work[]) => ({
  type: WorkActionType.GET_LIST_SUCCESS,
  payload
})

export const getWorkAction = (workId: string) => ({
  type: WorkActionType.GET_WORK,
  payload: workId
})

export const getWorkSuccessAction = (workId: string) => ({
  type: WorkActionType.GET_WORK_SUCCESS,
  payload: workId
})

export const createWorkAction = (work: Work) => ({
  type: WorkActionType.CREATE,
  payload: work
})

export const createWorkSuccessAction = (work: Work) => ({
  type: WorkActionType.CREATE_SUCCESS,
  payload: work
})

export const updateWorkAction = (work: Work) => ({
  type: WorkActionType.UPDATE,
  payload: work
})

export const updateWorkSuccessAction = (work: Work) => ({
  type: WorkActionType.UPDATE_SUCCESS,
  payload: work
})

export const getCsvLogListAction = () => ({
  type: WorkActionType.GET_CSV_LOG_LIST
})

export const getCsvLogListSuccessAction = (logList: CsvLog[]) => ({
  type: WorkActionType.GET_CSV_LOG_LIST_SUCCESS,
  payload: logList
})

export const importWorksAction = (payload: any) => ({
  type: WorkActionType.IMPORT_WORKS,
  payload
})
