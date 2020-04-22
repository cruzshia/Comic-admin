import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { exhaustMap, catchError, tap, map } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  DisplaySettingActionType,
  getDisplaySettingListSuccessAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import * as displaySettingServices from './displaySettingServices'
import { emptyErrorReturn, emptyReturnOperator } from '../../utils'

export const getDisplaySettingListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.GET_LIST),
    exhaustMap(() =>
      displaySettingServices.getDisplaySettingListAjax().pipe(
        map(res => getDisplaySettingListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: DisplaySettingActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.GET_LIST_ERROR })
          return emptyErrorReturn
        })
      )
    )
  )

export const deleteDisplaySettingEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.DELETE),
    exhaustMap(action =>
      displaySettingServices.deleteDisplaySettingAjax(action.payload).pipe(
        tap(() => successSubject.next({ type: DisplaySettingActionType.DELETE_SUCCESS })),
        emptyReturnOperator(),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.DELETE_ERROR })
          return emptyErrorReturn
        })
      )
    )
  )

export default [getDisplaySettingListEpic, deleteDisplaySettingEpic]
