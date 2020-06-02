import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, switchMap, exhaustMap, mergeMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import WorkDetail, { WorkKeys } from '@src/models/comics/work'
import {
  WorkActionType,
  getWorkListSuccessAction,
  getWorkSuccessAction,
  createWorkSuccessAction,
  updateWorkSuccessAction,
  getCsvLogListSuccessAction,
  uploadImageAction,
  notifyImgUploadedAction
} from '@src/reducers/comics/work/workActions'
import * as workServices from './workServices'
import { emptyErrorReturn } from '../../utils'

const toAuthorIds = (work: WorkDetail) => {
  work[WorkKeys.AuthorIds] = work[WorkKeys.Authors].map(author => author.id)
  return work
}

const genImgUploadActions = (work: WorkDetail, payload: WorkDetail): AnyAction[] => {
  const images = payload[WorkKeys.Images] || {}
  const uploadActions: any[] = []
  Object.keys(images).forEach(imgKey => {
    const image = payload[WorkKeys.Images]?.[imgKey as keyof typeof payload[WorkKeys.Images]] as any
    if (work.s3_uploads && image instanceof File) {
      const key = imgKey.replace('_url', '')
      uploadActions.push(
        uploadImageAction({
          id: work.id,
          imageKey: key,
          image,
          s3Info: work.s3_uploads[key as keyof typeof work.s3_uploads]
        })
      )
    }
  })
  return uploadActions
}

export const getWorkListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_LIST),
    switchMap(action =>
      workServices.getWorkListAjax(action.payload).pipe(
        map(res => getWorkListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_WORK),
    switchMap(action =>
      workServices.getWorkAjax(action.payload).pipe(
        map(res => getWorkSuccessAction(toAuthorIds(res.response))),
        tap(() => successSubject.next({ type: WorkActionType.GET_WORK_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_WORK_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export const createWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.CREATE),
    exhaustMap(action =>
      workServices.createWorkAjax(action.payload).pipe(
        mergeMap(res => {
          const resDetail = toAuthorIds(res.response)
          successSubject.next({ type: WorkActionType.CREATE_SUCCESS })
          return of(createWorkSuccessAction(resDetail), ...genImgUploadActions(resDetail, action.payload as WorkDetail))
        }),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.UPDATE),
    exhaustMap(action =>
      workServices.updateWorkAjax(action.payload).pipe(
        map(res => updateWorkSuccessAction(toAuthorIds(res.response))),
        tap(() => successSubject.next({ type: WorkActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getCsvLogListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_CSV_LOG_LIST),
    exhaustMap(() =>
      workServices.getCsvLogListAjax().pipe(
        map(res => getCsvLogListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.GET_CSV_LOG_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_CSV_LOG_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const importWorksEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.IMPORT_WORKS),
    exhaustMap(() =>
      workServices.importWorksAjax().pipe(
        tap(() => successSubject.next({ type: WorkActionType.IMPORT_WORKS_SUCCESS })),
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.IMPORT_WORKS_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const uploadImageEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.IMAGE_UPLOAD),
    exhaustMap(action =>
      workServices.uploadImageAjax(action.payload).pipe(
        map(() =>
          notifyImgUploadedAction({
            id: action.payload.id,
            imageMeta: {
              [action.payload.imageKey]: {
                path: action.payload.s3Info.path,
                width: action.payload.image.width,
                height: action.payload.image.height
              }
            }
          })
        ),
        tap(() => successSubject.next({ type: WorkActionType.IMAGE_UPLOAD_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.IMAGE_UPLOAD_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const notifyImgUploadedEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.NOTIFY_IMG_UPLOADED),
    exhaustMap(action =>
      workServices.notifyImageUploadedAjax(action.payload).pipe(
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.NOTIFY_IMG_UPLOADED_FAILED })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getWorkListEpic,
  getWorkEpic,
  createWorkEpic,
  updateWorkEpic,
  getCsvLogListEpic,
  importWorksEpic,
  uploadImageEpic,
  notifyImgUploadedEpic
]
