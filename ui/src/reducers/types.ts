import { Action } from 'redux'

export interface ActionType<T> extends Action {
  payload: T
}
