export enum AdSettingKeys {
  AdDevice = 'device',
  Type = 'type',
  ImageUrl = 'image_url',
  Button = 'button_wording',
  ActionUrl = 'action_url',
  BeginAt = 'begin_at',
  EndAt = 'end_at'
}

export enum AdPosition {
  Front = 'front_ads',
  Back = 'back_ads'
}

export enum AdType {
  Original = 'original',
  Fan = 'fan',
  Map = 'map'
}
export interface Advertisement {
  [AdSettingKeys.Type]: AdType
  [AdSettingKeys.ImageUrl]?: string
  [AdSettingKeys.Button]?: string
  [AdSettingKeys.ActionUrl]?: string
  [AdSettingKeys.BeginAt]?: string
  [AdSettingKeys.EndAt]?: string
}

export interface AdSetting {
  [AdSettingKeys.AdDevice]: string
  [AdPosition.Front]?: Advertisement[]
  [AdPosition.Back]?: Advertisement[]
}

type Ad = any
export default Ad
