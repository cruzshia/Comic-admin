import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  WorksCampaignActionType,
  getWorksCampaignSuccessAction,
  createWorksCampaignSuccessAction,
  updateWorksCampaignSuccessAction
} from '@src/reducers/comics/campaign/worksCampaignActions'
import { WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import { ActionType } from '@src/reducers/types'
import * as worksCampaignServices from './worksCampaignServices'
import { emptyErrorReturn, toMockData } from '../../utils'
import { toEditableWorkCampaign } from './transform'
import { mockCampaign } from './mockData/mockWorkCampaign'

export const getWorksCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorksCampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      worksCampaignServices.getWorksCampaignAjax(action.payload).pipe(
        map(res => getWorksCampaignSuccessAction(toEditableWorkCampaign(res.response))),
        tap(() => successSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_ERROR })
          return (
            toMockData(error, of(getWorksCampaignSuccessAction(toEditableWorkCampaign(mockCampaign)))) ||
            emptyErrorReturn()
          )
        })
      )
    )
  )

export const createWorksCampaignEpic = (action$: ActionsObservable<ActionType<WorkCampaignCreate>>) =>
  action$.pipe(
    ofType(WorksCampaignActionType.CREATE),
    switchMap(action =>
      worksCampaignServices.createWorksCampaignAjax(action.payload).pipe(
        map(res => createWorksCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorksCampaignActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorksCampaignActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateWorksCampaignEpic = (action$: ActionsObservable<ActionType<WorkCampaignCreate>>) =>
  action$.pipe(
    ofType(WorksCampaignActionType.UPDATE),
    switchMap(action =>
      worksCampaignServices.updateWorksCampaignAjax(action.payload).pipe(
        map(res => updateWorksCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorksCampaignActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorksCampaignActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getWorksCampaignEpic, createWorksCampaignEpic, updateWorksCampaignEpic]
