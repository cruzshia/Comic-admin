import AuthorDetail, { ListParam } from '@src/models/comics/author'

export enum AuthorActionType {
  GET_LIST = '@ComicsAuthor/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsAuthor/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsAuthor/GET_LIST_ERROR',

  GET_AUTHOR = '@ComicsAuthor/GET_AUTHOR',
  GET_AUTHOR_SUCCESS = '@ComicsAuthor/GET_AUTHOR_SUCCESS',
  GET_AUTHOR_ERROR = '@ComicsAuthor/GET_AUTHOR_ERROR',
  RESET_AUTHOR = '@ComicsAuthor/RESET_AUTHOR',

  CREATE = '@ComicsAuthor/CREATE',
  CREATE_SUCCESS = '@ComicsAuthor/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsAuthor/CREATE_ERROR',

  UPDATE = '@ComicsAuthor/UPDATE',
  UPDATE_SUCCESS = '@ComicsAuthor/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsAuthor/UPDATE_ERROR'
}

export const getAuthorListAction = (payload?: ListParam) => ({
  type: AuthorActionType.GET_LIST,
  payload
})

export const getAuthorListSuccessAction = (payload: { authors: AuthorDetail[]; total: number }) => ({
  type: AuthorActionType.GET_LIST_SUCCESS,
  payload
})

export const getAuthorAction = (authorId: string) => ({
  type: AuthorActionType.GET_AUTHOR,
  payload: authorId
})

export const getAuthorSuccessAction = (author: AuthorDetail) => ({
  type: AuthorActionType.GET_AUTHOR_SUCCESS,
  payload: author
})

export const resetAuthorAction = () => ({
  type: AuthorActionType.RESET_AUTHOR
})

export const createAuthorAction = (author: AuthorDetail) => ({
  type: AuthorActionType.CREATE,
  payload: author
})

export const createAuthorSuccessAction = (author: AuthorDetail) => ({
  type: AuthorActionType.CREATE_SUCCESS,
  payload: author
})

export const updateAuthorAction = (author: AuthorDetail) => ({
  type: AuthorActionType.UPDATE,
  payload: author
})

export const updateAuthorSuccessAction = (author: AuthorDetail) => ({
  type: AuthorActionType.UPDATE_SUCCESS,
  payload: author
})
