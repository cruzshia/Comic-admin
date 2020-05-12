import Content from '@src/models/comics/content'

export enum ContentActionType {
  GET_LIST = '@ComicsContent/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsContent/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsContent/GET_LIST_ERROR',

  GET_CONTENT = '@ComicsContent/GET_CONTENT',
  GET_CONTENT_SUCCESS = '@ComicsContent/GET_CONTENT_SUCCESS',
  GET_CONTENT_ERROR = '@ComicsContent/GET_CONTENT_ERROR',
  RESET_CONTENT = '@ComicsContent/RESET_CONTENT',

  CREATE = '@ComicsContent/CREATE',
  CREATE_SUCCESS = '@ComicsContent/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsContent/CREATE_ERROR',

  UPDATE = '@ComicsContent/UPDATE',
  UPDATE_SUCCESS = '@ComicsContent/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsContent/UPDATE_ERROR'
}

export const getContentListAction = () => ({
  type: ContentActionType.GET_LIST
})

export const getContentListSuccessAction = (payload: Content[]) => ({
  type: ContentActionType.GET_LIST_SUCCESS,
  payload
})

export const getContentAction = (contentId: string) => ({
  type: ContentActionType.GET_CONTENT,
  payload: contentId
})

export const getContentSuccessAction = (content: Content) => ({
  type: ContentActionType.GET_CONTENT_SUCCESS,
  payload: content
})

export const resetContentAction = () => ({
  type: ContentActionType.RESET_CONTENT
})

export const createContentAction = (content: Content) => ({
  type: ContentActionType.CREATE,
  payload: content
})

export const createContentSuccessAction = (content: Content) => ({
  type: ContentActionType.CREATE_SUCCESS,
  payload: content
})

export const updateContentAction = (content: Content) => ({
  type: ContentActionType.UPDATE,
  payload: content
})

export const updateContentSuccessAction = (content: Content) => ({
  type: ContentActionType.UPDATE_SUCCESS,
  payload: content
})
