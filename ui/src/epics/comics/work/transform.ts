import { AnyAction } from 'redux'
import WorkDetail, { WorkKeys, WorkType } from '@src/models/comics/work'
import { AdSettingKeys, AdPosition } from '@src/models/comics/advertisement'
import { ImageKey } from '@src/models/image'
import { uploadImageAction, ListParams } from '@src/reducers/comics/work/workActions'
import { batchConvertDate, batchConvertISO8601, toDateTime } from '@src/utils/functions'
import { _uuid } from '@src/utils/functions'

export const formatListTime = (data: ListParams) => {
  data?.works?.forEach(work => {
    work[WorkKeys.CreateAt] = toDateTime(work[WorkKeys.CreateAt])
  })
  return data || []
}

export const toEditableModel = ({ ...work }: WorkDetail): WorkDetail => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  work[WorkKeys.AppId] = work[WorkKeys.App]?.[0].id
  work[WorkKeys.SubscriptionId] = work[WorkKeys.Subscription]?.id
  work[WorkKeys.AdSetting]?.forEach(adSetting => {
    adSetting[AdPosition.Front]?.forEach(ad => (ad[AdSettingKeys.ID] = _uuid()))
    adSetting[AdPosition.Back]?.forEach(ad => (ad[AdSettingKeys.ID] = _uuid()))
  })

  work = batchConvertISO8601<WorkDetail>(work, [
    WorkKeys.CreateAt,
    WorkKeys.UpdateAt,
    WorkKeys.PublishBeginAt,
    WorkKeys.PublishEndAt
  ])

  work[WorkKeys.AdSetting]?.forEach((adSetting, settingIdx) => {
    adSetting[AdPosition.Front]?.map((ads, adIndex) => {
      work[WorkKeys.AdSetting]![settingIdx][AdPosition.Front]![adIndex] = batchConvertISO8601(ads, [
        AdSettingKeys.BeginAt,
        AdSettingKeys.EndAt
      ])
    })
    adSetting[AdPosition.Back]?.map((ads, adIndex) => {
      work[WorkKeys.AdSetting]![settingIdx][AdPosition.Front]![adIndex] = batchConvertISO8601(ads, [
        AdSettingKeys.BeginAt,
        AdSettingKeys.EndAt
      ])
    })
  })

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

export const imgUploadActions = (work: WorkDetail, payload: WorkDetail): AnyAction[] => {
  const uploadActions: any[] = []
  const imageData = payload[WorkKeys.Images]
  Object.values(ImageKey).forEach(key => {
    if (work[WorkKeys.S3Uploads] && imageData?.[key].url instanceof File) {
      uploadActions.push(
        uploadImageAction({
          workId: work.id,
          imageKey: key,
          image: imageData![key],
          s3Info: work[WorkKeys.S3Uploads]![key as keyof typeof work[WorkKeys.S3Uploads]]
        })
      )
    }
  })

  return uploadActions
}
