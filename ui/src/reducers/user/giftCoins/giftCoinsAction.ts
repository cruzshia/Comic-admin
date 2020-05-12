import { GiftCoinsCsvLog } from '@src/models/user/giftCoins'

export enum GiftCoinsActionType {
  GET_CSV_LOG_LIST = '@UserGiftCoins/GET_CSV_LOG_LIST',
  GET_CSV_LOG_LIST_SUCCESS = '@UserGiftCoins/GET_CSV_LOG_LIST_SUCCESS',
  GET_CSV_LOG_LIST_ERROR = '@UserGiftCoins/GET_CSV_LOG_LIST_ERROR'
}

export const getCSVLogListAction = () => ({
  type: GiftCoinsActionType.GET_CSV_LOG_LIST
})
export const getCSVLogListSuccessAction = (payload: GiftCoinsCsvLog[]) => ({
  type: GiftCoinsActionType.GET_CSV_LOG_LIST_SUCCESS,
  payload
})
