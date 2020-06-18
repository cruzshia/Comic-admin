import authAjax from '@src/utils/ajaxUtil'
import { UploadImagePayload, NotifyImageUpload } from '@src/reducers/image/imageActions'
import { Response } from '../utils'

export const uploadImageAjax = (payload: UploadImagePayload): Response<any> => {
  return authAjax.put(payload.s3Info.url, payload.image, {
    'Content-Type': 'image/png'
  })
}

export const notifyImageUploadedAjax = (payload: {
  notifyPath: string
  imageMeta: Partial<NotifyImageUpload>
}): Response<any> => {
  return authAjax.post(`${payload.notifyPath}/upload_finished`, payload.imageMeta)
}
