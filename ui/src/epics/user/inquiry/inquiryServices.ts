import ajaxUtil from '@src/utils/ajaxUtil'
import { from } from 'rxjs'
import Inquiry from '@src/models/user/inquiry'
import { mockInquiryList, mockInquiryData } from './mockData/mockData'

export const getInquiryListAjax = () => {
  ajaxUtil.get('/inquiry/list')
  return from([
    {
      status: 200,
      response: mockInquiryList
    }
  ])
}

export const getInquiryAjax = (id: string) => {
  ajaxUtil.get('/inquiry/' + id)
  return from([
    {
      status: 200,
      response: mockInquiryData
    }
  ])
}

export const updateInquiryAjax = (data: Inquiry) => {
  ajaxUtil.put('/inquiry/', data)
  return from([
    {
      status: 200,
      response: mockInquiryData
    }
  ])
}
