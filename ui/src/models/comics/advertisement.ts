export enum AdSettingKeys {
  ID = 'id',
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

export enum SettingType {
  Common = 'common',
  DeviceType = 'deviceType'
}

export enum DeviceType {
  Common = 'common',
  IOS = 'ios',
  Android = 'android'
}
export interface Advertisement {
  [AdSettingKeys.ID]?: string
  [AdSettingKeys.Type]?: AdType
  [AdSettingKeys.ImageUrl]?: string
  [AdSettingKeys.Button]?: string
  [AdSettingKeys.ActionUrl]?: string
  [AdSettingKeys.BeginAt]?: string
  [AdSettingKeys.EndAt]?: string
}

export interface AdSetting {
  [AdSettingKeys.AdDevice]: DeviceType
  [AdPosition.Front]?: Advertisement[]
  [AdPosition.Back]?: Advertisement[]
}

export interface AdSettingEdit {
  [DeviceType.Common]?: AdSetting
  [DeviceType.IOS]?: AdSetting
  [DeviceType.Android]?: AdSetting
}

export default Advertisement
