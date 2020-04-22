import { Subject } from 'rxjs'
import { ofType } from 'redux-observable'
import logger from './logger'

const success = new Subject<SuccessType>()

interface SuccessType {
  type: string
  data?: any
}
export const successSubject = {
  next: (data: SuccessType) => success.next(data),
  subscribe: (actions: string[], next: (value: SuccessType) => void) =>
    success
      .asObservable()
      .pipe(ofType(...actions))
      .subscribe(props => {
        next(props)
        logger.log('%c Success subject: ', 'color: #04C1F9', props)
      })
}

const error = new Subject<ErrorType>()
interface ErrorType {
  type: string
  error?: any
}
export const errorSubject = {
  next: (data: ErrorType) => error.next(data),
  subscribe: (actions: string[], next: (value: ErrorType) => void) =>
    error
      .asObservable()
      .pipe(ofType(...actions))
      .subscribe(props => {
        next(props)
        logger.info('%c Error subject: ', 'color: #F4800A', props)
      })
}
