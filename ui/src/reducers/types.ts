import { AnyAction } from 'redux'

export interface ActionType<T> extends AnyAction {
  payload: T
  error?: any
}
