import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import {
  InquiryActionType,
  getInquiryListSuccessAction,
  getInquirySuccessAction
} from '@src/reducers/user/inquiry/inquiryAction'
import { AnyAction } from 'redux'
import { map, tap, catchError, switchMap } from 'rxjs/operators'
import * as InquiryServices from './inquiryServices'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { emptyErrorReturn } from '../../utils'

const getInquiryListEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(InquiryActionType.GET_LIST),
    switchMap(() =>
      InquiryServices.getInquiryListAjax().pipe(
        map(res => getInquiryListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: InquiryActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: InquiryActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

const getInquiryEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(InquiryActionType.GET_INQUIRY),
    switchMap(action =>
      InquiryServices.getInquiryAjax(action.payload).pipe(
        map(res => getInquirySuccessAction(res.response)),
        tap(() => successSubject.next({ type: InquiryActionType.GET_INQUIRY_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: InquiryActionType.GET_INQUIRY_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getInquiryListEpics, getInquiryEpics]
