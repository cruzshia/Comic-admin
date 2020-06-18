import HistoryMagazine from '@src/models/user/historyMagazine'

export enum HistoryMagazineActionType {
  GET_LIST = '@HistoryMagazine/GET_LIST',
  GET_LIST_SUCCESS = '@HistoryMagazine/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistoryMagazine/GET_LIST_ERROR',

  GET_HISTORY_MAGAZINE = '@HistoryMagazine/GET_HISTORY_MAGAZINE',
  GET_HISTORY_MAGAZINE_SUCCESS = '@HistoryMagazine/GET_HISTORY_MAGAZINE_SUCCESS',
  GET_HISTORY_MAGAZINE_ERROR = '@HistoryMagazine/GET_HISTORY_MAGAZINE_ERROR',

  DELETE_HISTORY_MAGAZINE = '@HistoryMagazine/DELETE_HISTORY_MAGAZINE',
  DELETE_HISTORY_MAGAZINE_SUCCESS = '@HistoryMagazine/DELETE_HISTORY_MAGAZINE_SUCCESS',
  DELETE_HISTORY_MAGAZINE_ERROR = '@HistoryMagazine/DELETE_HISTORY_MAGAZINE_ERROR',

  RESET_HISTORY_MAGAZINE = '@HistoryMagazine/RESET_HISTORY_MAGAZINE'
}

export const getHistoryMagazineListAction = () => ({
  type: HistoryMagazineActionType.GET_LIST
})

export const getHistoryMagazineListSuccessAction = (payload: HistoryMagazine[]) => ({
  type: HistoryMagazineActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistoryMagazineAction = (historyId: string) => ({
  type: HistoryMagazineActionType.GET_HISTORY_MAGAZINE,
  payload: historyId
})

export const getHistoryMagazineSuccessAction = (history: HistoryMagazine) => ({
  type: HistoryMagazineActionType.GET_HISTORY_MAGAZINE_SUCCESS,
  payload: history
})

export const resetHistoryMagazineAction = () => ({
  type: HistoryMagazineActionType.RESET_HISTORY_MAGAZINE
})

export const deleteHistoryMagazineAction = (historyId: string) => ({
  type: HistoryMagazineActionType.DELETE_HISTORY_MAGAZINE,
  payload: historyId
})
