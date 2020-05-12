import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { switchMap, map, tap, catchError } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { GiftComicsActionType } from '@src/reducers/user/giftComics/giftComicsAction'
import { getCSVLogListSuccessAction } from '@src/reducers/user/giftComics/giftComicsAction'
import * as giftComicsServices from './giftComicsServices'
import { emptyErrorReturn } from '../../utils'

const getGiftComicsCsvLogListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(GiftComicsActionType.GET_CSV_LOG_LIST),
    switchMap(() =>
      giftComicsServices.getCsvLogListAjax().pipe(
        map(res => getCSVLogListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: GiftComicsActionType.GET_CSV_LOG_LIST_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: GiftComicsActionType.GET_CSV_LOG_LIST_ERROR, error })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getGiftComicsCsvLogListEpic]
