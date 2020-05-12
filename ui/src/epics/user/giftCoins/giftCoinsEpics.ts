import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { switchMap, map, tap, catchError } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { GiftCoinsActionType } from '@src/reducers/user/giftCoins/giftCoinsAction'
import { getCSVLogListSuccessAction } from '@src/reducers/user/giftCoins/giftCoinsAction'
import * as giftCoinsServices from './giftCoinsServices'
import { emptyErrorReturn } from '../../utils'

const getGiftCoinsCsvLogListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(GiftCoinsActionType.GET_CSV_LOG_LIST),
    switchMap(() =>
      giftCoinsServices.getCsvLogListAjax().pipe(
        map(res => getCSVLogListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: GiftCoinsActionType.GET_CSV_LOG_LIST_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: GiftCoinsActionType.GET_CSV_LOG_LIST_ERROR, error })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getGiftCoinsCsvLogListEpic]
