import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { switchMap, exhaustMap, map, catchError, tap } from 'rxjs/operators'
import {
  NGWordActionType,
  getNGWordSuccessAction,
  updateNGWordSuccessAction
} from '@src/reducers/user/NGWord/ngWordActions'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import * as ngWordServices from './ngWordServices'
import { emptyErrorReturn } from '../../utils'

export const getNGWordEpics = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NGWordActionType.GET),
    switchMap(() =>
      ngWordServices.getNGWordAjax().pipe(
        map(res => getNGWordSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NGWordActionType.GET_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: NGWordActionType.GET_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateNGWordEpics = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NGWordActionType.UPDATE),
    exhaustMap(action =>
      ngWordServices.updateNGWordAjax(action.payload).pipe(
        map(res => updateNGWordSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NGWordActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: NGWordActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export default [getNGWordEpics, updateNGWordEpics]
