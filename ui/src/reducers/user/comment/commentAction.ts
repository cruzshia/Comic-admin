import UserComment from '@src/models/user/comment'

export enum CommentActionType {
  GET_LIST = '@UserComment/GET_LIST',
  GET_LIST_SUCCESS = '@UserComment/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@UserComment/GET_LIST_ERROR',

  GET_COMMENT = '@UserComment/GET_COMMENT',
  GET_COMMENT_SUCCESS = '@UserComment/GET_COMMENT_SUCCESS',
  GET_COMMENT_ERROR = '@UserComment/GET_COMMENT_ERROR',

  UPDATE = '@UserComment/UPDATE',
  UPDATE_SUCCESS = '@UserComment/UPDATE_SUCCESS',
  UPDATE_ERROR = '@UserComment/UPDATE_ERROR'
}

export const getCommentListAction = () => ({
  type: CommentActionType.GET_LIST
})

export const getCommentListSuccessAction = (payload: UserComment[]) => ({
  type: CommentActionType.GET_LIST_SUCCESS,
  payload
})

export const getCommentAction = (commentId: string) => ({
  type: CommentActionType.GET_COMMENT,
  payload: commentId
})

export const getCommentSuccessAction = (payload: UserComment) => ({
  type: CommentActionType.GET_COMMENT_SUCCESS,
  payload
})

export const updateCommentAction = (payload: UserComment) => ({
  type: CommentActionType.UPDATE,
  payload
})

export const updateCommentSuccessAction = (payload: UserComment) => ({
  type: CommentActionType.UPDATE_SUCCESS,
  payload
})
