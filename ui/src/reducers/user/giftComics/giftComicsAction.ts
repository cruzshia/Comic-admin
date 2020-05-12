import { GiftComicsCsvLog } from '@src/models/user/giftComics'

export enum GiftComicsActionType {
  GET_CSV_LOG_LIST = '@UserGiftComics/GET_CSV_LOG_LIST',
  GET_CSV_LOG_LIST_SUCCESS = '@UserGiftComics/GET_CSV_LOG_LIST_SUCCESS',
  GET_CSV_LOG_LIST_ERROR = '@UserGiftComics/GET_CSV_LOG_LIST_ERROR'
}

export const getCSVLogListAction = () => ({
  type: GiftComicsActionType.GET_CSV_LOG_LIST
})

export const getCSVLogListSuccessAction = (payload: GiftComicsCsvLog[]) => ({
  type: GiftComicsActionType.GET_CSV_LOG_LIST_SUCCESS,
  payload
})
