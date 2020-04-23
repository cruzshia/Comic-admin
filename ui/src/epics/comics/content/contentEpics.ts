import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { ContentActionType, getContentListSuccessAction } from '@src/reducers/comics/content/contentActions'
import * as contentServices from './contentServices'

export const getContentListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.GET_LIST),
    exhaustMap(() =>
      contentServices.getContentListAjax().pipe(
        map(res => getContentListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.GET_LIST_ERROR })
          return ignoreElements()
        })
      )
    )
  )

export default [getContentListEpic]
