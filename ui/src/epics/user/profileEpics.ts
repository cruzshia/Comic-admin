import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject } from '@src/utils/responseSubject'
import * as userServices from './profileServices'
import {
  ProfileActionType,
  loginSuccessAction,
  loginErrorAction,
  getProfileSuccessAction,
  getProfileErrorAction
} from '@src/reducers/user/profileActions'

export const userLoginEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ProfileActionType.LOGIN),
    exhaustMap(action =>
      userServices.loginAjax(action.payload.email, action.payload.password).pipe(
        map(res => loginSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ProfileActionType.LOGIN_SUCCESS })),
        catchError(err => of(loginErrorAction(err)))
      )
    )
  )

export const userGetProfileEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ProfileActionType.GET_PROFILE),
    exhaustMap(() =>
      userServices.getProfileAjax().pipe(
        map(res => getProfileSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ProfileActionType.GET_PROFILE_SUCCESS })),
        catchError(err => of(getProfileErrorAction(err)))
      )
    )
  )

export default [userLoginEpic, userGetProfileEpic]
