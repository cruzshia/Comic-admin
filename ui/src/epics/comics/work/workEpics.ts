import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, switchMap, exhaustMap, mergeMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import WorkDetail from '@src/models/comics/work'
import {
  WorkActionType,
  getWorkListSuccessAction,
  getWorkSuccessAction,
  createWorkSuccessAction,
  updateWorkSuccessAction,
  getCsvLogListSuccessAction,
  notifyImgUploadedAction
} from '@src/reducers/comics/work/workActions'
import * as workServices from './workServices'
import { toEditableModel, imgUploadActions, toRequestWork, formatListTime } from './transform'
import { emptyErrorReturn, ErrorResponse, toMockData } from '../../utils'
import mockListData from './mockData/mockWorkList'

export const getWorkListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_LIST),
    switchMap(action =>
      workServices.getWorkListAjax(action.payload).pipe(
        map(res => getWorkListSuccessAction(formatListTime(res.response))),
        catchError(error => {
          errorSubject.next({ type: WorkActionType.GET_LIST_ERROR })
          return toMockData(error, of(getWorkListSuccessAction(formatListTime(mockListData)))) || emptyErrorReturn()
        })
      )
    )
  )

export const getWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_WORK),
    switchMap(action =>
      workServices.getWorkAjax(action.payload).pipe(
        map(res => getWorkSuccessAction(toEditableModel(res.response))),
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
      workServices.createWorkAjax(toRequestWork(action.payload)).pipe(
        mergeMap(res => {
          const resDetail = toEditableModel(res.response)
          successSubject.next({ type: WorkActionType.CREATE_SUCCESS })
          return of(createWorkSuccessAction(resDetail), ...imgUploadActions(resDetail, action.payload as WorkDetail))
        }),
        catchError((error: ErrorResponse) => {
          errorSubject.next({ type: WorkActionType.CREATE_ERROR, error: error.response })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.UPDATE),
    exhaustMap(action =>
      workServices.updateWorkAjax(toRequestWork(action.payload)).pipe(
        mergeMap(res => {
          const resDetail = toEditableModel(res.response)
          successSubject.next({ type: WorkActionType.UPDATE_SUCCESS })
          return of(updateWorkSuccessAction(resDetail), ...imgUploadActions(resDetail, action.payload as WorkDetail))
        }),
        catchError((error: ErrorResponse) => {
          errorSubject.next({ type: WorkActionType.UPDATE_ERROR, error: error.response })
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
            workId: action.payload.workId,
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
