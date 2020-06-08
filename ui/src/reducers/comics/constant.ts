import { AdType, AdPosition, AdSettingKeys } from '@src/models/comics/advertisement'
import { _uuid } from '@src/utils/functions'

export const defaultFrontAds = [{ [AdSettingKeys.ID]: _uuid(), [AdSettingKeys.Type]: AdType.Original }]
export const defaultBackAds = [
  {
    [AdSettingKeys.ID]: _uuid(),
    [AdSettingKeys.Type]: AdType.Fan
  },
  { [AdSettingKeys.ID]: _uuid(), [AdSettingKeys.Type]: AdType.Map },
  { [AdSettingKeys.ID]: _uuid(), [AdSettingKeys.Type]: AdType.Original },
  { [AdSettingKeys.ID]: _uuid() }
]

export const defaultAdTypes = {
  device: '',
  [AdPosition.Front]: defaultFrontAds,
  [AdPosition.Back]: defaultBackAds
}
