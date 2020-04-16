import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import InquiryList from './components/InquiryList'
import InquiryDetail from './components/InquiryDetail'
import { mockInquiryList, mockInquiryData } from './mockData/mockData'

export default function ContactUs() {
  return (
    <Switch>
      <Route
        exact
        path={routePath.user.inquiry}
        render={() => <InquiryList inquiryList={mockInquiryList} inquiryTotal={mockInquiryList.length} />}
      />
      <Route exact path={routePath.user.inquiryDetail} render={() => <InquiryDetail inquiry={mockInquiryData} />} />
    </Switch>
  )
}
