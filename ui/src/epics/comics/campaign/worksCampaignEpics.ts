import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  WorksCampaignActionType,
  getWorksCampaignSuccessAction
} from '@src/reducers/comics/campaign/worksCampaignActions'
import * as worksCampaignServices from './worksCampaignServices'
import { emptyErrorReturn } from '../../utils'

export const getWorksCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorksCampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      worksCampaignServices.getWorksCampaignAjax(action.payload).pipe(
        map(res => getWorksCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorksCampaignActionType.GET_CAMPAIGN_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getWorksCampaignEpic]
