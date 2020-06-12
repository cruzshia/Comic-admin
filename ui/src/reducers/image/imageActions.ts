import Image, { ImageInfo } from '@src/models/image'
import S3Info from '@src/models/s3Info'

export enum ImageActionType {
  IMAGE_UPLOAD = '@Image/UPLOAD',
  IMAGE_UPLOAD_SUCCESS = '@Image/UPLOAD_SUCCESS',
  IMAGE_UPLOAD_ERROR = '@Image/UPLOAD_ERROR',

  NOTIFY_IMG_UPLOADED = '@Image/NOTIFY_UPLOADED',
  NOTIFY_IMG_UPLOADED_FAILED = '@Image/NOTIFY_UPLOADED_FAILED'
}

export interface UploadImagePayload {
  notifyPath: string
  imageKey: string
  image: ImageInfo
  s3Info: S3Info
}

export const uploadImageAction = (payload: UploadImagePayload) => ({
  type: ImageActionType.IMAGE_UPLOAD,
  payload
})

export type NotifyImageUpload = Image<ImageInfo>
export interface NotifyUploaded {
  notifyPath: string
  imageMeta: Partial<NotifyImageUpload>
}
export const notifyImgUploadedAction = (payload: NotifyUploaded) => ({
  type: ImageActionType.NOTIFY_IMG_UPLOADED,
  payload
})
