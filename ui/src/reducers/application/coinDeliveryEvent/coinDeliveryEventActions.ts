import { CoinDeliveryEvent } from '@src/models/application/coinDeliveryEvent'

export enum CoinDeliveryEventActionType {
  GET_LIST = '@AppCoinDeliveryEvent/GET_LIST',
  GET_LIST_SUCCESS = '@AppCoinDeliveryEvent/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@AppCoinDeliveryEvent/GET_LIST_ERROR',

  GET = '@AppCoinDeliveryEvent/GET',
  GET_SUCCESS = '@AppCoinDeliveryEvent/GET_SUCCESS',
  GET_ERROR = '@AppCoinDeliveryEvent/GET_ERROR',

  CREATE = '@AppCoinDeliveryEvent/CREATE',
  CREATE_SUCCESS = '@AppCoinDeliveryEvent/CREATE_SUCCESS',
  CREATE_ERROR = '@AppCoinDeliveryEvent/CREATE_ERROR',

  UPDATE = '@AppCoinDeliveryEvent/UPDATE',
  UPDATE_SUCCESS = '@AppCoinDeliveryEvent/UPDATE_SUCCESS',
  UPDATE_ERROR = '@AppCoinDeliveryEvent/UPDATE_ERROR'
}

export const getCoinDeliveryEventListAction = () => ({
  type: CoinDeliveryEventActionType.GET_LIST
})

export const getCoinDeliveryEventListSuccessAction = (payload: CoinDeliveryEvent[]) => ({
  type: CoinDeliveryEventActionType.GET_LIST_SUCCESS,
  payload
})

export const getCoinDeliveryEventAction = (CoinDeliveryEventId: string) => ({
  type: CoinDeliveryEventActionType.GET,
  payload: CoinDeliveryEventId
})

export const getCoinDeliveryEventSuccessAction = (payload: CoinDeliveryEvent) => ({
  type: CoinDeliveryEventActionType.GET_SUCCESS,
  payload
})

export const createCoinDeliveryEventAction = (coinDeliveryEvent: CoinDeliveryEvent) => ({
  type: CoinDeliveryEventActionType.CREATE,
  payload: coinDeliveryEvent
})

export const createCoinDeliveryEventSuccessAction = (coinDeliveryEvent: CoinDeliveryEvent) => ({
  type: CoinDeliveryEventActionType.CREATE_SUCCESS,
  payload: coinDeliveryEvent
})

export const updateCoinDeliveryEventAction = (coinDeliveryEvent: CoinDeliveryEvent) => ({
  type: CoinDeliveryEventActionType.UPDATE,
  payload: coinDeliveryEvent
})

export const updateCoinDeliveryEventSuccessAction = (coinDeliveryEvent: CoinDeliveryEvent) => ({
  type: CoinDeliveryEventActionType.UPDATE_SUCCESS,
  payload: coinDeliveryEvent
})
