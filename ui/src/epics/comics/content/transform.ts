import { ContentKeys } from '@src/models/comics/content'
import { SettingType } from '@src/models/comics/advertisement'
import { filterEmpty } from '@src/utils/functions'
import { covertEditableAds, covertToRequestAds } from '../adUtils'

export const toEditableModel = ({ ...content }: any): any => {
  const { adSettingArray, adsEditObj, settingType } = covertEditableAds(content[ContentKeys.AdSetting] || [])
  content[ContentKeys.AdSettingEdit] = adsEditObj
  content[ContentKeys.AdSetting] = adSettingArray
  content[ContentKeys.SettingType] = settingType

  return content
}

export function toRequestContent({ ...convertedContent }) {
  // convert ad setting edit data to request data
  convertedContent[ContentKeys.AdSetting] = covertToRequestAds(
    convertedContent[ContentKeys.SettingType] || SettingType.Common,
    convertedContent[ContentKeys.AdSettingEdit]!
  )
  convertedContent[ContentKeys.Authors] = filterEmpty(convertedContent[ContentKeys.Authors])
  convertedContent[ContentKeys.Tags] = filterEmpty(convertedContent[ContentKeys.Tags])
  convertedContent[ContentKeys.TagGroups] = filterEmpty(convertedContent[ContentKeys.TagGroups])
  delete convertedContent[ContentKeys.AdSettingEdit]
  delete convertedContent[ContentKeys.SettingType]

  return convertedContent
}
