import { InquiryActionType } from './inquiryAction'
import Inquiry from '@src/models/user/inquiry'
import { ActionType } from '../../types'

export interface InquiryState {
  inquiryList: Inquiry[]
  inquiryTotal: number
  currentInquiry?: Inquiry
}

const InitState = {
  inquiryList: [],
  inquiryTotal: 0
}

export const InquiryPreloadState = InitState

function updateCurrentInquiryHandler(state: InquiryState = InitState, action: ActionType<Inquiry>): InquiryState {
  return {
    ...state,
    currentInquiry: action.payload
  }
}

const handlers: Record<string, (state: InquiryState, action: ActionType<any>) => InquiryState> = {
  [InquiryActionType.GET_LIST_SUCCESS]: (state = InitState, action: ActionType<Inquiry[]>) => ({
    ...state,
    inquiryList: action.payload,
    inquiryTotal: action.payload.length
  }),
  [InquiryActionType.GET_INQUIRY_SUCCESS]: updateCurrentInquiryHandler,
  [InquiryActionType.RESET_INQUIRY]: updateCurrentInquiryHandler
}

export default function inquiryReducer(state: InquiryState = InitState, action: ActionType<Inquiry>) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}