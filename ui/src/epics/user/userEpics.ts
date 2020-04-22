import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of, Observable } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import responseUtil from '@src/utils/responseUtils'
import * as userServices from './userServices'
import {
  UserActionType,
  loginSuccessAction,
  loginErrorAction,
  getProfileSuccessAction,
  getProfileErrorAction
} from '@src/reducers/user/userActions'

export const userLoginEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
  action$.pipe(
    ofType(UserActionType.LOGIN),
    exhaustMap(action =>
      userServices.loginAjax(action.payload.email, action.payload.password).pipe(
        map(res => loginSuccessAction(res.response)),
        tap(() => responseUtil.success(UserActionType.LOGIN_SUCCESS)),
        catchError(err => of(loginErrorAction(err)))
      )
    )
  )

export const userGetProfileEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
  action$.pipe(
    ofType(UserActionType.GET_PROFILE),
    exhaustMap(() =>
      userServices.getProfileAjax().pipe(
        map(res => getProfileSuccessAction(res.response)),
        tap(() => responseUtil.success(UserActionType.GET_PROFILE_SUCCESS)),
        catchError(err => of(getProfileErrorAction(err)))
      )
    )
  )

export default [userLoginEpic, userGetProfileEpic]
