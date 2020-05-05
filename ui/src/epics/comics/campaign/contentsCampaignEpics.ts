import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ContentsCampaignActionType,
  getContentsCampaignSuccessAction
} from '@src/reducers/comics/campaign/contentsCampaignActions'
import * as contentsCampaignEpics from './contentsCampaignServices'
import { emptyErrorReturn } from '../../utils'

export const getContentsCampaignEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentsCampaignActionType.GET_CAMPAIGN),
    switchMap(action =>
      contentsCampaignEpics.getContentsCampaignAjax(action.payload).pipe(
        map(res => getContentsCampaignSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentsCampaignActionType.GET_CAMPAIGN_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentsCampaignActionType.GET_CAMPAIGN_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getContentsCampaignEpic]
