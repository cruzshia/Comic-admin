import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CampaignActionType,
  getCampaignListSuccessAction,
  getAssociatedCampaignListSuccessAction,
  getCampaignSuccessAction,
  updateCampaignSuccessAction,
  createCampaignSuccessAction
} from '@src/reducers/comics/campaign/campaignActions'
import { mockListResponse, mockCampaign, mockSubListResponse } from './mockData/mockCampaign'
import * as campaignServices from './campaignServices'
import { emptyErrorReturn } from '../../utils'
import { toRequestCampaign, toCampaignModel } from './transform'
import { of } from 'rxjs'

export const getCampaignListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_LIST),
    switchMap(action =>
      campaignServices.getCampaignListAjax(action.payload).pipe(
        map(res => getCampaignListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          return of(getCampaignListSuccessAction(mockListResponse))
          // errorSubject.next({ type: CampaignActionType.GET_LIST_ERROR })
          // return emptyErrorReturn()
        })
      )
    )
  )

export const getAssociatedCampaignListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_SUB_LIST),
    switchMap(action =>
      campaignServices.getAssociatedCampaignListAjax(action.payload.campaignId, action.payload.query).pipe(
        map(res => getAssociatedCampaignListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.GET_SUB_LIST_SUCCESS })),
        catchError(() => {
          return of(getAssociatedCampaignListSuccessAction(mockSubListResponse))
          // errorSubject.next({ type: CampaignActionType.GET_SUB_LIST_ERROR })
          // return emptyErrorReturn()
        })
      )
    )
  )

export const getCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      campaignServices.getCampaignAjax(action.payload).pipe(
        map(res => getCampaignSuccessAction(toCampaignModel(res.response))),
        tap(() => successSubject.next({ type: CampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(() => {
          return of(getCampaignSuccessAction(mockCampaign))
          // errorSubject.next({ type: CampaignActionType.GET_CAMPAIGN_ERROR })
          // return emptyErrorReturn()
        })
      )
    )
  )

export const updateCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.UPDATE),
    exhaustMap(action =>
      campaignServices.updateCampaignAjax(toRequestCampaign(action.payload)).pipe(
        map(res => updateCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.UPDATE_SUCCESS })),
        catchError(() => {
          return of(getCampaignSuccessAction(mockCampaign))
          // errorSubject.next({ type: CampaignActionType.UPDATE_ERROR })
          // return emptyErrorReturn()
        })
      )
    )
  )

export const createCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.CREATE),
    exhaustMap(action =>
      campaignServices.createCampaignAjax(toRequestCampaign(action.payload)).pipe(
        map(res => createCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getCampaignListEpic,
  getAssociatedCampaignListEpic,
  getCampaignEpic,
  updateCampaignEpic,
  createCampaignEpic
]
