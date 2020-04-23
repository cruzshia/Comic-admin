import ajaxUtil from '@src/utils/ajaxUtil'
import { from } from 'rxjs'
import { mockCommentList } from './mockData/mock'

export const getCommentListAjax = () => {
  ajaxUtil.get('/user/comment')
  return from([
    {
      status: 200,
      response: mockCommentList
    }
  ])
}
