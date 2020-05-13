import HistoryBonusCoin from '@src/models/user/historyBonusCoin'

export enum HistoryBonusCoinActionType {
  GET_LIST = '@HistoryBonusCoin/GET_LIST',
  GET_LIST_SUCCESS = '@HistoryBonusCoin/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistoryBonusCoin/GET_LIST_ERROR',

  GET_HISTORY_BONUS_COIN = '@HistoryBonusCoin/GET_HISTORY_BONUS_COIN',
  GET_HISTORY_BONUS_COIN_SUCCESS = '@HistoryBonusCoin/GET_HISTORY_BONUS_COIN_SUCCESS',
  GET_HISTORY_BONUS_COIN_ERROR = '@HistoryBonusCoin/GET_HISTORY_BONUS_COIN_ERROR',
  RESET_HISTORY_BONUS_COIN = '@HistoryBonusCoin/RESET_HISTORY_BONUS_COIN'
}

export const getHistoryBonusCoinListAction = () => ({
  type: HistoryBonusCoinActionType.GET_LIST
})

export const getHistoryBonusCoinListSuccessAction = (payload: HistoryBonusCoin[]) => ({
  type: HistoryBonusCoinActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistoryBonusCoinAction = (historyId: string) => ({
  type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_COIN,
  payload: historyId
})

export const getHistoryBonusCoinSuccessAction = (history: HistoryBonusCoin) => ({
  type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_COIN_SUCCESS,
  payload: history
})

export const resetHistoryBonusCoinAction = () => ({
  type: HistoryBonusCoinActionType.RESET_HISTORY_BONUS_COIN
})
