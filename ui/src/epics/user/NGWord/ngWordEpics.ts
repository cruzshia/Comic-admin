import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { exhaustMap, map, catchError, tap } from 'rxjs/operators'
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
    ofType(NGWordActionType.GET_NGWORD),
    exhaustMap(() =>
      ngWordServices.getNGWordAjax().pipe(
        map(res => getNGWordSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NGWordActionType.GET_NGWORD_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: NGWordActionType.GET_NGWORD_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateNGWordEpics = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NGWordActionType.UPDATE_NGWORD),
    exhaustMap(action =>
      ngWordServices.updateNGWordAjax(action.payload).pipe(
        map(res => updateNGWordSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NGWordActionType.UPDATE_NGWORD_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: NGWordActionType.UPDATE_NGWORD_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export default [getNGWordEpics, updateNGWordEpics]
