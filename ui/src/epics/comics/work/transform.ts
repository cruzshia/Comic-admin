import { AnyAction } from 'redux'
import WorkDetail, { WorkKeys, WorkType } from '@src/models/comics/work'
import { uploadImageAction } from '@src/reducers/comics/work/workActions'

export const toEditableModel = (work: WorkDetail) => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  work[WorkKeys.AppId] = work[WorkKeys.App].id
  return work
}

export const toRequestWork = ({ ...work }: WorkDetail) => {
  if (work[WorkKeys.WorkType] !== WorkType.Episode) {
    ;[
      WorkKeys.EpisodeWorkType,
      WorkKeys.UpdateFrequency,
      WorkKeys.FreePeriodicalDay,
      WorkKeys.AdSetting,
      WorkKeys.MagazineName
    ].forEach(key => delete work[key])
    return work
  }

  work[WorkKeys.ReturnAdRevenue] = false
  return work
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
