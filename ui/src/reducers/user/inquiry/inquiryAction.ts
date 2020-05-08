import UserInquiry from '@src/models/user/inquiry'

export enum InquiryActionType {
  GET_LIST = '@UserInquiry/GET_LIST',
  GET_LIST_SUCCESS = '@UserInquiry/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@UserInquiry/GET_LIST_ERROR',

  GET_INQUIRY = '@UserInquiry/GET_INQUIRY',
  GET_INQUIRY_SUCCESS = '@UserInquiry/GET_INQUIRY_SUCCESS',
  GET_INQUIRY_ERROR = '@UserInquiry/GET_INQUIRY_ERROR'
}

export const getInquiryListAction = () => ({
  type: InquiryActionType.GET_LIST
})

export const getInquiryListSuccessAction = (payload: UserInquiry[]) => ({
  type: InquiryActionType.GET_LIST_SUCCESS,
  payload
})

export const getInquiryAction = (inquiryId: string) => ({
  type: InquiryActionType.GET_INQUIRY,
  payload: inquiryId
})

export const getInquirySuccessAction = (payload: UserInquiry) => ({
  type: InquiryActionType.GET_INQUIRY_SUCCESS,
  payload
})
