import { AdType, AdPosition, AdSettingKeys } from '@src/models/comics/advertisement'

export const defaultFrontAds = [{ [AdSettingKeys.Type]: AdType.Original }]
export const defaultBackAds = [
  { [AdSettingKeys.Type]: AdType.Fan },
  { [AdSettingKeys.Type]: AdType.Map },
  { [AdSettingKeys.Type]: AdType.Original },
  {}
]

export const defaultAdTypes = {
  device: '',
  [AdPosition.Front]: defaultFrontAds,
  [AdPosition.Back]: defaultBackAds
}
