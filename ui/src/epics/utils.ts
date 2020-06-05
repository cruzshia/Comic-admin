import { Observable, of } from 'rxjs'
import { AjaxError } from 'rxjs/ajax'
import { ignoreElements } from 'rxjs/operators'

export const emptyErrorReturn = () => of().pipe(ignoreElements())

export type Response<T> = Observable<{
  status: number
  response: T
}>

export enum ErrorKey {
  Type = 'type',
  FieldError = 'field_errors'
}
export interface ErrorResponse extends AjaxError {
  response: {
    [ErrorKey.Type]: string
    [ErrorKey.FieldError]: {
      [key: string]: {
        type: string
        message: string
      }
    }
  }
}

export const extractFormErrors = (error: AjaxError) => ({
  ...error,
  response: {
    field_errors: Object.keys(error.response[ErrorKey.FieldError]).reduce((acc: { [key: string]: string }, current) => {
      acc[current] = error.response[ErrorKey.FieldError][current].message
      return acc
    }, {})
  }
})
