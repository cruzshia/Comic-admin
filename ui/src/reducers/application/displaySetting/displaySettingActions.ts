import { DisplaySetting } from '@src/models/application/displaySetting'

export enum DisplaySettingActionType {
  GET_LIST = '@AppDisplaySetting/GET_LIST',
  GET_LIST_SUCCESS = '@AppDisplaySetting/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@AppDisplaySetting/GET_LIST_ERROR',

  GET_SETTING = '@AppDisplaySetting/GET_SETTING',
  GET_SETTING_SUCCESS = '@AppDisplaySetting/GET_SETTING_SUCCESS',
  GET_SETTING_ERROR = '@AppDisplaySetting/GET_SETTING_ERROR',

  CREATE = '@AppDisplaySetting/CREATE',
  CREATE_SUCCESS = '@AppDisplaySetting/CREATE_SUCCESS',
  CREATE_ERROR = '@AppDisplaySetting/CREATE_ERROR',

  UPDATE = '@AppDisplaySetting/UPDATE',
  UPDATE_SUCCESS = '@AppDisplaySetting/UPDATE_SUCCESS',
  UPDATE_ERROR = '@AppDisplaySetting/UPDATE_ERROR',

  DELETE = '@AppDisplaySetting/DELETE',
  DELETE_SUCCESS = '@AppDisplaySetting/DELETE_SUCCESS',
  DELETE_ERROR = '@AppDisplaySetting/DELETE_ERROR',

  RESET_CURRENT = '@AppDisplaySetting/RESET_CURRENT'
}

export const getDisplaySettingListAction = () => ({
  type: DisplaySettingActionType.GET_LIST
})

export const getDisplaySettingListSuccessAction = (payload: DisplaySetting[]) => ({
  type: DisplaySettingActionType.GET_LIST_SUCCESS,
  payload
})

export const getDisplaySettingAction = (settingId: string) => ({
  type: DisplaySettingActionType.GET_SETTING,
  payload: settingId
})

export const getDisplaySettingSuccessAction = (payload: DisplaySetting) => ({
  type: DisplaySettingActionType.GET_SETTING_SUCCESS,
  payload
})

export const createDisplaySettingAction = (displaySetting: DisplaySetting) => ({
  type: DisplaySettingActionType.CREATE,
  payload: displaySetting
})

export const createDisplaySettingSuccessAction = (displaySetting: DisplaySetting) => ({
  type: DisplaySettingActionType.CREATE_SUCCESS,
  payload: displaySetting
})

export const updateDisplaySettingAction = (displaySetting: DisplaySetting) => ({
  type: DisplaySettingActionType.UPDATE,
  payload: displaySetting
})

export const updateDisplaySettingSuccessAction = (displaySetting: DisplaySetting) => ({
  type: DisplaySettingActionType.UPDATE_SUCCESS,
  payload: displaySetting
})

export const deleteDisplaySettingAction = (payload: string[]) => ({
  type: DisplaySettingActionType.DELETE,
  payload
})

export const resetDisplaySettingAction = () => ({
  type: DisplaySettingActionType.RESET_CURRENT
})
