import NGWord from '@src/models/user/NGWord'

export enum NGWordActionType {
  GET = '@UserNGWord/GET',
  GET_SUCCESS = '@UserNGWord/GET_SUCCESS',
  GET_ERROR = '@UserNGWord/GET_ERROR',
  UPDATE = '@UserNGWord/UPDATE',
  UPDATE_SUCCESS = '@UserNGWord/UPDATE_SUCCESS',
  UPDATE_ERROR = '@UserNGWord/UPDATE_ERROR'
}

export const getNGWordAction = () => ({
  type: NGWordActionType.GET
})

export const getNGWordSuccessAction = (payload: NGWord) => ({
  type: NGWordActionType.GET_SUCCESS,
  payload
})

export const updateNGWordAction = (payload: NGWord) => ({
  type: NGWordActionType.UPDATE,
  payload
})

export const updateNGWordSuccessAction = (payload: NGWord) => ({
  type: NGWordActionType.UPDATE_SUCCESS,
  payload
})
