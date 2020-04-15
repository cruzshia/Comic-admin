import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { useSort, usePaging } from '@src/hooks'
import { routePath } from '@src/common/appConfig'
import { BREADCRUMBS } from '../utils'
import SearchBlock from './SearchBlock'
import commonMessages from '@src/messages'
import messages from '../messages'

interface Props {
  contactList: any[]
  contactTotal: number
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
    '& .ListTable-col-6': {
      width: '5%'
    }
  }
})

export default function ContactUsList({ contactList, contactTotal }: Props) {
  const history = useHistory()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { sortBy, handleSort } = useSort('contactAt')
  const { pagination, handlePageChange } = usePaging({ total: contactTotal })

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )

  const dataList = contactList.map(contact => ({
    id: contact.id,
    data: {
      ...contact,
      spacer: ''
    }
  }))

  const theadList = useMemo(
    () => [
      { id: 'contactAt', label: formatMessage(messages.contactTime), onSort: handleSort },
      { id: 'id', label: formatMessage(commonMessages.id) },
      { id: 'type', label: formatMessage(messages.questionType) },
      { id: 'message', label: formatMessage(messages.message) },
      { id: 'appVersion', label: formatMessage(messages.appVersion) },
      { id: 'spacer', label: '' }
    ],
    [handleSort, formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} />
      <SearchBlock onSubmit={console.log} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback((id: string) => history.push(routePath.user.contactUsDetail.replace(':id', id)), [
          history
        ])}
      />
    </>
  )
}
