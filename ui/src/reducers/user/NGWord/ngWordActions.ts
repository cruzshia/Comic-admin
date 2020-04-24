import NGWord from '@src/models/user/NGWord'

export enum NGWordActionType {
  GET_NGWORD = '@UserNGword/GET_NGWORD',
  GET_NGWORD_SUCCESS = '@UserNGword/GET_NGWORD_SUCCESS',
  GET_NGWORD_ERROR = '@UserNGword/GET_NGWORD_GET_NGWORD_ERROR',
  UPDATE_NGWORD = '@UserNGword/UPDATE_NGWORD',
  UPDATE_NGWORD_SUCCESS = '@UserNGword/UPDATE_NGWORD_SUCCESS',
  UPDATE_NGWORD_ERROR = '@UserNGword/UPDATE_NGWORD_ERROR'
}

export const getNGWordAction = () => ({
  type: NGWordActionType.GET_NGWORD
})

export const getNGWordSuccessAction = (payload: NGWord) => ({
  type: NGWordActionType.GET_NGWORD_SUCCESS,
  payload
})

export const updateNGWordAction = (payload: NGWord) => ({
  type: NGWordActionType.UPDATE_NGWORD,
  payload
})

export const updateNGWordSuccessAction = (payload: NGWord) => ({
  type: NGWordActionType.UPDATE_NGWORD_SUCCESS,
  payload
})
