import { ActionsObservable, ofType } from 'redux-observable'
import { map, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ImageActionType,
  notifyImgUploadedAction,
  UploadImagePayload,
  NotifyUploaded
} from '@src/reducers/image/imageActions'
import { ActionType } from '@src/reducers/types'
import * as imageServices from './imageServices'
import { emptyErrorReturn } from './utils'

export const uploadImageEpic = (action$: ActionsObservable<ActionType<UploadImagePayload>>) =>
  action$.pipe(
    ofType(ImageActionType.IMAGE_UPLOAD),
    exhaustMap(action =>
      imageServices.uploadImageAjax(action.payload).pipe(
        map(() =>
          notifyImgUploadedAction({
            notifyPath: action.payload.notifyPath,
            imageMeta: {
              [action.payload.imageKey]: {
                path: action.payload.s3Info.path,
                width: action.payload.image.width,
                height: action.payload.image.height
              }
            }
          })
        ),
        tap(() => successSubject.next({ type: ImageActionType.IMAGE_UPLOAD_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ImageActionType.IMAGE_UPLOAD_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const notifyImgUploadedEpic = (action$: ActionsObservable<ActionType<NotifyUploaded>>) =>
  action$.pipe(
    ofType(ImageActionType.NOTIFY_IMG_UPLOADED),
    exhaustMap(action =>
      imageServices.notifyImageUploadedAjax(action.payload).pipe(
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: ImageActionType.NOTIFY_IMG_UPLOADED_FAILED })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [uploadImageEpic, notifyImgUploadedEpic]
