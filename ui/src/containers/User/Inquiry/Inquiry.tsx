import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { getInquiryListAction } from '@src/reducers/user/inquiry/inquiryAction'
import { routePath } from '@src/common/appConfig'
import InquiryList from './components/InquiryList'
import InquiryDetail from './components/InquiryDetail'
import { mockInquiryData } from './mockData/mockData'

export default function ContactUs() {
  const dispatch = useDispatch()
  const { inquiryList, inquiryTotal } = useSelector((state: StoreState) => state.inquiry)
  const handleGetInquiryList = useCallback(() => dispatch(getInquiryListAction()), [dispatch])

  return (
    <Switch>
      <Route
        exact
        path={routePath.user.inquiry}
        render={() => (
          <InquiryList inquiryList={inquiryList} inquiryTotal={inquiryTotal} onGetInquiryList={handleGetInquiryList} />
        )}
      />
      <Route exact path={routePath.user.inquiryDetail} render={() => <InquiryDetail inquiry={mockInquiryData} />} />
    </Switch>
  )
}
