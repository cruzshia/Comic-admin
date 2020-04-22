import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of, Observable } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  DisplaySettingActionType,
  getDisplaySettingListSuccessAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import * as displaySettingServices from './displaySettingServices'

export const getDisplaySettingListEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
  action$.pipe(
    ofType(DisplaySettingActionType.GET_LIST),
    exhaustMap(() =>
      displaySettingServices.getDisplaySettingListAjax().pipe(
        map(res => getDisplaySettingListSuccessAction(res.response)),
        tap(() => {
          successSubject.next({ type: DisplaySettingActionType.GET_LIST_SUCCESS })
        }),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.GET_LIST_ERROR })
          return of({ type: '' })
        })
      )
    )
  )

export const deleteDisplaySettingEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
  action$.pipe(
    ofType(DisplaySettingActionType.DELETE),
    exhaustMap(action =>
      displaySettingServices.deleteDisplaySettingAjax(action.payload).pipe(
        map(_ => ({ type: '' })),
        tap(() => successSubject.next({ type: DisplaySettingActionType.DELETE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.DELETE_ERROR })
          return of({ type: '' })
        })
      )
    )
  )

export default [getDisplaySettingListEpic, deleteDisplaySettingEpic]
