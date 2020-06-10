import { Observable, of } from 'rxjs'
import { AnyAction } from 'redux'
import { AjaxError } from 'rxjs/ajax'
import { ignoreElements } from 'rxjs/operators'

export const emptyErrorReturn = () => of().pipe(ignoreElements())

export type Response<T> = Observable<{
  status: number
  response: T
}>

export enum ErrorKey {
  Type = 'type',
  Message = 'message',
  UserMessages = 'user_messages'
}
export interface ErrorResponse extends AjaxError {
  response: {
    [ErrorKey.Type]: string
    [ErrorKey.UserMessages]: string[]
    [ErrorKey.Message]: string
  }
}

enum ErrorCode {
  BadRequest = 'BadRequest',
  Forbidden = 'Forbidden',
  ServerError = 'InternalServerError',
  ServiceUnavailable = 'ServiceUnavailable'
}

export function toMockData(error: ErrorResponse, mockData: any): Observable<AnyAction> {
  return !error.response || (error.response?.type === ErrorCode.BadRequest && error.response.message === '')
    ? mockData
    : undefined
}
