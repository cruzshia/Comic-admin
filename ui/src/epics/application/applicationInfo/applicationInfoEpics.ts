import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ApplicationInfoActionType,
  getApplicationInfoListSuccessAction
} from '@src/reducers/application/applicationInfo/applicationInfoActions'
import * as applicationInfoServices from './applicationInfoServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getApplicationInfoListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ApplicationInfoActionType.GET_LIST),
    switchMap(() =>
      applicationInfoServices.getApplicationInfoListAjax().pipe(
        map(res => getApplicationInfoListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ApplicationInfoActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ApplicationInfoActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getApplicationInfoListEpic]
