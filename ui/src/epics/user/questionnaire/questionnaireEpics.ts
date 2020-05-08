import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  QuestionnaireActionType,
  getQuestionnaireSuccessAction,
  createQuestionnaireSuccessAction,
  updateQuestionnaireSuccessAction
} from '@src/reducers/user/questionnaire/questionnaireAction'
import * as questionnaireServices from './questionnaireServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getQuestionnaireEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(QuestionnaireActionType.GET_QUESTIONNAIRE),
    switchMap(action =>
      questionnaireServices.getQuestionnaireAjax(action.payload).pipe(
        map(res => getQuestionnaireSuccessAction(res.response)),
        tap(() => successSubject.next({ type: QuestionnaireActionType.GET_QUESTIONNAIRE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: QuestionnaireActionType.GET_QUESTIONNAIRE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createQuestionnaireEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(QuestionnaireActionType.CREATE),
    exhaustMap(action =>
      questionnaireServices.createQuestionnaireAjax(action.payload).pipe(
        map(res => createQuestionnaireSuccessAction(res.response)),
        tap(() => successSubject.next({ type: QuestionnaireActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: QuestionnaireActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateQuestionnaireEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(QuestionnaireActionType.UPDATE),
    exhaustMap(action =>
      questionnaireServices.updateQuestionnaireAjax(action.payload).pipe(
        map(res => updateQuestionnaireSuccessAction(res.response)),
        tap(() => successSubject.next({ type: QuestionnaireActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: QuestionnaireActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getQuestionnaireEpic, createQuestionnaireEpic, updateQuestionnaireEpic]
