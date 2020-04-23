import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { UserActionType, getUserListSuccessAction } from '@src/reducers/user/user/userActions'
import * as workServices from './userServices'
import { emptyErrorReturn } from '../../utils'

export const getUserListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.GET_LIST),
    exhaustMap(() =>
      workServices.getUserListAjax().pipe(
        map(res => getUserListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: UserActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getUserListEpic]
