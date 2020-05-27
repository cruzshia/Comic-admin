import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { exhaustMap, switchMap, catchError, tap, map, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  DisplaySettingActionType,
  getDisplaySettingListSuccessAction,
  createDisplaySettingSuccessAction,
  getDisplaySettingSuccessAction,
  updateDisplaySettingSuccessAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import * as displaySettingServices from './displaySettingServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getDisplaySettingListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.GET_LIST),
    switchMap(() =>
      displaySettingServices.getDisplaySettingListAjax().pipe(
        map(res => getDisplaySettingListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: DisplaySettingActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getDisplaySettingEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.GET_SETTING),
    switchMap(action =>
      displaySettingServices.getDisplaySettingAjax(action.payload).pipe(
        map(res => getDisplaySettingSuccessAction(res.response)),
        tap(() => successSubject.next({ type: DisplaySettingActionType.GET_SETTING_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.GET_SETTING_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateDisplaySettingEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.UPDATE),
    exhaustMap(action =>
      displaySettingServices.updateDisplaySettingAjax(action.payload).pipe(
        map(res => updateDisplaySettingSuccessAction(res.response)),
        tap(() => successSubject.next({ type: DisplaySettingActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.UPDATE_ERROR })
          return emptyErrorReturn()
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
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.DELETE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createDisplaySettingEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(DisplaySettingActionType.CREATE),
    exhaustMap(action =>
      displaySettingServices.createDisplaySettingAjax(action.payload).pipe(
        map(res => createDisplaySettingSuccessAction(res.response)),
        tap(() => successSubject.next({ type: DisplaySettingActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: DisplaySettingActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export default [
  getDisplaySettingListEpic,
  deleteDisplaySettingEpic,
  createDisplaySettingEpic,
  getDisplaySettingEpic,
  updateDisplaySettingEpic
]
