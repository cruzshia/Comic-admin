import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { getInquiryListAction, getInquiryAction, resetInquiryAction } from '@src/reducers/user/inquiry/inquiryAction'
import { routePath } from '@src/common/appConfig'
import InquiryList from './components/InquiryList'
import InquiryDetail from './components/InquiryDetail'

export default function ContactUs() {
  const dispatch = useDispatch()
  const { inquiryList, inquiryTotal, currentInquiry } = useSelector((state: StoreState) => state.inquiry)
  const handleGetInquiryList = useCallback(() => dispatch(getInquiryListAction()), [dispatch])
  const handleGetInquiry = useCallback((id: string) => dispatch(getInquiryAction(id)), [dispatch])
  const handleResetInquiry = useCallback(() => dispatch(resetInquiryAction()), [dispatch])

  return (
    <Switch>
      <Route
        exact
        path={routePath.user.inquiry}
        render={() => (
          <InquiryList inquiryList={inquiryList} inquiryTotal={inquiryTotal} onGetInquiryList={handleGetInquiryList} />
        )}
      />
      <Route
        exact
        path={routePath.user.inquiryDetail}
        render={() => (
          <InquiryDetail onGetInquiry={handleGetInquiry} onResetInquiry={handleResetInquiry} inquiry={currentInquiry} />
        )}
      />
    </Switch>
  )
}
