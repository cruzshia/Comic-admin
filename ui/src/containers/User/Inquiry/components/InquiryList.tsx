import React, { useMemo, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { usePaging } from '@src/hooks'
import { routePath } from '@src/common/appConfig'
import { BREADCRUMBS } from '../utils'
import SearchBlock from './SearchBlock'
import commonMessages from '@src/messages'
import messages from '../messages'

interface Props {
  inquiryList: any[]
  inquiryTotal: number
  onGetInquiryList: () => void
}

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 170
    },
    '& .ListTable-col-2': {
      width: 200
    },
    '& .ListTable-col-3': {
      width: 140
    },
    '& .ListTable-col-4': {
      width: 360
    }
  }
})

export default function InquiryList({ inquiryList, inquiryTotal, onGetInquiryList }: Props) {
  const history = useHistory()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { pagination, handlePageChange } = usePaging({ total: inquiryTotal })

  useEffect(() => {
    onGetInquiryList()
  }, [onGetInquiryList])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )

  const theadList = useMemo(
    () => [
      { id: 'inquiryAt', label: formatMessage(messages.inquiryTime) },
      { id: 'id', label: formatMessage(commonMessages.id) },
      { id: 'inquiryType', label: formatMessage(messages.questionType) },
      { id: 'message', label: formatMessage(messages.message) },
      { id: 'appId', label: formatMessage(commonMessages.appId) },
      { id: 'appVersion', label: formatMessage(messages.appVersion) }
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} />
      <SearchBlock onSubmit={console.log} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={inquiryList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback((id: string) => history.push(routePath.user.inquiryDetail.replace(':id', id)), [
          history
        ])}
      />
    </>
  )
}
