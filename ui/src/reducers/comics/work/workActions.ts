import WorkDetail, { Work, WorkImageMeta } from '@src/models/comics/work'
import S3Info from '@src/models/s3Info'
import ImportLog from '@src/models/importLog'
import { FileWithMeta } from '@src/utils/functions'

export enum WorkActionType {
  GET_LIST = '@ComicsWork/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsWork/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsWork/GET_LIST_ERROR',

  GET_WORK = '@ComicsWork/GET_WORK',
  GET_WORK_SUCCESS = '@ComicsWork/GET_WORK_SUCCESS',
  GET_WORK_ERROR = '@ComicsWork/GET_WORK_ERROR',
  RESET_WORK = '@ComicsWork/RESET_WORK',

  CREATE = '@ComicsWork/CREATE',
  CREATE_SUCCESS = '@ComicsWork/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsWork/CREATE_ERROR',

  UPDATE = '@ComicsWork/UPDATE',
  UPDATE_SUCCESS = '@ComicsWork/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsWork/UPDATE_ERROR',

  GET_CSV_LOG_LIST = '@ComicsWork/GET_CSV_LOGS',
  GET_CSV_LOG_LIST_SUCCESS = '@ComicsWork/GET_CSV_LOG_LIST_SUCCESS',
  GET_CSV_LOG_LIST_ERROR = '@ComicsWork/GET_CSV_LOG_LIST_ERROR',

  IMPORT_WORKS = '@ComicsWork/IMPORT_WORKS',
  IMPORT_WORKS_SUCCESS = '@ComicsWork/IMPORT_WORKS_SUCCESS',
  IMPORT_WORKS_ERROR = '@ComicsWork/IMPORT_WORKS_ERROR',

  IMAGE_UPLOAD = '@ComicsWork/IMAGE_UPLOAD',
  IMAGE_UPLOAD_SUCCESS = '@ComicsWork/IMAGE_UPLOAD_SUCCESS',
  IMAGE_UPLOAD_ERROR = '@ComicsWork/IMAGE_UPLOAD_ERROR',

  NOTIFY_IMG_UPLOADED = '@ComicsWork/NOTIFY_IMG_UPLOADED',
  NOTIFY_IMG_UPLOADED_FAILED = '@ComicsWork/NOTIFY_IMG_UPLOADED_FAILED'
}

export const getWorkListAction = (searchParams?: Object) => ({
  type: WorkActionType.GET_LIST,
  payload: searchParams
})

export interface ListParams {
  total: number
  works: Work[]
}
export const getWorkListSuccessAction = (payload: ListParams) => ({
  type: WorkActionType.GET_LIST_SUCCESS,
  payload
})

export const getWorkAction = (workId: string) => ({
  type: WorkActionType.GET_WORK,
  payload: workId
})

export const getWorkSuccessAction = (work: WorkDetail) => ({
  type: WorkActionType.GET_WORK_SUCCESS,
  payload: work
})

export const resetWorkAction = () => ({
  type: WorkActionType.RESET_WORK
})

export const createWorkAction = (work: WorkDetail) => ({
  type: WorkActionType.CREATE,
  payload: work
})

export const createWorkSuccessAction = (work: WorkDetail) => ({
  type: WorkActionType.CREATE_SUCCESS,
  payload: work
})

export const updateWorkAction = (work: WorkDetail) => ({
  type: WorkActionType.UPDATE,
  payload: work
})

export const updateWorkSuccessAction = (work: WorkDetail) => ({
  type: WorkActionType.UPDATE_SUCCESS,
  payload: work
})

export const getCsvLogListAction = () => ({
  type: WorkActionType.GET_CSV_LOG_LIST
})

export const getCsvLogListSuccessAction = (logList: ImportLog[]) => ({
  type: WorkActionType.GET_CSV_LOG_LIST_SUCCESS,
  payload: logList
})

export const importWorksAction = (payload: any) => ({
  type: WorkActionType.IMPORT_WORKS,
  payload
})

export interface UploadImagePayload {
  id: string
  imageKey: string
  image: FileWithMeta
  s3Info: S3Info
}
export const uploadImageAction = (payload: UploadImagePayload) => ({
  type: WorkActionType.IMAGE_UPLOAD,
  payload
})

export interface NotifyImageUpload {
  image1: WorkImageMeta
  image2: WorkImageMeta
  image3: WorkImageMeta
  image4: WorkImageMeta
}
export const notifyImgUploadedAction = (payload: { id: string; imageMeta: Partial<NotifyImageUpload> }) => ({
  type: WorkActionType.NOTIFY_IMG_UPLOADED,
  payload
})
