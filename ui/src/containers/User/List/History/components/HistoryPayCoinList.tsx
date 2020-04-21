import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Box } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import { routePath } from '@src/common/appConfig'
import ListTable from '@src/components/table/ListTable'
import { useSort, usePaging } from '@src/hooks'
import { BREADCRUMBS } from '../utils'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'
import commonMessages from '@src/messages'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 150
    },
    '& .ListTable-col-2': {
      width: 230
    },
    '& .ListTable-col-3': {
      width: 200
    },
    '& .ListTable-col-4': {
      width: 110
    }
  }
})

export default function HistoryPayCoinList({
  historyTotal,
  historyList
}: {
  historyTotal: number
  historyList: { [key: string]: any }[]
}) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { userId } = useParams()
  const { sortBy, handleSort } = useSort('createdAt')
  const { pagination, handlePageChange } = usePaging({ total: historyTotal })

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId || '') },
        {
          title: formatMessage(messages.payCoinList),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )

  const theadList = useMemo(
    () => [
      { id: 'createdAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'logType', label: formatMessage(messages.logType) },
      { id: 'applicationId', label: formatMessage(commonMessages.appId) },
      { id: 'coinChangeTotal', label: formatMessage(messages.coinChangeTotal) },
      { id: 'coinChangeDetail', label: formatMessage(messages.coinChangeDetail) }
    ],
    [formatMessage, handleSort]
  )

  const dataList = historyList
    .map(({ id, coinChangeDetail, ...rest }) => ({
      id: id,
      data: {
        ...rest,
        coinChangeDetail: <Box whiteSpace='pre-wrap'>{coinChangeDetail}</Box>
      }
    }))
    .sort((a: any, b: any) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.payCoin)} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback(
          (id: string) =>
            history.push(routePath.user.historyPayCoinDetail.replace(':id', id).replace(':userId', userId || '')),
          [history, userId]
        )}
        noMarginTop
      />
    </>
  )
}
