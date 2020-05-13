import HistoryPayCoin from '@src/models/user/historyPayCoin'

export enum HistoryPayCoinActionType {
  GET_LIST = '@HistoryPayCoin/GET_LIST',
  GET_LIST_SUCCESS = '@HistoryPayCoin/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistoryPayCoin/GET_LIST_ERROR',

  GET_HISTORY_PAY_COIN = '@HistoryPayCoin/GET_HISTORY_PAY_COIN',
  GET_HISTORY_PAY_COIN_SUCCESS = '@HistoryPayCoin/GET_HISTORY_PAY_COIN_SUCCESS',
  GET_HISTORY_PAY_COIN_ERROR = '@HistoryPayCoin/GET_HISTORY_PAY_COIN_ERROR',
  RESET_HISTORY_PAY_COIN = '@HistoryPayCoin/RESET_HISTORY_PAY_COIN'
}

export const getHistoryPayCoinListAction = () => ({
  type: HistoryPayCoinActionType.GET_LIST
})

export const getHistoryPayCoinListSuccessAction = (payload: HistoryPayCoin[]) => ({
  type: HistoryPayCoinActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistoryPayCoinAction = (historyId: string) => ({
  type: HistoryPayCoinActionType.GET_HISTORY_PAY_COIN,
  payload: historyId
})

export const getHistoryPayCoinSuccessAction = (history: HistoryPayCoin) => ({
  type: HistoryPayCoinActionType.GET_HISTORY_PAY_COIN_SUCCESS,
  payload: history
})

export const resetHistoryPayCoinAction = () => ({
  type: HistoryPayCoinActionType.RESET_HISTORY_PAY_COIN
})
