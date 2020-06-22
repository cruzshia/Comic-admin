import {
  AdSetting,
  AdSettingEdit,
  AdSettingKeys,
  AdPosition,
  SettingType,
  DeviceType
} from '@src/models/comics/advertisement'
import { batchConvertISO8601, batchConvertDate, _uuid } from '@src/utils/functions'

export const covertEditableAds = ([...adSettingArray]: AdSetting[]): {
  adSettingArray: AdSetting[]
  adsEditObj: AdSettingEdit
  settingType: SettingType
} => {
  const adsEditObj: AdSettingEdit = {}
  let settingType = SettingType.Common

  adSettingArray?.forEach(adSetting => {
    adSetting[AdPosition.Front]?.forEach((ad, adIndex) => {
      ad[AdSettingKeys.ID] = _uuid()
      adSetting[AdPosition.Front]![adIndex] = batchConvertISO8601(ad, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })
    adSetting[AdPosition.Back]?.forEach((ad, adIndex) => {
      ad[AdSettingKeys.ID] = _uuid()
      adSetting[AdPosition.Back]![adIndex] = batchConvertISO8601(ad, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })

    adsEditObj[adSetting[AdSettingKeys.AdDevice]] = adSetting
    settingType = [DeviceType.IOS, DeviceType.Android].includes(adSetting[AdSettingKeys.AdDevice])
      ? SettingType.DeviceType
      : SettingType.Common
  })

  return {
    adSettingArray,
    adsEditObj,
    settingType
  }
}

export const covertToRequestAds = (settingType: SettingType, adsEditData: AdSettingEdit): AdSetting[] => {
  const adsData = []
  if (settingType === SettingType.Common) {
    adsEditData?.[DeviceType.Common] && adsData.push(adsEditData[DeviceType.Common]!)
  } else {
    adsEditData?.[DeviceType.IOS] && adsData.push(adsEditData[DeviceType.IOS]!)
    adsEditData?.[DeviceType.Android] && adsData.push(adsEditData[DeviceType.Android]!)
  }

  adsData.forEach(adSetting => {
    adSetting[AdPosition.Front]?.map(({ id, ...ads }) => {
      ads = batchConvertDate(ads, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })
    adSetting[AdPosition.Back]?.map(({ id, ...ads }) => {
      ads = batchConvertDate(ads, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })
  })

  return adsData
}
