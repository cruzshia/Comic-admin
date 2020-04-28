import { ApplicationInfo } from '@src/models/application/applicationInfo'

export enum ApplicationInfoActionType {
  GET_LIST = '@ApplicationInfo/GET_LIST',
  GET_LIST_SUCCESS = '@ApplicationInfo/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ApplicationInfo/GET_LIST_ERROR',

  GET = '@ApplicationInfo/GET',
  GET_SUCCESS = '@ApplicationInfo/GET_SUCCESS',
  GET_ERROR = '@ApplicationInfo/GET_ERROR',

  CREATE = '@ApplicationInfo/CREATE',
  CREATE_SUCCESS = '@ApplicationInfo/CREATE_SUCCESS',
  CREATE_ERROR = '@ApplicationInfo/CREATE_ERROR',

  UPDATE = '@ApplicationInfo/UPDATE',
  UPDATE_SUCCESS = '@ApplicationInfo/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ApplicationInfo/UPDATE_ERROR',

  RESET_CURRENT = '@ApplicationInfo/RESET_CURRENT'
}

export const getApplicationInfoListAction = () => ({
  type: ApplicationInfoActionType.GET_LIST
})

export const getApplicationInfoListSuccessAction = (payload: ApplicationInfo[]) => ({
  type: ApplicationInfoActionType.GET_LIST_SUCCESS,
  payload
})

export const getApplicationInfoAction = (ApplicationInfoId: string) => ({
  type: ApplicationInfoActionType.GET,
  payload: ApplicationInfoId
})

export const getApplicationInfoSuccessAction = (payload: ApplicationInfo) => ({
  type: ApplicationInfoActionType.GET_SUCCESS,
  payload
})

export const createApplicationInfoAction = (applicationInfo: ApplicationInfo) => ({
  type: ApplicationInfoActionType.CREATE,
  payload: applicationInfo
})

export const createApplicationInfoSuccessAction = (applicationInfo: ApplicationInfo) => ({
  type: ApplicationInfoActionType.CREATE_SUCCESS,
  payload: applicationInfo
})

export const updateApplicationInfoAction = (applicationInfo: ApplicationInfo) => ({
  type: ApplicationInfoActionType.UPDATE,
  payload: applicationInfo
})

export const updateApplicationInfoSuccessAction = (applicationInfo: ApplicationInfo) => ({
  type: ApplicationInfoActionType.UPDATE_SUCCESS,
  payload: applicationInfo
})

export const resetApplicationInfoAction = () => ({
  type: ApplicationInfoActionType.RESET_CURRENT
})
