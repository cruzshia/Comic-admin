import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import responseUtil from '@src/utils/responseUtils'
import { loginAjax } from './userServices'
import { UserActionType, loginSuccessAction, loginErrorAction } from '@src/reducers/user/userActions'

export const userLoginEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.LOGIN),
    exhaustMap(action =>
      loginAjax(action.payload.email, action.payload.email).pipe(
        map(res => loginSuccessAction(res.response)),
        tap(() => responseUtil.success(UserActionType.LOGIN_SUCCESS)),
        catchError(err => of(loginErrorAction(err)))
      )
    )
  )

export default [userLoginEpic]
