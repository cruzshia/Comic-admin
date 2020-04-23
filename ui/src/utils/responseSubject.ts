import { Subject } from 'rxjs'
import { ofType } from 'redux-observable'
import logger from './logger'

const success = new Subject<SuccessType>()

interface SuccessType {
  type: string
  data?: any
}
export const successSubject = {
  next: (data: SuccessType) => {
    success.next(data)
    logger.log('%c Success subject: ', 'color: #04C1F9', data)
  },
  subscribe: (actions: string[], next: (value: SuccessType) => void) =>
    success
      .asObservable()
      .pipe(ofType(...actions))
      .subscribe(next)
}

const error = new Subject<ErrorType>()
interface ErrorType {
  type: string
  error?: any
}
export const errorSubject = {
  next: (data: ErrorType) => {
    error.next(data)
    logger.info('%c Error subject: ', 'color: #F4800A', data)
  },
  subscribe: (actions: string[], next: (value: ErrorType) => void) =>
    error
      .asObservable()
      .pipe(ofType(...actions))
      .subscribe(next)
}
