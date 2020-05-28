import { Observable } from 'rxjs'
import { ignoreElements } from 'rxjs/operators'
import { of } from 'rxjs'

export const emptyErrorReturn = () => of().pipe(ignoreElements())

export type Response<T> = Observable<{
  status: number
  response: T
}>
