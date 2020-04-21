import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import responseUtil from '@src/utils/responseUtils'
import { WorkActionType, getWorkListSuccessAction } from '@src/reducers/comics/work/workActions'
import * as workServices from './workServices'

export const getWorkListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_LIST),
    exhaustMap(() =>
      workServices.getWorkListAjax().pipe(
        map(res => getWorkListSuccessAction(res.response)),
        tap(() => responseUtil.success(WorkActionType.GET_LIST_SUCCESS)),
        catchError(() => {
          responseUtil.error(WorkActionType.GET_LIST_ERROR)
          return of({ type: '' })
        })
      )
    )
  )

export default [getWorkListEpic]
