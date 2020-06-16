import { WorksCampaign, WorksCampaignKeys } from '@src/models/comics/worksCampaign'

export const toEditableWorkCampaign = ({ ...campaign }: WorksCampaign) => {
  campaign[WorksCampaignKeys.AppIds] = campaign[WorksCampaignKeys.Apps].map(app => app.id)
  return campaign
}
