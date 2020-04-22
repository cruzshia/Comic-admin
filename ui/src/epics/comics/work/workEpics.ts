import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import responseUtil from '@src/utils/responseUtils'
import { WorkActionType, getWorkListSuccessAction, getWorkSuccessAction } from '@src/reducers/comics/work/workActions'
import * as workServices from './workServices'
import { emptyErrorReturn } from '../../utils'

export const getWorkListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_LIST),
    exhaustMap(() =>
      workServices.getWorkListAjax().pipe(
        map(res => getWorkListSuccessAction(res.response)),
        tap(() => responseUtil.success(WorkActionType.GET_LIST_SUCCESS)),
        catchError(() => {
          responseUtil.error(WorkActionType.GET_LIST_ERROR)
          return emptyErrorReturn
        })
      )
    )
  )

export const getWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_WORK),
    exhaustMap(action =>
      workServices.getWorkAjax(action.payload).pipe(
        map(res => getWorkSuccessAction(res.response)),
        tap(() => responseUtil.success(WorkActionType.GET_WORK_SUCCESS)),
        catchError(() => {
          responseUtil.error(WorkActionType.GET_WORK_ERROR)
          return emptyErrorReturn
        })
      )
    )
  )

export default [getWorkListEpic, getWorkEpic]
