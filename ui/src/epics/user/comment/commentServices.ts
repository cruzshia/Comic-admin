import ajaxUtil from '@src/utils/ajaxUtil'
import { from } from 'rxjs'
import UserComment from '@src/models/user/comment'
import { mockCommentList, mockComment } from './mockData/mock'

export const getCommentListAjax = () => {
  ajaxUtil.get('/comment/list')
  return from([
    {
      status: 200,
      response: mockCommentList
    }
  ])
}

export const getCommentAjax = (id: string) => {
  ajaxUtil.get('/comment/' + id)
  return from([
    {
      status: 200,
      response: mockComment
    }
  ])
}

export const updateCommentAjax = (data: UserComment) => {
  ajaxUtil.put('/comment/', data)
  return from([
    {
      status: 200,
      response: mockComment
    }
  ])
}
export const deleteCommentAjax = (idList: string[]) => {
  ajaxUtil.delete('/comment/list', idList)
  return from([
    {
      status: 200
    }
  ])
}
