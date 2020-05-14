import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { CampaignActionType, getCampaignListSuccessAction } from '@src/reducers/comics/campaign/campaignActions'
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

export default [getCampaignListEpic]
