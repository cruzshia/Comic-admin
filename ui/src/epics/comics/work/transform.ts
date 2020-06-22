import WorkDetail, { WorkKeys, WorkType } from '@src/models/comics/work'
import { SettingType } from '@src/models/comics/advertisement'
import { ImageKey } from '@src/models/image'
import { batchConvertDate, batchConvertISO8601, filterEmpty } from '@src/utils/functions'
import { covertEditableAds, covertToRequestAds } from '../adUtils'

export const toEditableModel = ({ ...work }: WorkDetail): WorkDetail => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  work[WorkKeys.AppId] = work[WorkKeys.App]?.[0].id
  work[WorkKeys.SubscriptionId] = work[WorkKeys.Subscription]?.id

  const { adSettingArray, adsEditObj, settingType } = covertEditableAds(work[WorkKeys.AdSetting] || [])
  work[WorkKeys.AdSettingEdit] = adsEditObj
  work[WorkKeys.AdSetting] = adSettingArray
  work[WorkKeys.SettingType] = settingType
  work[WorkKeys.ReturnAdRevenue] = work[WorkKeys.ReturnAdRevenue] || false

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
  convertedWork[WorkKeys.AuthorIds] = filterEmpty(convertedWork[WorkKeys.AuthorIds] || [])

  // convert ad setting edit data to request data
  convertedWork[WorkKeys.AdSetting] = covertToRequestAds(
    convertedWork[WorkKeys.SettingType] || SettingType.Common,
    convertedWork[WorkKeys.AdSettingEdit]!
  )
  delete convertedWork[WorkKeys.AdSettingEdit]
  delete convertedWork[WorkKeys.SettingType]

  return convertedWork
}
