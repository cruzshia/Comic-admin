import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CampaignActionType,
  getCampaignListSuccessAction,
  getSubCampaignListSuccessAction,
  getCampaignSuccessAction,
  updateCampaignSuccessAction,
  createCampaignSuccessAction
} from '@src/reducers/comics/campaign/campaignActions'
import * as campaignServices from './campaignServices'
import { emptyErrorReturn } from '../../utils'

export const getCampaignListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_LIST),
    switchMap(() =>
      campaignServices.getCampaignListAjax().pipe(
        map(res => getCampaignListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getSubCampaignListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_SUB_LIST),
    switchMap(() =>
      campaignServices.getSubCampaignListAjax().pipe(
        map(res => getSubCampaignListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.GET_SUB_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.GET_SUB_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      campaignServices.getCampaignAjax(action.payload).pipe(
        map(res => getCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.GET_CAMPAIGN_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.UPDATE),
    exhaustMap(action =>
      campaignServices.updateCampaignAjax(action.payload).pipe(
        map(res => updateCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CampaignActionType.CREATE),
    exhaustMap(action =>
      campaignServices.createCampaignAjax(action.payload).pipe(
        map(res => createCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CampaignActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CampaignActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getCampaignListEpic, getSubCampaignListEpic, getCampaignEpic, updateCampaignEpic, createCampaignEpic]
