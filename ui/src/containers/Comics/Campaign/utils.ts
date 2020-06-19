import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import messages from './messages'
import { Campaign, CampaignKeys } from '@src/models/comics/campaign'
import {
  composeValidators,
  required,
  isValidLength,
  validDateTime,
  TEXT_LIMIT,
  DESCRIPTION_LIMIT
} from '@src/utils/validation'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.campaign }
]

export function validateCampaign(values: Partial<Campaign>) {
  return {
    [CampaignKeys.Name]: composeValidators(required, isValidLength(TEXT_LIMIT))(values[CampaignKeys.Name]!),
    [CampaignKeys.BeginAt]: validDateTime(values[CampaignKeys.BeginAt] || ''),
    [CampaignKeys.EndAt]: validDateTime(values[CampaignKeys.EndAt] || ''),
    [CampaignKeys.Note]: composeValidators(required, isValidLength(DESCRIPTION_LIMIT))(values[CampaignKeys.Note]!)
  }
}
