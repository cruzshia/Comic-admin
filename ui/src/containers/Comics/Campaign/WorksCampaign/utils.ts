import { routePath } from '@src/common/appConfig'
import { validateAd } from '@src/containers/Comics/components/Advertisement'
import { WorkCampaignCreate, WorksCampaignKeys } from '@src/models/comics/worksCampaign'
import {
  required,
  composeValidators,
  isValidLength,
  DESCRIPTION_LIMIT,
  validDateTime,
  isValidDuration,
  CHARACTER_LIMIT
} from '@src/utils/validation'
import commonMessages from '@src/messages'
import campaignMessages from '../messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: campaignMessages.list, route: routePath.comics.campaign },
  { title: campaignMessages.detail, route: routePath.comics.campaignDetail }
]

export function validateWorkCampaign(values: Partial<WorkCampaignCreate> & { isEpisodeWork?: boolean }) {
  const isEdit = !!values.id

  return {
    [WorksCampaignKeys.CampaignID]: isEdit ? undefined : required(values[WorksCampaignKeys.CampaignID]),
    [WorksCampaignKeys.Name]: composeValidators(
      required,
      isValidLength(DESCRIPTION_LIMIT)
    )(values[WorksCampaignKeys.Name]),
    [WorksCampaignKeys.WorkId]: required(values[WorksCampaignKeys.WorkId]),
    [WorksCampaignKeys.AppIds]: required(values[WorksCampaignKeys.AppIds]),
    [WorksCampaignKeys.BeginAt]: composeValidators(required, validDateTime)(values[WorksCampaignKeys.BeginAt]),
    [WorksCampaignKeys.EndAt]:
      composeValidators(required, validDateTime)(values[WorksCampaignKeys.EndAt]) ||
      isValidDuration(values[WorksCampaignKeys.BeginAt] || '', values[WorksCampaignKeys.EndAt]!),
    [WorksCampaignKeys.Priority]: required(values[WorksCampaignKeys.Priority]),
    [WorksCampaignKeys.FreeRange]: values[WorksCampaignKeys.FreeRange]
      ? isValidLength(CHARACTER_LIMIT)(values[WorksCampaignKeys.FreeRange]!)
      : undefined,
    [WorksCampaignKeys.FreeRangeDisplay]: values[WorksCampaignKeys.FreeRangeDisplay]
      ? isValidLength(CHARACTER_LIMIT)(values[WorksCampaignKeys.FreeRange]!)
      : undefined,
    [WorksCampaignKeys.AdSetting]: values[WorksCampaignKeys.AdSetting]?.map(setting => validateAd(setting))
  }
}
