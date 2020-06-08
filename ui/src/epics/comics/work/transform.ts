import { AnyAction } from 'redux'
import WorkDetail, { WorkKeys, WorkType } from '@src/models/comics/work'
import { AdSettingKeys, AdPosition } from '@src/models/comics/advertisement'
import { uploadImageAction } from '@src/reducers/comics/work/workActions'
import { batchConvertDate } from '@src/utils/functions'
import { _uuid } from '@src/utils/functions'

export const toEditableModel = (work: WorkDetail) => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  work[WorkKeys.AppId] = work[WorkKeys.App].id
  work[WorkKeys.AdSetting]?.[AdPosition.Front]?.forEach(ad => (ad[AdSettingKeys.ID] = _uuid()))
  work[WorkKeys.AdSetting]?.[AdPosition.Back]?.forEach(ad => (ad[AdSettingKeys.ID] = _uuid()))
  return work
}

export const toRequestWork = (work: WorkDetail): WorkDetail => {
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

  convertedWork[WorkKeys.ReturnAdRevenue] = false
  return convertedWork
}

export const genImgUploadActions = (work: WorkDetail, payload: WorkDetail): AnyAction[] => {
  const images = payload[WorkKeys.Images] || {}
  const uploadActions: any[] = []
  Object.keys(images).forEach(imgKey => {
    const image = payload[WorkKeys.Images]?.[imgKey as keyof typeof payload[WorkKeys.Images]] as any
    if (work[WorkKeys.S3Uploads] && image instanceof File) {
      const key = imgKey.replace('_url', '')
      uploadActions.push(
        uploadImageAction({
          id: work.id,
          imageKey: key,
          image,
          s3Info: work[WorkKeys.S3Uploads]![key as keyof typeof work[WorkKeys.S3Uploads]]
        })
      )
    }
  })
  return uploadActions
}
