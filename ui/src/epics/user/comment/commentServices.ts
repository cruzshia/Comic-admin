import ajaxUtil from '@src/utils/ajaxUtil'
import { from } from 'rxjs'
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

export const updateCommentAjax = (data: string) => {
  ajaxUtil.put('/comment/', data)
  return from([
    {
      status: 200,
      response: mockComment
    }
  ])
}
