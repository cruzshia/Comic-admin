import WorkDetail, { WorkKeys, WorkType } from '@src/models/comics/work'
import { AdSettingKeys, AdPosition } from '@src/models/comics/advertisement'
import { ImageKey } from '@src/models/image'
import { batchConvertDate, batchConvertISO8601 } from '@src/utils/functions'
import { _uuid } from '@src/utils/functions'

export const toEditableModel = ({ ...work }: WorkDetail): WorkDetail => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  work[WorkKeys.AppId] = work[WorkKeys.App]?.[0].id
  work[WorkKeys.SubscriptionId] = work[WorkKeys.Subscription]?.id
  work[WorkKeys.AdSetting]?.forEach((adSetting, settingIdx) => {
    adSetting[AdPosition.Front]?.forEach((ad, adIndex) => {
      ad[AdSettingKeys.ID] = _uuid()
      adSetting[AdPosition.Front]![adIndex] = batchConvertISO8601(ad, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })
    adSetting[AdPosition.Back]?.forEach((ad, adIndex) => {
      ad[AdSettingKeys.ID] = _uuid()
      adSetting[AdPosition.Back]![adIndex] = batchConvertISO8601(ad, [AdSettingKeys.BeginAt, AdSettingKeys.EndAt])
    })
  })

  work = batchConvertISO8601<WorkDetail>(work, [
    WorkKeys.CreateAt,
    WorkKeys.UpdateAt,
    WorkKeys.PublishBeginAt,
    WorkKeys.PublishEndAt
  ])

  return work
}

export function toRequestWork({ [WorkKeys.CreateAt]: _, [WorkKeys.UpdateAt]: __, ...work }: WorkDetail) {
  const convertedWork = batchConvertDate(work, [WorkKeys.PublishBeginAt, WorkKeys.PublishEndAt]) as WorkDetail
  if (convertedWork[WorkKeys.WorkType] !== WorkType.Episode) {
    ;[
      WorkKeys.EpisodeWorkType,
      WorkKeys.UpdateFrequency,
      WorkKeys.FreePeriodicalDay,
      WorkKeys.AdSetting,
      WorkKeys.MagazineName
    ].forEach(key => delete convertedWork[key])
    return convertedWork
  }

  const images = convertedWork[WorkKeys.Images]
  const imageName = Object.values(ImageKey).reduce((acc: Partial<WorkDetail[WorkKeys.Filename]>, current: ImageKey) => {
    const image = images?.[current]?.url
    acc![current] = current + (image instanceof File ? image.type.replace('image/', '.') : '.png')
    return acc
  }, {}) as WorkDetail[WorkKeys.Filename]
  convertedWork[WorkKeys.Filename] = images ? imageName : undefined

  convertedWork[WorkKeys.AdSetting]?.forEach((adSetting, settingIdx) => {
    adSetting[AdPosition.Front]?.map((ads, adIndex) => {
      convertedWork[WorkKeys.AdSetting]![settingIdx][AdPosition.Front]![adIndex] = batchConvertDate(ads, [
        AdSettingKeys.BeginAt,
        AdSettingKeys.EndAt
      ])
    })
    adSetting[AdPosition.Back]?.map((ads, adIndex) => {
      convertedWork[WorkKeys.AdSetting]![settingIdx][AdPosition.Front]![adIndex] = batchConvertDate(ads, [
        AdSettingKeys.BeginAt,
        AdSettingKeys.EndAt
      ])
    })
  })

  convertedWork[WorkKeys.ReturnAdRevenue] = false
  return convertedWork
}
