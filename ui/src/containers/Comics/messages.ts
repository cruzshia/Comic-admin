import { defineMessages } from 'react-intl'
import { AdType } from '@src/models/comics/advertisement'

const PREFIX = 'comics.'

export default defineMessages({
  adCategory: {
    id: PREFIX + 'ad_category',
    defaultMessage: 'Advertisement Category'
  },
  imageUrl: {
    id: PREFIX + 'image_url',
    defaultMessage: 'Image URL'
  },
  link: {
    id: PREFIX + 'link_url',
    defaultMessage: 'Link URL'
  },
  buttonName: {
    id: PREFIX + 'button_name',
    defaultMessage: 'Button Name'
  },
  adPositionInfo: {
    id: PREFIX + 'ad.position_info',
    defaultMessage: 'Position Info'
  },
  [AdType.Original]: {
    id: PREFIX + 'ad.original',
    defaultMessage: 'Original'
  },
  [AdType.Fan]: {
    id: PREFIX + 'ad.admob',
    defaultMessage: 'Admob (FAN)'
  },
  [AdType.Map]: {
    id: PREFIX + 'ad.map',
    defaultMessage: 'Map'
  },
  episodeImage: {
    id: PREFIX + 'episode_image',
    defaultMessage: 'Episode Image'
  },
  episodeInfo: {
    id: PREFIX + 'episode_info',
    defaultMessage: 'Episode Info'
  },
  episodeNumber: {
    id: PREFIX + 'episode_number',
    defaultMessage: 'Episode Number'
  },
  volumeNumber: {
    id: PREFIX + 'volume_number',
    defaultMessage: 'Volume Number'
  },
  workId: {
    id: PREFIX + 'work_id',
    defaultMessage: 'Work ID'
  },
  workIdBrackets: {
    id: PREFIX + 'work_id_brackets',
    defaultMessage: 'Work(ID)'
  },
  workName: {
    id: PREFIX + 'work_name',
    defaultMessage: 'Work Name'
  },
  campaignId: {
    id: PREFIX + 'campaign_id',
    defaultMessage: 'Campaign ID'
  },
  priority: {
    id: PREFIX + 'priority',
    defaultMessage: 'Priority'
  },
  adUnit: {
    id: PREFIX + 'ad_unit',
    defaultMessage: 'Ad Unit'
  },
  contentPrice: {
    id: PREFIX + 'content_price',
    defaultMessage: 'Content Price'
  },
  campaignPrice: {
    id: PREFIX + 'campaign_price',
    defaultMessage: 'Campaign Price'
  },
  addAuthor: {
    id: PREFIX + 'author_add',
    defaultMessage: 'Add Author'
  },
  addAds: {
    id: PREFIX + 'add_advertisement',
    defaultMessage: 'Add Advertisement'
  },
  addNewAuthor: {
    id: PREFIX + 'add_new_author',
    defaultMessage: 'Add New Author'
  },
  worksId: {
    id: PREFIX + 'works_id',
    defaultMessage: 'Work (ID)'
  },
  requestName: {
    id: PREFIX + 'request_name',
    defaultMessage: 'Request Name'
  },
  worksCampaign: {
    id: PREFIX + 'works_campaign',
    defaultMessage: 'Works Campaign'
  },
  contentCampaign: {
    id: PREFIX + 'content_campaign',
    defaultMessage: 'Content Campaign'
  },
  return: {
    id: PREFIX + 'return',
    defaultMessage: 'With Return'
  },
  notReturn: {
    id: PREFIX + 'not_return',
    defaultMessage: 'Not Return'
  },
  deviceCategory: {
    id: PREFIX + 'device_category',
    defaultMessage: 'Device Category'
  },
  commonAdSetting: {
    id: PREFIX + 'ad_setting_common',
    defaultMessage: 'Device Common'
  },
  iosAdSetting: {
    id: PREFIX + 'ad_setting_ios',
    defaultMessage: 'iOS Ad Setting'
  },
  androidAdSetting: {
    id: PREFIX + 'ad_setting_android',
    defaultMessage: 'Android Ad Setting'
  }
})
