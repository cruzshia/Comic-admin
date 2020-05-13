import HistoryBonusCoin from '@src/models/user/historyBonusCoin'

export enum HistoryBonusCoinActionType {
  GET_LIST = '@HistoryBonusCoin/GET_LIST',
  GET_LIST_SUCCESS = '@HistoryBonusCoin/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistoryBonusCoin/GET_LIST_ERROR',

  GET_HISTORY_BONUS_CHARGE = '@HistoryBonusCoin/GET_HISTORY_BONUS_CHARGE',
  GET_HISTORY_BONUS_CHARGE_SUCCESS = '@HistoryBonusCoin/GET_HISTORY_BONUS_CHARGE_SUCCESS',
  GET_HISTORY_BONUS_CHARGE_ERROR = '@HistoryBonusCoin/GET_HISTORY_BONUS_CHARGE_ERROR',
  RESET_HISTORY_BONUS_CHARGE = '@HistoryBonusCoin/RESET_HISTORY_BONUS_CHARGE'
}

export const getHistoryBonusCoinListAction = () => ({
  type: HistoryBonusCoinActionType.GET_LIST
})

export const getHistoryBonusCoinListSuccessAction = (payload: HistoryBonusCoin[]) => ({
  type: HistoryBonusCoinActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistoryBonusCoinAction = (historyId: string) => ({
  type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_CHARGE,
  payload: historyId
})

export const getHistoryBonusCoinSuccessAction = (history: HistoryBonusCoin) => ({
  type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_CHARGE_SUCCESS,
  payload: history
})

export const resetHistoryBonusCoinAction = () => ({
  type: HistoryBonusCoinActionType.RESET_HISTORY_BONUS_CHARGE
})
