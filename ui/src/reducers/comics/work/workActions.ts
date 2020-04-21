import Work from '@src/models/comics/work'

export enum WorkActionType {
  GET_LIST = '@ComicsWork/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsWork/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsWork/GET_LIST_ERROR',

  CREATE = '@ComicsWork/CREATE',
  CREATE_SUCCESS = '@ComicsWork/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsWork/CREATE_ERROR',

  UPDATE = '@ComicsWork/UPDATE',
  UPDATE_SUCCESS = '@ComicsWork/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsWork/UPDATE_ERROR'
}

export const getWorkListAction = () => ({
  type: WorkActionType.GET_LIST
})

export const getWorkListSuccessAction = (payload: Work[]) => ({
  type: WorkActionType.GET_LIST_SUCCESS,
  payload
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
