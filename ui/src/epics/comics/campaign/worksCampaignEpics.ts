import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  WorksCampaignActionType,
  getWorksCampaignSuccessAction
} from '@src/reducers/comics/campaign/worksCampaignActions'
import * as worksCampaignServices from './worksCampaignServices'
import { emptyErrorReturn, toMockData } from '../../utils'
import { mockCampaign } from './mockData/mockWorkCampaign'

export const getWorksCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorksCampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      worksCampaignServices.getWorksCampaignAjax(action.payload).pipe(
        map(res => getWorksCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_ERROR })
          return toMockData(error, of(getWorksCampaignSuccessAction(mockCampaign))) || emptyErrorReturn()
        })
      )
    )
  )

export default [getWorksCampaignEpic]
