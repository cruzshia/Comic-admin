import { AnyAction } from 'redux'
import { _uuid } from '@src/utils/functions'
import Image from '@src/models/image'
import S3Info from '@src/models/s3Info'
import { uploadImageAction } from '@src/reducers/image/imageActions'

interface UploadProps {
  imageData?: any
  imageKey: { [key: string]: string }
  uploadUrls?: Image<S3Info>
  notifyPath: string
  path: string
}

export const genImageUploadActions = ({ imageData, imageKey, uploadUrls, notifyPath, path }: UploadProps) => {
  if (!uploadUrls || !imageData) return []
  const uploadActions: AnyAction[] = []
  Object.values(imageKey).forEach(key => {
    if (uploadUrls && imageData?.[key]?.url instanceof File) {
      uploadActions.push(
        uploadImageAction({
          notifyPath,
          imageKey: key,
          image: imageData![key],
          s3Info: {
            url: uploadUrls![key as keyof typeof uploadUrls].url,
            path: `${path}/${key}/${_uuid()}/${key}.png`
          }
        })
      )
    }
  })

  return uploadActions
}
