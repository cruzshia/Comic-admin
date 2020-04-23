import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject } from '@src/utils/responseSubject'
import * as userServices from './userServices'
import {
  UserActionType,
  loginSuccessAction,
  loginErrorAction,
  getProfileSuccessAction,
  getProfileErrorAction
} from '@src/reducers/user/userActions'

export const userLoginEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.LOGIN),
    exhaustMap(action =>
      userServices.loginAjax(action.payload.email, action.payload.password).pipe(
        map(res => loginSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.LOGIN_SUCCESS })),
        catchError(err => of(loginErrorAction(err)))
      )
    )
  )

export const userGetProfileEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.GET_PROFILE),
    exhaustMap(() =>
      userServices.getProfileAjax().pipe(
        map(res => getProfileSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.GET_PROFILE_SUCCESS })),
        catchError(err => of(getProfileErrorAction(err)))
      )
    )
  )

export default [userLoginEpic, userGetProfileEpic]
