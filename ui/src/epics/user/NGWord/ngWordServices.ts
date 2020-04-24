import authAjax from '@src/utils/ajaxUtil'
import { from } from 'rxjs'
import { mockNGWord } from './mockData/mock'
import NGWord from '@src/models/user/NGWord'

export const getNGWordAjax = () => {
  authAjax.get('/ng_word')
  return from([
    {
      status: 200,
      response: mockNGWord
    }
  ])
}

export const updateNGWordAjax = (data: NGWord) => {
  authAjax.put('/ng_word', data)
  return from([
    {
      status: 200,
      response: mockNGWord
    }
  ])
}
